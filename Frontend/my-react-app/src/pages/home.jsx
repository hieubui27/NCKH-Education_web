const Home = () => {
  return (
    <div className="text-center">
      <div className="bg-brand-green-light border-4 border-dashed border-brand-green p-10 rounded-3xl max-w-3xl">
        <h1 className="text-4xl font-black text-brand-green mb-4">
          CÙNG NHAU TẬP ĐỌC
        </h1>
        <p className="text-xl text-brand-black italic">
          "Học tập thật là vui!"
        </p>
      </div>
      
      {/* Phần placeholder cho hình minh họa lớn trong Frame 1 */}
      <div className="mt-8 w-full h-64 bg-white/50 rounded-xl flex items-center justify-center border-2 border-brand-green-light">
         <span className="text-brand-green/50 font-bold italic">Hình minh họa học sinh vui vẻ...</span>
      </div>
    </div>
  );
};

export default Home;