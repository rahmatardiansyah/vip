import { ReactLogo } from '../../../assets';
import './footer.scss';

const CustomFooter = () => {
  return (
    <footer>
      <p>
        Dibuat dengan{' '}
        <a href="https://react.dev/">
          <img className="react-logo" src={ReactLogo} alt="logo" />
        </a>
        oleh <a href="https://github.com/rahmatardiansyah">Mat</a>.
      </p>
    </footer>
  );
};

export default CustomFooter;
