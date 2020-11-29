// Cache references to DOM elements.
var elms = [
	'playerContainer',
	'videoContainer',
	'timeThresholdSlider', 'maxBuffersSlider'
];
elms.forEach(function(elm) {
	window[elm] = document.getElementById(elm);
});

let lastTime = 0;
let timeThreshold = 60;

let currentBufferIndex = 0;

let maxBufferAmount = 50;

let bufferCanvases = [];
let bufferContexts = [];

let mainContext = mainCanvas.getContext("2d");

function generateBufferCanvases() {
	for (let index = 0; index < maxBufferAmount; index++) {
		let canvas = document.createElement("canvas");
		canvas.className  = "bufferCanvas";
		canvas.id = "bufferCanvas"+index;
		document.body.appendChild(canvas);
		context = canvas.getContext('2d');

		bufferCanvases.push(canvas);
		bufferContexts.push(context);
	}
}
generateBufferCanvases();

function updateCanvas() {
    let currentTime = Date.now();
    if (currentTime - lastTime > timeThreshold) {

		updateSettings()
		updateBuffers();

		drawBuffersOnMainCanvas();

        lastTime = currentTime;
	}
	
    requestAnimationFrame(updateCanvas);
}

function updateSettings() {
	timeThreshold = timeThresholdSlider.value;
	maxBufferAmount = maxBuffersSlider.value;
}

function updateBuffers() {
	let bufferCanvas = bufferCanvases[currentBufferIndex];
	let bufferContext = bufferContexts[currentBufferIndex];

	bufferContext.drawImage(videoContainer, 0, 0, bufferCanvas.width, bufferCanvas.height);

	currentBufferIndex++;

	if (currentBufferIndex >= maxBufferAmount) {
		currentBufferIndex = 0;
	}
}

function drawBuffersOnMainCanvas() {
	let heightPerBuffer = mainCanvas.height / maxBufferAmount;

	let bufferCanvas;

	for (let index = 0; index < maxBufferAmount; index++) {
		let bufferIndex = currentBufferIndex + index;

		if (bufferIndex >= maxBufferAmount) bufferIndex -= maxBufferAmount;

		bufferCanvas = bufferCanvases[bufferIndex];
		mainContext.drawImage(bufferCanvas, 
			0, heightPerBuffer * index, mainCanvas.width, heightPerBuffer,  // Drawing area
			0, heightPerBuffer * index, bufferCanvas.width, heightPerBuffer); // Cropping area
	}
}

function startVideoPlayback() {
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(function (stream) {
				videoContainer.srcObject = stream;
				updateCanvas();
			})
			.catch(function (error) {
				console.log("Something went wrong!");
			});
	}
}

startVideoPlayback();
