import { useRef, useState } from 'react';

const SubtractImages = () => {
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [subtractedImage, setSubtractedImage] = useState(null);
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

  const subtractImages = () => {
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
          const subtractedData = ctx.createImageData(width, height);
          const subtracted = subtractedData.data;
          for (let i = 0; i < dataA.length; i += 4) {
            subtracted[i] = Math.max(0, dataA[i] - dataB[i]);
            subtracted[i + 1] = Math.max(0, dataA[i + 1] - dataB[i + 1]);
            subtracted[i + 2] = Math.max(0, dataA[i + 2] - dataB[i + 2]);
            subtracted[i + 3] = 255; // Set alpha to fully opaque

            // Normalization for negative values
            subtracted[i] = (255 + subtracted[i]) / 2;
            subtracted[i + 1] = (255 + subtracted[i + 1]) / 2;
            subtracted[i + 2] = (255 + subtracted[i + 2]) / 2;
          }
          ctx.putImageData(subtractedData, 0, 0);
          setSubtractedImage(canvas.toDataURL());
        };
      };
    }
  };

  return (
    <div>
      <h3 className="font-bold text-xl my-8">Subtract Two Images</h3>
      <div className="flex flex-wrap">
        <div>
          <h2 className="text-xl">Upload Image 1</h2>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageA)} />
          {imageA && (
            <img src={imageA} alt="Image A" style={{ maxWidth: '200px', marginTop: '10px' }} />
          )}
        </div>
        <div>
          <h2 className="text-xl">Upload Image 2</h2>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageB)} />
          {imageB && (
            <img src={imageB} alt="Image B" style={{ maxWidth: '200px', marginTop: '10px' }} />
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {subtractedImage && (
          <div>
            <h2 className="text-xl">Subtracted Image</h2>
            <img
              src={subtractedImage}
              alt="Subtracted"
              style={{ maxWidth: '400px', marginTop: '10px' }}
            />
          </div>
        )}
      </div>
      <button
        onClick={subtractImages}
        disabled={!imageA || !imageB}
        className="p-2 bg-green-300 hover:bg-green-400 rounded mt-4 border-2 border-black shadow"
      >
        Subtract Images
      </button>
    </div>
  );
};

export default SubtractImages;
