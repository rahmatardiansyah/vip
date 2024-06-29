import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPages from './MainPages';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="*" element={<MainPages />} />
      </Routes>
    </Router>
  );
}

export default App;
