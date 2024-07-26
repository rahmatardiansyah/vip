import { useRef, useState } from 'react';

const BlendImages = ({ value }) => {
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [blendedImage, setBlendedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const blendImages = () => {
    if (imageA && imageB) {
      const imgA = new Image();
      const imgB = new Image();
      imgA.src = imageA;
      imgB.src = imageB;
      imgA.onload = () => {
        imgB.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const width = Math.min(imgA.width, imgB.width);
          const height = Math.min(imgA.height, imgB.height);
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(imgA, 0, 0, width, height);
          const imageDataA = ctx.getImageData(0, 0, width, height);
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(imgB, 0, 0, width, height);
          const imageDataB = ctx.getImageData(0, 0, width, height);
          const dataA = imageDataA.data;
          const dataB = imageDataB.data;
          const blendedData = ctx.createImageData(width, height);
          const blended = blendedData.data;
          const wB = 1 - value;
          for (let i = 0; i < dataA.length; i += 4) {
            blended[i] = value * dataA[i] + wB * dataB[i];
            blended[i + 1] = value * dataA[i + 1] + wB * dataB[i + 1];
            blended[i + 2] = value * dataA[i + 2] + wB * dataB[i + 2];
            blended[i + 3] = 255; // Set alpha to fully opaque
          }
          ctx.putImageData(blendedData, 0, 0);
          setBlendedImage(canvas.toDataURL());
        };
      };
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-xl my-8">Upload Gambar Anda</h3>
      <p className="text-base my-4 text-justify">
        Jika Anda ingin melihat hasil konversi dari gambar Anda sendiri, silakan upload gambar Anda
        di sini.
      </p>
      <div className="flex flex-wrap">
        <div>
          <h2 className="text-xl">Upload Gambar 1</h2>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageA)} />
          {imageA && (
            <img src={imageA} alt="Image A" style={{ maxWidth: '300px', marginTop: '10px' }} />
          )}
        </div>
        <div>
          <h2 className="text-xl">Upload Gambar 2</h2>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageB)} />
          {imageB && (
            <img src={imageB} alt="Image B" style={{ maxWidth: '300px', marginTop: '10px' }} />
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {blendedImage && (
          <div>
            <h2 className="text-xl">Blended Image</h2>
            <img
              src={blendedImage}
              alt="Blended"
              style={{ maxWidth: '400px', marginTop: '10px' }}
            />
          </div>
        )}
      </div>
      <button
        onClick={blendImages}
        disabled={!imageA || !imageB}
        className="p-2 bg-green-300 hover:bg-green-400 rounded mt-4 border-2 border-black shadow"
      >
        Proses
      </button>
    </div>
  );
};

export default BlendImages;
