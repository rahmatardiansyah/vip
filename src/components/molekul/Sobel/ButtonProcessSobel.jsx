import { useState } from 'react';
import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleXmark } from 'react-icons/fa6';
import PropTypes from 'prop-types';

const ButtonProcessSobel = ({ setD1, setD2, setResultSobel, rows }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [indexI, setIndexI] = useState(1);
  const [indexJ, setIndexJ] = useState(1);

  const getTable = () => {
    const dataTable = document.getElementById('TableSobel');
    const tdElements = dataTable.getElementsByTagName('td');

    const dataTd = [];
    let dataIndex = 0;
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(tdElements[dataIndex]);
        dataIndex++;
      }
      dataTd.push(row);
    }
    return dataTd;
  };

  const changeColor = (dataTd, bool = false, time = 2000, first = false) => {
    const prewittX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ];
    const prewittY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
    ];

    let i = indexI;
    let j = indexJ;

    if (first) {
      dataTd[i - 1][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i - 1][j].style.backgroundColor = '#f25f67';
      dataTd[i - 1][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i][j].style.backgroundColor = '#f25f67';
      dataTd[i][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j + 1].style.backgroundColor = '#f25f67';
    }

    const startInterval = setInterval(() => {
      setIsPlayed(true);
      if (isDisabled) return;
      dataTd[i - 1][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i - 1][j].style.backgroundColor = '#f25f67';
      dataTd[i - 1][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i][j].style.backgroundColor = '#f25f67';
      dataTd[i][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j - 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j + 1].style.backgroundColor = '#f25f67';

      dataTd[i - 1][j - 1].style.transition = 500 + 'ms';
      dataTd[i - 1][j].style.transition = 500 + 'ms';
      dataTd[i - 1][j + 1].style.transition = 500 + 'ms';
      dataTd[i][j - 1].style.transition = 500 + 'ms';
      dataTd[i][j].style.transition = 500 + 'ms';
      dataTd[i][j + 1].style.transition = 500 + 'ms';
      dataTd[i + 1][j - 1].style.transition = 500 + 'ms';
      dataTd[i + 1][j].style.transition = 500 + 'ms';
      dataTd[i + 1][j + 1].style.transition = 500 + 'ms';

      const gxd1 = dataTd[i - 1][j - 1].textContent;
      const gxd2 = dataTd[i - 1][j].textContent;
      const gxd3 = dataTd[i - 1][j + 1].textContent;
      const gxd4 = dataTd[i][j - 1].textContent;
      const gxd5 = dataTd[i][j].textContent;
      const gxd6 = dataTd[i][j + 1].textContent;
      const gxd7 = dataTd[i + 1][j - 1].textContent;
      const gxd8 = dataTd[i + 1][j].textContent;
      const gxd9 = dataTd[i + 1][j + 1].textContent;

      const gx = Math.abs(
        gxd1 * prewittX[0][0] +
          gxd3 * prewittX[0][2] +
          gxd4 * prewittX[1][0] +
          gxd6 * prewittX[0][2] +
          gxd7 * prewittX[2][0] +
          gxd9 * prewittX[0][2]
      );

      const gy = Math.abs(
        gxd1 * prewittY[0][0] +
          gxd2 * prewittY[0][1] +
          gxd3 * prewittY[0][2] +
          gxd7 * prewittY[2][0] +
          gxd8 * prewittY[2][1] +
          gxd9 * prewittY[2][2]
      );

      setD1(
        `d_1 = |(1*${gxd1})+(-1*${gxd3})+(1*${gxd4})+(-1*${gxd6})+(1*${gxd7})+(-1*${gxd9})| = ${gx}`
      );
      setD2(
        `d_2 = |(-1*${gxd1})+(-1*${gxd2})+(-1*${gxd3})+(1*${gxd7})+(1*${gxd8})+(1*${gxd9})| = ${gy}`
      );

      const gradientResult = `Hasil = \\sqrt{{${gx}^2}+{${gy}^2}} = `;
      setResultSobel(gradientResult);
      const gradient = Math.round(Math.sqrt(gx * gx + gy * gy));

      const timeout1 = setTimeout(() => {
        setResultSobel(gradientResult + `${gradient}`);
        dataTd[i][j].innerHTML = gradient;
        dataTd[i][j].style.backgroundColor = '#f53267';

        j++;
        setIndexJ(j);

        if (j >= 6) {
          j = 1;
          setIndexJ(j);

          i++;
          setIndexI(i);
        }

        if (i == 6 && j == 1) {
          setTimeout(() => {
            dataTd[4][4].style.backgroundColor = '#212529';
            dataTd[4][5].style.backgroundColor = '#212529';
            dataTd[4][6].style.backgroundColor = '#212529';
            dataTd[5][4].style.backgroundColor = '#212529';
            dataTd[5][5].style.backgroundColor = '#212529';
            dataTd[5][6].style.backgroundColor = '#212529';
            dataTd[6][4].style.backgroundColor = '#212529';
            dataTd[6][5].style.backgroundColor = '#212529';
            dataTd[6][6].style.backgroundColor = '#212529';
            stopAnimation();
          }, 1000);
        }
        setIsDisabled(false);
      }, 1000);
      setTimeoutId(timeout1);

      // console.log(i, j);
      // reset color
      if (j > 1) {
        dataTd[i - 1][j - 2].style.backgroundColor = '#212529';
        dataTd[i][j - 2].style.backgroundColor = '#212529';
        dataTd[i + 1][j - 2].style.backgroundColor = '#212529';
      }

      if (i > 1 && j == 1) {
        dataTd[i - 2][4].style.backgroundColor = '#212529';
        dataTd[i - 2][5].style.backgroundColor = '#212529';
        dataTd[i - 2][6].style.backgroundColor = '#212529';
        dataTd[i - 1][4].style.backgroundColor = '#212529';
        dataTd[i - 1][5].style.backgroundColor = '#212529';
        dataTd[i - 1][6].style.backgroundColor = '#212529';
        dataTd[i][4].style.backgroundColor = '#212529';
        dataTd[i][5].style.backgroundColor = '#212529';
        dataTd[i][6].style.backgroundColor = '#212529';
      }

      if (bool == true) {
        clearInterval(startInterval);
      }

      if (i == 5 && j == 5) {
        clearInterval(startInterval);
        setIsPause(false);
        setIsPlayed(false);
      }

      setIsDisabled(true);
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
    clearTimeout(timeoutId);
    setIntervalId(null);
    setTimeoutId(null);
    setIsPlayed(false);
    setIsPause(false);

    // reset index
    setIndexI(1);
    setIndexJ(1);

    const dataTd = getTable();
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        dataTd[i][j].style.backgroundColor = '#212529';
        dataTd[i][j].textContent = rows[i * 7 + j];
      }
    }
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

ButtonProcessSobel.propTypes = {
  setD1: PropTypes.func,
  setD2: PropTypes.func,
  setResultSobel: PropTypes.func,
  rows: PropTypes.array
};

export default ButtonProcessSobel;
