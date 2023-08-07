import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Robert from '../Robert';
import Prewitt from '../Prewitt';
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
        </Routes>
      </div>
      <CustomFooter />
    </div>
  );
};

export default MainApp;
