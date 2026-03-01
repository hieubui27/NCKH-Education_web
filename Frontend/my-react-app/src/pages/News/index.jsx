import React from 'react';

const NewsPage = () => {
  const newsData = {
    tutorials: [
      { date: "27/02/2026", title: "Hướng dẫn vòng thi cấp Quốc gia Violympic năm học 2025 2026" },
      { date: "27/02/2026", title: "Chủ điểm ôn tập môn Tiếng Việt vòng Quốc gia" },
      { date: "27/02/2026", title: "Chủ điểm ôn tập môn Toán vòng Quốc gia" },
      { date: "27/02/2026", title: "Chủ điểm ôn tập môn Toán Tiếng Anh vòng Quốc gia" },
      { date: "01/03/2026", title: "Ra mắt website Vienkey - hỗ trợ dạy học tập đọc cho học sinh rối loạn phổ tự kỷ" },
    ],
    specialized: [
      { date: "01/03/2026", title: "Ra mắt tính năng tìm kiếm theo từ khóa - tra cứu nhanh" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 2" },
      { date: "01/03/2026", title: "Chủ đề ôn tập môn Tiếng Việt lớp 3" },
      { date: "01/03/2026", title: "Cách hỗ trợ học sinh rối loạn phổ tự kỷ hiểu nghĩa từ trong môn Tập đọc" },
    ]
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      {/* Container chính với viền xanh như trong ảnh */}
      <div className="max-w-4xl mx-auto bg-white border-[1px] border-green-200 shadow-sm rounded-sm">
        
    

        {/* Content Area */}
        <div className="p-8 md:p-12">
          
          {/* Section: Tin Hướng Dẫn */}
          <section className="mb-12">
            <h2 className="text-2xl text-blue-400 mb-8 font-light">Tin hướng dẫn</h2>
            <div className="space-y-0">
              {newsData.tutorials.map((item, index) => (
                <div key={index} className="flex py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <span className="w-32 flex-shrink-0 text-gray-300 text-sm">{item.date}</span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Tin Chuyên Môn */}
          <section>
            <h2 className="text-2xl text-blue-400 mb-8 font-light">
              Tin chuyên môn
            </h2>
            <div className="space-y-0">
              {newsData.specialized.map((item, index) => (
                <div key={index} className="flex py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <span className="w-32 flex-shrink-0 text-gray-300 text-sm">{item.date}</span>
                  <span className="text-gray-700 group-hover:text-blue-600">{item.title}</span>
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