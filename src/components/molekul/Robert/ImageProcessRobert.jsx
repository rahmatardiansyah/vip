import { useRef, useState } from 'react';
import { Button } from '../../../components';
import axios from 'axios';

import PropTypes from 'prop-types';

const API = import.meta.env.VITE_APP_API;

const ImageRobertProses = ({ imageDataRadio, setImage, setLoading, setRows }) => {
  const { image1, image2, image3, image4, image5 } = imageDataRadio;
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to clear the selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = ''; // Clear the file input
  };

  const onProcess = async () => {
    setLoading(true);
    const menuToggle = document.getElementById('collapseExample');
    if (menuToggle.classList.contains('show')) {
      new bootstrap.Collapse(menuToggle).toggle();
    }

    const formData = new FormData();

    if (selectedFile) formData.append('image', selectedFile);

    if (!selectedFile) {
      const selectedImageRadio = JSON.parse(
        [...document.getElementsByName('image')].find((r) => r.checked).value
      );
      setImage({
        imageOriginal: selectedImageRadio.original,
        imageGrayscale: selectedImageRadio.grayscale,
        imageRobert: selectedImageRadio.robert,
      });

      const newRows = [];
      for (let i = 0; i < 7; i++) {
        let row = [];
        for (let j = 0; j < 7; j++) {
          const dataIndex = i * 7 + j;
          if (dataIndex < selectedImageRadio.imageData.length) {
            row.push(<td key={dataIndex}>{selectedImageRadio.imageData[dataIndex]}</td>);
          } else {
            row.push(<td key={dataIndex}></td>);
          }
        }
        newRows.push(<tr key={i}>{row}</tr>);
      }
      setRows(newRows);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API}/v1/robert/post`, formData);
      if (res.status === 201) {
        setImage({
          imageOriginal: `${res.data.data['image']}`,
          imageGrayscale: `${res.data.data['image-grayscale']}`,
          imageRobert: `${res.data.data['image-robert']}`,
        });
        console.log(res.data.dataImage.grayscaleRgb);
        const newRows = [];
        for (let i = 0; i < 7; i++) {
          const row = [];
          for (let j = 0; j < 7; j++) {
            const dataIndex = i * 7 + j;
            if (dataIndex < res.data.dataImage.grayscaleRgb.length) {
              row.push(<td key={dataIndex}>{res.data.dataImage.grayscaleRgb[dataIndex]}</td>);
            } else {
              row.push(<td key={dataIndex}></td>);
            }
          }
          newRows.push(<tr key={i}>{row}</tr>);
        }
        setRows(newRows);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-evenly flex-wrap gap-3 mb-5">
        <Button
          text="Pilih Gambar"
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        />
        <div className="input-group p-2">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
            accept="image/png, image/jpg, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            className="btn btn-outline-danger"
            text="X"
            type="button"
            id="inputGroupFileAddon04"
            onClick={handleClearFile}
          />
        </div>
        <Button text="Proses" className="btn btn-success process" onClick={onProcess} />
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body ">
          <div className="hidden-radio d-flex justify-content-evenly flex-wrap">
            <label>
              <input
                type="radio"
                name="image"
                className="radio-choose-image"
                value={JSON.stringify(image1)}
                defaultChecked
              />
              <img src={image1.original} className="rounded mx-2 my-2" alt="Apel" width="200" />
            </label>
            <label>
              <input
                type="radio"
                name="image"
                className="radio-choose-image"
                value={JSON.stringify(image2)}
              />
              <img src={image2.original} className="rounded mx-2 my-2" alt="Kok" width="200" />
            </label>
            <label>
              <input
                type="radio"
                name="image"
                className="radio-choose-image"
                value={JSON.stringify(image3)}
              />
              <img src={image3.original} className="rounded mx-2 my-2" alt="Daun" width="200" />
            </label>
            <label>
              <input
                type="radio"
                name="image"
                className="radio-choose-image"
                value={JSON.stringify(image4)}
              />
              <img
                src={image4.original}
                className="rounded mx-2 my-2"
                alt="Burung Hantu"
                width="200"
              />
            </label>
            <label>
              <input
                type="radio"
                name="image"
                className="radio-choose-image"
                value={JSON.stringify(image5)}
              />
              <img src={image5.original} className="rounded mx-2 my-2" alt="Jam" width="200" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

ImageRobertProses.propTypes = {
  imageDataRadio: PropTypes.object,
  setImage: PropTypes.func,
  setLoading: PropTypes.func,
  setRows: PropTypes.func,
};

export default ImageRobertProses;
