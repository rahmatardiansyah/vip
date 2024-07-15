import {
  AnotherTopicsContainer,
  AnotherTopicsItem,
  CalculationProcess,
  Case,
  Formula,
  ImageDataInput,
  ImageToGrayscale,
  Operation,
  ProcessControl,
  ResultTable,
  SelectImage,
  SourceTable
} from '../../components';
import Image from '../../components/Image';
import data from '../../data/data.json';
import pikachu from '../../assets/images/pikachu.jpeg';
import panda from '../../assets/images/panda.webp';
import doraemon from '../../assets/images/doraemon.jpeg';
import { useEffect, useRef, useState } from 'react';
import { BlockMath } from 'react-katex';
import { PulseLoader } from 'react-spinners';

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
        <SelectImage
          title="Pilih Gambar RGB"
          information="Silakan pilih salah satu gambar RGB yang disediakan di bawah ini untuk melihat proses konversi menjadi grayscale."
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
            information="Setelah memilih gambar, nilai RGB dari gambar tersebut akan muncul di tabel berikut. Anda bisa mengubah nilai RGB tersebut secara manual melalui field di bawah."
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
              <SourceTable
                title="Table Citra RGB"
                information="Tabel citra RGB 5x5 piksel dari gambar yang telah di-resize"
                selectedData={selectedData}
                row={row}
                col={col}
              />

              <div>
                <CalculationProcess
                  title="Proses Perhitungan"
                  classes="flex gap-4 flex-col items-start"
                >
                  {animationStage >= 0 && (
                    <BlockMath
                      math={`f_0(x,y) = \\frac{f_i^R(${currentRGB[0]}) + f_i^G(${currentRGB[1]}) + f_i^B(${currentRGB[2]})}{3}`}
                    />
                  )}
                  <div className="flex gap-2 items-center">
                    <BlockMath math={`f_0(x,y) =`} />
                    {animationStage >= 1 && <BlockMath math={`${grayscaleValue}`} />}
                    {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                  </div>
                </CalculationProcess>
                <ProcessControl
                  heading="Kontrol Proses Perhitungan"
                  information="konversi RGB ke grayscale"
                  isAnimating={isAnimating}
                  playAnimation={playAnimation}
                  pauseAnimation={pauseAnimation}
                  stopAnimation={stopAnimation}
                  playStep={playStep}
                />
              </div>
            </div>
            <ResultTable
              heading="Table Citra Hasil"
              information="Tabel citra hasil gambar grayscale"
              resultData={resultData}
              row={row}
              col={col}
              animationStage={animationStage}
            />
          </div>
          <div className="my-10">
            <ImageToGrayscale />
          </div>
          <AnotherTopicsContainer classes="justify-end">
            <AnotherTopicsItem name="invert" url="/invert" />
          </AnotherTopicsContainer>
        </div>
      )}
    </div>
  );
};

export default Grayscale;
