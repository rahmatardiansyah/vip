import pattern from '../../../assets/images/pattern.svg';
import { CiBrightnessDown } from 'react-icons/ci';
import { VscColorMode } from 'react-icons/vsc';
import { MdOutlineInvertColors } from 'react-icons/md';
import { MdOutlineDataThresholding } from 'react-icons/md';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BsReverseLayoutSidebarInsetReverse } from 'react-icons/bs';
import { AiOutlineCheckSquare } from 'react-icons/ai';
const index = () => {
  return (
    <section
      className="max-w-screen-xl mx-auto flex justify-center flex-col items-center bg-no-repeat sm:bg-contain my-40"
      style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="text-center">
        <p className="text-4xl">Explore Another Topics</p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center my-16">
        <li>
          <a href="/grayscale">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <VscColorMode size={80} />
              <p className="mt-2">Grayscale</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/negation">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <MdOutlineInvertColors size={80} />
              <p className="mt-2">Negation</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/brightness">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <CiBrightnessDown size={80} />
              <p className="mt-2">Brightness</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/threshold">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <MdOutlineDataThresholding size={80} />
              <p className="mt-2">Threshold</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/blending">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <AiOutlinePlusSquare size={80} />
              <p className="mt-2">Blending</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/substraction">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <AiOutlineMinusSquare size={80} />
              <p className="mt-2">Substraction</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/convolution">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <BsReverseLayoutSidebarInsetReverse size={80} />
              <p className="mt-2">Convolution</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/robert">
            <div className="bg-white hover:bg-gray-100 border rounded shadow p-4 size-40 cursor-pointer flex flex-col items-center">
              <AiOutlineCheckSquare size={80} />
              <p className="mt-2">Robert</p>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default index;
