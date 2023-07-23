const inputFileEl = document.getElementById('inputGroupFile04');

// clear uploaded file
const clearFileEl = document.getElementById('inputGroupFileAddon04');
clearFileEl.addEventListener('click', function () {
  inputFileEl.value = '';
});
const canvasEl = document.querySelectorAll('.canvas-robert canvas');

const processButtonEl = document.querySelector('.button-process');

processButtonEl.addEventListener('click', process);

function process() {
  // Get imageUrl
  let imageUrl;
  if (inputFileEl.value == '') {
    imageUrl = Array.from(document.getElementsByName('image')).find(
      r => r.checked
    ).nextElementSibling.src;
  } else {
    imageUrl = URL.createObjectURL(inputFileEl.files[0]);
  }

  // Hide collapseImage
  const collapeseImage = document.getElementById('collapseImage');
  if (collapeseImage.classList.contains('show')) {
    bootstrap.Collapse.getInstance(collapeseImage).hide();
  }

  const canvasOriginal = document.getElementById('canvasOriginal');
  const canvasGreyGrayScale = document.getElementById('canvasGreyScale');
  const canvasResult = document.getElementById('canvasResult');
  const contextOriginal = canvasOriginal.getContext('2d');
  const contextGreyScale = canvasGreyGrayScale.getContext('2d');
  const contextResult = canvasResult.getContext('2d');

  const image = new Image();
  image.src = imageUrl;

  // Menentukan ukuran gambar minimum dan maksimum
  const minSize = 100;
  const maxSize = 900;
  image.onload = function () {
    const ratio = image.width / image.height;
    // Menentukan ukuran yang sesuai dengan rasio aspek gambar
    let width = Math.min(maxSize, Math.max(minSize, canvasOriginal.width));
    let height = width / ratio;

    // Jika tinggi gambar lebih dari ukuran maksimum, ubah ukuran gambar
    if (height > maxSize) {
      height = maxSize;
      width = height * ratio;
    }

    canvasOriginal.width = width;
    canvasOriginal.height = height;

    contextOriginal.drawImage(image, 0, 0, width, height);

    // GreyScale
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
    canvasGreyGrayScale.width = width;
    canvasGreyGrayScale.height = height;
    contextGreyScale.putImageData(imageDataGreyScale, 0, 0);

    // Robert
    const imageDataRobert = contextGreyScale.getImageData(0, 0, width, height);
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
    // Show Canvas Element
    [...canvasEl].forEach(function (el) {
      el.style.display = 'block';
    });

    const canvasProcess = document.getElementById('canvasProcess');
    const contextProcess = canvasProcess.getContext('2d');
    contextProcess.drawImage(image, 0, 0, 5, 5);

    const imageDataProcess = contextProcess.getImageData(0, 0, 5, 5);
    const pixelsProcess = [];
    for (let i = 0; i < imageDataProcess.data.length; i += 4) {
      pixelsProcess.push(
        Math.round(
          (imageDataProcess.data[i] +
            imageDataProcess.data[i + 1] +
            imageDataProcess.data[i + 2]) /
            3
        )
      );
    }

    const newPixelsProcess = [];
    for (let i = 0; i < pixelsProcess.length; i += 5) {
      newPixelsProcess.push([...pixelsProcess.slice(i, i + 5), 0]);
    }
    newPixelsProcess.push([0, 0, 0, 0, 0, 0]);

    const tableProcess = document.querySelector('.table-process tbody');
    tableProcess.innerHTML = '';

    for (let i = 0; i < 6; i++) {
      const trEl = document.createElement('tr');
      for (let j = 0; j < 6; j++) {
        const tdEl = document.createElement('td');
        tdEl.appendChild(document.createTextNode(newPixelsProcess[i][j]));
        trEl.appendChild(tdEl);
      }
      tableProcess.appendChild(trEl);
    }

    // Show Tables
    const tableRobertEl = document.querySelector('.table-robert');
    tableRobertEl.style.display = 'flex';
  };
}
