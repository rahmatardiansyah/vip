import { useState, useEffect, useRef } from 'react';
import data from '../../data/data.json';
import Image from '../../components/Image';
import pikachu from '../../assets/images/pikachu-grayscale.png';
import panda from '../../assets/images/panda-grayscale.png';
import doraemon from '../../assets/images/doraemon-grayscale.png';
import { BlockMath } from 'react-katex';
import { Case, Formula, ImageCorrelation, Operation } from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';

const index = () => {
  const correlationFormula = `h(x,y) = f(x,y) * g(x,y) = \\sum_{k=1}^M \\sum_{l=1}^N f(k,l) \\cdot g(x-k, y-l)`;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaFilterValue, setTextareaFilterValue] = useState('');
  const [filterData, setFilterData] = useState([
    [1, 0, 1],
    [0, 2, 0],
    [-1, 0, -2]
  ]);
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [errorFilter, setErrorFilter] = useState(null);

  const images = [
    { src: pikachu, name: 'pikachu-7' },
    { src: panda, name: 'panda-7' },
    { src: doraemon, name: 'doraemon-7' }
  ];

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData(selectedData.imageData);

    const currentSelectedData = selectedData.imageData.map((row) => [...row]);
    for (let i = 1; i < currentSelectedData.length - 1; i++) {
      for (let j = 1; j < currentSelectedData[i].length - 1; j++) {
        currentSelectedData[i][j] = null;
      }
    }
    setResultData(currentSelectedData);

    setTextareaValue(JSON.stringify(selectedData.imageData));
    setTextareaFilterValue(JSON.stringify(filterData));
    setError(null);
    setErrorFilter(null);
    stopAnimation();
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextareaValue(value);
    try {
      const parsedData = JSON.parse(e.target.value);

      const isValid = parsedData.every(
        (array) =>
          array.length === 7 &&
          array.every((value) => typeof value === 'number' && value >= 0 && value <= 255)
      );

      if (isValid) {
        setSelectedData(parsedData);
        setError(null);
      } else {
        setError('Angka harus >= 0 dan <= 255');
      }
    } catch (error) {
      console.error('Invalid JSON format');
      setError('Format tidak sesuai');
    }
  };

  const handleTextareaFilterChange = (e) => {
    const value = e.target.value;
    setTextareaFilterValue(value);
    try {
      const parsedDataFilter = JSON.parse(e.target.value);

      const isValid = parsedDataFilter.every(
        (array) => array.length === 3 && array.every((value) => typeof value === 'number')
      );

      if (isValid) {
        setFilterData(parsedDataFilter);
        setErrorFilter(null);
      }
    } catch (error) {
      setErrorFilter('Format tidak sesuai');
      console.error('Invalid JSON format');
    }
  };

  const handleConvolution = () => {
    setFilterData(filterData.reverse().map((subArr) => subArr.reverse()));
    setTextareaFilterValue(JSON.stringify(filterData));
  };

  // Animation
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentGrayscale, setCurrentGrayscale] = useState(0);
  const [currentCorrelationValue, setCurrentCorrelationValue] = useState(null);
  const [animationStage, setAnimationStage] = useState(0);
  const intervalRef = useRef(null);

  const playAnimation = () => {
    if (!isAnimating) {
      if (row === 0 && col === 0) {
        setResultData(Array(7).fill(Array(7).fill(null)));
      }
      setIsAnimating(true);
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    clearInterval(intervalRef.current);
    setRow(1);
    setCol(1);
    setAnimationStage(0);
    setCurrentGrayscale([0, 0, 0]);
    setCurrentCorrelationValue(null);
    if (!(row === 0 && col === 0)) {
      if (selectedImage) {
        const selectedData = data.find((item) => item.filename === selectedImage);
        setSelectedData(selectedData.imageData);
        const currentSelectedData = selectedData.imageData.map((row) => [...row]);
        for (let i = 1; i < currentSelectedData.length - 1; i++) {
          for (let j = 1; j < currentSelectedData[i].length - 1; j++) {
            currentSelectedData[i][j] = null;
          }
        }
        setResultData(currentSelectedData);
      }
    }
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
    clearInterval(intervalRef.current);
  };

  const playStep = () => {
    setAnimationStage((prevStage) => {
      if (prevStage === 2) {
        setCol((prevCol) => {
          if (prevCol === 5) {
            setRow((prevRow) => {
              if (prevRow === 5) {
                stopAnimation();
                return 0;
              } else {
                return prevRow + 1;
              }
            });
            return 1;
          } else {
            return prevCol + 1;
          }
        });
        return 0;
      } else {
        return prevStage + 1;
      }
    });
  };

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = setInterval(() => {
        playStep();
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  useEffect(() => {
    if (selectedData) {
      let correlationValue =
        selectedData[row - 1][col - 1] * filterData[0][0] +
        selectedData[row - 1][col] * filterData[0][1] +
        selectedData[row - 1][col + 1] * filterData[0][2] +
        selectedData[row][col - 1] * filterData[1][0] +
        selectedData[row][col] * filterData[1][1] +
        selectedData[row][col + 1] * filterData[1][2] +
        selectedData[row + 1][col - 1] * filterData[2][0] +
        selectedData[row + 1][col] * filterData[2][1] +
        selectedData[row + 1][col + 1] * filterData[2][2];

      if (correlationValue > 255) correlationValue = 255;
      if (correlationValue < 0) correlationValue = 0;

      // setCurrentGrayscale(grayscale);
      setCurrentCorrelationValue(correlationValue);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? correlationValue : colItem
            )
          );
          return newResultData;
        });

        setSelectedData((prevSelectedData) => {
          const newSelectedData = prevSelectedData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? correlationValue : colItem
            )
          );
          return newSelectedData;
        });
      }
    }
  }, [row, col, animationStage, filterData]);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <Operation title="Operasi Korelasi">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis placeat fuga vero
          incidunt excepturi cupiditate! Dolore iusto odio voluptatum debitis fugit doloremque saepe
          ad ducimus provident laborum. Temporibus, aspernatur!
        </Operation>
        <Formula formula={correlationFormula} />
        <Case>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsum est aperiam
          consequatur sunt modi neque quaerat. Voluptatem distinctio, maiores minus amet soluta, rem
          vitae laborum provident doloribus aliquam eos?
        </Case>

        <div className="my-10 px-4">
          <h2 className="text-xl font-semibold">Pilih Gambar</h2>
          <div className="flex justify-around flex-wrap gap-4 mt-8">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                onClick={() => handleImageClick(image.name)}
                isSelected={image.name === selectedImage}
              />
            ))}
          </div>
          {selectedImage && (
            <div className="my-8">
              <div className="mt-2">
                <h2 className="text-xl font-semibold">Filter g(x,y)</h2>
                <textarea
                  value={textareaFilterValue}
                  onChange={handleTextareaFilterChange}
                  cols={40}
                  rows={5}
                  className={`border-2 border-black text-xl w-full sm:w-auto ${isAnimating && 'cursor-not-allowed'} mt-4`}
                  disabled={isAnimating}
                />
                {errorFilter && (
                  <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
                    <h3>{errorFilter}</h3>
                  </div>
                )}

                <table className="border border-black text-base mt-4">
                  <tbody>
                    {filterData.map((rowItem, rowIndex) => (
                      <tr key={rowIndex}>
                        {rowItem.map((value, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border-2 border-black size-20 text-center`}
                          >
                            <p>{value}</p>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <input
                    type="checkbox"
                    id="convolution"
                    className="my-4"
                    onChange={handleConvolution}
                    disabled={isAnimating}
                  />
                  <label htmlFor="convolution" className="ml-2">
                    Convolution
                  </label>
                </div>
              </div>
              {selectedData && (
                <div>
                  <h3 className="text-base font-bold my-2">Atau ubah nilai pada field dibawah</h3>
                  <textarea
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    cols={40}
                    rows={5}
                    className={`mt-2 border-2 border-black text-xl w-full sm:w-auto ${isAnimating && 'cursor-not-allowed'}`}
                    disabled={isAnimating}
                  />
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
                  <h3>{error}</h3>
                </div>
              )}
            </div>
          )}
        </div>

        {selectedImage && (
          <div className="my-10 px-4">
            <div className="flex flex-wrap gap-8">
              <div>
                <h2 className="text-xl font-semibold">Table Citra Grayscale</h2>
                <table className="border border-black text-base mt-4">
                  <tbody>
                    {selectedData.map((rowItem, rowIndex) => (
                      <tr key={rowIndex}>
                        {rowItem.map((color, colIndex) => {
                          const isCenterCell = rowIndex === row && colIndex === col;
                          const isHighlightCell =
                            (rowIndex === row - 1 || rowIndex === row || rowIndex === row + 1) &&
                            (colIndex === col - 1 || colIndex === col || colIndex === col + 1);
                          return (
                            <td
                              key={colIndex}
                              className={`border-2 border-black size-20 text-center ${isCenterCell
                                  ? 'bg-yellow-200'
                                  : isHighlightCell
                                    ? 'bg-red-200'
                                    : 'bg-white'
                                }`}
                            >
                              <p>{color}</p>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Table Citra Hasil</h2>
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
              <div>
                <h2 className="text-xl font-semibold">Proses</h2>
                <div className="flex items-center gap-4">
                  {animationStage >= 0 && (
                    <div>
                      {!(row - 1 < 0) && (
                        <BlockMath
                          math={`(${selectedData[row - 1][col - 1]}*${filterData[0][0]})+(${selectedData[row - 1][col]}*${filterData[0][1]})+(${selectedData[row - 1][col + 1]}*${filterData[0][2]})+(${selectedData[row][col - 1]}*${filterData[1][0]})+(${selectedData[row][col]}*${filterData[1][1]})+(${selectedData[row][col + 1]}*${filterData[1][2]})+(${selectedData[row + 1][col - 1]}*${filterData[2][0]})+(${selectedData[row + 1][col]}*${filterData[2][1]})+(${selectedData[row + 1][col + 1]}*${filterData[2][2]}) = `}
                        />
                      )}
                    </div>
                  )}
                  {animationStage >= 1 && <BlockMath math={`${currentCorrelationValue}`} />}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold my-8">Animasi</h3>
              <div className="flex gap-4 items-center">
                {isAnimating ? (
                  <IoMdPause
                    size={30}
                    onClick={pauseAnimation}
                    className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                  />
                ) : (
                  <IoMdPlay
                    size={30}
                    onClick={playAnimation}
                    className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                  />
                )}
                <TbReload
                  size={30}
                  onClick={stopAnimation}
                  className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                />
                <HiMiniPlayPause
                  size={30}
                  onClick={playStep}
                  className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                />
              </div>
            </div>
            <div className="my-10">
              <ImageCorrelation filter={filterData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
