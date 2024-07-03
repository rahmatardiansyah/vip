import { useRef, useState } from 'react';

const Index = ({ value }) => {
  const [grayscaleImage, setGrayscaleImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [thresholdImage, setThresholdImage] = useState(null);
  const canvasRef = useRef(null);

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
            data[i] = data[i] >= value ? 255 : 0; // Red
            data[i + 1] = data[i + 1] >= value ? 255 : 0; // Green
            data[i + 2] = data[i + 2] >= value ? 255 : 0; // Blue
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
      <h3 className="font-bold text-xl my-8">Ubah Gambar Sendiri ke Grayscale dan Negatif</h3>
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
