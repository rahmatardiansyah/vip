import { useState, useEffect, useRef } from 'react';
import data from '../../data/data.json';
import Image from '../../components/Image';
import pikachu from '../../assets/images/pikachu-grayscale.png';
import panda from '../../assets/images/panda-grayscale.png';
import doraemon from '../../assets/images/doraemon-grayscale.png';
import { BlockMath } from 'react-katex';
import {
  AnotherTopicsContainer,
  AnotherTopicsItem,
  Case,
  Formula,
  ImageDataInput,
  ImageInvert,
  Operation,
  SelectImage,
  Tooltip
} from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';
import { PulseLoader } from 'react-spinners';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const Invert = () => {
  const negationFormula = `
    f_0(x,y) = f_{\\text{maksimum}} - f_i(x,y)
  `;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
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
  const [negationValue, setNegationValue] = useState(null);
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
    setNegationValue(null);
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
      const grayscale = selectedData[row][col];
      const negation = 255 - grayscale;
      setCurrentGrayscale(grayscale);
      setNegationValue(negation);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? negation : colItem
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
        <Operation title="Operasi Invert">
          Operasi invert atau disebut juga dengan operasi negatif adalah proses membalikkan nilai
          intensitas piksel pada citra, menghasilkan efek negatif.
        </Operation>
        <Formula formula={negationFormula} />
        <Case>
          Diketahui citra grayscale 256 warna dengan ukuran 5x5 piksel akan dilakukan operasi
          invert.
        </Case>

        <div className="my-10 px-4">
          <SelectImage
            title="Pilih Gambar Grayscale"
            information="Silakan pilih salah satu gambar grayscale yang disediakan di bawah ini untuk melihat proses konversi proses invert."
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                onClick={() => handleImageClick(image.name)}
                isSelected={image.name === selectedImage}
              />
            ))}
          </SelectImage>
          {selectedImage && (
            <ImageDataInput
              information="Setelah memilih gambar, nilai grayscale dari gambar tersebut akan muncul di tabel berikut. Anda bisa mengubah nilai grayscale tersebut secara manual melalui field di bawah."
              selectedData={selectedData}
              textareaValue={textareaValue}
              handleTextareaChange={handleTextareaChange}
              isAnimating={isAnimating}
              error={error}
            />
          )}
        </div>

        {selectedImage && (
          <div className="my-10 px-4">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center w-full flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Table Citra Grayscale</h2>
                  <p className="w-[60%]">
                    Tabel citra grayscale 5x5 piksel dari gambar yang telah di-resize
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
                              <p>{color}</p>
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
                        <BlockMath math={`f_0(x,y) = 255 - f_i(${currentGrayscale})`} />
                      )}
                      <div className="flex gap-2 items-center">
                        <BlockMath math={`f_0(x,y) =`} />
                        {animationStage >= 1 && <BlockMath math={`${negationValue}`} />}
                        {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mt-4">Kontrol Proses Perhitungan</h3>
                    <p className="text-justify">
                      Gunakan tombol (<IoMdPlay size={15} className="inline-block" />) di bawah ini
                      untuk melihat proses konversi grayscale ke invert.
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
                <h2 className="text-xl font-semibold">Tabel Citra Hasil</h2>
                <p>Tabel citra hasil gambar invert</p>
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
              <ImageInvert />
            </div>
            <AnotherTopicsContainer classes="justify-between">
              <AnotherTopicsItem name="Grayscale" url="/grayscale" direction="left" />
              <AnotherTopicsItem name="Brightness" url="/brightness" direction="right" />
            </AnotherTopicsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invert;
