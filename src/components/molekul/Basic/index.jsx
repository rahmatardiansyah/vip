import Accordion from '../../atoms/Accordion';

const Basic = () => {
  return (
    <section className="max-w-screen-xl bg-no-repeat bg-cover mx-auto my-20 p-4" id="basic">
      <p className="text-xl sm:text-2xl md:text-4xl text-center">
        Teori Dasar Pengolahan Citra Digital
      </p>
      <p className="mt-8 text-xl">
        Pengolahan citra digital adalah disiplin ilmu yang berfokus pada manipulasi gambar digital
        melalui algoritma komputer. Beberapa teori dasar dalam pengolahan citra digital meliputi:
      </p>
      <div className="p-4 bg-gray-100 mt-8 rounded shadow-xl border border-black">
        <Accordion title="Perolehan Citra (Image Acquisition)">
          Melibatkan proses pengambilan gambar dari sensor seperti kamera digital atau scanner.
          Citra yang diperoleh kemudian dikonversi menjadi format digital.
        </Accordion>
        <Accordion title="Perbaikan Citra (Image Enhancement)">
          Bertujuan untuk memperbaiki kualitas visual dari citra. Teknik-teknik yang digunakan
          termasuk peningkatan kontras, penghalusan (smoothing), dan penajaman (sharpening).
        </Accordion>
        <Accordion title="Restorasi Citra (Image Restoration)">
          Berfokus pada mengembalikan citra ke kondisi aslinya dengan menghilangkan noise atau blur.
          Teknik ini sering menggunakan model matematika untuk memperkirakan citra asli.
        </Accordion>
        <Accordion title="Pengompresan Citra (Image Compression)">
          Mengurangi ukuran file citra tanpa mengorbankan kualitas secara signifikan. Ada dua jenis
          utama: kompresi lossy (seperti JPEG) dan lossless (seperti PNG).
        </Accordion>
        <Accordion title="Segmentasi Citra (Image Segmentation)">
          Memisahkan citra menjadi bagian-bagian atau objek yang berbeda. Ini penting untuk analisis
          lebih lanjut dan pengenalan objek.
        </Accordion>
        <Accordion title="Pengenalan Citra (Image Recognition)">
          Mengidentifikasi dan mengklasifikasikan objek atau pola dalam citra. Ini mencakup aplikasi
          seperti pengenalan wajah, teks, dan objek.
        </Accordion>
        <Accordion title="Transformasi Citra (Image Transformation)">
          Mengubah citra dengan menggunakan teknik seperti transformasi Fourier, yang digunakan
          untuk analisis frekuensi dan pemrosesan sinyal.
        </Accordion>
        <Accordion title="Analisis Citra (Image Analysis)">
          Melibatkan ekstraksi informasi dari citra, seperti ukuran, bentuk, tekstur, dan warna.
          Teknik ini digunakan dalam berbagai aplikasi seperti medis, satelit, dan pengawasan.
        </Accordion>
      </div>
    </section>
  );
};

export default Basic;
