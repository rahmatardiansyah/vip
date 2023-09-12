import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';

const ImageResultRobert = ({ image, loading, setLoading }) => {
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
          height="100%"
          alt="..."
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onLoad={() => setLoading(false)}
          style={{
            display: loading ? 'none' : 'block',
          }}
        />
        <img
          src={`${image.imageGrayscale}`}
          className="img-fluid robert-result"
          width="300"
          height="100%"
          alt="..."
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onLoad={() => setLoading(false)}
          style={{
            display: loading ? 'none' : 'block',
          }}
        />
        <img
          src={`${image.imageRobert}`}
          className="img-fluid robert-result"
          width="300"
          height="100%"
          alt="..."
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onLoad={() => setLoading(false)}
          style={{
            display: loading ? 'none' : 'block',
          }}
        />
      </div>
    </div>
  );
};

ImageResultRobert.propTypes = {
  image: PropTypes.object,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default ImageResultRobert;
