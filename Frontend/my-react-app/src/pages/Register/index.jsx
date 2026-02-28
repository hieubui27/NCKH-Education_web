import { Form, Input, message, DatePicker, Radio } from 'antd';
import Banner from '../../components/Banner/Banner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleRegister = async (vals) => {
        try {
            setLoading(true);

            // Xử lý lại dữ liệu từ Form cho khớp với yêu cầu của Backend
            const payload = {
                ...vals,
                phonenumber: vals.phone,
                // Xử lý DatePicker của Ant Design sang dạng chuỗi YYYY-MM-DD
                dob: vals.dob ? vals.dob.format('YYYY-MM-DD') : undefined
            };

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Gửi payload đã xử lý thay vì vals gốc
            });
            const data = await response.json();
            if (response.ok) {
                message.success('Đăng ký thành công!');
                navigate('/login');
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.error(error);
            message.error('Lỗi kết nối đến server!');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#FFFDEF] flex flex-col items-center pt-2 pb-20 relative font-sans">
            <div className="w-full max-w-6xl px-4 sm:px-8 z-10 flex flex-col items-center">
                <Banner />

                <div className="w-full max-w-5xl bg-[#EB7470] p-8 md:p-14 rounded-[2rem] shadow-sm mt-4">
                    <Form
                        layout="vertical"
                        onFinish={handleRegister}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Họ và tên :</span>}
                                name="fullname"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                            >
                                <Input
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Tên đăng nhập :</span>}
                                name="username"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                    {
                                        pattern: /^[a-z0-9_.]{6,}$/,
                                        message: 'Tối thiểu 6 ký tự, chỉ gồm chữ viết thường, số, chấm (.) và gạch dưới (_)'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="VD: kien_123"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Mật khẩu :</span>}
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password
                                    placeholder="*********"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Ngày tháng năm sinh :</span>}
                                name="dob"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    placeholder="Chọn ngày của bé"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] w-full"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Nhập lại mật khẩu :</span>}
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp! Vui lòng kiểm tra lại.'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="*********"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>


                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Số điện thoại :</span>}
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input
                                    placeholder="Số điện thoại liên hệ"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Đối tượng :</span>}
                                name="role"
                                rules={[{ required: true, message: 'Vui lòng chọn đối tượng!' }]}
                            >
                                <div className="w-fit h-14 bg-white px-6 rounded-2xl shadow-inner flex items-center">
                                    <Radio.Group className="flex items-center">
                                        <Radio value="student" className="text-lg font-bold flex items-center mr-8">Học sinh</Radio>
                                        <Radio value="teacher" className="text-lg font-bold flex items-center m-0">Giáo viên</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Trường học :</span>}
                                name="school"
                                rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
                            >
                                <Input
                                    placeholder="Trường đang học/giảng dạy"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>

                            <Form.Item
                                className="md:col-span-2"
                                label={<span className="text-xl font-extrabold text-white font-serif tracking-wide">Địa chỉ (Quận/Huyện/Tỉnh - TP) :</span>}
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input
                                    placeholder="Ví dụ: Quận Cầu Giấy, Hà Nội"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF]"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className="mt-8 flex justify-center mb-0">
                            <button
                                type="submit"
                                className="bg-[#A7DE93] hover:bg-[#92c97e] text-white text-2xl md:text-3xl font-extrabold px-12 py-4 md:py-5 rounded-full shadow-[0_8px_0_#61B543] hover:shadow-[0_4px_0_#61B543] hover:translate-y-1 transition-all cursor-pointer border-none"
                            >
                                Đăng ký ngay
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
