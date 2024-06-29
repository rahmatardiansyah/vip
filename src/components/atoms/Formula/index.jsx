import { BlockMath } from 'react-katex';

const index = ({ formula, children }) => {
  return (
    <div className="my-20 px-4">
      <h2 className="text-xl font-semibold">Rumus</h2>
      <div className="md:text-[1.6rem] sm:text-[1.5rem]">
        <BlockMath math={formula} />
      </div>
      {children}
    </div>
  );
};

export default index;
