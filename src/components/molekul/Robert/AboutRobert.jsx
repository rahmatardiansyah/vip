import TableRobert from './TableRobert';
import { Katex } from '../../atoms';

const AboutRobert = () => {
  return (
    <div className="container">
      <h3>Roberto</h3>
      <p>
        Operator yang berbasis gradien yang menggunakan dua buah kernel yang
        berukuran 2x2 piksel. Operator ini mengambil arah diagonal untuk
        penentuan arah dalam penghitungan nilai gradien, sehingga sering disebut
        dengan operator silang.
      </p>
      <TableRobert />
      <div className="text-center mt-5">
        <Katex mathExpression="r(y,x)=\sqrt{(z_1-z_4)^2 + (z_3-z_2)^2}" />
      </div>
    </div>
  );
};

export default AboutRobert;
