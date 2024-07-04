import HeroImg from '../../../assets/images/hero.png';
import './hero.scss';

const Hero = () => {
  return (
    <section
      className="max-w-screen-xl mx-auto flex justify-between flex-col-reverse md:flex-row sm:my-20 my-8 pr-8"
      id="home"
    >
      <div className="flex flex-col mx-8 justify-center">
        <p className="text-4xl sm:text-6xl text-[#3FBCF1] font-semibold">Visualize</p>
        <p className="text-4xl sm:text-6xl">Image Processing</p>
        <p className="text-xl sm:text-2xl font-light mt-4">
          Belajar pengolahan citra digital menggunakan website interaktif.
        </p>
        <div className="flex mt-4 gap-4 items-center">
          <a
            href="/brightness"
            className="bg-[#3FBCF1] hover:bg-[#37a5d1] px-1 py-1 sm:px-2 sm:py-2 border-black border-2 rounded text-base sm:text-xl"
          >
            Mengubah Brightness
          </a>
          <a
            href="/grayscale"
            className="bg-gray-300 hover:bg-gray-400 px-1 py-1 sm:px-2 sm:py-2 border-black border-2 rounded text-base sm:text-xl"
          >
            RGB ke Grayscale
          </a>
        </div>
      </div>
      <img
        src={HeroImg}
        alt="Hero Image"
        className="scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[1]"
      />
    </section>
  );
};

export default Hero;
