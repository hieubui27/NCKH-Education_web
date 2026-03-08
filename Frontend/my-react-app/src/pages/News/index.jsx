import React from 'react';

const NewsPage = () => {
  const newsData = {
    tutorials: [
      { date: "27/02/2026", title: "Ra mắt website Vienkey - website hỗ trợ dạy học tập đọc cho học sinh rối loạn phổ tự kỷ học Tiểu học hòa nhập" },
      { date: "27/02/2026", title: "Các tính năng và hướng dẫn sử dụng website Vienkey" },
    ],
    specialized: [
      { date: "01/03/2026", title: "Ra mắt tính năng tìm kiếm theo từ khóa - tra cứu nhanh" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 2" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 3" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 4" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 5" },
      { date: "01/03/2026", title: "Cách hỗ trợ học sinh rối loạn phổ tự kỷ hiểu nghĩa từ trong môn Tập đọc" },
    ]
  };

  return (
    <div className="min-h-screen p-3 md:p-8 font-sans bg-[#FFFDEF] w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white border border-green-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-5 md:p-12">
          
          {/* Section: Tin hướng dẫn */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl text-blue-500 mb-6 md:mb-8 font-semibold border-l-4 border-blue-500 pl-3">
              Tin hướng dẫn
            </h2>
            <div className="divide-y divide-gray-100">
              {newsData.tutorials.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row py-4 md:items-center hover:bg-gray-50 transition-colors cursor-pointer group px-2 rounded-lg">
                  {/* Ngày tháng: Lên trên tiêu đề ở mobile, nằm bên trái ở desktop */}
                  <span className="text-gray-400 text-xs md:text-sm md:w-32 shrink-0 mb-1 md:mb-0">
                    {item.date}
                  </span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors leading-relaxed font-medium text-sm md:text-base">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Tin chuyên môn */}
          <section>
            <h2 className="text-xl md:text-2xl text-blue-500 mb-6 md:mb-8 font-semibold border-l-4 border-blue-500 pl-3">
              Tin chuyên môn
            </h2>
            <div className="divide-y divide-gray-100">
              {newsData.specialized.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row py-4 md:items-center hover:bg-gray-50 transition-colors cursor-pointer group px-2 rounded-lg">
                  <span className="text-gray-400 text-xs md:text-sm md:w-32 shrink-0 mb-1 md:mb-0">
                    {item.date}
                  </span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors leading-relaxed font-medium text-sm md:text-base">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default NewsPage;