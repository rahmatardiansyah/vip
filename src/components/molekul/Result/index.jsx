import { HeroImage } from '../../../assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './result.scss';

const Result = () => {
  return (
    <div className="container result-section">
      <h2>Hasil Proses</h2>
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 2
          },
          1400: {
            slidesPerView: 3
          }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="result">
            <img src={HeroImage} alt="Robert Result" className="img-fluid" />
            <div className="overlay">
              <h4>
                <a href="#">Operator Robert</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                pariatur soluta iure dolorem
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="result">
            <img src={HeroImage} alt="Robert Result" className="img-fluid" />
            <div className="overlay">
              <h4>
                <a href="#">Operator Robert</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                pariatur soluta iure dolorem
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="result">
            <img src={HeroImage} alt="Robert Result" className="img-fluid" />
            <div className="overlay">
              <h4>
                <a href="#">Operator Robert</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                pariatur soluta iure dolorem
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="result">
            <img src={HeroImage} alt="Robert Result" className="img-fluid" />
            <div className="overlay">
              <h4>
                <a href="#">Operator Robert</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                pariatur soluta iure dolorem
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="result">
            <img src={HeroImage} alt="Robert Result" className="img-fluid" />
            <div className="overlay">
              <h4>
                <a href="#">Operator Robert</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                pariatur soluta iure dolorem
              </p>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-divider"></div>
      </Swiper>
    </div>
  );
};

export default Result;
