import TableSobel from './TableSobel';
import { Katex } from '../../atoms';

const AboutSobel = () => {
  return (
    <div className="container">
      <h3>Sobel</h3>
      <p>
        Operator Sobel adalah salah satu operator yang digunakan dalam deteksi tepi pengolahan
        citra. Operator ini digunakan untuk mengidentifikasi perubahan intensitas yang tajam antara
        piksel-piksel dalam citra. Secara singkat, operator Sobel menghitung gradien citra pada
        setiap piksel dengan cara mengkonvolusi citra asli dengan dua kernel Sobel, satu untuk
        deteksi perubahan intensitas horizontal dan satu untuk perubahan intensitas vertikal. Hasil
        konvolusi ini menghasilkan citra gradien yang menggambarkan perubahan tajam dalam citra
        tersebut. Keberadaan tepi dalam citra dapat ditemukan dengan menganalisis magnitude gradien
        dan arah gradien pada setiap piksel. Operator Sobel sering digunakan dalam berbagai aplikasi
        pemrosesan citra, termasuk deteksi tepi, pengenalan objek, dan segmentasi citra.
      </p>
      <TableSobel />
      <div className="text-center mt-5">
        <Katex mathExpression="G=\sqrt{(I * Gx)^2 + (I * Gy)^2}" />
      </div>
    </div>
  );
};

export default AboutSobel;
