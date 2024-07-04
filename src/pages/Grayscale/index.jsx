import { Case, Formula, ImageToGrayscale, Operation, Tooltip } from '../../components';
import Image from '../../components/Image';
import data from '../../data/data.json';
import pikachu from '../../assets/images/pikachu.jpeg';
import panda from '../../assets/images/panda.webp';
import doraemon from '../../assets/images/doraemon.jpeg';
import { useEffect, useRef, useState } from 'react';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { BlockMath } from 'react-katex';
import { TbReload } from 'react-icons/tb';

const Grayscale = () => {
  const grayscaleFormula = `
    f_0(x,y) = \\frac{f_i^R(x,y) + f_i^G(x,y) + f_i^B(x,y)}{3}
  `;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);

  const images = [
    { src: pikachu, name: 'pikachu' },
    { src: panda, name: 'panda' },
    { src: doraemon, name: 'doraemon' }
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

      // textarea validation
      const isValid = parsedData.every(
        (array) =>
          array.length === 5 &&
          array.every(
            (subArray) =>
              subArray.length === 3 &&
              subArray.every((value) => typeof value === 'number' && value >= 0 && value <= 255)
          )
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
  const [currentRGB, setCurrentRGB] = useState([0, 0, 0]);
  const [grayscaleValue, setGrayscaleValue] = useState(null);
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
    setCurrentRGB([0, 0, 0]);
    setGrayscaleValue(null);
    setResultData(Array(5).fill(Array(5).fill(null)));
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
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  useEffect(() => {
    if (selectedData) {
      const rgb = selectedData[row][col];
      const grayscale = Math.round((rgb[0] + rgb[1] + rgb[2]) / 3);
      setCurrentRGB(rgb);
      setGrayscaleValue(grayscale);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? grayscale : colItem
            )
          );
          return newResultData;
        });
      }
    }
  }, [row, col, selectedData, animationStage]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Operation title="Operasi RGB ke Grayscale">
        Grayscale adalah operasi pengolahan citra yang mengubah gambar berwarna (RGB) menjadi gambar
        hitam putih (grayscale). Proses ini dilakukan dengan mengkombinasikan nilai merah (Red),
        hijau (Green), dan biru (Blue) dari setiap piksel untuk menghasilkan satu nilai intensitas
        abu-abu.
      </Operation>
      <Formula formula={grayscaleFormula} />
      <Case>
        Diketahui citra warna 24 bit dengan ukuran 5x5 pixel akan diubah menjadi citra grayscale.
      </Case>

      {/* Choose Image */}
      <div className="my-10 px-4">
        <h2 className="text-xl font-semibold">Pilih Gambar RGB</h2>
        <p className="text-xl">
          Silakan pilih salah satu gambar RGB yang disediakan di bawah ini untuk melihat proses
          konversi menjadi grayscale.
        </p>
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
          <div>
            <p className="text-xl my-4">
              Setelah memilih gambar, nilai RGB dari gambar tersebut akan muncul di tabel berikut.
              Anda bisa mengubah nilai RGB tersebut secara manual melalui field di bawah.
            </p>
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
        )}
      </div>

      {selectedImage && (
        <div className="my-10 px-4">
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center w-full flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold">Table Citra RGB</h2>
                <p className="w-[60%]">
                  Tabel citra RGB 5x5 piksel dari gambar yang telah di-resize
                </p>
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
              <div>
                <div>
                  <h2 className="text-xl font-semibold">Proses Perhitungan</h2>
                  <div className="flex gap-4 flex-col items-start">
                    {animationStage >= 0 && (
                      <BlockMath
                        math={`f_0(x,y) = \\frac{f_i^R(${currentRGB[0]}) + f_i^G(${currentRGB[1]}) + f_i^B(${currentRGB[2]})}{3}`}
                      />
                    )}
                    <div className="flex gap-2">
                      <BlockMath math={`f_0(x,y) =`} />
                      {animationStage >= 1 && <BlockMath math={`${grayscaleValue}`} />}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mt-4">Kontrol Animasi</h3>
                  <p>
                    Gunakan tombol di bawah ini untuk melihat animasi konversi RGB ke grayscale.
                  </p>
                  <div className="flex gap-4 items-center mt-4">
                    {isAnimating ? (
                      <Tooltip tooltip="pause">
                        <IoMdPause
                          size={30}
                          onClick={pauseAnimation}
                          className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip tooltip="play">
                        <IoMdPlay
                          size={30}
                          onClick={playAnimation}
                          className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                        />
                      </Tooltip>
                    )}

                    <Tooltip tooltip="repeat">
                      <TbReload
                        size={30}
                        onClick={stopAnimation}
                        className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                      />
                    </Tooltip>
                    <Tooltip tooltip="step by step">
                      <HiMiniPlayPause
                        size={30}
                        onClick={playStep}
                        className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Table Citra Hasil</h2>
              <p>Tabel citra hasil gambar grayscale</p>
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
          </div>
          <div className="my-10">
            <ImageToGrayscale />
          </div>
        </div>
      )}
    </div>
  );
};

export default Grayscale;
