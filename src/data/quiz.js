const quizData = [
  {
    id: 1,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'Apa warna rata-rata dari gambar?',
    options: ['black', 'white', 'gray', 'yellow'],
    answer: 'black'
  },
  {
    id: 2,
    type: 'multiple-choice',
    slug: 'grayscale',
    question: 'What is the average color of the image?',
    options: ['black', 'white', 'gray', 'yellow'],
    answer: 'gray'
  },
  {
    id: 3,
    type: 'static-input',
    slug: 'grayscale',
    question: 'Berapa intensitas warna dalam 8 bit?',
    answer: '256',
    inputType: 'number'
  },
  {
    id: 4,
    type: 'dynamic-input',
    slug: 'grayscale',
    question: 'Berapa hasil dari {x} + {y}?',
    generateQuestion: function() {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const question = `Berapa hasil dari ${x} + ${y}?`;
      const answer = (x + y).toString();
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 5,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'Apa warna rata-rata dari gambar invert diatas?',
    options: ['black', 'white', 'gray', 'yellow'],
    answer: 'yellow'
  },
  {
    id: 6,
    type: 'multiple-choice',
    slug: 'invert',
    question: 'What is the average color of the image image above?',
    options: ['black', 'white', 'gray', 'yellow'],
    answer: 'white'
  },
  {
    id: 7,
    type: 'static-input',
    slug: 'invert',
    question: 'Berapa intensitas warna dalam 8 bit dari image invert diatas?',
    answer: '100',
    inputType: 'number'
  },
  {
    id: 8,
    type: 'dynamic-input',
    slug: 'invert',
    question: 'Berapa hasil dari {z} + {x}?',
    generateQuestion: function() {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const question = `Berapa hasil dari ${x} + ${y}?`;
      const answer = (x + y).toString();
      return { question, answer };
    },
    inputType: 'number'
  },
  {
    id: 9,
    type: 'static-input',
    slug: 'grayscale',
    question: 'Apa warna gambar yang dipilih?',
    answer: 'red'
  }
];

export default quizData;
