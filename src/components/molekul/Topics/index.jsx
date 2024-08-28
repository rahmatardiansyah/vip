import pattern from '../../../assets/images/pattern.svg';
import { CiBrightnessDown } from 'react-icons/ci';
import { VscColorMode } from 'react-icons/vsc';
import { MdOutlineInvertColors } from 'react-icons/md';
import { MdOutlineDataThresholding } from 'react-icons/md';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
const index = () => {
  return (
    <section
      id="topics"
      className="max-w-screen-xl mx-auto flex justify-center flex-col items-center bg-no-repeat sm:bg-contain mt-40"
    >
      <div className="text-center">
        <p className="text-xl sm:text-2xl md:text-4xl">Jelajahi Topik</p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center my-16">
        <li>
          <a href="/grayscale">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <VscColorMode />
              </span>
              <p className="mt-2">Grayscale</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/invert">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <MdOutlineInvertColors />
              </span>
              <p className="mt-2">Invert</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/brightness">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <CiBrightnessDown />
              </span>
              <p className="mt-2">Brightness</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/threshold">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <MdOutlineDataThresholding />
              </span>
              <p className="mt-2">Threshold</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/blending">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <AiOutlinePlusSquare />
              </span>
              <p className="mt-2">Blending</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/substraction">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-25 sm:size-30 md:size-40 cursor-pointer flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-7xl">
                <AiOutlineMinusSquare />
              </span>
              <p className="mt-2">Substraction</p>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default index;
