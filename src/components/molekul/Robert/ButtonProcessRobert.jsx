import { useState } from 'react';
import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleStop } from 'react-icons/fa6';

const ButtonProcessRobert = () => {
  const [isPlayed, setIsPlayed] = useState(false);

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

  const changeColor = (dataTd) => {
    const robertsX = [
      [1, 0],
      [0, -1]
    ];
    const robertsY = [
      [0, 1],
      [-1, 0]
    ];

    let i = 0;
    let j = 0;

    const interval = setInterval(() => {
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
        clearInterval(interval);
        setIsPlayed(false);
      }

      j++;

      if (j >= 6) {
        j = 0;
        i++;
      }

      if (i == 6 && j == 0) {
        setTimeout(() => {
          dataTd[5][5].style.backgroundColor = '#212529';
          dataTd[5][6].style.backgroundColor = '#212529';
          dataTd[6][5].style.backgroundColor = '#212529';
          dataTd[6][6].style.backgroundColor = '#212529';
        }, 500);
      }
    }, 500);
  };

  const playAnimation = () => {
    const dataTd = getTable();
    if (!isPlayed) {
      changeColor(dataTd);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-evenly flex-wrap my-5 animation-button">
        <FaCircleChevronRight size={80} />
        <FaCirclePause size={80} />
        <FaCirclePlay size={80} onClick={playAnimation} />
        <FaCircleStop size={80} />
      </div>
    </div>
  );
};

export default ButtonProcessRobert;
