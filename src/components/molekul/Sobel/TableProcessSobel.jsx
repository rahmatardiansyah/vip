import { Katex } from '../../../components';
import PropTypes from 'prop-types';

const TableProcessSobel = ({ rows, d1, d2, resultSobel }) => {
  const totalRows = 7;
  const totalCols = 7;
  const tableData = [];
  let dataIndex = 0;
  for (let i = 0; i < totalRows; i++) {
    const rowData = [];
    for (let j = 0; j < totalCols; j++) {
      if (dataIndex < rows.length) {
        rowData.push(rows[dataIndex]);
        dataIndex++;
      }
    }
    tableData.push(rowData);
  }

  const tableRows = tableData.map((rowData, rowIndex) => (
    <tr key={rowIndex}>
      {rowData.map((cellData, colIndex) => (
        <td key={colIndex}>{cellData}</td>
      ))}
    </tr>
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-7">
          <table className="table table-bordered text-center" id="TableSobel">
            <tbody>{tableRows}</tbody>
          </table>
          <small>Table citra grayscale yang diresize sebesar 7x7 pixel</small>
        </div>
        <div className="col-xl-5 current-process">
          <div className="current-process-title">Proses saat ini</div>
          <div className="d-flex flex-column gap-4">
            <Katex mathExpression={d1} />
            <Katex mathExpression={d2} />
            <Katex mathExpression={resultSobel} />
          </div>
        </div>
      </div>
    </div>
  );
};

TableProcessSobel.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func,
  imageData: PropTypes.array,
  d1: PropTypes.string,
  d2: PropTypes.string,
  resultSobel: PropTypes.string
};

export default TableProcessSobel;
