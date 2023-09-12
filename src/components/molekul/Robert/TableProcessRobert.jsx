import { useState, useEffect, useCallback } from 'react';
import { Katex } from '../../../components';
import PropTypes from 'prop-types';

const TableProcessRobert = ({ rows, setRows, imageData, d1, d2, resultRobert }) => {
  const generateTable = useCallback(() => {
    let newRows = [];
    const numRows = Math.ceil(imageData.length / 7);
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        const dataIndex = i * 7 + j;
        if (dataIndex < imageData.length) {
          row.push(<td key={dataIndex}>{imageData[dataIndex]}</td>);
        } else {
          row.push(<td key={dataIndex}></td>);
        }
      }
      newRows.push(<tr key={i}>{row}</tr>);
    }
    setRows(newRows);
  }, [setRows, imageData]);

  useEffect(() => {
    generateTable();
  }, [generateTable]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-7">
          <table className="table table-bordered text-center" id="TableRobert">
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div className="col-xl-5 current-process">
          <div className="current-process-title">Proses saat ini</div>
          <div className="d-flex flex-column gap-4">
            <Katex mathExpression={d1} />
            <Katex mathExpression={d2} />
            <Katex mathExpression={resultRobert} />
          </div>
        </div>
      </div>
    </div>
  );
};

TableProcessRobert.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func,
  imageData: PropTypes.array,
  d1: PropTypes.string,
  d2: PropTypes.string,
  resultRobert: PropTypes.string,
};

export default TableProcessRobert;
