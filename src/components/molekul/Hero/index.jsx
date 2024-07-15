import HeroImg from '../../../assets/images/result.png';
import './hero.scss';

const Hero = () => {
  return (
    <section
      className="max-w-screen-xl mx-auto flex justify-between flex-col-reverse md:flex-row my-8 pr-8"
      id="home"
    >
      <div className="flex flex-col mx-8 justify-center">
        <p className="text-4xl sm:text-6xl text-[#3FBCF1] font-semibold">Visualize</p>
        <p className="text-4xl sm:text-6xl">Image Processing</p>
        <p className="text-xl sm:text-2xl font-light mt-4">
          Belajar pengolahan citra digital menggunakan website interaktif.
        </p>
      </div>
      <img src={HeroImg} alt="Hero Image" className="p-4 transform -scale-x-100" width={500} />
    </section>
  );
};

export default Hero;
