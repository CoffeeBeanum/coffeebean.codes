const brightness = document.getElementById("brightness");
const grayscale = document.getElementById("grayscale");
const boolean = document.getElementById("boolean");
const img = document.getElementById("img");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let initColors;

var filename = "";

function readFile(ctx) {
  const [file] = ctx.files;
  filename = file.name.split('.').slice(0, -1).join('.');
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    addImg(this.result);
  };
  reader.onerror = function () {
    console.log(this.error);
  };
}

function addImg(src) {
  img.src = src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    initColors = getImgData();
    updateColors();
  };
}

function getImgData() {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function updateColors(red, green, blue) {
  const imgData = getImgData();

  var brightnessValue = (brightness.value / 1000);

  for (var i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i]     = initColors.data[i]     * brightnessValue;
    imgData.data[i + 1] = initColors.data[i + 1] * brightnessValue;
    imgData.data[i + 2] = initColors.data[i + 2] * brightnessValue;

    if (grayscale.checked) {
      var pixelValue = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;

      imgData.data[i]     = pixelValue;
      imgData.data[i + 1] = pixelValue;
      imgData.data[i + 2] = pixelValue;
    }

    if (boolean.checked) {
      imgData.data[i]     = imgData.data[i]     >= 128 ? 255 : 0;
      imgData.data[i + 1] = imgData.data[i + 1] >= 128 ? 255 : 0;
      imgData.data[i + 2] = imgData.data[i + 2] >= 128 ? 255 : 0;
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function savePng() {
	var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

	downloadImage(dataURL, filename + '-edited.png');
}

function saveJpg() {
	var dataURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

	downloadImage(dataURL, filename + '-edited.jpg');
}

function downloadImage(data, filename) {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

brightness.oninput = () => updateColors();
grayscale.oninput = () => updateColors();
boolean.oninput = () => updateColors();
