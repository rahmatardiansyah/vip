// clear uploaded file
const inputFileEl = document.getElementById('inputGroupFile04');
const clearFileEl = document.getElementById('inputGroupFileAddon04');
clearFileEl.addEventListener('click', function () {
  inputFileEl.value = '';
});

// clear uploaded file if radio clicked
const radioEl = document.querySelectorAll('.radio-choose-image');
radioEl.forEach(i => {
  i.addEventListener('click', () => (inputFileEl.value = ''));
});

function getImage() {
  if (inputFileEl.value == '') {
    return Array.from(document.getElementsByName('image')).find(r => r.checked)
      .nextElementSibling.src;
  } else {
    return URL.createObjectURL(inputFileEl.files[0]);
  }
}

function hideCollapse() {
  const collapeseImage = document.getElementById('collapseImage');
  if (collapeseImage.classList.contains('show')) {
    bootstrap.Collapse.getInstance(collapeseImage).hide();
  }
}

function getImageData(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  // Dapatkan imageData dari canvas dan kembalikan nilainya
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

const processButtonEl = document.querySelector('.process');

processButtonEl.addEventListener('click', process);

function process() {
  hideCollapse();

  const canvasOriginal = document.getElementById('canvasOriginal');
  const canvasGrayscale = document.getElementById('canvasGreyScale');
  const canvasResult = document.getElementById('canvasResult');

  const canvasProcess = document.getElementById('hidden');

  const contextOriginal = canvasOriginal.getContext('2d');
  const contextGreyscale = canvasGrayscale.getContext('2d');
  const contextResult = canvasResult.getContext('2d');

  const contextProcess = canvasProcess.getContext('2d');

  const image = new Image();
  image.src = getImage();
  // Menentukan ukuran gambar minimum dan maksimum
  const minSize = 100;
  const maxSize = 900;

  image.onload = function () {
    const ratio = image.width / image.height;
    let width = Math.min(maxSize, Math.max(minSize, canvasOriginal.width));
    let height = width / ratio;

    if (height > maxSize) {
      height = maxSize;
      width = height * ratio;
    }

    canvasOriginal.width = width;
    canvasOriginal.height = height;

    contextOriginal.drawImage(image, 0, 0, width, height);

    // RBG to Grayscale
    const imageDataGreyScale = contextOriginal.getImageData(
      0,
      0,
      width,
      height
    );
    const pixels = imageDataGreyScale.data;

    for (let i = 0; i < pixels.length; i += 4) {
      let grayscale = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      pixels[i] = grayscale;
      pixels[i + 1] = grayscale;
      pixels[i + 2] = grayscale;
    }
    canvasGrayscale.width = width;
    canvasGrayscale.height = height;
    contextGreyscale.putImageData(imageDataGreyScale, 0, 0);

    // Robert
    const imageDataRobert = contextGreyscale.getImageData(0, 0, width, height);
    const pixelsRobert = imageDataRobert.data;
    const output = new Uint8ClampedArray(pixelsRobert.length);

    const kernelGx = [1, 0, 0, -1];
    const kernelGy = [0, 1, -1, 0];

    for (let i = 0; i < pixelsRobert.length; i += 4) {
      let gx = 0;
      let gy = 0;

      for (let j = 0; j < 4; j++) {
        let x = (i / 4) % canvasOriginal.width;
        let y = Math.floor(i / 4 / canvasOriginal.width);
        let index =
          ((y + Math.floor(j / 2)) * canvasOriginal.width + (x + (j % 2))) * 4;

        gx += pixelsRobert[index] * kernelGx[j];
        gy += pixelsRobert[index] * kernelGy[j];
      }

      let magnitude = Math.sqrt(gx * gx + gy * gy);
      output[i] = magnitude;
      output[i + 1] = magnitude;
      output[i + 2] = magnitude;
      output[i + 3] = 255;
    }

    canvasResult.width = width;
    canvasResult.height = height;

    imageDataRobert.data.set(output);
    contextResult.putImageData(imageDataRobert, 0, 0);

    const robertProcessEl = document.querySelector('.robert-process');
    robertProcessEl.style.display = 'block';

    canvasProcess.width = 10;
    canvasProcess.height = 10;
    contextProcess.drawImage(image, 0, 0, image.width, image.height);
    const grayscaleArray = [];

    const imageDataProcess = contextProcess.getImageData(0, 0, 10, 10);

    const pixelsProcess = imageDataProcess.data;

    for (let i = 0; i < pixelsProcess.length; i += 4) {
      let grayscale =
        (pixelsProcess[i] + pixelsProcess[i + 1] + pixelsProcess[i + 2]) / 3;
      pixelsProcess[i] = grayscale;
      pixelsProcess[i + 1] = grayscale;
      pixelsProcess[i + 2] = grayscale;
      grayscaleArray.push(Math.floor(grayscale));
    }

    contextProcess.putImageData(imageDataProcess, 0, 0);

    const tableGrayscaleEl = document.querySelector('.table-grayscale');

    tableGrayscaleEl.innerHTML = '';

    // Hitung jumlah baris dan kolom tabel
    const numRows = 10;
    const numCols = 10;

    let index = 0;
    for (let i = 0; i < numRows; i++) {
      let row = tableGrayscaleEl.insertRow();
      for (let j = 0; j < numCols; j++) {
        let cell = row.insertCell();
        cell.textContent = grayscaleArray[index];
        index++;
      }
    }

    // Show canvas
    const canvasEl = document.querySelectorAll('.result canvas');
    canvasEl.forEach(i => {
      i.style.display = 'block';
    });
  };
}
