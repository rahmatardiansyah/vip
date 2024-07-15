const index = ({ heading, information, resultData, row, col, animationStage }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{heading}</h2>
      <p>{information}</p>
      <table className="border border-black text-base mt-4">
        <tbody>
          {resultData.map((rowItem, rowIndex) => (
            <tr key={rowIndex}>
              {rowItem.map((color, colIndex) => (
                <td
                  key={colIndex}
                  className={`border-2 border-black size-20 text-center ${rowIndex === row && colIndex === col && animationStage === 2
                      ? 'bg-green-200'
                      : 'bg-white'
                    }`}
                >
                  <p>{color !== null ? color : ''}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
