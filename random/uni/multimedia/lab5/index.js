var output = document.getElementById('output');
var right = document.getElementById('right');
var log = function (message, className) {
  var row = document.createElement('div');
  row.innerHTML = message;
  if (className) {
    row.classList.add(className);
  }
  output.appendChild(row);
};

window.onerror = function (message, url, lineNumber) {
  log(lineNumber + ': ' + message);
  return true;
};

var getWebcams = function () {
  return navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        log(device.kind + ": LABEL = \"" + device.label +
          "\" ID = " + device.deviceId);
      });

      return devices.filter((device) => {
        return device.kind === 'videoinput';
      });
    });
};

var startWebcamStream = function (webcamDevice) {
  var constraints = {
    audio: false,
    video: {
      optional: [{
        sourceId: webcamDevice.deviceId
      }]
    },
    deviceId: {
      exact: webcamDevice.deviceId
    }
  };

  log('Starting webcam stream with device ID = ' + webcamDevice.deviceId);

  var successCallback = function (stream) {
    var video = document.createElement('video');
    video.id = webcamDevice.deviceId;
    video.autoplay = true;
    setVideoStream(video, stream);

    var row = document.createElement('div');
    row.innerHTML = '<br>LABEL = "' + webcamDevice.label + '"<br> ID = "' + webcamDevice.deviceId + '"';

    var button = document.createElement('button');
    button.innerHTML = "snapshot";
    button.style.display = "block";
    button.onclick = function(){
      snapshot(video.id);
    }

    right.appendChild(row);
    right.appendChild(video);
    right.appendChild(button);

    log('Webcam stream with device ID = ' + webcamDevice.deviceId + ', LABEL = "' + webcamDevice.label + '" started', 'success');
  };

  var errorCallback = function (error) {
    log('Webcam stream with device ID = ' + webcamDevice.deviceId + ', LABEL = "' + webcamDevice.label + '" failed to start: ' + error, 'error');
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(successCallback)
    .catch(errorCallback);
};

var setVideoStream = function (video, stream) {
  try {
    video.srcObject = stream;
  } catch (error) {
    video.src = window.URL.createObjectURL(stream);
  }
}

var checkWebcamResolution = function (width, height) {
  return new Promise(function (resolve) {
    var successCallback = function (stream) {
      var video = document.createElement('video');
      video.autoplay = true;
      setVideoStream(video, stream);

      right.appendChild(video);

      video.onloadedmetadata = function (e) {
        if (width === video.videoWidth && height === video.videoHeight) {
          log('Webcam stream successfully started in <strong>' + width + 'x' + height + '</strong>', 'success');
        } else {
          log('Webcam stream failed to start in <strong>' + width + 'x' + height + '</strong>, instead started in <strong>' + video.videoWidth + 'x' + video.videoHeight + '</strong>', 'error');
        }

        setTimeout(function () {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });

          video.remove();
          resolve();
        }, 500);
      };
    };

    var errorCallback = function () {
      log('Webcam stream failed to start in <strong>' + width + 'x' + height + '</strong>', 'error');
      resolve();
    }

    mediaDevices.getUserMedia({
      video: {
        width: {
          exact: width
        },
        height: {
          exact: height
        }
      }
    })
      .then(successCallback)
      .catch(errorCallback);
  });
};

function comparePixel(p1, p2) {
	var matches = true;
	var sensitivity = 40;
 
	for(var i = 0; i < p1.length; i++) {
		var t1 = Math.round(p1[i]/10)*10;
		var t2 = Math.round(p2[i]/10)*10;
 
		if(t1 != t2) {
			if((t1+sensitivity < t2 || t1-sensitivity > t2)) {
				matches = false;
			}
		}
	}
 
	return matches;
}

function snapshot(id) {
	var videoPlayer = document.getElementById(id);

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

log('Start');
getWebcams()
  .then((webcamDevices) => {
    webcamDevices.forEach((webcamDevice) => {
      startWebcamStream(webcamDevice);
    });
  });