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
import {
  AnotherTopicsContainer,
  AnotherTopicsItem,
  CalculationProcess,
  Case,
  Formula,
  ImageDataInput,
  ImageSubstraction,
  Operation,
  ProcessControl,
  ResultTable,
  SelectImage
} from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';
import { PulseLoader } from 'react-spinners';

const Substraction = () => {
  const substractionFormula = `
I_{\\text{subtracted}}(x, y) = I_1(x, y) - I_2(x, y)
`;

  const substractionNormalizeFormula = `
I_{\\text{normalized}}(x, y) = \\max(0, \\min(255, I_{\\text{subtracted}}(x, y) + 255))
`;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedData2, setSelectedData2] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');
  const [resultData, setResultData] = useState([]);
  const [resultData2, setResultData2] = useState([]);
  const [error, setError] = useState(null);

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

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData(selectedData.imageData);
    setResultData(Array(5).fill(Array(5).fill(null)));
    setResultData2(Array(5).fill(Array(5).fill(null)));
    setTextareaValue(JSON.stringify(selectedData.imageData));
    setError(null);
    stopAnimation();
  };

  const handleImageClick2 = (imageName) => {
    setSelectedImage2(imageName);
    const selectedData = data.find((item) => item.filename === imageName);
    setSelectedData2(selectedData.imageData);
    setResultData(Array(5).fill(Array(5).fill(null)));
    setResultData2(Array(5).fill(Array(5).fill(null)));
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
  const [substractionValue, setSubstractionValue] = useState(null);
  const [normalizeValue, setNormalizeValue] = useState(null);
  const [animationStage, setAnimationStage] = useState(0);
  const intervalRef = useRef(null);

  const playAnimation = () => {
    if (!isAnimating) {
      if (row === 0 && col === 0) {
        setResultData(Array(5).fill(Array(5).fill(null)));
        setResultData2(Array(5).fill(Array(5).fill(null)));
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
    setSubstractionValue(null);
    setNormalizeValue(null);
    if (!(row === 0 && col === 0)) {
      setResultData(Array(5).fill(Array(5).fill(null)));
      setResultData2(Array(5).fill(Array(5).fill(null)));
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
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAnimating]);

  useEffect(() => {
    if (selectedData && selectedData2) {
      const grayscale = selectedData[row][col];
      const grayscale2 = selectedData2[row][col];
      const substraction = grayscale - grayscale2;
      const normalize = Math.round((255 + substraction) / 2);
      setCurrentGrayscale(grayscale);
      setCurrentGrayscale2(grayscale2);
      setSubstractionValue(substraction);
      setNormalizeValue(normalize);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? substraction : colItem
            )
          );
          return newResultData;
        });
        setResultData2((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? normalize : colItem
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
        <Operation title="Operasi Image Substraction">
          Image subtraction adalah teknik yang digunakan untuk mengurangi satu citra dari citra
          lainnya, yang sering digunakan untuk mendeteksi perbedaan antara dua citra atau untuk
          menyoroti perubahan. Operasi ini biasanya digunakan dalam aplikasi seperti deteksi
          gerakan, pengurangan latar belakang, dan analisis perubahan
        </Operation>
        <Formula formula={substractionFormula} />
        <div className="text-xl">
          <BlockMath math={substractionNormalizeFormula} />
        </div>
        <Case>
          Diketahui dua buah citra (citra A dan citra B) berukuran 4x5 piksel dengan resolusi
          keabuan L=256
        </Case>

        <SelectImage
          title="Pilih Gambar 1"
          information="Silakan pilih salah satu gambar grayscale pertama yang disediakan di bawah ini untuk melihat proses konversi proses blending."
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

        <SelectImage
          title="Pilih Gambar 2"
          information="Silakan pilih salah satu gambar grayscale kedua yang disediakan di bawah ini untuk melihat proses konversi proses blending."
        >
          {images2.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.name}
              onClick={() => handleImageClick2(image.name)}
              isSelected={image.name === selectedImage2}
            />
          ))}
        </SelectImage>
        <div className="my-10 px-4">
          {selectedImage && (
            <div>
              <ImageDataInput
                information="Setelah memilih gambar, nilai grayscale dari kedua gambar tersebut akan muncul di tabel berikut. Anda bisa mengubah nilai grayscale tersebut secara manual melalui field di bawah."
                selectedData={selectedData}
                textareaValue={textareaValue}
                handleTextareaChange={handleTextareaChange}
                isAnimating={isAnimating}
                error={error}
              />
            </div>
          )}
          {selectedImage2 && (
            <div>
              <ImageDataInput
                information=""
                selectedData={selectedData2}
                textareaValue={textareaValue2}
                handleTextareaChange={handleTextareaChange2}
                isAnimating={isAnimating}
                error={error}
              />
            </div>
          )}
        </div>

        {selectedImage && selectedImage2 && (
          <div className="my-10 px-4">
            <div className="flex flex-wrap gap-8">
              <div>
                <h2 className="text-xl font-semibold">Table Citra Grayscale 1</h2>
                <p className="">
                  Tabel citra grayscale 5x5 piksel dari gambar pertama yang telah di-resize
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
                <h2 className="text-xl font-semibold">Table Citra Grayscale 2</h2>
                <p className="">
                  Tabel citra grayscale 5x5 piksel dari gambar kedua yang telah di-resize
                </p>
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
              <div className="flex flex-row flex-wrap mt-8 gap-8">
                <ResultTable
                  heading="Table Citra Hasil"
                  information="Tabel citra hasil proses image substraction"
                  resultData={resultData}
                  row={row}
                  col={col}
                  animationStage={animationStage}
                />
                <div>
                  <CalculationProcess
                    title="Proses Perhitungan"
                    classes="flex gap-2 flex-col items-start"
                  >
                    <div className="flex gap-4 flex-col items-start">
                      {animationStage >= 0 && (
                        <BlockMath
                          math={`I_{\\text{subtracted}}(x, y) = I_1(${currentGrayscale})-I_2(${currentGrayscale2}) = `}
                        />
                      )}
                      <div className="flex gap-2 items-center">
                        <BlockMath math={`I_{\\text{subtracted}}(x, y) = `} />
                        {animationStage >= 1 && <BlockMath math={`${substractionValue}`} />}
                        {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                      </div>
                    </div>
                    <p>Normalisasi</p>
                    <div className="flex gap-4 flex-col">
                      {animationStage >= 0 && (
                        <BlockMath
                          math={`I_{\\text{normalized}}(x, y) = (255 + ${substractionValue})/2 = `}
                        />
                      )}

                      <div className="flex gap-2 items-center">
                        <BlockMath math={`I_{\\text{normalized}}(x, y) = `} />
                        {animationStage >= 1 && <BlockMath math={`${normalizeValue}`} />}
                        {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                      </div>
                    </div>
                  </CalculationProcess>
                  <ProcessControl
                    heading="Kontrol Proses Perhitungan"
                    information="konversi grayscale ke image substraction"
                    isAnimating={isAnimating}
                    playAnimation={playAnimation}
                    pauseAnimation={pauseAnimation}
                    stopAnimation={stopAnimation}
                    playStep={playStep}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Table Citra Normalisasi</h2>
              <p className="">
                Tabel citra hasil normalisasi dari proses konversi image substraction
              </p>
              <table className="border border-black text-base mt-4">
                <tbody>
                  {resultData2.map((rowItem, rowIndex) => (
                    <tr key={rowIndex}>
                      {rowItem.map((color, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border-2 border-black size-20 text-center ${rowIndex === row && colIndex === col && animationStage === 2
                              ? 'bg-red-300'
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
            <div className="my-10">
              <ImageSubstraction />
            </div>
            <AnotherTopicsContainer classes="justify-between">
              <AnotherTopicsItem name="Blending" url="/blending" direction="left" />
              <AnotherTopicsItem name="Correlation" url="/correlation" direction="right" />
            </AnotherTopicsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Substraction;
