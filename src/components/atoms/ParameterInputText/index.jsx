import { CiBrightnessDown } from 'react-icons/ci';

const ParameterInputText = ({
  information,
  handleParameter,
  isAnimating,
  rangeBrightness,
  rangeValue,
  errorParameterInput
}) => {
  return (
    <div>
      <p className="text-xl my-4">{information}</p>
      <div className="flex gap-4 items-center mt-8">
        <CiBrightnessDown size={30} />
        <input
          type="number"
          onChange={handleParameter}
          id="brightness"
          disabled={isAnimating}
          value={rangeValue}
          className={`border-2 border-black p-2 rounded w-32 ${isAnimating && 'cursor-not-allowed'}`}
        />
      </div>
      {errorParameterInput && (
        <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
          <p>{errorParameterInput}</p>
        </div>
      )}
    </div>
  );
};

export default ParameterInputText;
