import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';

const ImageResultRobert = ({ image, loading, setLoading, modalImage, setModalImage }) => {
  const modalImageClick = (e) => {
    setModalImage(e.target.src);
  };
  return (
    <div>
      {loading && (
        <div className="text-center my-5">
          <SyncLoader color="#b4bcc2" margin={5} size={16} />
        </div>
      )}
      <div className="d-flex justify-content-evenly flex-wrap gap-4 my-5">
        <img
          src={image.imageOriginal}
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

ImageResultRobert.propTypes = {
  image: PropTypes.object,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  modalImage: PropTypes.string,
  setModalImage: PropTypes.func,
};

export default ImageResultRobert;
