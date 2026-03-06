import { Form, Input, message, Spin } from 'antd';
import Banner from '../../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Account = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user, isLoading: authLoading, login } = useAuth();
    const [saving, setSaving] = useState(false);

    // Điền dữ liệu vào form khi user đã load xong
    useEffect(() => {
        if (!authLoading && !user) {
            message.warning('Vui lòng đăng nhập để xem thông tin!');
            navigate('/login');
        } else if (user) {
            form.setFieldsValue({
                fullname: user.fullname || '',
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
                role: user.role === 'student' ? 'Học sinh' : user.role === 'teacher' ? 'Giáo viên' : user.role || 'Học sinh'
            });
        }
    }, [user, authLoading, navigate, form]);

    // Xử lý khi bấm nút "Lưu thông tin"
    const handleSave = async (values) => {
        try {
            setSaving(true);
            const response = await fetch('/api/auth/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Gửi cookie khi update
                body: JSON.stringify({
                    id: user.id,
                    fullname: values.fullname,
                    dob: values.dob
                })
            });

            let data;
            try {
                data = await response.json();
            } catch (err) {
                throw new Error('Định dạng phản hồi không hợp lệ');
            }

            if (response.ok) {
                message.success('Cập nhật thông tin thành công!');
                // Cập nhật lại context với dữ liệu mới
                login({ ...user, fullname: values.fullname, dob: values.dob });
            } else {
                message.error(data.message || 'Lỗi khi cập nhật thông tin!');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            message.error('Lỗi kết nối tới server!');
        } finally {
            setSaving(false);
        }
    };

    if (authLoading) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-[#FFFDEF]">
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="w-full flex justify-center py-6 px-4 md:px-8 font-sans">
            <div className="w-full max-w-5xl flex flex-col gap-8">
                <div className="w-full flex justify-center pb-4">
                    <Banner />
                </div>

                <div className="w-full bg-[#A7DE93] p-8 md:p-12 rounded-4xl shadow-sm flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-black font-serif mb-6 text-left">
                            Thông tin cá nhân
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start w-full">
                            <div className="flex-1 w-full bg-[#FFFDEF] border-4 border-[#61B543] rounded-[2rem] p-6 md:p-10 shadow-inner">
                                <Form
                                    form={form}
                                    layout="horizontal"
                                    className="flex flex-col gap-6"
                                    onFinish={handleSave}
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Họ và tên :</label>
                                        <Form.Item name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]} className="flex-1 mb-0 w-full">
                                            <Input
                                                className="w-full rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-white"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Ngày sinh :</label>
                                        <Form.Item name="dob" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]} className="flex-1 mb-0 w-full">
                                            <Input
                                                type="date"
                                                className="w-full rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-white"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Vai trò :</label>
                                        <Form.Item name="role" className="flex-1 mb-0 w-full">
                                            <Input
                                                readOnly
                                                className="w-full rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-gray-100 cursor-not-allowed text-gray-600"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="mt-8 flex justify-center w-full">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className={`bg-[#61B543] hover:bg-[#529b38] text-white text-xl md:text-2xl font-extrabold px-12 py-3 md:py-4 rounded-full shadow-[0_6px_0_#41802b] hover:shadow-[0_3px_0_#41802b] hover:translate-y-1 transition-all cursor-pointer border-none flex items-center justify-center ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {saving ? <Spin size="small" className="mr-2" /> : null}
                                            {saving ? 'Đang lưu...' : 'Lưu thông tin'}
                                        </button>
                                    </div>
                                </Form>
                            </div>

                            {/* Avatar Panel */}
                            <div className="w-full md:w-56 flex flex-col items-center gap-6 pt-4">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#D9D9D9] rounded-full shadow-inner overflow-hidden flex items-center justify-center">
                                    <span className="text-4xl text-gray-500">👤</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;