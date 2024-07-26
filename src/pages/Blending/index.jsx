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
  ImageBlending,
  ImageDataInput,
  Operation,
  ProcessControl,
  ResultTable,
  SelectImage
} from '../../components';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { TbReload } from 'react-icons/tb';
import { PulseLoader } from 'react-spinners';

const Blending = () => {
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
        <Operation title="Operasi Image Blending">
          Image blending adalah teknik yang digunakan untuk menggabungkan dua atau lebih citra
          menjadi satu citra baru dengan cara mengatur proporsi dari masing-masing citra yang
          digabungkan. Operasi ini sering digunakan untuk membuat efek transisi atau pencampuran
          antara dua gambar.
        </Operation>
        <Formula formula={blendingFormula} />
        <Case>
          Diketahui dua buah citra A(x,y) dan citra B (x,y) akan digabungkan dengan bobot wA = {wA},
          sehingga menghasilkan citra baru C(x,y). Gambarkan citra hasil penjumlahan citra A dan
          citra B.
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
          {selectedImage2 && (
            <div>
              <div className="my-8">
                <p>
                  Anda juga bisa mengubah nilai parameter yang akan digunakan dalam proses
                  perhitungan operasi brightness menggunakan input di bawah.
                </p>
                <input
                  type="number"
                  min={0.1}
                  max={0.9}
                  step={0.1}
                  value={wA}
                  onChange={handleInputWA}
                  id="WA"
                  className={`mt-8 border-2 border-black rounded w-20 h-10 p-2 ${isAnimating && 'cursor-not-allowed'}`}
                  disabled={isAnimating}
                />
                <label htmlFor="WA" className="ml-4">
                  wA
                </label>
              </div>
            </div>
          )}
        </div>

        {selectedImage && selectedImage2 && (
          <div className="my-10 px-4">
            <div className="flex items-center flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold">Table Citra Grayscale 1</h2>
                <p className="w-[60%]">
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
                <p className="w-[60%]">
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
            </div>

            <div className="flex flex-row flex-wrap mt-8 gap-8">
              <ResultTable
                heading="Table Citra Hasil"
                information="Tabel citra hasil proses image blending"
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
                  <BlockMath math={`wA = ${wA} `} />
                  <BlockMath math={`wA + wB = 1`} />
                  <BlockMath math={`wB = 1 - ${wA} = ${(1 - wA).toFixed(1)}`} />

                  <div className="flex gap-2 items-center">
                    <BlockMath math={`C(x,y) =`} />
                    {animationStage >= 0 && (
                      <BlockMath
                        math={`A(${currentGrayscale} * ${wA})+B(${currentGrayscale2} * ${(1 - wA).toFixed(1)})`}
                      />
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <BlockMath math={`C(x,y) =`} />
                    {animationStage >= 1 && <BlockMath math={`${blendingValue}`} />}
                    {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                  </div>
                </CalculationProcess>
                <ProcessControl
                  heading="Kontrol Proses Perhitungan"
                  information="konversi grayscale ke threshold"
                  isAnimating={isAnimating}
                  playAnimation={playAnimation}
                  pauseAnimation={pauseAnimation}
                  stopAnimation={stopAnimation}
                  playStep={playStep}
                />
              </div>
            </div>
            <div className="my-10">
              <ImageBlending value={wA} />
            </div>
            <AnotherTopicsContainer classes="justify-between">
              <AnotherTopicsItem name="Threshold" url="/threshold" direction="left" />
              <AnotherTopicsItem name="Substraction" url="/substraction" direction="right" />
            </AnotherTopicsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blending;
