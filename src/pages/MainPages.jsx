import { Routes, Route, useLocation } from 'react-router-dom';
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
import { QuizProvider } from '../context/QuizContext';
import Register from './Register';
import Login from './Login';

const MainApp = () => {
  const slug = useLocation().pathname.split('/')[1];
  return (
    <QuizProvider slug={slug}>
      <div className="main flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grayscale" element={<Grayscale />} />
            <Route path="/brightness" element={<Brightness />} />
            <Route path="/invert" element={<Invert />} />
            <Route path="/threshold" element={<Threshold />} />
            <Route path="/blending" element={<Blending />} />
            <Route path="/substraction" element={<Substraction />} />
            <Route path="/correlation" element={<Correlation />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <CustomFooter />
      </div>
    </QuizProvider>
  );
};

export default MainApp;
