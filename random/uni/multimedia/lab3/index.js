const r = document.getElementById("red");
const g = document.getElementById("green");
const b = document.getElementById("blue");
const img = document.getElementById("img");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let initColors;

function readFile(ctx) {
  const [file] = ctx.files;
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
  for (var i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = initColors.data[i] * r.value * 0.001;
    imgData.data[i + 1] = initColors.data[i + 1] * g.value * 0.001;
    imgData.data[i + 2] = initColors.data[i + 2] * b.value * 0.001;
  }
  ctx.putImageData(imgData, 0, 0);
}


r.oninput = () => updateColors();
g.oninput = () => updateColors();
b.oninput = () => updateColors();
