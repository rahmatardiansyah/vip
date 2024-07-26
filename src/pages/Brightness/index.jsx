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
  CalculationProcess,
  Case,
  Formula,
  ImageBrightness,
  ImageDataInput,
  Operation,
  ProcessControl,
  ResultTable,
  SelectImage
} from '../../components';
import ParameterInputText from '../../components/atoms/ParameterInputText';
import { PulseLoader } from 'react-spinners';

const Brightness = () => {
  const brightnessFormula = `
    I_{\\text{baru}}(x, y) = I(x, y) + \\Delta
  `;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [rangeBrightness, setRangeBrightness] = useState(10);
  const [rangeValue, setRangeValue] = useState(10);
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [errorParameterInput, setErrorParameterInput] = useState(null);

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
    setErrorParameterInput(null);
    stopAnimation();
  };

  const handleParameter = (e) => {
    const value = e.target.value;
    setRangeValue(value);
    if (value !== '' && !isNaN(value)) {
      const intValue = parseInt(value);
      if (intValue >= -255 && intValue <= 255) {
        setRangeBrightness(intValue);
        setErrorParameterInput(null);
      } else {
        console.error('Parameter harus diatas -256 dan dibawah 256 !');
        setErrorParameterInput('Parameter harus diatas -256 dan dibawah 256!');
      }
    } else {
      console.error('Invalid input paramater');
      setErrorParameterInput('Invalid input parameter');
    }
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
  const [brightnessValue, setBrightnessValue] = useState(null);
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
    setBrightnessValue(null);
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
    if (selectedData) {
      const grayscale = selectedData[row][col];
      const brightness = grayscale + rangeBrightness > 255 ? 255 : grayscale + rangeBrightness;
      setCurrentGrayscale(grayscale);
      setBrightnessValue(brightness);

      if (animationStage === 2) {
        setResultData((prevResultData) => {
          const newResultData = prevResultData.map((rowItem, rowIndex) =>
            rowItem.map((colItem, colIndex) =>
              rowIndex === row && colIndex === col ? brightness : colItem
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
        <Operation title="Operasi Brightness">
          Operasi brightness dalam pengolahan citra mengacu pada penyesuaian tingkat kecerahan
          sebuah gambar. Brightness atau kecerahan adalah atribut visual yang menggambarkan seberapa
          terang atau gelap sebuah citra. Pada dasarnya, operasi ini melibatkan penambahan atau
          pengurangan nilai intensitas piksel di dalam citra.
        </Operation>
        <Formula formula={brightnessFormula} />
        <Case>
          Diketahui citra grayscale 256 warna dengan ukuran 5x5 piksel akan dilakukan operasi
          kecerahan dengan konstanta {rangeBrightness}.
        </Case>
        <div className="my-10 px-4">
          <SelectImage
            title="Pilih Gambar Grayscale"
            information="Silakan pilih salah satu gambar grayscale yang disediakan di bawah ini untuk melihat proses konversi proses brightness."
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
            <div>
              <ImageDataInput
                information="Setelah memilih gambar, nilai grayscale dari gambar tersebut akan muncul di tabel berikut. Anda bisa mengubah nilai grayscale tersebut secara manual melalui field di bawah."
                selectedData={selectedData}
                textareaValue={textareaValue}
                handleTextareaChange={handleTextareaChange}
                isAnimating={isAnimating}
                error={error}
              />

              <ParameterInputText
                information="Anda juga bisa mengubah nilai parameter yang akan digunakan dalam proses perhitungan operasi brightness menggunakan input di bawah."
                handleParameter={handleParameter}
                isAnimating={isAnimating}
                rangeBrightness={rangeBrightness}
                rangeValue={rangeValue}
                errorParameterInput={errorParameterInput}
              />
            </div>
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
                  <CalculationProcess
                    title="Proses Perhitungan"
                    classes="flex gap-4 flex-col items-start"
                  >
                    {animationStage >= 0 && (
                      <BlockMath
                        math={`I_{\\text{baru}}(x, y) = I(${currentGrayscale}) + ${rangeBrightness} = `}
                      />
                    )}

                    <div className="flex gap-2 items-center">
                      <BlockMath math={`I_{\\text{baru}}(x, y) =`} />
                      {animationStage >= 1 && <BlockMath math={`${brightnessValue}`} />}
                      {animationStage === 0 && <PulseLoader size={5} speedMultiplier={1} />}
                    </div>
                  </CalculationProcess>
                  <ProcessControl
                    heading="Kontrol Proses Perhitungan"
                    information="konversi grayscale ke invert"
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
                information="Tabel citra hasil operasi brightness"
                resultData={resultData}
                row={row}
                col={col}
                animationStage={animationStage}
              />
            </div>
            <div className="my-10">
              <ImageBrightness />
            </div>
            <AnotherTopicsContainer classes="justify-between">
              <AnotherTopicsItem name="Invert" url="/invert" direction="left" />
              <AnotherTopicsItem name="Threshold" url="/threshold" direction="right" />
            </AnotherTopicsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brightness;
