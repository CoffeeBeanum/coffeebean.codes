function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

let face = document.getElementById("smiley-face");

let amplitude = document.getElementById("amplitude");
let frequency = document.getElementById("frequency");

function spaz() {

    face.style.transform = `translate(${getRandomInt(-amplitude.value, amplitude.value)}px, ${getRandomInt(-amplitude.value, amplitude.value)}px)`;

    window.setTimeout(spaz, 50 - frequency.value);
}

spaz();