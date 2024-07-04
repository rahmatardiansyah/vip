import { FaFigma } from 'react-icons/fa';
import { CiLinkedin } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';
import Logo from '../../../assets/icons/Logo';

const CustomFooter = () => {
  return (
    <footer className="h-52 bg-[#C9EDFB] px-10">
      <hr className="border-1 border-black" />
      <div className="flex justify-center sm:justify-between max-w-screen-xl mx-auto my-20 flex-wrap sm:gap-0 gap-4">
        <div className="ml-4 sm:text-4xl text-xl">
          <a href="/" className="flex gap-2 sm:gap-4 items-center">
            <Logo />
            <span>VIP</span>
          </a>
        </div>
        <div>
          <p className="flex gap-2 items-center text-xl">
            Follow us on social media |{' '}
            <a
              href="http://github.com/rahmatardiansyah/vip"
              className="flex gap-2 items-center text-xl"
            >
              <FaFigma /> <CiLinkedin /> <FaInstagram /> <CiYoutube />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
