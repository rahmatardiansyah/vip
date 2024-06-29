import { BlockMath } from 'react-katex';

const index = ({ r, g, b, result }) => {
  const grayscaleProses = `\\frac{(${r}+${g}+${b})}{3} = ${result}`;
  return (
    <div className="text-[1.3rem]">
      <BlockMath math={grayscaleProses} />
    </div>
  );
};

export default index;
