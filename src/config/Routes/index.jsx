import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainApp } from '../../pages';
const myRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default myRoutes;
