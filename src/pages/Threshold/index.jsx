import { useState, useEffect, useRef } from 'react';
import data from '../../data/data.json';
import Image from '../../components/Image';
import pikachu from '../../assets/images/pikachu-grayscale.png';
import panda from '../../assets/images/panda-grayscale.png';
import doraemon from '../../assets/images/doraemon-grayscale.png';
import { BlockMath } from 'react-katex';
import {
  Case,
  Formula,
  Operation,
  ImageTreshold,
  SelectImage,
  ImageDataInput,
  CalculationProcess,
  ProcessControl,
  ResultTable,
  AnotherTopicsContainer,
  AnotherTopicsItem
} from '../../components';
import ParameterInputText from '../../components/atoms/ParameterInputText';
import { PulseLoader } from 'react-spinners';

const Threshold = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [thresholdInput, setThresholdInput] = useState(200);
  const [thresholdValueInput, setTreshholdValueInput] = useState(200);
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [errorParameterInput, setErrorParameterInput] = useState(null);

  const handleParameter = (e) => {
    const value = e.target.value;
    setTreshholdValueInput(value);
    if (value !== '' && !isNaN(value)) {
      const intValue = parseInt(value);
      if (intValue > 0 && intValue <= 255) {
        setThresholdInput(intValue);
        setErrorParameterInput(null);
      } else {
        console.error('Parameter harus diatas 0 dan dibawah 256 !');
        setErrorParameterInput('Parameter harus diatas 0 dan dibawah 256 !');
      }
    } else {
      console.error('Invalid input paramater');
      setErrorParameterInput('Invalid input parameter');
    }
  };

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
0, & \\text{jika } f(x,y) < ${thresholdInput} \\\\
255, & \\text{jika } f(x,y) \\geq ${thresholdInput}
\\end{array}
\\right\\}`;

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
      }, 1000);
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
        <Operation title="Operasi Threshold">
          Thresholding merupakan salah satu metode segmentasi citra yang memisahkan antara objek
          dengan background dalam suatu citra berdasarkan pada perbedaan tingkat kecerahannya atau
          gelap terangnya.
        </Operation>
        <Formula formula={thresholdingFormula}>
          <div className="font-light mt-2 text-base">
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
          <SelectImage
            title="Pilih Gambar Grayscale"
            information="Silakan pilih salah satu gambar grayscale yang disediakan di bawah ini untuk melihat proses konversi proses threshold."
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
                rangeBrightness={thresholdInput}
                rangeValue={thresholdValueInput}
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
                        math={`F_0(x,y) =
\\left\\{
\\begin{array}{ll}
0, & \\text{jika } ${currentGrayscale} < ${thresholdInput} \\\\
255, & \\text{jika } ${currentGrayscale} \\geq ${thresholdInput}
\\end{array}
\\right\\} `}
                      />
                    )}

                    <div className="flex gap-2 items-center">
                      <BlockMath math={`F_0(x,y) =`} />
                      {animationStage >= 1 && <BlockMath math={`${thresholdValue}`} />}
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
              <ResultTable
                heading="Table Citra Hasil"
                information="Tabel citra hasil proses threshold"
                resultData={resultData}
                row={row}
                col={col}
                animationStage={animationStage}
              />
            </div>
            <div className="my-10">
              <ImageTreshold value={thresholdInput} />
            </div>
            <AnotherTopicsContainer classes="justify-between">
              <AnotherTopicsItem name="Brightness" url="/brightness" direction="left" />
              <AnotherTopicsItem name="Blending" url="/blending" direction="right" />
            </AnotherTopicsContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Threshold;
