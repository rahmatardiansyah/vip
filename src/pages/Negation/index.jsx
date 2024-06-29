import { useState, useEffect, useRef } from 'react';

const TableAnimation = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [tableIndex, setTableIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const tablesCount = 3;

  const playAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    clearInterval(intervalRef.current);
    setRow(0);
    setCol(0);
    setTableIndex(0);
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
    clearInterval(intervalRef.current);
  };

  const playStep = () => {
    setCol((prevCol) => {
      if (prevCol === 4) {
        setRow((prevRow) => (prevRow === 4 ? 0 : prevRow + 1));
        setTableIndex((prevTableIndex) => (prevTableIndex + 1) % tablesCount);
        return 0;
      } else {
        setTableIndex((prevTableIndex) => (prevTableIndex + 1) % tablesCount);
        return prevCol + 1;
      }
    });
  };

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = setInterval(() => {
        setCol((prevCol) => {
          if (prevCol === 4) {
            setRow((prevRow) => (prevRow === 4 ? 0 : prevRow + 1));
            setTableIndex((prevTableIndex) => (prevTableIndex + 1) % tablesCount);
            return 0;
          } else {
            setTableIndex((prevTableIndex) => (prevTableIndex + 1) % tablesCount);
            return prevCol + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  const renderTable = (tableIdx) => (
    <table key={tableIdx}>
      <tbody>
        {[...Array(5)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => (
              <td
                key={colIndex}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor:
                    tableIdx === tableIndex && rowIndex === row && colIndex === col
                      ? 'yellow'
                      : 'white',
                  border: '1px solid black'
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="tables">
        {[...Array(tablesCount)].map((_, tableIdx) => renderTable(tableIdx))}
      </div>
      <div>
        <button onClick={playAnimation}>Play</button>
        <button onClick={pauseAnimation}>Pause</button>
        <button onClick={stopAnimation}>Stop</button>
        <button onClick={playStep}>Play Step</button>
      </div>
    </div>
  );
};

export default TableAnimation;
