import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div className="text-center">
      <Banner />
      <div className="mt-8 w-full h-64 bg-white/50 rounded-xl flex items-center justify-center border-2 border-brand-green-light">
         <span className="text-brand-green/50 font-bold italic">Hình minh họa học sinh vui vẻ...</span>
      </div>
    </div>
  );
};

export default Home;