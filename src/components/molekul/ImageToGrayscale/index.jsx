import { useRef, useState } from 'react';

const index = () => {
  const [grayscaleImage, setGrayscaleImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
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
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = Math.round((r + g + b) / 3);
            data[i] = data[i + 1] = data[i + 2] = gray;
          }
          ctx.putImageData(imageData, 0, 0);
          setGrayscaleImage(canvas.toDataURL());
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
        Jika Anda ingin melihat hasil konversi dari gambar Anda sendiri, silakan upload gambar RGB
        Anda di sini.
      </p>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="flex gap-10 mt-10 items-center justify-between flex-wrap sm:flex-nowrap">
        {originalImage && (
          <div>
            <h2 className="text-xl my-4">Gambar Original</h2>
            <img src={originalImage} alt="Original" width={`80%`} />
          </div>
        )}
        {grayscaleImage && (
          <div>
            <h2 className="text-xl my-4">Gambar Grayscale</h2>
            <img src={grayscaleImage} alt="Grayscale" width={`80%`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
