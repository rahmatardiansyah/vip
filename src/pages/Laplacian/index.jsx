import { useEffect, useState } from 'react';

import { AboutLaplacian, ImageProcessLaplacian } from '../../components';
import { imageDataRadio } from '../../components/molekul/imageData';

const Laplacian = () => {
  useEffect(() => {
    document.title = 'Algoritma Laplacian';
  }, []);

  const [image, setImage] = useState({
    imageOriginal: imageDataRadio.image1.original,
    imageGrayscale: imageDataRadio.image1.grayscale,
    imagePrewitt: imageDataRadio.image1.prewitt
  });

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(imageDataRadio.image1.imageData);

  return (
    <div className="robert-section">
      <AboutLaplacian />

      <div className="divider my-5"></div>
      <ImageProcessLaplacian
        imageDataRadio={imageDataRadio}
        setImage={setImage}
        setLoading={setLoading}
        setRows={setRows}
      />
    </div>
  );
};

export default Laplacian;
