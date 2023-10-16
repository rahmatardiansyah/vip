import { useState, useEffect } from 'react';

import {
  AboutSobel,
  ImageProcessSobel,
  ImageResultSobel,
  TableProcessSobel
} from '../../components';
import { imageDataRadio } from '../../components/molekul/imageData';

const Sobel = () => {
  useEffect(() => {
    document.title = 'Sobel Algoritma';
  }, []);
  const [image, setImage] = useState({
    imageOriginal: imageDataRadio.image1.original,
    imageGrayscale: imageDataRadio.image1.grayscale,
    imageSobel: imageDataRadio.image1.sobel
  });
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(imageDataRadio.image1.imageData);
  const [modalImage, setModalImage] = useState('');
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [resultSobel, setResultSobel] = useState('');

  return (
    <div className="robert-section">
      <AboutSobel />
      <div className="divider my-5"></div>{' '}
      <ImageProcessSobel
        imageDataRadio={imageDataRadio}
        setImage={setImage}
        setLoading={setLoading}
        setRows={setRows}
      />
      <ImageResultSobel
        image={image}
        loading={loading}
        setLoading={setLoading}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <TableProcessSobel rows={rows} d1={d1} d2={d2} resultSobel={resultSobel} />
    </div>
  );
};

export default Sobel;
