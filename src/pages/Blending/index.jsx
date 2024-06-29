import { useState, useEffect, useRef } from 'react';
import data from '../../data/data.json';
import Image from '../../components/Image';
import amoeba1 from '../../assets/images/amoeba.png';
import amoeba2 from '../../assets/images/amoeba2.png';
import amoeba3 from '../../assets/images/amoeba3.png';
import amoeba4 from '../../assets/images/amoeba4.png';
import amoeba5 from '../../assets/images/amoeba5.png';
import amoeba6 from '../../assets/images/amoeba6.png';
import { BlockMath } from 'react-katex';
import { Case, Formula, ImageBlending, Operation } from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';

const index = () => {
  const blendingFormula = `
(x,y) = w_1 A_1(x,y) + w_2 A_2(x,y) + w_3 A_3(x,y) + \\ldots + w_n A_n(x,y)
`;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedData2, setSelectedData2] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [wA, setWA] = useState(0.6);

  const images = [
    { src: amoeba1, name: 'amoeba1' },
    { src: amoeba2, name: 'amoeba2' },
    { src: amoeba3, name: 'amoeba3' }
  ];

  const images2 = [
    { src: amoeba4, name: 'amoeba4' },
    { src: amoeba5, name: 'amoeba5' },
    { src: amoeba6, name: 'amoeba6' }
  ];

  const handleInputWA = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setWA(value);
    }
  };

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData(selectedData.imageData);
    setResultData(Array(5).fill(Array(5).fill(null)));
    setTextareaValue(JSON.stringify(selectedData.imageData));
    setError(null);
    stopAnimation();
  };

  const handleImageClick2 = (imageName) => {
    setSelectedImage2(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData2(selectedData.imageData);
    setResultData(Array(5).fill(Array(5).fill(null)));
    setTextareaValue2(JSON.stringify(selectedData.imageData));
    setError(null);
    stopAnimation();
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextareaValue(value);
    try {
      const parsedData = JSON.parse(e.target.value);

      const isValid = parsedData.every(
        (array) =>
          array.length === 5 &&
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
      setError('Format Tidak sesuai');
    }
  };

  const handleTextareaChange2 = (e) => {
    const value = e.target.value;
    setTextareaValue2(value);
    try {
      const parsedData = JSON.parse(e.target.value);

      const isValid = parsedData.every(
        (array) =>
          array.length === 5 &&
          array.every((value) => typeof value === 'number' && value >= 0 && value <= 255)
      );

      if (isValid) {
        setSelectedData2(parsedData);
        setError(null);
      } else {
        setError('Angka harus >= 0 dan <= 255');
      }
    } catch (error) {
      console.error('Invalid JSON format');
      setError('Format Tidak sesuai');
    }
  };

  // Animation
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentGrayscale, setCurrentGrayscale] = useState(0);
  const [currentGrayscale2, setCurrentGrayscale2] = useState(0);
  const [blendingValue, setBlendingValue] = useState(null);
  const [animationStage, setAnimationStage] = useState(0);
  const intervalRef = useRef(null);

  const playAnimation = () => {
    if (!isAnimating) {
      if (row === 0 && col === 0) {
        setResultData(Array(5).fill(Array(5).fill(null)));
      }
      setIsAnimating(true);
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    clearInterval(intervalRef.current);
    setRow(0);
    setCol(0);
    setAnimationStage(0);
    setCurrentGrayscale([0, 0, 0]);
    setBlendingValue(null);
    if (!(row === 0 && col === 0)) {
      setResultData(Array(5).fill(Array(5).fill(null)));
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
          if (prevCol === 4) {
            setRow((prevRow) => {
              if (prevRow === 4) {
                stopAnimation();
                return 0;
              } else {
                return prevRow + 1;
              }
            });
            return 0;
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
      }, 300);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  useEffect(() => {
    if (selectedData && selectedData2) {
      const grayscale = selectedData[row][col];
      const grayscale2 = selectedData2[row][col];
      const wB = 1 - wA;
      const blending = Math.round(grayscale * wA + grayscale2 * wB);
      setCurrentGrayscale(grayscale);
      setCurrentGrayscale2(grayscale2);
      setBlendingValue(blending);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? blending : colItem
            )
          );
          return newResultData;
        });
      }
    }
  }, [row, col, selectedData, selectedData2, animationStage]);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <Operation title="Operasi Penjumlahan Citra">Penjumlahan citra???</Operation>
        <Formula formula={blendingFormula} />
        <Case>Dilakukan dengan cara menjumlahkan sebuah citra dengan citra yang lain.</Case>

        <div className="my-10 px-4">
          <h2 className="text-xl font-semibold">Pilih Gambar 1</h2>
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
          <h2 className="text-xl font-semibold">Pilih Gambar 2</h2>
          <div className="flex justify-around flex-wrap gap-4 mt-8">
            {images2.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                onClick={() => handleImageClick2(image.name)}
                isSelected={image.name === selectedImage2}
              />
            ))}
          </div>
          <h3 className="text-base font-bold my-8">Atau ubah nilai pada field dibawah</h3>
          {selectedImage && (
            <div>
              {selectedData && (
                <textarea
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  cols={40}
                  rows={5}
                  className="border-2 border-black text-xl w-full sm:w-auto"
                />
              )}
              {error && (
                <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
                  <h3>{error}</h3>
                </div>
              )}
            </div>
          )}
          {selectedImage2 && (
            <div>
              {selectedData2 && (
                <textarea
                  value={textareaValue2}
                  onChange={handleTextareaChange2}
                  cols={40}
                  rows={5}
                  className="border-2 border-black text-xl w-full sm:w-auto"
                  disabled={isAnimating}
                />
              )}
              {error && (
                <div className="p-4 bg-red-400 mt-4 font-semibold w-72 rounded border shadow border-black">
                  <h3>{error}</h3>
                </div>
              )}
              <div className="flex gap-4 items-center mt-8">
                <input
                  type="number"
                  min={0.1}
                  max={0.9}
                  step={0.1}
                  value={wA}
                  onChange={handleInputWA}
                  id="WA"
                  className="border-2 border-black rounded w-20 h-10 p-2"
                  disabled={isAnimating}
                />
                <label htmlFor="WA">wA</label>
              </div>
            </div>
          )}
        </div>

        {selectedImage && selectedImage2 && (
          <div className="my-10 px-4">
            <div className="flex flex-wrap gap-8">
              <div>
                <h2 className="text-xl font-semibold">Table Citra Grayscale 1</h2>
                <table className="border border-black text-base mt-4">
                  <tbody>
                    {selectedData.map((rowItem, rowIndex) => (
                      <tr key={rowIndex}>
                        {rowItem.map((color, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border-2 border-black size-20 text-center ${rowIndex === row && colIndex === col ? 'bg-yellow-200' : 'bg-white'}`}
                          >
                            <p>{color}</p>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Table Citra Grayscale 2</h2>
                <table className="border border-black text-base mt-4">
                  <tbody>
                    {selectedData2.map((rowItem, rowIndex) => (
                      <tr key={rowIndex}>
                        {rowItem.map((color, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border-2 border-black size-20 text-center ${rowIndex === row && colIndex === col ? 'bg-blue-200' : 'bg-white'}`}
                          >
                            <p>{color}</p>
                          </td>
                        ))}
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
                <div className="flex items-center gap-4 sm:ml-10 flex-col">
                  <div>
                    <BlockMath math={`wA = ${wA} `} />
                    <BlockMath math={`wB = 1 - ${wA} = ${1 - wA} `} />
                  </div>
                  <div className="flex gap-4">
                    {animationStage >= 0 && (
                      <BlockMath
                        math={`(${currentGrayscale} * ${wA})+(${currentGrayscale2} * ${1 - wA}) = `}
                      />
                    )}
                    {animationStage >= 1 && <BlockMath math={`${blendingValue}`} />}
                  </div>
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
              <ImageBlending value={wA} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
