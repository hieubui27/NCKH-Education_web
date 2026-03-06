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
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-green-200 shadow-sm rounded-sm">
        <div className="p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-2xl text-blue-400 mb-8 font-light">Tin hướng dẫn</h2>
            <div className="space-y-0">
              {newsData.tutorials.map((item, index) => (
                <div key={index} className="flex py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <span className="w-32 shrink-0 text-gray-300 text-sm">{item.date}</span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-blue-400 mb-8 font-light">
              Tin chuyên môn
            </h2>
            <div className="space-y-0">
              {newsData.specialized.map((item, index) => (
                <div key={index} className="flex py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <span className="w-32 shrink-0 text-gray-300 text-sm">{item.date}</span>
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