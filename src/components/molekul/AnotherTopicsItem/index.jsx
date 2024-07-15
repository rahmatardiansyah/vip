import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const index = ({ name, url, direction }) => {
  return (
    <div>
      {direction === 'right' ? (
        <div>
          <a
            href={url}
            className="flex gap-2 items-center text-base px-2 py-4 border-black border-2 cursor-pointer shadow rounded bg-[#F5BC33] hover:bg-[#d6a32c]"
          >
            <p>{name}</p>
            <FaLongArrowAltRight size={15} />
          </a>
        </div>
      ) : (
        <div>
          <a
            href={url}
            className="flex gap-2 items-center text-base px-2 py-4 border-black border-2 cursor-pointer shadow rounded bg-[#F5BC33] hover:bg-[#d6a32c]"
          >
            <FaLongArrowAltLeft size={15} />
            <p>{name}</p>
          </a>
        </div>
      )}
    </div>
  );
};

export default index;
