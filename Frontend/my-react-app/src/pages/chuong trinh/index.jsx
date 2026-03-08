
import { Collapse, Typography, Divider } from 'antd';
import Banner from '../../components/Banner/Banner';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const CurriculumPage = () => {
  // Dữ liệu chương trình học
  const curriculumData = [
    {
      key: '1',
      label: 'LỚP 2',
      children: [
        {
          semester: 'Học kỳ 1',
          themes: [
            {
              name: 'Chủ đề: Em lớn lên từng ngày',
              lessons: ['Bài 1: Tôi là học sinh lớp 2', 'Bài 2: Ngày hôm qua đâu rồi?', 'Bài 3: Niềm vui của Bi và Bống', 'Bài 4: Làm việc thật là vui', 'Bài 5: Em có xinh không?', 'Bài 6: Một giờ học', 'Bài 7: Cây xấu hổ', 'Bài 8: Cầu thủ dự bị']
            },
            {
              name: 'Chủ đề: Đi học vui sao',
              lessons: ['Bài 9: Cô giáo lớp em', 'Bài 10: Thời khóa biểu', 'Bài 11: Cái trống trường em', 'Bài 12: Danh sách học sinh', 'Bài 13: Yêu lắm trường ơi', 'Bài 14: Em học vẽ', 'Bài 15: Cuốn sách của em', 'Bài 16: Khi trang sách mở ra']
            },
            {
              name: 'Chủ đề: Niềm vui tuổi thơ',
              lessons: ['Bài 17: Gọi bạn', 'Bài 18: Tớ nhớ cậu', 'Bài 19: Chữ A và những người bạn', 'Bài 20: Nhím nâu kết bạn', 'Bài 21: Thả diều', 'Bài 22: Tớ là Lê - gô', 'Bài 23: Rồng rắn lên mây', 'Bài 24: Nặn đồ chơi']
            },
            {
              name: 'Chủ đề: Mái ấm gia đình',
              lessons: ['Bài 25: Sự tích hoa tỉ muội', 'Bài 26: Em mang về yêu thương', 'Bài 27: Mẹ', 'Bài 28: Trò chơi của bố', 'Bài 29: Cánh cửa nhớ bà', 'Bài 30: Thương ông', 'Bài 31: Ánh sáng của yêu thương', 'Bài 32: Chơi chong chóng']
            }
          ]
        },
        {
          semester: 'Học kỳ 2',
          themes: [
            {
              name: 'Chủ đề: Vẻ đẹp quanh em',
              lessons: ['Bài 1: Chuyện bốn mùa', 'Bài 2: Mùa nước nổi', 'Bài 3: Họa mi hót', 'Bài 4: Tết đến rồi', 'Bài 5: Giọt nước và biển lớn', 'Bài 6: Mùa vàng', 'Bài 7: Hạt thóc', 'Bài 8: Lũy tre']
            },
            {
              name: 'Chủ đề: Hành tinh xanh của em',
              lessons: ['Bài 9: Vè chim', 'Bài 10: Khủng long', 'Bài 11: Sự tích cây thì là', 'Bài 12: Bờ tre đón khách', 'Bài 13: Tiếng chổi tre', 'Bài 14: Cỏ non cười rồi', 'Bài 15: Những con sao biển', 'Bài 16: Tạm biệt cánh cam']
            },
            {
              name: 'Chủ đề: Giao tiếp và kết nối',
              lessons: ['Bài 17: Những cách chào độc đáo', 'Bài 18: Thư viện biết đi', 'Bài 19: Cảm ơn anh hà mã', 'Bài 20: Từ chú bồ câu đến internet']
            },
            {
              name: 'Chủ đề: Con người Việt Nam',
              lessons: ['Bài 21: Mai An Tiêm', 'Bài 22: Thư gửi bố ngoài đảo', 'Bài 23: Bóp nát quả cam', 'Bài 24: Chiếc rễ đa tròn']
            },
            {
              name: 'Chủ đề: Việt Nam quê hương em',
              lessons: ['Bài 25: Đất nước chúng mình', 'Bài 26: Trên các miền đất nước', 'Bài 27: Chuyện quả bầu', 'Bài 28: Khám phá đáy biển ở Trường Sa', 'Bài 29: Hồ Gươm', 'Bài 30: Cánh đồng quê em']
            }
          ]
        }
      ]
    },
    {
      key: '2',
      label: 'LỚP 3',
      children: [
        {
          semester: 'Học kỳ 1',
          themes: [
            {
              name: 'Chủ đề: Những trải nghiệm thú vị',
              lessons: ['Bài 1: Ngày gặp lại', 'Bài 2: Về thăm quê', 'Bài 3: Cánh rừng trong nắng', 'Bài 4: Lần đầu ra biển', 'Bài 5: Nhật ký tập bơi', 'Bài 6: Tập nấu ăn', 'Bài 7: Mùa hè lấp lánh', 'Bài 8: Tạm biệt mùa hè']
            },
            {
              name: 'Chủ đề: Cổng trường mở rộng',
              lessons: ['Bài 9: Đi học vui sao', 'Bài 10: Con đường tới trường', 'Bài 11: Lời giải toán đặc biệt', 'Bài 12: Tập làm văn', 'Bài 13: Bàn tay cô giáo', 'Bài 14: Cuộc họp của chữ viết', 'Bài 15: Thư viện', 'Bài 16: Ngày em vào đội']
            },
            {
              name: 'Chủ đề: Mái nhà yêu thương',
              lessons: ['Bài 17: Ngưỡng cửa', 'Bài 18: Món quà đặc biệt', 'Bài 19: Khi cả nhà bé tí', 'Bài 20: Trò chuyện cùng mẹ', 'Bài 21: Tia nắng bé nhỏ', 'Bài 22: Để cháu nắm tay ông', 'Bài 23: Tôi yêu em tôi', 'Bài 24: Bạn nhỏ trong nhà']
            },
            {
              name: 'Chủ đề: Mái ấm gia đình',
              lessons: ['Bài 25: Những bậc đá chạm mây', 'Bài 26: Đi tìm mặt trời', 'Bài 27: Những chiếc áo ấm', 'Bài 28: Con đường của bé', 'Bài 29: Ngôi nhà trong cỏ', 'Bài 30: Những ngọn hải đăng', 'Bài 31: Người làm đồ chơi', 'Bài 32: Cây bút thần']
            }
          ]
        },
        {
          semester: 'Học kỳ 2',
          themes: [
            {
              name: 'Chủ đề: Những sắc màu thiên nhiên',
              lessons: ['Bài 1: Bầu trời', 'Bài 2: Mưa', 'Bài 3: Cóc kiện trời', 'Bài 4: Những cái tên đáng yêu', 'Bài 5: Ngày hội rừng xanh', 'Bài 6: Cây gạo', 'Bài 7: Mặt trời xanh của tôi', 'Bài 8: Bầy voi rừng Trường Sơn']
            },
            {
              name: 'Chủ đề: Học từ cuộc sống',
              lessons: ['Bài 9: Lời kêu gọi toàn dân tập thể dục', 'Bài 10: Quả hồng của thỏ con', 'Bài 11: Chuyện bên cửa sổ', 'Bài 12: Tay trái và tay phải', 'Bài 13: Mèo đi câu cá', 'Bài 14: Học nghề', 'Bài 15: Ngày như thế nào là đẹp', 'Bài 16: A lô, tớ đây']
            },
            {
              name: 'Chủ đề: Đất nước ngàn năm',
              lessons: ['Bài 17: Đất nước là gì', 'Bài 18: Núi quê tôi', 'Bài 19: Sông Hương', 'Bài 20: Tiếng nước mình', 'Bài 21: Nhà rông', 'Bài 22: Sự tích ông Đùng, bà Đùng', 'Bài 23: Hai Bà Trưng', 'Bài 24: Cùng bác qua suối']
            }
          ]
        }
      ]
    },
    {
      key: '3',
      label: 'LỚP 4',
      children: [
        {
          semester: 'Học kỳ 1',
          themes: [
            {
              name: 'Chủ đề: Mỗi người một vẻ',
              lessons: ['Bài 1: Điều kì diệu', 'Bài 2: Thi nhạc', 'Bài 3: Anh em sinh đôi', 'Bài 4: Công chúa và người dẫn chuyện', 'Bài 5: Thằn lằn xanh và tắc kè', 'Bài 6: Nghệ sĩ trống', 'Bài 7: Những bức chân dung', 'Bài 8: Đò ngang']
            },
            {
              name: 'Chủ đề: Trải nghiệm và khám phá',
              lessons: ['Bài 9: Bầu trời', 'Bài 10: Tiếng nói của cỏ cây', 'Bài 11: Tập làm văn', 'Bài 12: Nhà phát minh 6 tuổi', 'Bài 13: Con vẹt xanh', 'Bài 14: Chân trời cuối', 'Bài 15: Gặt chữ trên non', 'Bài 16: ngày xa quê']
            },
            {
              name: 'Chủ đề: Niềm vui sáng tạo',
              lessons: ['Bài 17: Vẽ màu', 'Bài 18: Đồng cỏ nở', 'Bài 19: Thanh âm của núi', 'Bài 20: Bầu trời mùa thu', 'Bài 21: Làm thỏ con bằng giây', 'Bài 22: Bức tường có nhiều phép lạ', 'Bài 23: Bét-tô-ven và bản Xô-nát ánh trăng', 'Bài 24: Người tìm đường lên các vì sao']
            },
            {
              name: 'Chủ đề: Chắp cánh ước mơ',
              lessons: ['Bài 25: Bay cùng ước mơ', 'Bài 26: Con trai người làm vườn', 'Bài 27: Nếu em có một khu vườn', 'Bài 28: Bốn mùa ước mơ', 'Bài 29: Ở vương quốc Tương Lai', 'Bài 30: Cánh chim nhỏ', 'Bài 31: Nếu chúng mình có phép lạ', 'Bài 32: Anh']
            }
          ]
        },
        {
          semester: 'Học kỳ 2',
          themes: [
            {
              name: 'Chủ đề: Sống để yêu thương',
              lessons: ['Bài 1: Hải Thượng Lãn Ông', 'Bài 2: Vệt phấn trên mặt bàn', 'Bài 3: Ông bụt đã đến', 'Bài 4: Quả ngọt cuối mùa', 'Bài 5: Tờ báo tường của tôi', 'Bài 6: Tiếng ru', 'Bài 7: Con muốn làm một cái cây', 'Bài 8: Trên khóm tre đầu ngõ']
            },
            {
              name: 'Chủ đề: Uống nước nhớ nguồn',
              lessons: ['Bài 9: Sự tích con Rồng cháu', 'Bài 10: Cảm xúc Trường Sa', 'Bài 11: Sáng tháng Năm', 'Bài 12: Chàng trai làng Phù Ủng', 'Bài 13: Vườn của ông tôi', 'Bài 14: Trong lời mẹ', 'Bài 15: Người thầy đầu tiên của bố tôi', 'Bài 16: Ngựa biên phòng']
            },
            {
              name: 'Chủ đề: (Chủ đề trống)',
              lessons: ['Bài 17: Cây đa quê hương', 'Bài 18: Bước mùa xuân', 'Bài 19: Đi hội chùa', 'Bài 20: Chiều ngoại ô', 'Bài 21: Những cánh buồm', 'Bài 22: Cái cầu', 'Bài 23: Đường đi Sa Pa', 'Bài 24: Quê']
            },
            {
              name: 'Chủ đề: Vì một thế giới bình yên',
              lessons: ['Bài 25: Khu bảo tồn động vật hoang dã Ngô-rông-gô-rô', 'Bài 26: Ngôi nhà của yêu thương', 'Bài 27: Băng tan', 'Bài 28: Chuyến du lịch thú', 'Bài 29: Lễ hội ở Nhật Bản', 'Bài 30: Ngày hội']
            }
          ]
        }
      ]
    },
    {
      key: '4',
      label: 'LỚP 5',
      children: [
        {
          semester: 'Học kỳ 1',
          themes: [
            {
              name: 'Chủ đề: Thế giới tuổi',
              lessons: ['Bài 1: Thanh âm của gió', 'Bài 2: Cánh đồng hoa', 'Bài 3: Tuổi ngựa', 'Bài 4: Bến sông tuổi thơ', 'Bài 5: Tiếng t nảy mầm', 'Bài 6: Ngôi sao sân cỏ', 'Bài 7: Bộ sưu tập độc đáo', 'Bài 8: Hành tinh kì lạ']
            },
            {
              name: 'Chủ đề: Thiên nhiên kì',
              lessons: ['Bài 9: Trước cổng trời', 'Bài 10: Kì diệu rừng xanh', 'Bài 11: Hang Sơn Đoòng – những điều kì thú', 'Bài 12: Những hòn đảo trên Vịnh Hạ Long', 'Bài 13: Mầm non', 'Bài 14: Những ngọn núi nóng rẫy', 'Bài 15: Bài ca về mặt trời', 'Bài 16: Xin chào, Xa-ha-ra']
            },
            {
              name: 'Chủ đề: Trên con đường học tập',
              lessons: ['Bài 17: Thư gửi các học sinh', 'Bài 18: Tấm gương tự học', 'Bài 19: Trải nghiệm để sáng tạo', 'Bài 20: Khổ luyện thành tài', 'Bài 21: Thế giới trong trang sách', 'Bài 22: Từ những câu chuyện ấy thơ', 'Bài 23: Giới thiệu sách Dế Mèn phiêu lưu kí', 'Bài 24: Tinh thần học tập của nhà Phi-lít']
            },
            {
              name: 'Chủ đề: Nghệ thuật muôn',
              lessons: ['Bài 25: Tiếng đàn ba-la-lai-ca trên sông Đà', 'Bài 26: Trí tưởng tượng phong phú', 'Bài 27: Tranh làng Hồ', 'Bài 28: Tập hát quan họ', 'Bài 29: Phim hoạt hình Chú ốc sên bay', 'Bài 30: Nghệ thuật múa ba lê', 'Bài 31: Một ngôi chùa độc đáo', 'Bài 32: Sự tích chú Tễu']
            }
          ]
        },
        {
          semester: 'Học kỳ 2',
          themes: [
            {
              name: 'Chủ đề: Vẻ đẹp cuộc',
              lessons: ['Bài 1: Tiếng hát của người đá', 'Bài 2: Khúc hát ru những em bé lớn trên lưng mẹ', 'Bài 3: Hạt gạo làng ta', 'Bài 4: Hộp quà màu thiên thanh', 'Bài 5: Giỏ hoa tháng Năm', 'Bài 6: Thư của bố', 'Bài 7: Đoàn thuyền đánh cá', 'Bài 8: Khu rừng của Mát']
            },
            {
              name: 'Chủ đề: Hương sắc trăm',
              lessons: ['Bài 9: Hội thổi cơm thi ở Đồng Vân', 'Bài 10: Những búp chè trên cây cổ thụ', 'Bài 11: Hương cốm mùa thu', 'Bài 12: Vũ điệu trên nền thổ cẩm', 'Bài 13: Đàn t`rưng  tiếng ca đại ngàn', 'Bài 14: Đường quê Đồng Tháp Mười', 'Bài 15: Xuồng ba lá quê tôi', 'Bài 16: Về thăm Đất Mũi']
            },
            {
              name: 'Chủ đề: Tiếp bước ông',
              lessons: ['Bài 17: Nghìn năm văn hiến', 'Bài 18: Người thầy của muôn đời', 'Bài 19: Danh y Tuệ Tĩnh', 'Bài 20: Cụ Đồ Chiểu', 'Bài 21: Anh hùng Lao động Trần Đại Nghĩa', 'Bài 22: Bộ đội về làng', 'Bài 23: Về ngôi nhà đang xây', 'Bài 24: Việt Nam quê hương ta']
            },
            {
              name: 'Chủ đề: Thế giới của chúng',
              lessons: ['Bài 25: Bài ca Trái Đất', 'Bài 26: Những con hạc giấy', 'Bài 27: Một người hùng thầm lặng', 'Bài 28: Giờ Trái Đất', 'Bài 29: Điện thoại di động', 'Bài 30: Thành phố thông minh Mát-xđa']
            }
          ]
        }
      ]
    }
  ];

  // Component render từng lớp
  const renderClassPanels = () => {
    return curriculumData.map(classItem => (
      <Panel 
        header={<span className="text-xl md:text-2xl font-extrabold text-[#3b662b] font-serif">{classItem.label}</span>} 
        key={classItem.key} 
        className="bg-white rounded-xl md:rounded-2xl mb-3 md:mb-4 border-none shadow-inner"
      >
        <Collapse accordion ghost>
          {classItem.children.map((semesterItem, index) => (
            <Panel 
              header={<span className="text-lg md:text-xl font-bold text-[#3b662b]">{semesterItem.semester}</span>} 
              key={index}
            >
              {semesterItem.themes.map((theme, tIndex) => (
                <div key={tIndex} className="mb-4 md:mb-6">
                  {/* Theme Name: Tự động xuống dòng tốt trên mobile */}
                  <Text strong className="text-base md:text-lg text-[#EB7470] block mb-2 leading-snug">
                    {theme.name}
                  </Text>
                  
                  {/* List Lessons: Giảm padding-left trên mobile để tiết kiệm không gian */}
                  <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2">
                    {theme.lessons.map((lesson, lIndex) => (
                      <li key={lIndex} className="ml-1">
                        <Text className="text-sm md:text-base text-gray-700 hover:text-[#3b662b] cursor-pointer block py-1">
                          {lesson}
                        </Text>
                      </li>
                    ))}
                  </ul>
                  {tIndex < semesterItem.themes.length - 1 && <Divider className="my-3" />}
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </Panel>
    ));
  };

  return (
    // Đồng bộ min-h với MainLayout và Header (giả định header cao ~80px)
    <div className="w-full min-h-screen bg-[#FFFDEF] flex flex-col items-center pt-2 pb-12 md:pb-20 relative font-sans">
      <div className="w-full max-w-6xl px-3 sm:px-8 z-10 flex flex-col items-center">
        <Banner />

        {/* Khung màu xanh: Điều chỉnh p-4 cho mobile để tránh lãng phí diện tích */}
        <div className="w-full max-w-5xl bg-[#A7DE93] p-4 md:p-10 rounded-2xl md:rounded-[2rem] shadow-sm mt-4">
          <Title 
            level={2} 
            className="text-center !text-white font-serif mb-6 md:mb-8 !text-2xl md:!text-4xl"
          >
            Chương trình học
          </Title>
          
          <Collapse 
            accordion 
            expandIconPosition="right"
            className="custom-curriculum-collapse"
          >
            {renderClassPanels()}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;