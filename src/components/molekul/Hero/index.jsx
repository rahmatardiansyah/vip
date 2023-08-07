import React from 'react';
import { HeroImage } from '../../../assets';
import { Button } from '../../atoms';
import './hero.scss';

const Hero = () => {
  return (
    <div className="container hero-section">
      <div className="row">
        <div className="col-xl-6 order-xl-1 order-2">
          <h1 className="title">
            <span>V</span>isualize <span>I</span>mage <span>P</span>rocessing
            Menggunakan Website.
          </h1>
          <p>
            Jelajahi pengalaman belajar yang mendalam melalui simulasi, animasi,
            dan visualisasi pada pengolahan citra digital. Website ini membuat
            pengolahan citra menjadi menyenangkan dan mudah dipahami.
          </p>
          <Button text="Coba Sekarang" className="btn btn-primary" />
        </div>
        <div className="col-xl-6 order-xl-1 order-1">
          <div className="hero-image">
            <img src={HeroImage} className="img-fluid" alt="Hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
