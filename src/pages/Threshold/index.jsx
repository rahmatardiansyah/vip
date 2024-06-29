import { useState, useEffect, useRef } from 'react';
import data from '../../data/data.json';
import Image from '../../components/Image';
import pikachu from '../../assets/images/pikachu-grayscale.png';
import panda from '../../assets/images/panda-grayscale.png';
import doraemon from '../../assets/images/doraemon-grayscale.png';
import { BlockMath } from 'react-katex';
import { Case, Formula, Operation, ImageTreshold } from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';

const index = () => {
  const thresholdingFormula = `
g(x,y) =
\\left\\{
\\begin{array}{ll}
0, & \\text{jika } f(x,y) < T \\\\
255, & \\text{jika } f(x,y) \\geq T
\\end{array}
\\right\\}`;

  const thresholdingCase = `
F_0(x,y) =
\\left\\{
\\begin{array}{ll}
0, & \\text{jika } f(x,y) < 200 \\\\
255, & \\text{jika } f(x,y) \\geq 200
\\end{array}
\\right\\}`;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [thresholdInput, setThresholdInput] = useState(200);
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);

  const images = [
    { src: pikachu, name: 'pikachu-grayscale' },
    { src: panda, name: 'panda-grayscale' },
    { src: doraemon, name: 'doraemon-grayscale' }
  ];

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData(selectedData.imageData);
    setResultData(Array(5).fill(Array(5).fill(null)));
    setTextareaValue(JSON.stringify(selectedData.imageData));
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

  // Animation
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentGrayscale, setCurrentGrayscale] = useState(0);
  const [thresholdValue, setThresholdValue] = useState(null);
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
    setThresholdValue(null);
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
    if (selectedData) {
      const grayscale = selectedData[row][col];
      const threshold = grayscale >= thresholdInput ? 255 : 0;
      setCurrentGrayscale(grayscale);
      setThresholdValue(threshold);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? threshold : colItem
            )
          );
          return newResultData;
        });
      }
    }
  }, [row, col, selectedData, animationStage]);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <Operation title="Operasi Ambang Batas">
          Thresholding merupakan salah satu metode segmentasi citra yang memisahkan antara objek
          dengan background dalam suatu citra berdasarkan pada perbedaan tingkat kecerahannya atau
          gelap terangnya.
        </Operation>
        <Formula formula={thresholdingFormula}>
          <div className="font-light text-xl mt-2">
            <p>g(g,x) adalah citra hasil</p>
            <p>F(g,y) adalah citra awal</p>
            <p>T adalah ambang batas yang disyaratkan sesuai kebutuhan.</p>
          </div>
        </Formula>
        <Case>Diketahui citra grayscale 256 warna dengan sebagai berikut:</Case>
        <div>
          <BlockMath math={thresholdingCase} />
        </div>
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
          <h3 className="text-base font-bold my-8">Atau ubah nilai pada field dibawah</h3>
          {selectedImage && (
            <div>
              {selectedData && (
                <div>
                  <textarea
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    cols={40}
                    rows={5}
                    className="border-2 border-black text-xl w-full sm:w-auto"
                    disabled={isAnimating}
                  />
                  <div className="flex gap-4 items-center mt-8">
                    <input
                      type="number"
                      min={1}
                      max={255}
                      step={1}
                      value={thresholdInput}
                      onChange={(e) => setThresholdInput(parseInt(e.target.value))}
                      id="threshold"
                      className="border-2 border-black rounded w-20 h-10 p-2"
                      disabled={isAnimating}
                    />
                    <label htmlFor="threshold">T</label>
                  </div>
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
                <h2 className="text-xl font-semibold">Table Citra Hasil Ambang Batas</h2>
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
                <div className="flex items-center gap-4 sm:ml-10 text-xl">
                  {animationStage >= 0 && (
                    <BlockMath
                      math={`F_0(x,y) =
\\left\\{
\\begin{array}{ll}
0, & \\text{jika } ${currentGrayscale} < ${thresholdInput} \\\\
255, & \\text{jika } ${currentGrayscale} \\geq ${thresholdInput}
\\end{array}
\\right\\} `}
                    />
                  )}
                  {animationStage >= 1 && <BlockMath math={`${thresholdValue}`} />}
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
              <ImageTreshold value={thresholdInput} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
