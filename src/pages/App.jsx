import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPages from './MainPages';
const version = __APP_VERSION__;

function App() {
  if (version !== '1.0.0') {
    localStorage.clear();
  }
  return (
    <Router basename="/">
      <Routes>
        <Route path="*" element={<MainPages />} />
      </Routes>
    </Router>
  );
}

export default App;
