import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleStop } from 'react-icons/fa6';

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

  let interval = setInterval(() => {
    dataTd[i][j].style.backgroundColor = '#f25f67';

    if (i == 6 && j == 6) clearInterval(interval);

    j++;

    if (j >= dataTd[i].length) {
      j = 0;
      i++;
    }
  }, 500);
};

const ButtonProcessRobert = () => {
  const playAnimation = () => {
    const dataTd = getTable();
    changeColor(dataTd);
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
