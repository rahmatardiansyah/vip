const resultProcessEl = document.querySelector('.result-process');

// Tampilkan penjelasan jika combo box dipilih
const comboBoxVisualizeEl = document.querySelector(
  '#inputGroupSelect01.form-select'
);
comboBoxVisualizeEl.addEventListener('change', event => {
  // Remove all element in result process
  resultProcessEl.innerHTML = '';
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
  // const imageUrl = URL.createObjectURL(event.target.files[0]);
  // const imageUrl = document.getElementById('upload-image').value;
  // console.log(imageUrl);
  // tutup image collapse
  // const collapeseImage = document.getElementById('collapseImage');
  // if (collapeseImage.classList.contains('show')) {
  //   bootstrap.Collapse.getInstance(collapeseImage).hide();
  // }

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
  // container result robert
  const containerRobert = document.createElement('div');
  containerRobert.classList.add(
    'd-flex',
    'justify-content-center',
    'flex-wrap',
    'mt-3',
    'gap-3'
  );
  // buat canvas
  const canvasOriginalEl = document.createElement('canvas');
  const canvasGreyEl = document.createElement('canvas');
  const canvasRobert = document.createElement('canvas');
  const context = canvasOriginalEl.getContext('2d');
  const contextGrey = canvasGreyEl.getContext('2d');
  const contextRobert = canvasRobert.getContext('2d');
  const image = new Image();
  image.src = imgUrl;

  // Menentukan ukuran gambar minimum dan maksimum
  const minSize = 200;
  const maxSize = 300;
  image.onload = function () {
    const ratio = image.width / image.height;
    // Menentukan ukuran yang sesuai dengan rasio aspek gambar
    let width = Math.min(maxSize, Math.max(minSize, canvasOriginalEl.width));
    let height = width / ratio;

    // Jika tinggi gambar lebih dari ukuran maksimum, ubah ukuran gambar
    if (height > maxSize) {
      height = maxSize;
      width = height * ratio;
    }
    canvasOriginalEl.width = width;
    canvasOriginalEl.height = height;
    canvasGreyEl.width = width;
    canvasGreyEl.height = height;
    canvasRobert.width = width;
    canvasRobert.height = height;
    context.drawImage(image, 0, 0, width, height);
    const imageDataGrey = context.getImageData(0, 0, width, height);
    for (let i = 0; i < imageDataGrey.data.length; i += 4) {
      let gray =
        (imageDataGrey.data[i] +
          imageDataGrey.data[i + 1] +
          imageDataGrey.data[i + 2]) /
        3;
      imageDataGrey.data[i] = gray;
      imageDataGrey.data[i + 1] = gray;
      imageDataGrey.data[i + 2] = gray;
    }
    contextGrey.putImageData(imageDataGrey, 0, 0);

    const imageDataRobert = context.getImageData(0, 0, width, height);
    // Looping untuk setiap piksel pada gambar
    for (var y = 0; y < imageDataRobert.height; y++) {
      for (var x = 0; x < imageDataRobert.width; x++) {
        var index = (x + y * imageDataRobert.width) * 4;
        var r = imageDataRobert.data[index];
        var g = imageDataRobert.data[index + 1];
        var b = imageDataRobert.data[index + 2];
        var gray = (r + g + b) / 3;

        // Operasi Robert
        var gx =
          2 * gray -
          imageDataRobert.data[index + 4] -
          imageDataRobert.data[index + imageDataRobert.width * 4];
        var gy =
          2 * gray -
          imageDataRobert.data[index + imageDataRobert.width * 4 + 4] -
          imageDataRobert.data[index + imageDataRobert.width * 4];

        var magnitude = Math.sqrt(Math.pow(gx, 2) + Math.pow(gy, 2));

        // Mengubah warna piksel sesuai dengan nilai magnitude
        imageDataRobert.data[index] = magnitude;
        imageDataRobert.data[index + 1] = magnitude;
        imageDataRobert.data[index + 2] = magnitude;
      }
    }
    contextRobert.putImageData(imageDataRobert, 0, 0);
    containerRobert.appendChild(canvasOriginalEl);
    containerRobert.appendChild(canvasGreyEl);
    containerRobert.appendChild(canvasRobert);
    resultProcessEl.appendChild(containerRobert);
  };
}
