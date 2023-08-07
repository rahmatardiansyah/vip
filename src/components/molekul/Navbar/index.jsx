import './navbar.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const [algorithm, setAlgorithm] = useState('Pilih Operator');

  const handleClick = e => {
    setAlgorithm(e);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <a
          className="navbar-brand"
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
                className="nav-link"
                aria-current="page"
                onClick={() => {
                  navigate('/#home');
                  handleClick('Pilih Operator');
                }}
              >
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate('/#basic');
                  handleClick('Pilih Operator');
                }}
              >
                Materi Dasar
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate('/#result');
                  handleClick('Pilih Operator');
                }}
              >
                Hasil Proses
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate('/#about');
                  handleClick('Pilih Operator');
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
                    }}
                  >
                    Operator Prewitt
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
