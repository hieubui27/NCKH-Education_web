import { Form, Input, Button } from 'antd';
import Banner from '../../components/Banner/Banner';

const Account = () => {
    return (
        <div className="w-full flex justify-center py-6 px-4 md:px-8 font-sans">
            <div className="w-full max-w-5xl flex flex-col gap-8">
                {/* Banner Section */}
                <div className="w-full flex justify-center pb-4">
                    <Banner />
                </div>

                {/* Main Account Board */}
                <div className="w-full bg-[#A7DE93] p-8 md:p-12 rounded-[2rem] shadow-sm flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-black font-serif mb-6 text-left">
                            Thông tin cá nhân
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start w-full">
                            {/* Form Panel */}
                            <div className="flex-1 w-full bg-[#FFFDEF] border-4 border-[#61B543] rounded-[2rem] p-6 md:p-10 shadow-inner">
                                <Form layout="horizontal" className="flex flex-col gap-6">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Họ và tên :</label>
                                        <Input
                                            className="flex-1 rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Ngày sinh :</label>
                                        <Input
                                            className="flex-1 rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                        <label className="min-w-32 text-xl font-extrabold text-black font-serif">Vai trò :</label>
                                        <Input
                                            className="flex-1 rounded-2xl h-12 text-lg border-[#A7DE93] shadow-inner bg-white"
                                        />
                                    </div>
                                </Form>
                            </div>

                            {/* Avatar Panel */}
                            <div className="w-full md:w-56 flex flex-col items-center gap-6 pt-4">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#D9D9D9] rounded-full shadow-inner"></div>
                                <button className="bg-white text-black font-extrabold text-lg px-6 py-2 rounded-2xl border-none shadow-md hover:bg-gray-50 cursor-pointer hover:scale-105 transition-transform">
                                    Đổi ảnh đại diện
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-12 flex justify-center w-full">
                            <button
                                className="bg-[#61B543] hover:bg-[#529b38] text-white text-xl md:text-2xl font-extrabold px-12 py-3 md:py-4 rounded-full shadow-[0_6px_0_#41802b] hover:shadow-[0_3px_0_#41802b] hover:translate-y-1 transition-all cursor-pointer border-none"
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;