import { useState } from 'react';
import {
  AboutRobert,
  ImageProsesRobert,
  ImageResultRobert,
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

  return (
    <div className="robert-section">
      <AboutRobert />
      <div className="divider my-5"></div>
      <ImageProsesRobert
        imageDataRadio={imageDataRadio}
        setImage={setImage}
        setLoading={setLoading}
      />
      <ImageResultRobert
        image={image}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Robert;
