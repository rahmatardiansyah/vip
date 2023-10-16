import { useState, useEffect } from 'react';
import {
  AboutRobert,
  ImageProcessRobert,
  ImageResultRobert,
  TableProcessRobert,
  ButtonProcessRobert
} from '../../components';
import './robert.scss';
import { imageDataRadio } from '../../components/molekul/imageData';

const Robert = () => {
  const [image, setImage] = useState({
    imageOriginal: imageDataRadio.image1.original,
    imageGrayscale: imageDataRadio.image1.grayscale,
    imageRobert: imageDataRadio.image1.robert
  });

  useEffect(() => {
    document.title = 'Robert Algoritma';
  }, []);

  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState('');
  const [rows, setRows] = useState(imageDataRadio.image1.imageData);
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [resultRobert, setResultRobert] = useState('');

  return (
    <div className="robert-section">
      <AboutRobert />
      <div className="divider my-5"></div>
      <ImageProcessRobert
        imageDataRadio={imageDataRadio}
        setImage={setImage}
        setLoading={setLoading}
        setRows={setRows}
      />
      <ImageResultRobert
        image={image}
        loading={loading}
        setLoading={setLoading}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <TableProcessRobert rows={rows} d1={d1} d2={d2} resultRobert={resultRobert} />
      <ButtonProcessRobert
        setD1={setD1}
        setD2={setD2}
        setResultRobert={setResultRobert}
        rows={rows}
      />
    </div>
  );
};

export default Robert;
