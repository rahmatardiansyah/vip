import { FaLongArrowAltRight } from 'react-icons/fa';

const index = ({ name, url }) => {
  return (
    <a
      href={url}
      className="flex gap-2 items-center text-base px-2 py-4 border-black border-2 cursor-pointer shadow rounded bg-[#F5BC33] hover:bg-[#d6a32c]"
    >
      <p>{name}</p>
      <FaLongArrowAltRight size={15} />
    </a>
  );
};

export default index;
