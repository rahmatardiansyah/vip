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
    question: 'Proses konversi RGB ke grayscale menghasilkan nilai intensitas dalam skala?',
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
  },
  {
    id: 17,
    type: 'multiple-choice',
    slug: 'brightness',
    question: 'Apa fungsi dari operasi brightness dalam pengolahan citra?',
    options: [
      'Meningkatkan atau menurunkan kecerahan gambar',
      'Mengubah gambar hitam putih menjadi berwarna',
      'Mengurangi ukuran gambar',
      'Menambah detail pada gambar'
    ],
    answer: 'Meningkatkan atau menurunkan kecerahan gambar'
  },
  {
    id: 18,
    type: 'multiple-choice',
    slug: 'brightness',
    question:
      'Manakah dari pilihan berikut yang merupakan cara untuk meningkatkan kecerahan gambar?',
    options: [
      'Menambah nilai pada setiap piksel',
      'Mengambil rata-rata dari semua piksel',
      'Mengurangi nilai hijau pada piksel',
      'Mengurangi nilai merah dan biru pada piksel'
    ],
    answer: 'Menambah nilai pada setiap piksel'
  },
  {
    id: 19,
    type: 'multiple-choice',
    slug: 'brightness',
    question: 'Apa yang terjadi ketika nilai brightness diturunkan terlalu banyak?',
    options: [
      'Gambar akan menjadi terlalu terang',
      'Gambar akan kehilangan semua detail dan menjadi hitam',
      'Warna akan menjadi lebih jenuh',
      'Gambar akan menjadi hitam putih'
    ],
    answer: 'Gambar akan kehilangan semua detail dan menjadi hitam'
  },
  {
    id: 20,
    type: 'multiple-choice',
    slug: 'brightness',
    question:
      'Jika Anda ingin meningkatkan kecerahan pada gambar dengan intensitas piksel 120, apa yang harus dilakukan?',
    options: [
      'Mengurangi nilai intensitas',
      'Menambahkan nilai tetap ke intensitas piksel',
      'Mengganti nilai dengan nilai 0',
      'Mengubah nilai menjadi nilai acak'
    ],
    answer: 'Menambahkan nilai tetap ke intensitas piksel'
  },
  {
    id: 21,
    type: 'static-input',
    slug: 'brightness',
    question:
      'Berapa kisaran nilai intensitas grayscale yang bisa diterapkan dalam pengaturan brightness?',
    answer: '-255-255'
  },
  {
    id: 22,
    type: 'static-input',
    slug: 'brightness',
    question:
      'Jika brightness ditambah 30 pada piksel dengan nilai intensitas 180, berapa nilai intensitas baru?',
    answer: '210',
    inputType: 'number'
  },
  {
    id: 23,
    type: 'dynamic-input',
    slug: 'brightness',
    question:
      'Jika sebuah gambar grayscale memiliki piksel dengan intensitas {I}, hitunglah nilai piksel baru setelah ditambahkan nilai brightness {Bval}.',
    generateQuestion: function() {
      const I = Math.floor(Math.random() * 256);
      const Bval = Math.floor(Math.random() * 101) - 50; // Brightness range from -50 to +50
      const newI = Math.min(Math.max(I + Bval, 0), 255);
      const answer = `${newI}`;
      const question = `Jika sebuah gambar grayscale memiliki piksel dengan intensitas ${I} dan brightness ditambah ${Bval}, hitunglah nilai piksel baru.`;
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 24,
    type: 'multiple-choice',
    slug: 'threshold',
    question: 'Apa fungsi dari operasi threshold dalam pengolahan citra?',
    options: [
      'Mengubah gambar berwarna menjadi grayscale',
      'Mengubah gambar grayscale menjadi gambar biner berdasarkan nilai ambang batas',
      'Mengurangi detail gambar',
      'Menambah kecerahan pada gambar'
    ],
    answer: 'Mengubah gambar grayscale menjadi gambar biner berdasarkan nilai ambang batas'
  },
  {
    id: 25,
    type: 'multiple-choice',
    slug: 'threshold',
    question:
      'Manakah dari pilihan berikut yang merupakan cara kerja operasi threshold pada gambar grayscale?',
    options: [
      'Menambah nilai tetap ke setiap piksel',
      'Menentukan ambang batas, lalu mengubah piksel menjadi hitam atau putih berdasarkan nilai tersebut',
      'Mengambil rata-rata dari semua piksel',
      'Mengurangi nilai intensitas pada piksel'
    ],
    answer:
      'Menentukan ambang batas, lalu mengubah piksel menjadi hitam atau putih berdasarkan nilai tersebut'
  },
  {
    id: 26,
    type: 'multiple-choice',
    slug: 'threshold',
    question:
      'Apa yang terjadi ketika nilai piksel lebih besar dari nilai threshold yang telah ditentukan?',
    options: [
      'Piksel diubah menjadi warna putih',
      'Piksel diubah menjadi warna hitam',
      'Piksel diubah menjadi warna abu-abu',
      'Piksel tidak mengalami perubahan'
    ],
    answer: 'Piksel diubah menjadi warna putih'
  },
  {
    id: 27,
    type: 'multiple-choice',
    slug: 'threshold',
    question: 'Apa yang terjadi jika nilai piksel lebih kecil dari threshold?',
    options: [
      'Piksel diubah menjadi warna putih',
      'Piksel diubah menjadi warna hitam',
      'Piksel diubah menjadi warna abu-abu',
      'Piksel tidak mengalami perubahan'
    ],
    answer: 'Piksel diubah menjadi warna hitam'
  },
  {
    id: 28,
    type: 'static-input',
    slug: 'threshold',
    question: 'Berapa kisaran nilai threshold yang biasa digunakan dalam operasi citra grayscale?',
    answer: '0-255'
  },
  {
    id: 29,
    type: 'static-input',
    slug: 'threshold',
    question:
      'Jika nilai threshold ditetapkan pada 128, berapakah nilai piksel baru untuk piksel dengan intensitas 150?',
    answer: '255',
    inputType: 'number'
  },
  {
    id: 30,
    type: 'dynamic-input',
    slug: 'threshold',
    question:
      'Jika sebuah gambar grayscale memiliki piksel dengan intensitas {I}, hitunglah nilai piksel baru setelah operasi threshold dengan nilai ambang {T}.',
    generateQuestion: function() {
      const I = Math.floor(Math.random() * 256);
      const T = Math.floor(Math.random() * 256);
      const newI = I >= T ? 255 : 0;
      const answer = `${newI}`;
      const question = `Jika sebuah gambar grayscale memiliki piksel dengan intensitas ${I} dan threshold ditetapkan pada ${T}, hitunglah nilai piksel baru.`;
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 31,
    type: 'multiple-choice',
    slug: 'threshold',
    question:
      'Jika nilai threshold diturunkan, bagaimana pengaruhnya terhadap jumlah piksel putih pada gambar?',
    options: [
      'Jumlah piksel putih akan bertambah',
      'Jumlah piksel putih akan berkurang',
      'Jumlah piksel putih tidak akan berubah',
      'Jumlah piksel hitam akan bertambah'
    ],
    answer: 'Jumlah piksel putih akan bertambah'
  },
  {
    id: 32,
    type: 'multiple-choice',
    slug: 'blending',
    question: 'Apa fungsi dari operasi image blending dalam pengolahan citra?',
    options: [
      'Menggabungkan dua gambar berdasarkan bobot tertentu untuk menghasilkan gambar baru',
      'Mengubah gambar berwarna menjadi grayscale',
      'Meningkatkan kecerahan gambar',
      'Menghilangkan noise dari gambar'
    ],
    answer: 'Menggabungkan dua gambar berdasarkan bobot tertentu untuk menghasilkan gambar baru'
  },
  {
    id: 33,
    type: 'multiple-choice',
    slug: 'blending',
    question:
      'Manakah dari pilihan berikut yang merupakan rumus dasar untuk operasi image blending?',
    options: [
      'Blended Image = Image 1 + Image 2',
      'Blended Image = α * Image 1 + β * Image 2',
      'Blended Image = Image 1 - Image 2',
      'Blended Image = Image 1 * Image 2'
    ],
    answer: 'Blended Image = α * Image 1 + β * Image 2'
  },
  {
    id: 34,
    type: 'multiple-choice',
    slug: 'blending',
    question:
      'Apa yang terjadi jika nilai α (alpha) dan β (beta) pada operasi blending ditetapkan pada 0.5?',
    options: [
      'Kedua gambar akan digabungkan dengan bobot yang sama',
      'Gambar pertama akan sepenuhnya dominan',
      'Gambar kedua akan sepenuhnya dominan',
      'Gambar pertama dan kedua akan dihapus'
    ],
    answer: 'Kedua gambar akan digabungkan dengan bobot yang sama'
  },
  {
    id: 35,
    type: 'multiple-choice',
    slug: 'blending',
    question:
      'Jika α (alpha) = 1 dan β (beta) = 0, gambar mana yang akan terlihat pada hasil blending?',
    options: [
      'Gambar pertama',
      'Gambar kedua',
      'Gambar pertama dan kedua',
      'Tidak ada gambar yang terlihat'
    ],
    answer: 'Gambar pertama'
  },
  {
    id: 36,
    type: 'static-input',
    slug: 'blending',
    question: 'Berapa kisaran nilai α (alpha) dan β (beta) dalam operasi image blending?',
    answer: '0-1'
  },
  {
    id: 37,
    type: 'static-input',
    slug: 'blending',
    question:
      'Jika α = 0.7 dan β = 0.3, berapakah persentase kontribusi gambar kedua pada hasil blending?',
    answer: '30',
    inputType: 'number'
  },
  {
    id: 39,
    type: 'multiple-choice',
    slug: 'blending',
    question: 'Apa pengaruh peningkatan nilai α (alpha) pada hasil blending?',
    options: [
      'Gambar pertama akan menjadi lebih dominan',
      'Gambar kedua akan menjadi lebih dominan',
      'Kedua gambar akan memiliki warna yang sama',
      'Gambar pertama akan dihapus'
    ],
    answer: 'Gambar pertama akan menjadi lebih dominan'
  },
  {
    id: 40,
    type: 'multiple-choice',
    slug: 'substraction',
    question: 'Apa fungsi dari operasi image subtraction dalam pengolahan citra?',
    options: [
      'Mengurangi satu gambar dari gambar lainnya untuk menemukan perbedaan',
      'Menggabungkan dua gambar menjadi satu',
      'Meningkatkan kecerahan gambar',
      'Menambahkan warna baru pada gambar'
    ],
    answer: 'Mengurangi satu gambar dari gambar lainnya untuk menemukan perbedaan'
  },
  {
    id: 41,
    type: 'multiple-choice',
    slug: 'substraction',
    question: 'Apa yang biasanya dihasilkan dari operasi image subtraction?',
    options: [
      'Gambar dengan detail yang lebih tajam',
      'Gambar yang memperlihatkan perbedaan antara dua gambar',
      'Gambar hitam putih dengan intensitas seragam',
      'Gambar dengan warna yang lebih jenuh'
    ],
    answer: 'Gambar yang memperlihatkan perbedaan antara dua gambar'
  },
  {
    id: 42,
    type: 'multiple-choice',
    slug: 'substraction',
    question: 'Bagaimana operasi image subtraction dilakukan secara matematis?',
    options: [
      'Dengan membagi setiap piksel antara dua gambar',
      'Dengan mengurangi intensitas piksel gambar kedua dari gambar pertama',
      'Dengan menambahkan intensitas piksel dari kedua gambar',
      'Dengan menukar warna antara dua gambar'
    ],
    answer: 'Dengan mengurangi intensitas piksel gambar kedua dari gambar pertama'
  },
  {
    id: 43,
    type: 'multiple-choice',
    slug: 'substraction',
    question: 'Apa yang terjadi jika hasil subtraction menghasilkan nilai piksel negatif?',
    options: [
      'Nilai piksel dikonversi menjadi 0',
      'Nilai piksel dikonversi menjadi 255',
      'Nilai piksel tetap negatif',
      'Gambar akan dihapus'
    ],
    answer: 'Nilai piksel dikonversi menjadi 0'
  },
  {
    id: 44,
    type: 'static-input',
    slug: 'substraction',
    question: 'Berapakah kisaran nilai piksel dalam hasil operasi image subtraction?',
    answer: '0-255'
  },
  {
    id: 45,
    type: 'static-input',
    slug: 'substraction',
    question:
      'Jika intensitas piksel dari gambar pertama adalah 200 dan gambar kedua adalah 50, berapakah nilai piksel baru setelah operasi subtraction?',
    answer: '150',
    inputType: 'number'
  },
  {
    id: 46,
    type: 'dynamic-input',
    slug: 'substraction',
    question:
      'Jika sebuah gambar memiliki piksel dengan nilai intensitas {I1} dan gambar kedua memiliki intensitas {I2}, hitunglah nilai piksel baru setelah operasi subtraction.',
    generateQuestion: function() {
      const I1 = Math.floor(Math.random() * 256);
      const I2 = Math.floor(Math.random() * 256);
      const newI = Math.max(I1 - I2, 0);
      const answer = `${newI}`;
      const question = `Jika sebuah gambar memiliki piksel dengan intensitas ${I1} dan gambar kedua memiliki intensitas ${I2}, hitunglah nilai piksel baru setelah operasi subtraction.`;
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 47,
    type: 'multiple-choice',
    slug: 'substraction',
    question: 'Apa pengaruh dari noise dalam gambar ketika operasi image subtraction dilakukan?',
    options: [
      'Noise akan lebih terlihat pada hasil subtraction',
      'Noise akan dihilangkan',
      'Noise akan mengurangi kecerahan gambar',
      'Noise tidak akan berpengaruh'
    ],
    answer: 'Noise akan lebih terlihat pada hasil subtraction'
  },
  {
    id: 48,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'Rumus dasar untuk metode grayscale rata-rata adalah?',
    options: ['(R + G + B) / 2', '(R + G + B) / 3', '(R * G * B) / 3', '(R + G + B) / 4'],
    answer: '(R + G + B) / 3'
  },
  {
    id: 49,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'Pada gambar grayscale, setiap piksel memiliki nilai intensitas yang berkisar antara',
    options: ['0 hingga 100', '0 hingga 255', '0 hingga 1024', '0 hingga 512'],
    answer: '0 hingga 255'
  },
  {
    id: 50,
    type: 'static-input',
    slug: 'grayscale',
    question:
      'Berapa nilai maksimum yang dapat dimiliki oleh satu piksel pada gambar grayscale 8-bit?',
    answer: '255'
  },
  {
    id: 51,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Operasi invert sering digunakan dalam aplikasi pengolahan citra untuk',
    options: [
      'Memperbaiki kualitas gambar',
      'Menganalisis kontras dan struktur gambar',
      'Mengurangi ukuran file gambar',
      'Menambah warna pada gambar'
    ],
    answer: 'Menganalisis kontras dan struktur gambar'
  },
  {
    id: 52,
    type: 'static-input',
    slug: 'invert',
    question: 'Berapa nilai piksel setelah operasi invert jika nilai asli piksel adalah 0?',
    answer: '255'
  }
];

export default quizData;
