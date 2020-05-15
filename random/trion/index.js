var analyzer;

// Cache references to DOM elements.
var elms = ['cassettePlay', 'cassettePause', 'cassetteDownload',
			'fileList', 'fileInput', 
			'trackTitle', 'playbackState', 'playbackPlay', 'playbackPause', 'playbackDownload', 'trackDuration',
			'analyzerCanvas',
			'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn',
			'progressContainer', 'trackProgress', 'trackTimer'];
elms.forEach(function(elm) {
	window[elm] = document.getElementById(elm);
});

// Playback start, stop and download sound effects
var audioStart = new Howl({
	src: ["resources/cassetteStart.mp3"],
	preload: true,
	onplay: function() {
		audioStop.stop();
		audioDownloadStart.stop();
	}
})
var audioStop = new Howl({
	src: ["resources/cassetteStop.mp3"],
	preload: true,
	onplay: function() {
		audioStart.stop();
	}
})
var audioDownloadStart = new Howl({
	src: ["resources/cassetteDownloadStart.mp3"],
	preload: true,
	onplay: function() {
		audioDownloadIdle.stop();
		audioDownloadIdle.play();
		audioDownloadIdle.fade(0, 1, 500);
		audioStart.stop();
	},
	onstop: function() {
		audioDownloadIdle.stop();
	}
})
var audioDownloadIdle = new Howl({
	src: ["resources/cassetteDownloadIdle.mp3"],
	preload: true,
	loop: true
})

// Player class containing the state of playlist.
var Player = function(playlist) {
	this.playlist = playlist;
	this.index = 0;

	// Display the title of the first track.
	trackTitle.innerHTML = playlist[0].title;

	// Setup the playlist display.
	playlist.forEach(function(song) {
		var div = document.createElement('div');
		div.className = 'list-song';
		div.innerHTML = "• " + song.title;
		div.onclick = function() {
			player.skipTo(playlist.indexOf(song));
		};
		fileList.appendChild(div);
	});

	prepareFFTDisplay();
};

Player.prototype = {
	// Play a song in the playlist.
	play: function(index) {
		var self = this;
		var sound;

		index = typeof index === 'number' ? index : self.index;
		var data = self.playlist[index];

		trackDuration.innerHTML = "";

		// If we already loaded this track, use the current one.
		// Otherwise, setup and load a new Howl.
		if (data.howl) {
			sound = data.howl;
		} else {
			updatePlaybackVisualState(2);
			removeStatusAnimation();

			audioDownloadStart.play();

			sound = data.howl = new Howl({
				src: [data.file],
				format: ['mp3', 'ogg', 'wav'],

				onplay: function() {
					if (self.index == index) { 
						trackDuration.innerHTML = self.formatTime(Math.round(sound.duration()));

						requestAnimationFrame(self.step.bind(self));

						pauseBtn.disabled = false;

						updatePlaybackVisualState(0);
						resetStatusAnimation();

						audioStart.play(); 
					} else {
						sound.stop();
					}
				},

				onload: function() {
					if (self.index == index) { 
						pauseBtn.disabled = false;
					} else {
						sound.stop();
					}
				},

				onend: function() {
					self.skip(true);
				},

				onpause: function() {
					updatePlaybackVisualState(1);
					resetStatusAnimation();

					audioStop.play();
				}
			});
		}

		// Begin playing the sound.
		sound.play();

		// Update the track display.
		trackTitle.innerHTML = data.title;

		// Show the pause button.
		if (sound.state() === 'loaded') {
			playBtn.disabled = true;
			pauseBtn.disabled = false;
		} else {
			playBtn.disabled = true;
			pauseBtn.disabled = true;
		}

		// Keep track of the index we are currently playing.
		self.index = index;
	},

	/**
	 * Pause the currently playing track.
	 */
	pause: function() {
		var self = this;

		// Get the Howl we want to manipulate.
		var data = self.playlist[self.index]
		var sound = data.howl;

		// Pause the sound.
		sound.pause();

		// Show the play button.
		playBtn.disabled = false;
		pauseBtn.disabled = true;
	},

	/**
	 * Skip to the next or previous track.
	 * @param  {Bool} forward or not.
	 */
	skip: function(forward) {
		var self = this;

		// Get the next track based on the direction of the track.
		var index = 0;
		if (forward) {
			index = self.index + 1;
			if (index >= self.playlist.length) {
				index = 0;
			}
		} else {
			index = self.index - 1;
			if (index < 0) {
				index = self.playlist.length - 1;
			}
		}

		self.skipTo(index);
	},

	/**
	 * Skip to a specific track based on its playlist index.
	 * @param  {Number} index Index in the playlist.
	 */
	skipTo: function(index) {
		var self = this;

		if (self.playlist[self.index].howl != null && self.playlist[self.index].howl.playing()) {
			audioStop.play();
		}

		// Stop the current track.
		if (self.playlist[self.index].howl) {
			self.playlist[self.index].howl.stop();
		}

		// Reset trackProgress.
		trackProgress.style.width = '0%';

		// Play the new track.
		self.play(index);
	},

	/**
	 * Set the volume and update the volume slider display.
	 * @param  {Number} val Volume between 0 and 1.
	 */
	volume: function(val) {
		var self = this;

		// Get the Howl we want to manipulate.
		var sound = self.playlist[self.index].howl;

		// Update the volume to the new value.
		sound.volume(val);

		// Update the display on the slider.
		var barWidth = (val * 90) / 100;
		barFull.style.width = (barWidth * 100) + '%';
		sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
	},

	// Seek to a new position in the currently playing track.
	seek: function(per) {
		var self = this;

		// Get the Howl we want to manipulate.
		var sound = self.playlist[self.index].howl;

		// Convert the percent into a seek position.
		sound.seek(sound.duration() * per);
		this.step();
	},

	// The step called within requestAnimationFrame to update the playback position.
	step: function() {
		var self = this;

		// Get the Howl we want to manipulate.
		var sound = self.playlist[self.index].howl;

		// Determine our current seek position.
		var seek = sound.seek() || 0;
		trackTimer.innerHTML = self.formatTime(Math.round(seek));
		trackProgress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

		// If the sound is still playing, continue stepping.
		if (sound.playing()) {
			requestAnimationFrame(self.step.bind(self));
		}
	},

	// Format the time from seconds to MM:SS.
	formatTime: function(secs) {
		var minutes = Math.floor(secs / 60) || 0;
		var seconds = (secs - minutes * 60) || 0;

		return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
	{
		title: 'Palmbomen - Stock',
		file: 'music/stock.mp3',
		howl: null
	},
	{
		title: 'Kavinsky - Nightcall',
		file: 'music/nightcall.mp3',
		howl: null
	},
	{
		title: 'Coconuts - Silver Lights',
		file: 'music/silver_lights.mp3',
		howl: null
	},
	{
		title: 'El Huervo - Rust',
		file: 'music/rust.mp3',
		howl: null
	},
	{
		title: 'El Huervo - Daisuke',
		file: 'music/daisuke.mp3',
		howl: null
	},
	{
		title: 'Mega Drive - NARC',
		file: 'music/narc.mp3',
		howl: null
	},
	{
		title: 'M.O.O.N. - Dust',
		file: 'music/dust.mp3',
		howl: null
	},
	{
		title: 'M.O.O.N. - Crystals',
		file: 'music/crystals.mp3',
		howl: null
	}
]);

// Bind our player controls.
playBtn.addEventListener('click', function() {
	player.play();
});
pauseBtn.addEventListener('click', function() {
	player.pause();
});
prevBtn.addEventListener('click', function() {
	player.skip(false);
});
nextBtn.addEventListener('click', function() {
	player.skip(true);
});
progressContainer.addEventListener('click', function(event) {
	player.seek(event.offsetX / progressContainer.offsetWidth);
});

function prepareFFTDisplay() {
	if (analyzer === undefined) {
		analyzer = Howler.ctx.createAnalyser();
		Howler.masterGain.connect(analyzer);

		Howler.volume(0.4);
	}

	var ctx = analyzerCanvas.getContext("2d");

	analyzer.fftSize = 512;
	var bufferLength = analyzer.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	var barWidth = (analyzerCanvas.width / bufferLength) * 2.5;
	var barHeight;
	var x = 0;

	function renderFrame() {
		requestAnimationFrame(renderFrame);

		x = 0;

		analyzer.getByteFrequencyData(dataArray);

		ctx.clearRect(0, 0, analyzerCanvas.width, analyzerCanvas.height);

		for (var i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i] / 256 * analyzerCanvas.height;
			
			var r = barHeight + (25 * (i/bufferLength));
			var g = 250 * (i/bufferLength);
			var b = 150;

			ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			ctx.fillRect(x, analyzerCanvas.height - barHeight, barWidth, barHeight);

			x += barWidth + 1;
		}
	}

	renderFrame();
}

function removeStatusAnimation() {
	playbackState.style.animation = "none";
}

function resetStatusAnimation() {
	playbackState.style.animation = "none";
	playbackState.offsetHeight;
	playbackState.style.animation = ""; 
}

function updatePlaybackVisualState(state) {
	switch (state) {
		case 0:
			cassettePlay.style.display = 'block';
			cassettePause.style.display = 'none';
			cassetteDownload.style.display = 'none';

			playbackPlay.style.display = 'block';
			playbackPause.style.display = 'none';
			playbackDownload.style.display = 'none';
			break;
		case 1:
			cassettePlay.style.display = 'none';
			cassettePause.style.display = 'block';
			cassetteDownload.style.display = 'none';

			playbackPlay.style.display = 'none';
			playbackPause.style.display = 'block';
			playbackDownload.style.display = 'none';
			break;
		case 2:
			cassettePlay.style.display = 'none';
			cassettePause.style.display = 'none';
			cassetteDownload.style.display = 'block';

			playbackPlay.style.display = 'none';
			playbackPause.style.display = 'none';
			playbackDownload.style.display = 'block';
			break;
		default:
			break;
	}
}

function updatePlaylist() {
	fileList.innerHTML = "";

	player.playlist.forEach(function(song) {
		var div = document.createElement('div');
		div.className = 'list-song';
		div.innerHTML = "• " + song.title;
		div.onclick = function() {
			player.skipTo(player.playlist.indexOf(song));
		};
		fileList.appendChild(div);
	});
}

fileInput.onchange = function() {
    player.playlist.push({
		title: this.files[0].name,
		file: URL.createObjectURL(this.files[0]),
		howl: null
	})
	updatePlaylist()
	player.skipTo(player.playlist.length - 1);
}
