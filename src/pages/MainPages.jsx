import { Routes, Route } from 'react-router-dom';
import { Navbar, CustomFooter } from '../components';
import '../global.css';

import Home from './Home';
import Brightness from './Brightness';
import Grayscale from './Grayscale';
import Invert from './Invert';
import Threshold from './Threshold';
import Blending from './Blending';
import Substraction from './Substraction';
import Correlation from './Correlation';
import Robert from './Robert';

const MainApp = () => {
  return (
    <div className="main">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grayscale" element={<Grayscale />} />
          <Route path="/brightness" element={<Brightness />} />
          <Route path="/invert" element={<Invert />} />
          <Route path="/threshold" element={<Threshold />} />
          <Route path="/blending" element={<Blending />} />
          <Route path="/substraction" element={<Substraction />} />
          <Route path="/correlation" element={<Correlation />} />
          <Route path="/Robert" element={<Robert />} />
        </Routes>
      </div>
      <CustomFooter />
    </div>
  );
};

export default MainApp;
