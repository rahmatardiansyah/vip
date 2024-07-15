const index = ({
  information,
  selectedData,
  textareaValue,
  handleTextareaChange,
  isAnimating,
  error
}) => {
  return (
    <div>
      <p className="text-xl my-4 text-justify">{information}</p>
      {selectedData && (
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          cols={40}
          rows={5}
          className={`border-2 border-black text-xl w-full sm:w-auto ${isAnimating && 'cursor-not-allowed'}`}
          disabled={isAnimating}
        />
      )}
      {error && (
        <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};

export default index;
