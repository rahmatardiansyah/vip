import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Robert from '../Robert';
import Prewitt from '../Prewitt';
import { CustomNavbar, CustomFooter } from '../../components';

const MainApp = () => {
  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robert" element={<Robert />} />
        <Route path="/prewitt" element={<Prewitt />} />
      </Routes>
      <CustomFooter />
    </div>
  );
};

export default MainApp;
