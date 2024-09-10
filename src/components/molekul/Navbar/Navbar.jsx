import { useEffect, useState, useRef } from 'react';
import Logo from '../../../assets/icons/Logo';
import Toggle from '../../../assets/icons/Toggle';
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

import './Navbar.css';

const navMenu = [
  {
    url: '/grayscale',
    name: 'Grayscale'
  },
  {
    url: '/invert',
    name: 'Invert'
  },
  {
    url: '/brightness',
    name: 'Brightness'
  },
  {
    url: '/threshold',
    name: 'Threshold'
  },
  {
    url: '/blending',
    name: 'Blending'
  },
  {
    url: '/substraction',
    name: 'Substraction'
  },
  {
    url: '/correlation',
    name: 'Correlation'
  }
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuText, setMenuText] = useState('Algoritma');

  const dropdownRef = useRef();

  const pathname = useLocation();

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    navMenu.map((item) => {
      if (item.url === pathname.pathname) {
        setMenuText(item.name);
      }
    });

    const dropdownHandler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', dropdownHandler);

    return () => {
      document.removeEventListener('mousedown', dropdownHandler);
    };
  }, []);

  return (
    <nav className="my-4 z-50">
      <div className="h-20 flex items-center justify-between">
        <div className="z-30 ml-4 sm:text-4xl text-2xl">
          <a href="/" className="flex gap-2 sm:gap-4 items-center">
            <Logo />
            <span>VIP</span>
          </a>
        </div>
        <Toggle click={handleToggle} isNavOpen={isNavOpen} />
        <ul
          className={`absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center gap-16 bg-gray-100 text-[1.1rem] transition-all duration-500 sm:static sm:h-0 sm:translate-y-0 sm:flex-row sm:gap-4 lg:gap-8 ${isNavOpen ? 'translate-y-0' : '-translate-y-full'} sm:justify-end z-30`}
        >
          <li
            className={`hover:text-red-400 ${pathname.pathname === '/' && pathname.hash === '' && 'text-red-500'}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <a href="/">Beranda</a>
          </li>
          <li
            className={`hover:text-red-400 ${pathname.pathname === '/' && pathname.hash === '#topics' && 'text-red-500'}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <a href="/#topics">Topik</a>
          </li>
          <li
            className={`hover:text-red-400 ${pathname.pathname === '/' && pathname.hash === '#basic' && 'text-red-500'}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <a href="/#basic">Teori</a>
          </li>
          <li className="mr-4 relative" ref={dropdownRef}>
            <div
              className="bg-[#F5BC33] hover:bg-[#d6a32c] py-2 px-2 flex items-center gap-2 border-black border-2 rounded cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p>{menuText}</p> <IoIosArrowDown />
            </div>
            <div
              className={`absolute bottom-16 sm:bottom-auto sm:top-16 sm:right-0 bg-gray-100 rounded border shadow-xl cursor-pointer ${isDropdownOpen ? 'block' : 'hidden'}`}
            >
              <ul className="flex flex-col px-8 py-4 sm:text-xl text-md gap-4">
                {navMenu.map((item) => {
                  return (
                    <li key={item.url}>
                      <a href={item.url}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
