function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

let face = document.getElementById("smiley-face");
let body = document.getElementById("smiley-body");

let faceTranslationAmplitude = document.getElementById("face-translation-amplitude");
let faceRotationAmplitude = document.getElementById("face-rotation-amplitude");
let faceFrequency = document.getElementById("face-frequency");

let bodyTranslationAmplitude = document.getElementById("body-translation-amplitude");
let bodyRotationAmplitude = document.getElementById("body-rotation-amplitude");
let bodyFrequency = document.getElementById("body-frequency");

function faceSpaz() {
  let xTranslation = getRandomInt(-faceTranslationAmplitude.value, faceTranslationAmplitude.value);
  let yTranslation = getRandomInt(-faceTranslationAmplitude.value, faceTranslationAmplitude.value);

  let rotation = getRandomInt(-faceRotationAmplitude.value, faceRotationAmplitude.value);

  face.style.transform = `rotate(${rotation}deg) translate(${xTranslation}px, ${yTranslation}px)`;

  window.setTimeout(faceSpaz, 50 - faceFrequency.value);
}

function bodySpaz() {
  let xTranslation = getRandomInt(-bodyTranslationAmplitude.value, bodyTranslationAmplitude.value);
  let yTranslation = getRandomInt(-bodyTranslationAmplitude.value, bodyTranslationAmplitude.value);

  let rotation = getRandomInt(-bodyRotationAmplitude.value, bodyRotationAmplitude.value);

  body.style.transform = `rotate(${rotation}deg) translate(${xTranslation}px, ${yTranslation}px)`;

  window.setTimeout(bodySpaz, 50 - bodyFrequency.value);
}

faceSpaz();
bodySpaz();