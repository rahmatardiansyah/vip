import { useState, useEffect } from 'react';
import { imageDataRadio } from '../../components/molekul/imageData';

import {
  AboutPrewitt,
  ImageProcessPrewitt,
  ImageResultPrewitt,
  TableProcessPrewitt,
  ButtonProcessPrewitt
} from '../../components';

const Prewitt = () => {
  useEffect(() => {
    document.title = 'Prewitt Algoritma';
  }, []);

  const [image, setImage] = useState({
    imageOriginal: imageDataRadio.image1.original,
    imageGrayscale: imageDataRadio.image1.grayscale,
    imagePrewitt: imageDataRadio.image1.prewitt
  });

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(imageDataRadio.image1.imageData);
  const [modalImage, setModalImage] = useState('');
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [resultPrewitt, setResultPrewitt] = useState('');

  return (
    <div className="robert-section">
      <AboutPrewitt />
      <div className="divider my-5"></div>
      <ImageProcessPrewitt
        imageDataRadio={imageDataRadio}
        setImage={setImage}
        setLoading={setLoading}
        setRows={setRows}
      />
      <ImageResultPrewitt
        image={image}
        loading={loading}
        setLoading={setLoading}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <TableProcessPrewitt rows={rows} d1={d1} d2={d2} resultPrewitt={resultPrewitt} />
      <ButtonProcessPrewitt
        setD1={setD1}
        setD2={setD2}
        setResultPrewitt={setResultPrewitt}
        rows={rows}
      />
    </div>
  );
};

export default Prewitt;
