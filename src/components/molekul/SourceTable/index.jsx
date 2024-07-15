const index = ({ title, information, selectedData, row, col }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="w-[60%]">{information}</p>
      <table className="border border-black text-base mt-4">
        <tbody>
          {selectedData.map((rowItem, rowIndex) => (
            <tr key={rowIndex}>
              {rowItem.map((color, colIndex) => (
                <td
                  key={colIndex}
                  className={`border-2 border-black size-20 text-center ${rowIndex === row && colIndex === col ? 'bg-yellow-200' : 'bg-white'}`}
                >
                  <p>R: {color[0]}</p>
                  <p>G: {color[1]}</p>
                  <p>B: {color[2]}</p>
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
