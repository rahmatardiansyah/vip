import TableLaplacian from './TableLaplacian';
import { Katex } from '../../atoms';

const AboutPrewitt = () => {
  return (
    <div className="container">
      <h3>Laplacian</h3>
      <p>
        Deteksi tepi Prewitt adalah salah satu teknik yang relatif sederhana dan cepat untuk
        menemukan tepi dalam citra. Ini dapat digunakan dalam berbagai aplikasi pengolahan citra
        seperti pengenalan objek, pemrosesan gambar medis, atau pemrosesan citra untuk ekstraksi
        fitur. Namun, karena operator Prewitt hanya menggunakan informasi dari tetangga-tetangga
        piksel dalam jarak 3x3, deteksi tepi ini mungkin tidak selalu memberikan hasil yang optimal
        dalam kasus-kasus di mana tepi sangat tipis atau kabur.
      </p>
      <TableLaplacian />
      <div className="text-center mt-5">
        <Katex mathExpression="G=\sqrt{(I * Gx)^2 + (I * Gy)^2}" />
      </div>
    </div>
  );
};

export default AboutPrewitt;
