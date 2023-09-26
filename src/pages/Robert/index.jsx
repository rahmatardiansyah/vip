import { useState } from 'react';
import {
  AboutRobert,
  ImageProcessRobert,
  ImageResultRobert,
  TableProcessRobert,
  ButtonProcessRobert,
} from '../../components';
import './robert.scss';
import { imageDataRadio } from './imageData';

const Robert = () => {
  const [image, setImage] = useState({
    imageOriginal: imageDataRadio.image1.original,
    imageGrayscale: imageDataRadio.image1.grayscale,
    imageRobert: imageDataRadio.image1.robert,
  });

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
      <TableProcessRobert
        rows={rows}
        setRows={setRows}
        imageData={imageDataRadio.image1.imageData}
        d1={d1}
        d2={d2}
        resultRobert={resultRobert}
      />
      <ButtonProcessRobert />
    </div>
  );
};

export default Robert;
