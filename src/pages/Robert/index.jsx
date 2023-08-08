import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import './robert.scss';

const Robert = () => {
  return (
    <div className="container robert-section">
      <h3>Robert</h3>
      <p>
        Operator yang berbasis gradien yang menggunakan dua buah kernel yang
        berukuran 2x2 piksel. Operator ini mengambil arah diagonal untuk
        penentuan arah dalam penghitungan nilai gradien, sehingga sering disebut
        dengan operator silang.
      </p>
      <div className="row">
        <div className="col-xl-4">
          <table className="table table-bordered robert-table text-center">
            <tbody>
              <tr>
                <td className="rm-border-top rm-border-left rm-border-right"></td>
                <td className="rm-border-top rm-border-left">
                  <InlineMath>x</InlineMath>
                </td>
                <td>x+1</td>
              </tr>
              <tr>
                <td className="rm-border-top rm-border-left">y</td>
                <td>
                  <InlineMath>z_1</InlineMath>
                </td>
                <td>
                  <InlineMath>z_2</InlineMath>
                </td>
              </tr>
              <tr>
                <td className="rm-border-top rm-border-left rm-border-bottom">
                  <InlineMath>y+1</InlineMath>
                </td>
                <td>
                  <InlineMath>z_3</InlineMath>
                </td>
                <td>
                  <InlineMath>z_1</InlineMath>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-xl-4"></div>
        <div className="col-xl-4"></div>
      </div>
    </div>
  );
};

export default Robert;
