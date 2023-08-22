import { TableRobert, Button, Katex } from '../../components';
import { useRef, useEffect, useState } from 'react';
import { Image1, Image2, Image3, Image4, Image5 } from '../../assets';
import {
  FaCircleChevronRight,
  FaCirclePlay,
  FaCirclePause,
  FaCircleStop
} from 'react-icons/fa6';
import './robert.scss';
import Axios from 'axios';
const API = import.meta.env.VITE_APP_API;

const Robert = () => {
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState({
    imageRobert: `${API}/images/robert.png`
  });

  const handleFileChange = event => {
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

  const onProcess = async () => {
    const menuToggle = document.getElementById('collapseExample');
    if (menuToggle.classList.contains('show')) {
      new bootstrap.Collapse(menuToggle).toggle();
    }

    const formData = new FormData();

    if (selectedImage) {
      formData.append('image', selectedImage);
    } else {
      const selectedRadioButton = [...document.getElementsByName('image')].find(
        r => r.checked
      ).nextElementSibling.src;
      if (selectedRadioButton) {
        formData.append('image', selectedRadioButton);
      }
    }

    try {
      const res = await Axios.post(`${API}/v1/robert/post`, formData);
      if (res.status === 201) {
        setImage({
          imageRobert: `${API}${res.data.data['image-robert']}`
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.title = 'Robert Algoritma';
  }, []);
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
                  defaultChecked
                />
                <img
                  src={Image1}
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
                />
                <img
                  src={Image2}
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
                />
                <img
                  src={Image3}
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
                />
                <img
                  src={Image4}
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
                />
                <img
                  src={Image5}
                  className="rounded mx-2 my-2"
                  alt="Jam"
                  width="200"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly flex-wrap gap-4 my-5">
          <img
            src={`${image.imageRobert}`}
            className="img-fluid robert-result"
            width="300"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-7">
            <table className="table table-bordered text-center">
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
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
            <img src={`${image.imageRobert}`} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robert;
