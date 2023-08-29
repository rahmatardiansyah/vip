import { TableRobert, Button, Katex } from '../../components';
import { useRef, useEffect, useState } from 'react';
import { imageDataRadio } from './imageData';
import {
  FaCircleChevronRight,
  FaCirclePlay,
  FaCirclePause,
  FaCircleStop,
} from 'react-icons/fa6';
import './robert.scss';
import Axios from 'axios';
import { SyncLoader } from 'react-spinners';
const API = import.meta.env.VITE_APP_API;

const { image1, image2, image3, image4, image5 } = imageDataRadio;
const rows = [];

const Robert = () => {
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState({
    imageOriginal: image1.original,
    imageGrayscale: image1.grayscale,
    imageRobert: image1.robert,
  });

  const [imageDataTable, setImageDataTable] = useState(image1.imageData);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState('');

  const handleFileChange = (event) => {
    const fileObj = event.target.files[0];
    setSelectedImage(fileObj);
    if (!fileObj) {
      return;
    }
  };
  const resetFileInput = () => {
    inputRef.current.value = null;
    setSelectedImage(null);
  };

  const modalImageClick = (e) => {
    setModalImage(e.target.src);
  };

  const onProcess = async () => {
    setLoading(true);
    const menuToggle = document.getElementById('collapseExample');
    if (menuToggle.classList.contains('show')) {
      new bootstrap.Collapse(menuToggle).toggle();
    }

    const formData = new FormData();

    if (selectedImage) {
      formData.append('image', selectedImage);
    } else {
      const selectedImageRadio = JSON.parse(
        [...document.getElementsByName('image')].find((r) => r.checked).value
      );
      setImage({
        imageOriginal: selectedImageRadio.original,
        imageGrayscale: selectedImageRadio.grayscale,
        imageRobert: selectedImageRadio.robert,
      });
      setImageDataTable(selectedImageRadio.imageData);
      setLoading(false);
      return;
    }

    try {
      const res = await Axios.post(`${API}/v1/robert/post`, formData);
      if (res.status === 201) {
        setImage({
          imageOriginal: `${res.data.data['image']}`,
          imageGrayscale: `${res.data.data['image-grayscale']}`,
          imageRobert: `${res.data.data['image-robert']}`,
        });
        const newArr = [];
        for (let i = 1; i < res.data.dataImage.grayscaleRgb.length; i += 3) {
          newArr.push(res.data.dataImage.grayscaleRgb[i]);
        }
        setImageDataTable(newArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.title = 'Robert Algoritma';
  }, []);
  rows.splice(0, rows.length); // empty array
  for (let i = 0; i < imageDataTable.length; i += 7) {
    rows.push(imageDataTable.slice(i, i + 7));
  }
  return (
    <div className="robert-section">
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
          <Button
            text="Proses"
            className="btn btn-success process"
            onClick={onProcess}
          />
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
                <img
                  src={image1.original}
                  className="rounded mx-2 my-2"
                  alt="Apel"
                  width="200"
                />
              </label>
              <label>
                <input
                  type="radio"
                  name="image"
                  className="radio-choose-image"
                  value={JSON.stringify(image2)}
                />
                <img
                  src={image2.original}
                  className="rounded mx-2 my-2"
                  alt="Kok"
                  width="200"
                />
              </label>
              <label>
                <input
                  type="radio"
                  name="image"
                  className="radio-choose-image"
                  value={JSON.stringify(image3)}
                />
                <img
                  src={image3.original}
                  className="rounded mx-2 my-2"
                  alt="Daun"
                  width="200"
                />
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
                <img
                  src={image5.original}
                  className="rounded mx-2 my-2"
                  alt="Jam"
                  width="200"
                />
              </label>
            </div>
          </div>
        </div>
        {loading && (
          <div className="text-center my-5">
            <SyncLoader color="#b4bcc2" margin={5} size={16} />
          </div>
        )}
        <div className="d-flex justify-content-evenly flex-wrap gap-4 my-5">
          <img
            src={`${image.imageOriginal}`}
            className="img-fluid robert-result"
            width="300"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onLoad={() => setLoading(false)}
            style={{
              display: loading ? 'none' : 'block',
            }}
            onClick={(e) => modalImageClick(e)}
          />
          <img
            src={`${image.imageGrayscale}`}
            className="img-fluid robert-result"
            width="300"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onLoad={() => setLoading(false)}
            style={{
              display: loading ? 'none' : 'block',
            }}
            onClick={(e) => modalImageClick(e)}
          />
          <img
            src={`${image.imageRobert}`}
            className="img-fluid robert-result"
            width="300"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onLoad={() => setLoading(false)}
            style={{
              display: loading ? 'none' : 'block',
            }}
            onClick={(e) => modalImageClick(e)}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-7">
            <table className="table table-bordered text-center">
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, columnIndex) => (
                      <td key={columnIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-xl-5 current-process">
            <div className="current-process-title">Current Process</div>
            <div className="d-flex flex-column gap-4">
              <Katex mathExpression="\sqrt{(1-2)^2 + (1-2)^2} = 1" />
              <Katex mathExpression="\sqrt{(1-2)^2 + (1-2)^2} = 1" />
              <Katex mathExpression="\sqrt{(1-2)^2 + (1-2)^2} = 1" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-evenly flex-wrap my-5 animation-button">
          <FaCircleChevronRight size={80} />
          <FaCirclePlay size={80} />
          <FaCirclePause size={80} />
          <FaCircleStop size={80} />
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-2">
            <img src={modalImage} alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robert;
