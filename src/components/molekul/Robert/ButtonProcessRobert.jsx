import { useState } from 'react';
import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleXmark } from 'react-icons/fa6';

const ButtonProcessRobert = () => {
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

  const changeColor = (dataTd, bool = false) => {
    let i = indexI;
    let j = indexJ;

    const startInterval = setInterval(() => {
      setIsPlayed(true);
      dataTd[i][j].style.backgroundColor = '#f25f67';
      dataTd[i][j + 1].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j].style.backgroundColor = '#f25f67';
      dataTd[i + 1][j + 1].style.backgroundColor = '#f25f67';

      if (j > 0) {
        dataTd[i][j - 1].style.backgroundColor = '#212529';
        dataTd[i + 1][j - 1].style.backgroundColor = '#212529';
        dataTd[i][j - 1].style.transition = 'transform 1s';
        dataTd[i + 1][j - 1].style.transition = 'transform 1s';
      }

      if (i > 0 && j == 0) {
        dataTd[i][5].style.backgroundColor = '#212529';
        dataTd[i][6].style.backgroundColor = '#212529';
        dataTd[i - 1][5].style.backgroundColor = '#212529';
        dataTd[i - 1][6].style.backgroundColor = '#212529';
      }

      if (i == 5 && j == 5) {
        clearInterval(startInterval);
        setIsPlayed(false);
      }

      j++;
      setIndexJ(j);

      if (j >= 6) {
        j = 0;
        setIndexJ(j);

        i++;
        setIndexI(i);
      }

      if (bool == true) {
        clearInterval(startInterval);
      }

      if (i == 6 && j == 0) {
        setTimeout(() => {
          dataTd[5][5].style.backgroundColor = '#212529';
          dataTd[5][6].style.backgroundColor = '#212529';
          dataTd[6][5].style.backgroundColor = '#212529';
          dataTd[6][6].style.backgroundColor = '#212529';
          setIndexI(0);
          setIndexJ(0);
        }, 500);
      }
    }, 500);
    setIntervalId(startInterval);
  };

  const playAnimation = () => {
    const dataTd = getTable();
    if (!isPlayed) {
      setIsPause(false);
      changeColor(dataTd);
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
    if (isPlayed && !isPause) {
      pauseAnimation();
    }

    // Play but just one step
    const dataTd = getTable();
    if (isPlayed && isPause) {
      changeColor(dataTd, true);
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

export default ButtonProcessRobert;
