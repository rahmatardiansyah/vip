import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPages from './MainPages';
import { useEffect } from 'react';
const version = __APP_VERSION__;

function App() {
  useEffect(() => {
    console.log(`App version: ${version}`);
    if (localStorage.getItem('version') !== version) {
      localStorage.clear();
      localStorage.setItem('version', version);
    }
  }, []);
  return (
    <Router basename="/">
      <Routes>
        <Route path="*" element={<MainPages />} />
      </Routes>
    </Router>
  );
}

export default App;
