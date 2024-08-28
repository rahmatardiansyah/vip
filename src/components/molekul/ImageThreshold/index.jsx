import { useRef, useState } from 'react';

const Index = () => {
  const [grayscaleImage, setGrayscaleImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [thresholdImage, setThresholdImage] = useState(null);
  const [thresholdValue, setThresholdValue] = useState(100);
  const [thresholdValueInput, setThresholdValueInput] = useState(100);
  const [errorParameterInput, setErrorParameterInput] = useState(null);
  const canvasRef = useRef(null);

  const handleParameter = (e) => {
    const value = e.target.value;
    setThresholdValueInput(value);
    if (value !== '' && !isNaN(value)) {
      const intValue = parseInt(value);
      if (intValue > 0 && intValue <= 255) {
        setThresholdValue(intValue);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(e.target.result);
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;

          // Grayscale conversion
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = Math.round((r + g + b) / 3);
            data[i] = data[i + 1] = data[i + 2] = gray;
          }
          ctx.putImageData(imageData, 0, 0);
          setGrayscaleImage(canvas.toDataURL());

          // BrightnessImage conversion
          for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] >= thresholdValue ? 255 : 0; // Red
            data[i + 1] = data[i + 1] >= thresholdValue ? 255 : 0; // Green
            data[i + 2] = data[i + 2] >= thresholdValue ? 255 : 0; // Blue
          }
          ctx.putImageData(imageData, 0, 0);
          setThresholdImage(canvas.toDataURL());
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-xl my-8">Upload Gambar Anda</h3>
      <p className="text-base my-4 text-justify">
        Jika Anda ingin melihat hasil konversi dari gambar Anda sendiri, silakan upload gambar Anda
        di sini.
      </p>
      <div className="flex gap-4 items-center my-8">
        <label htmlFor="threshold">Threshold :</label>
        <input
          type="number"
          onChange={handleParameter}
          id="threshold"
          value={thresholdValueInput}
          className={`border-2 border-black p-2 rounded w-32`}
        />
      </div>
      {errorParameterInput && (
        <div className="p-4 bg-red-400 my-4 font-semibold w-72 rounded border shadow border-black">
          <p>{errorParameterInput}</p>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="flex gap-10 mt-10 items-center justify-between flex-wrap sm:flex-nowrap">
        {/* {originalImage && ( */}
        {/*   <div> */}
        {/*     <h2 className="text-xl my-4">Original Image</h2> */}
        {/*     <img src={originalImage} alt="Original" width="80%" /> */}
        {/*   </div> */}
        {/* )} */}
        {grayscaleImage && (
          <div>
            <h2 className="text-xl my-4">Grayscale Image</h2>
            <img src={grayscaleImage} alt="Grayscale" width="80%" />
          </div>
        )}
        {thresholdImage && (
          <div>
            <h2 className="text-xl my-4">Brightness Image</h2>
            <img src={thresholdImage} alt="Brightness" width="80%" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
