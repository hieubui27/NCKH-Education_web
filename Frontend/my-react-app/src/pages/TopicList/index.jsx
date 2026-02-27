import bannerImage from '../../assets/Group 1.png';
const TopicList = () => {
  
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl">
          {/* Banner */}
          <div className="w-full max-w-5xl mb-12 mt-4 px-4 sm:px-8">
            <img
              src={bannerImage}
              alt="Banner Cùng nhau tập đọc"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
    </div>
  );
};

export default TopicList;
