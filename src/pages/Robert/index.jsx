import { TableRobert, Button, Katex } from '../../components';
import { useRef } from 'react';

import './robert.scss';

const Robert = () => {
  const inputRef = useRef(null);

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
  };
  const resetFileInput = () => {
    inputRef.current.value = null;
  };
  return (
    <div className=" robert-section">
      <div className="container">
        <h3>Robert</h3>
        <p>
          Operator yang berbasis gradien yang menggunakan dua buah kernel yang
          berukuran 2x2 piksel. Operator ini mengambil arah diagonal untuk
          penentuan arah dalam penghitungan nilai gradien, sehingga sering
          disebut dengan operator silang.
        </p>
        <TableRobert />
        <div className="text-center mt-5">
          <Katex mathExpression="r(y,x)=\sqrt{(z_1-z_4)^2 + (z_3-z_2)^2}" />
        </div>
      </div>
      <div className="divider my-5"></div>
      <div className="container">
        <div className="d-flex justify-content-evenly flex-wrap gap-3 mb-5">
          <Button text="Pilih Gambar" className="btn btn-primary" />
          <div className="input-group p-2">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <Button
              className="btn btn-outline-danger"
              text="X"
              type="button"
              id="inputGroupFileAddon04"
              onClick={resetFileInput}
            />
          </div>
          <Button text="Proses" className="btn btn-success process" />
        </div>
      </div>
    </div>
  );
};

export default Robert;
