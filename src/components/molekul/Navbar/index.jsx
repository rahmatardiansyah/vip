import './navbar.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const [algorithm, setAlgorithm] = useState('Pilih Operator');
  const [activeMenu, setActiveMenu] = useState('');

  const handleClick = (e) => {
    setAlgorithm(e);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const hideNavbar = () => {
    const menuToggle = document.getElementById('navbarNavDropdown');
    if (window.innerWidth < 992) {
      const bsCollapse = new bootstrap.Collapse(menuToggle);
      bsCollapse.toggle();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top ">
      <div className="container">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => {
            navigate('/');
            handleClick('Pilih Operator');
          }}
        >
          VIP.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${activeMenu === 'home' ? 'active' : ''}`}
                href="#home"
                onClick={() => {
                  navigate('/#home');
                  handleClick('Pilih Operator');
                  handleMenuClick('home');
                  hideNavbar();
                }}
              >
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeMenu === 'basic' ? 'active' : ''}`}
                href="#basic"
                onClick={() => {
                  navigate('/#basic');
                  handleClick('Pilih Operator');
                  handleMenuClick('basic');
                  hideNavbar();
                }}
              >
                Materi Dasar
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeMenu === 'result' ? 'active' : ''}`}
                href="#result"
                onClick={() => {
                  navigate('/#result');
                  handleClick('Pilih Operator');
                  handleMenuClick('result');
                  hideNavbar();
                }}
              >
                Hasil Proses
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeMenu === 'about' ? 'active' : ''}`}
                href="#about"
                onClick={() => {
                  navigate('/#about');
                  handleClick('Pilih Operator');
                  handleMenuClick('about');
                  hideNavbar();
                }}
              >
                Tentang
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {algorithm}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/robert');
                      handleClick('Operator Robert');
                      handleMenuClick('');
                      hideNavbar();
                    }}
                  >
                    Operator Robert
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/prewitt');
                      handleClick('Operator Prewitt');
                      handleMenuClick('');
                      hideNavbar();
                    }}
                  >
                    Operator Prewitt
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/sobel');
                      handleClick('Operator Sobel');
                      handleMenuClick('');
                      hideNavbar();
                    }}
                  >
                    Operator Sobel
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      navigate('/laplacian');
                      handleClick('Operator Laplacian');
                      handleMenuClick('');
                      hideNavbar();
                    }}
                  >
                    Operator Laplacian
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
