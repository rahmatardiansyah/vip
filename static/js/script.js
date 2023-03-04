const resultProcessEl = document.querySelector('.result-process');

// Tampilkan penjelasan jika combo box dipilih
const comboBoxVisualizeEl = document.querySelector(
  '#inputGroupSelect01.form-select'
);
comboBoxVisualizeEl.addEventListener('change', event => {
  // hapus jika ada element, hapus!
  const divEl = document.querySelector('.alert.alert-info');
  if (divEl) divEl.remove();

  const newDivEl = document.createElement('div');
  newDivEl.classList.add('alert', 'alert-info', 'mt-3');
  let text = '';
  switch (event.target.value) {
    case 'robert':
      text =
        'Operator Roberts pertama kali dipublikasikan pada tahun 1965,terdiri atas dua filter berukururan 2x2.';
      break;
    case 'prewitt':
      text = 'Operator Prewitt ditemukan oleh Prewitt pada tahun 1966.';
      break;
    case 'sobel':
      text =
        'Operator Sobel lebih sensitif terhadap tepi diagonal daripada tepi vertikal dan horizontal.';
      break;
    default:
      // hapus keterangan
      text = 'Choose operator';
      if (newDivEl.classList.contains('alert-info')) {
        newDivEl.classList.toggle('alert-warning');
      }
  }
  textAlert = document.createTextNode(text);
  newDivEl.appendChild(textAlert);
  resultProcessEl.appendChild(newDivEl);
});

const processButtonEl = document.querySelector('.button-process');

processButtonEl.addEventListener('click', process);

function process() {
  // Remove all element in result process
  resultProcessEl.innerHTML = '';
  // get value operasi
  const operation = comboBoxVisualizeEl.value;

  // get value url
  const imageUrl = Array.from(document.getElementsByName('image')).find(
    r => r.checked
  ).nextElementSibling.src;

  // tutup image collapse
  const collapeseImage = document.getElementById('collapseImage');
  if (collapeseImage.classList.contains('show')) {
    bootstrap.Collapse.getInstance(collapeseImage).hide();
  }

  switch (operation) {
    case 'robert':
      robert(imageUrl);
      break;
    case 'prewitt':
      console.log('jalankan function prewitt');
      break;
    case 'sobel':
      console.log('jalankan function sobel');
      break;
    default:
      alert('Pilih operator');
  }
}

function robert(imgUrl) {
  console.log(imgUrl);
}
