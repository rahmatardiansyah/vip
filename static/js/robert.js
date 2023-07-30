// clear uploaded file
const inputFileEl = document.getElementById('inputGroupFile04');
const clearFileEl = document.getElementById('inputGroupFileAddon04');
clearFileEl.addEventListener('click', function () {
  inputFileEl.value = '';
});

// disable result button
inputFileEl.addEventListener('change', function () {
  resultButtonEl.setAttribute('disabled', '');
  processButtonEl.removeAttribute('disabled');
});

// clear uploaded file if radio clicked
const radioEl = document.querySelectorAll('.radio-choose-image');
radioEl.forEach(i => {
  i.addEventListener('click', () => {
    inputFileEl.value = '';
    resultButtonEl.setAttribute('disabled', '');
    processButtonEl.removeAttribute('disabled');
  });
});

const processButtonEl = document.querySelector('.process');
processButtonEl.addEventListener('click', process);

const resultButtonEl = document.querySelector('.show-result');
resultButtonEl.addEventListener('click', showResult);

// get container result
const resultContainer = document.querySelector('#main .result');

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

function resizeImage(img, newWidth, newHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  return canvas;
}

function rgbToGrayscale(pixelData) {
  const grayscaleArray = [];
  for (let i = 0; i < pixelData.length; i += 4) {
    const grayscale = (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;
    grayscaleArray.push(Math.floor(grayscale));
  }
  return grayscaleArray;
}

function getImageDataPromise() {
  return new Promise((resolve, reject) => {
    const file = inputFileEl.files[0];
    const reader = new FileReader();
    const img = new Image();
    reader.onload = function () {
      img.onload = function () {
        const canvasProses = document.createElement('canvas');

        // const resizedImg = resizeImage(img, 7, 7);
        canvasProses.style.display = 'none';
        canvasProses.width = 10;
        canvasProses.height = 10;

        const ctx = canvasProses.getContext('2d');
        ctx.drawImage(img, 0, 0, 10, 10);

        const imageData = ctx.getImageData(0, 0, 10, 10).data;
        resolve(imageData);
      };
      img.onerror = function () {
        reject('Image Error');
      };
      if (file) {
        img.src = reader.result;
      } else {
        img.src = Array.from(document.getElementsByName('image')).find(
          r => r.checked
        ).nextElementSibling.src;
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(new Blob());
    }
  });
}

async function processImageData() {
  try {
    const imageData = await getImageDataPromise();

    const grayscaleArray = [...rgbToGrayscale(imageData)];

    // Get Table and clear items
    const tableGrayscaleEl = document.querySelector('.table-grayscale');
    tableGrayscaleEl.innerHTML = '';

    // Total column and row
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

    // Show Table proses
    const robertProcessEl = document.querySelector('.robert-process');
    robertProcessEl.style.display = 'block';
  } catch (error) {
    console.error(error);
  }
}

function process() {
  processImageData();
  resultButtonEl.removeAttribute('disabled');
  processButtonEl.setAttribute('disabled', '');
}

async function showResult() {
  resultContainer.innerHTML = '';

  const originalCanvas = document.createElement('canvas');
  const grayscaleCanvas = document.createElement('canvas');
  const resultCanvas = document.createElement('canvas');

  const originalContext = originalCanvas.getContext('2d');
  const grayscaleContext = grayscaleCanvas.getContext('2d');
  const resultContext = resultCanvas.getContext('2d');

  const minSize = 100;
  const maxSize = 900;

  const file = inputFileEl.files[0];
  const reader = new FileReader();
  const newImage = new Image();

  reader.onload = function () {
    newImage.onload = function () {
      const ratio = newImage.width / newImage.height;
      let width = Math.min(maxSize, Math.max(minSize, originalCanvas.width));
      let height = width / ratio;

      if (height > maxSize) {
        height = maxSize;
        width = height * ratio;
      }

      originalCanvas.width = width;
      originalCanvas.height = height;

      originalContext.drawImage(newImage, 0, 0, width, height);

      // Result Grayscale
      const imageDataGreyScale = originalContext.getImageData(
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

      grayscaleCanvas.width = width;
      grayscaleCanvas.height = height;
      grayscaleContext.putImageData(imageDataGreyScale, 0, 0);

      // Result Robert
      const imageDataRobert = grayscaleContext.getImageData(
        0,
        0,
        width,
        height
      );
      const pixelsRobert = imageDataRobert.data;
      const output = new Uint8ClampedArray(pixelsRobert.length);

      const kernelGx = [1, 0, 0, -1];
      const kernelGy = [0, 1, -1, 0];

      for (let i = 0; i < pixelsRobert.length; i += 4) {
        let gx = 0;
        let gy = 0;

        for (let j = 0; j < 4; j++) {
          let x = (i / 4) % grayscaleCanvas.width;
          let y = Math.floor(i / 4 / grayscaleCanvas.width);
          let index =
            ((y + Math.floor(j / 2)) * grayscaleCanvas.width + (x + (j % 2))) *
            4;

          gx += pixelsRobert[index] * kernelGx[j];
          gy += pixelsRobert[index] * kernelGy[j];
        }

        let magnitude = Math.sqrt(gx * gx + gy * gy);
        output[i] = magnitude;
        output[i + 1] = magnitude;
        output[i + 2] = magnitude;
        output[i + 3] = 255;
      }

      resultCanvas.width = width;
      resultCanvas.height = height;
      imageDataRobert.data.set(output);
      resultContext.putImageData(imageDataRobert, 0, 0);
      resultContainer.append(originalCanvas);
      resultContainer.append(grayscaleCanvas);
      resultContainer.append(resultCanvas);
    };
    if (file) {
      newImage.src = reader.result;
    } else {
      newImage.src = Array.from(document.getElementsByName('image')).find(
        r => r.checked
      ).nextElementSibling.src;
    }
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.readAsDataURL(new Blob());
  }
}
