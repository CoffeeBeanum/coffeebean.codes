function initializeVideoPlayer() {
	'use strict'
  var URL = window.URL || window.webkitURL
  var playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') return

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
  }
  var inputNode = document.querySelector('input')
  inputNode.addEventListener('change', playSelectedFile, false)
}

function snapshot() {
	var videoPlayer = document.getElementById('video-player');

	var canvas = document.createElement("canvas");
	canvas.width = videoPlayer.videoWidth;
	canvas.height = videoPlayer.videoHeight;

	var context = canvas.getContext("2d");

	context.drawImage(videoPlayer, 0, 0, videoPlayer.videoWidth, videoPlayer.videoHeight);

	var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

	downloadImage(dataURL, 'snapshot.png');
}

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

initializeVideoPlayer()