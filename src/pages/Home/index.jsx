import { Hero, Basic, Result, About } from '../../components/molekul';
import './home.scss';

const Home = () => {
  return (
    <div className="scroll-container">
      <div className="hero-wrapper">
        <Hero />
      </div>
      <div className="basic-wrapper">
        <Basic />
      </div>
      <div className="result-wrapper">
        <Result />
      </div>
      <div className="about-warpper">
        <About />
      </div>
    </div>
  );
};

export default Home;
