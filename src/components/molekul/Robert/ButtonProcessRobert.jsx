import { FaCircleChevronRight, FaCirclePlay, FaCirclePause, FaCircleStop } from 'react-icons/fa6';

const getTrTd = () => {
  const table = document.getElementById('TableRobert');
  const tdElements = table.querySelectorAll('td');

  const tableData = [];
  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push(tdElements[i * 7 + j]);
    }
    tableData.push(row);
  }

  return tableData;
};

const ButtonProcessRobert = () => {
  const playAnimation = () => {
    const data = getTrTd();
    console.log(data[0][0].textContent);
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
