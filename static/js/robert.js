// clear uploaded file
const inputFileEl = document.getElementById('inputGroupFile04');
const clearFileEl = document.getElementById('inputGroupFileAddon04');
clearFileEl.addEventListener('click', function () {
  inputFileEl.value = '';
});
