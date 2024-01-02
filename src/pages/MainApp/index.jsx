import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Robert from '../Robert';
import Prewitt from '../Prewitt';
import Sobel from '../Sobel';
import Laplacian from '../Laplacian';
import { CustomNavbar, CustomFooter } from '../../components';
import './mainApp.scss';

const MainApp = () => {
  return (
    <div className="main">
      <CustomNavbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robert" element={<Robert />} />
          <Route path="/prewitt" element={<Prewitt />} />
          <Route path="/sobel" element={<Sobel />} />
          <Route path="/laplacian" element={<Laplacian />} />
        </Routes>
      </div>
      <CustomFooter />
    </div>
  );
};

export default MainApp;
