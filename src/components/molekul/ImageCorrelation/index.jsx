import { useRef, useState } from 'react';

const index = ({ filter }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [grayscaleImage, setGrayscaleImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
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

          const width = img.width;
          const height = img.height;

          // Convert to grayscale
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = Math.round((r + g + b) / 3);
            data[i] = data[i + 1] = data[i + 2] = gray;
          }

          // Create a copy of the image data for grayscale image
          const grayscaleData = new Uint8ClampedArray(data);
          ctx.putImageData(new ImageData(grayscaleData, width, height), 0, 0);
          setGrayscaleImage(canvas.toDataURL());

          // Create a copy of the image data to store the results
          const result = new Uint8ClampedArray(grayscaleData);

          // Apply the filter
          for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
              let sum = 0;
              for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                  const index = ((y + j) * width + (x + i)) * 4;
                  sum += grayscaleData[index] * filter[j + 1][i + 1];
                }
              }
              const idx = (y * width + x) * 4;
              result[idx] = result[idx + 1] = result[idx + 2] = sum;
              result[idx + 3] = grayscaleData[idx + 3]; // Preserve alpha channel
            }
          }

          // Update the imageData with the filtered result
          ctx.putImageData(new ImageData(result, width, height), 0, 0);
          setFilteredImage(canvas.toDataURL());
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <h3 className="font-bold text-xl my-8">Ubah Gambar Sendiri ke Grayscale</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="flex gap-10 mt-10 items-center justify-between flex-wrap sm:flex-nowrap">
        {originalImage && (
          <div>
            <h2 className="text-xl my-4">Original Image</h2>
            <img src={originalImage} alt="Original" width={`80%`} />
          </div>
        )}
        {grayscaleImage && (
          <div>
            <h2 className="text-xl my-4">Grayscale Image</h2>
            <img src={grayscaleImage} alt="Grayscale" width={`80%`} />
          </div>
        )}
        {filteredImage && (
          <div>
            <h2 className="text-xl my-4">Filtered Image</h2>
            <img src={filteredImage} alt="Filtered" width={`80%`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
