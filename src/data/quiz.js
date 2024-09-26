const quizData = [
  {
    id: 1,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'Apa fungsi dari operasi grayscale dalam pengolahan citra?',
    options: [
      'Mengubah gambar hitam putih menjadi gambar berwarna',
      'Menggabungkan gambar RGB menjadi satu gambar',
      'Mengubah gambar berwarna (RGB) menjadi gambar hitam putih (grayscale)',
      'Menghapus warna pada gambar berwarna'
    ],
    answer: 'Mengubah gambar berwarna (RGB) menjadi gambar hitam putih (grayscale)'
  },
  {
    id: 2,
    type: 'multiple-choice',
    slug: 'grayscale',
    question:
      'Nilai apa saja yang digunakan dari setiap piksel untuk menghitung intensitas grayscale?',
    options: [
      'Hanya nilai merah',
      'Nilai merah, hijau, dan biru',
      'Nilai merah dan hijau',
      'Hanya nilai biru'
    ],
    answer: 'Nilai merah, hijau, dan biru'
  },
  {
    id: 3,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'Operasi grayscale menghitung intensitas dengan cara?',
    options: [
      'Mengambil rata-rata dari semua nilai piksel',
      'Menggabungkan nilai merah, hijau, dan biru dalam rumus tertentu',
      'Mengambil nilai tertinggi dari salah satu warna',
      'Mengurangi nilai hijau dari nilai merah'
    ],
    answer: 'Mengambil rata-rata dari semua nilai piksel'
  },
  {
    id: 4,
    type: 'multiple-choice',
    slug: 'grayscale',
    question:
      'Manakah dari pilihan berikut yang merupakan hasil dari konversi RGB ke grayscale dari piksel RGB (100, 120, 140)?',
    options: ['100', '120', '140', '130'],
    answer: '120'
  },
  {
    id: 5,
    type: 'static-input',
    slug: 'grayscale',
    question: 'Proses konversi RGB ke grayscale menghasilkan nilai berapa dalam skala warna?',
    answer: '0-255'
  },
  {
    id: 6,
    type: 'static-input',
    slug: 'grayscale',
    question: 'Berapakah nilai grayscale dari piksel RGB (255, 100, 80)?',
    answer: '145',
    inputType: 'number'
  },
  {
    id: 7,
    type: 'dynamic-input',
    slug: 'grayscale',
    question:
      'Jika sebuah citra memiliki piksel dengan nilai RGB ({R}, {G}, {B}), hitunglah nilai grayscale-nya menggunakan rumus yang benar.',
    generateQuestion: function() {
      const R = Math.floor(Math.random() * 256);
      const G = Math.floor(Math.random() * 256);
      const B = Math.floor(Math.random() * 256);
      const answer = String(Math.round((R + G + B) / 3));
      const question = `Jika sebuah citra memiliki piksel dengan nilai RGB (${R}, ${G}, ${B}), hitunglah nilai grayscale-nya.`;
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 8,
    type: 'static-input',
    slug: 'grayscale',
    question: 'Warna apakah yang dihasilkan dari RGB (0, 0, 0) dalam citra grayscale?',
    answer: 'hitam'
  },
  {
    id: 9,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Apa fungsi dari operasi invert dalam pengolahan citra grayscale?',
    options: [
      'Mengubah gambar grayscale menjadi gambar berwarna',
      'Membalik intensitas warna pada gambar grayscale',
      'Mengubah gambar grayscale menjadi gambar hitam',
      'Menghapus informasi warna pada gambar'
    ],
    answer: 'Membalik intensitas warna pada gambar grayscale'
  },
  {
    id: 10,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Nilai apa yang diubah dalam operasi invert pada gambar grayscale?',
    options: ['Nilai intensitas piksel', 'Nilai saturasi warna', 'Nilai brightness', 'Nilai hue'],
    answer: 'Nilai intensitas piksel'
  },
  {
    id: 11,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Operasi invert menghitung nilai baru dengan rumus?',
    options: [
      'Nilai baru = 255 - nilai lama',
      'Nilai baru = nilai lama / 2',
      'Nilai baru = nilai lama + 100',
      'Nilai baru = nilai lama * 2'
    ],
    answer: 'Nilai baru = 255 - nilai lama'
  },
  {
    id: 12,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Jika nilai grayscale dari sebuah piksel adalah 100, berapakah nilai invert-nya?',
    options: ['155', '255', '200', '100'],
    answer: '155'
  },
  {
    id: 13,
    type: 'static-input',
    slug: 'invert',
    question: 'Berapakah nilai hasil invert dari piksel grayscale dengan nilai 50?',
    answer: '205',
    inputType: 'number'
  },
  {
    id: 14,
    type: 'static-input',
    slug: 'invert',
    question: 'Jika sebuah piksel memiliki nilai grayscale 180, berapakah hasil invert-nya?',
    answer: '75',
    inputType: 'number'
  },
  {
    id: 15,
    type: 'dynamic-input',
    slug: 'invert',
    question:
      'Jika sebuah piksel memiliki nilai grayscale ({grayscale}), hitunglah nilai invert-nya menggunakan rumus yang benar.',
    generateQuestion: function() {
      const grayscale = Math.floor(Math.random() * 256);
      const answer = String(255 - grayscale);
      const question = `Jika sebuah piksel memiliki nilai grayscale ${grayscale}, hitunglah nilai invert-nya.`;
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 16,
    type: 'static-input',
    slug: 'invert',
    question: 'Warna apakah yang dihasilkan dari nilai invert grayscale 255?',
    answer: 'hitam'
  }
];

export default quizData;
