import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';

const About = () => {
  return (
    <section className="bg-[#CAEDFB] w-full mx-auto " id="about">
      <div className="mx-8 flex justify-center items-center flex-col lg:flex-row">
        <div className="my-20">
          <p className="text-2xl font-bold">Do You need more information?</p>
          <p className="text-xl mt-4 w-1/2">
            Connect with us today. Our dedicated experts are here to provide you with exceptional
            support and prompt responses.
          </p>
        </div>
        <div className="">
          <p className="flex items-center gap-4">
            <MdEmail size={30} />
            rahmat21@student.uir.ac.id
          </p>
          <p className="flex items-center gap-4 mt-4">
            <FaPhone size={30} />
            (+62) 81234567890
          </p>
          <button className="mt-8 px-4 py-2 bg-[#F5BB33] hover:bg-[#d6a32c] rounded shadow border-black">
            Connect to Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
