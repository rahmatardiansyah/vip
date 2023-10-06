import { useState } from 'react';
import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleXmark } from 'react-icons/fa6';
import PropTypes from 'prop-types';

const ButtonProcessRobert = ({ setD1, setD2, setResultRobert }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [indexI, setIndexI] = useState(0);
  const [indexJ, setIndexJ] = useState(0);

  const getTable = () => {
    const dataTable = document.getElementById('TableRobert');
    const tdElements = dataTable.getElementsByTagName('td');

    const dataTd = [];
    let dataIndex = 0;
    for (let i = 0; i < 7; i++) {
      const rows = [];
      for (let j = 0; j < 7; j++) {
        rows.push(tdElements[dataIndex]);
        dataIndex++;
      }
      dataTd.push(rows);
    }
    return dataTd;
  };

  const changeColor = (dataTd, bool = false, time = 2000, first = false) => {
    const robertsX = [
      [1, 0],
      [0, -1]
    ];
    const robertsY = [
      [0, 1],
      [-1, 0]
    ];

    let i = indexI;
    let j = indexJ;

    if (first) {
      dataTd[i][j].style.backgroundColor = '#f25f67';
      dataTd[i][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j + 1].style.backgroundColor = '#f25f67';
    }

    const startInterval = setInterval(() => {
      setIsPlayed(true);
      dataTd[i][j].style.backgroundColor = '#f25f67';
      dataTd[i][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j + 1].style.backgroundColor = '#f25f67';

      dataTd[i][j].style.transition = 500 + 'ms';
      dataTd[i][j + 1].style.transition = 500 + 'ms';
      dataTd[i + 1][j].style.transition = 500 + 'ms';
      dataTd[i + 1][j + 1].style.transition = 500 + 'ms';

      const gxd1 = dataTd[i][j].textContent;
      const gxd2 = dataTd[i][j + 1].textContent;
      const gxd3 = dataTd[i + 1][j].textContent;
      const gxd4 = dataTd[i + 1][j + 1].textContent;

      const gx = Math.abs(
        gxd1 * robertsX[0][0] +
          gxd2 * robertsX[0][1] +
          gxd3 * robertsX[1][0] +
          gxd4 * robertsX[1][1]
      );
      const gy = Math.abs(
        gxd1 * robertsY[0][0] +
          gxd2 * robertsY[0][1] +
          gxd3 * robertsY[1][0] +
          gxd4 * robertsY[1][1]
      );

      setD1(`d_1 = |(1*${gxd1})+(0*${gxd2})+(0*${gxd3})+(-1*${gxd4})| = ${gx}`);
      setD2(`d_2 = |(0*${gxd1})+(1*${gxd2})+(-1*${gxd3})+(0*${gxd4})| = ${gy}`);
      const gradientResult = `Hasil = \\sqrt{{${gx}^2}+{${gy}^2}} = `;
      setResultRobert(gradientResult);

      const gradient = Math.round(Math.sqrt(gx * gx + gy * gy));

      setTimeout(function () {
        setResultRobert(gradientResult + `${gradient}`);
        dataTd[i][j].innerHTML = gradient;
        dataTd[i][j].style.backgroundColor = '#f53267';

        j++;
        setIndexJ(j);

        if (j >= 6) {
          j = 0;
          setIndexJ(j);

          i++;
          setIndexI(i);
        }

        if (i == 6 && j == 0) {
          setTimeout(() => {
            dataTd[5][5].style.backgroundColor = '#212529';
            dataTd[5][6].style.backgroundColor = '#212529';
            dataTd[6][5].style.backgroundColor = '#212529';
            dataTd[6][6].style.backgroundColor = '#212529';
            setIndexI(0);
            setIndexJ(0);
          }, 1000);
        }
      }, 1000);

      if (j > 0) {
        dataTd[i][j - 1].style.backgroundColor = '#212529';
        dataTd[i + 1][j - 1].style.backgroundColor = '#212529';
      }

      if (i > 0 && j == 0) {
        dataTd[i][5].style.backgroundColor = '#212529';
        dataTd[i][6].style.backgroundColor = '#212529';
        dataTd[i - 1][5].style.backgroundColor = '#212529';
        dataTd[i - 1][6].style.backgroundColor = '#212529';
      }

      if (bool == true) {
        clearInterval(startInterval);
      }

      if (i == 5 && j == 5) {
        clearInterval(startInterval);
        setIsPause(false);
        setIsPlayed(false);
      }
    }, time);
    setIntervalId(startInterval);
  };

  const playAnimation = () => {
    const dataTd = getTable();
    if (!isPlayed) {
      setIsPause(false);
      changeColor(dataTd, false, 2000, true);
    }
  };

  const stopAnimation = () => {
    // Clear Interval and reset useState
    clearInterval(intervalId);
    setIntervalId(null);
    setIsPlayed(false);
    setIsPause(false);

    // reset index
    setIndexI(0);
    setIndexJ(0);

    // Change to default color
    const dataTd = getTable();
    dataTd.map((item) => {
      item.map((i) => {
        i.style.backgroundColor = '#212529';
      });
    });
  };

  const pauseAnimation = () => {
    if (!isPlayed) return;
    if (isPlayed && !isPause) {
      setIsPause(true);
      clearInterval(intervalId);
    }
  };

  const resumeAnimation = () => {
    const dataTd = getTable();
    changeColor(dataTd);
    setIsPause(false);
  };

  const playOneStep = () => {
    const dataTd = getTable();

    // if not played
    if (!isPlayed && !isPause) {
      changeColor(dataTd, true, 500);
      setIsPause(true);
    }

    // if played but not pause
    if (isPlayed && !isPause) {
      pauseAnimation();
    }

    // Play but just one step
    if (isPlayed && isPause) {
      changeColor(dataTd, true, 500);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-evenly flex-wrap my-5 animation-button">
        <FaCircleChevronRight size={80} onClick={playOneStep} />
        {isPause ? (
          <FaCirclePlay size={80} onClick={resumeAnimation} />
        ) : (
          <FaCirclePause size={80} onClick={pauseAnimation} />
        )}

        {!isPlayed && <FaCirclePlay size={80} onClick={playAnimation} />}
        {isPlayed && <FaCircleXmark size={80} onClick={stopAnimation} />}
      </div>
    </div>
  );
};

ButtonProcessRobert.propTypes = {
  setD1: PropTypes.func,
  setD2: PropTypes.func,
  setResultRobert: PropTypes.func
};

export default ButtonProcessRobert;
