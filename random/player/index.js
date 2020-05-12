// Cache references to DOM elements.
var elms = ['playBtn', 'pauseBtn', 'loadingBtn', 'prevBtn', 'nextBtn', 'progressContainer', 'progress', 'timer', 'list', 'volume', 'trackTitle', 'analyzerCanvas'];
	elms.forEach(function(elm) {
	window[elm] = document.getElementById(elm);
});

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
	this.playlist = playlist;
	this.index = 0;

	// Display the title of the first track.
	trackTitle.innerHTML = playlist[0].title;

	// Setup the playlist display.
	playlist.forEach(function(song) {
		var div = document.createElement('div');
		div.className = 'list-song';
		div.innerHTML = song.title;
		div.onclick = function() {
			player.skipTo(playlist.indexOf(song));
		};
		list.appendChild(div);
	});
};

Player.prototype = {
	/**
	 * Play a song in the playlist.
	 * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
	 */
	play: function(index) {
		var self = this;
		var sound;

		index = typeof index === 'number' ? index : self.index;
		var data = self.playlist[index];

		// If we already loaded this track, use the current one.
		// Otherwise, setup and load a new Howl.
		if (data.howl) {
			sound = data.howl;
		} else {
			sound = data.howl = new Howl({
				src: ['./audio/' + data.file + '.mp3'],

				onplay: function() {
					// Display the duration.
					duration.innerHTML = self.formatTime(Math.round(sound.duration()));

					// Start upating the progress of the track.
					requestAnimationFrame(self.step.bind(self));

					// Start the wave animation if we have already loaded
					pauseBtn.style.display = 'block';
				},

				onload: function() {
					// Start the wave animation.
					loadingBtn.style.display = 'none';
					pauseBtn.style.display = 'block';
				},

				onend: function() {
					// Stop the wave animation.
					self.skip(true);
				},

				onpause: function() {
					// Stop the wave animation.
				},

				onstop: function() {
					// Stop the wave animation.
				}
			});
		}

		// Begin playing the sound.
		sound.play();

		prepareFFTDisplay();

		// Update the track display.
		trackTitle.innerHTML = data.title;

		// Show the pause button.
		if (sound.state() === 'loaded') {
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'block';
		} else {
			loadingBtn.style.display = 'block';
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'none';
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
		var sound = self.playlist[self.index].howl;

		// Puase the sound.
		sound.pause();

		// Show the play button.
		playBtn.style.display = 'block';
		pauseBtn.style.display = 'none';
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

		// Stop the current track.
		if (self.playlist[self.index].howl) {
		self.playlist[self.index].howl.stop();
		}

		// Reset progress.
		progress.style.width = '0%';

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

	/**
	 * Seek to a new position in the currently playing track.
	 * @param  {Number} per Percentage through the song to skip.
	 */
	seek: function(per) {
		var self = this;

		// Get the Howl we want to manipulate.
		var sound = self.playlist[self.index].howl;

		// Convert the percent into a seek position.
		if (sound.playing()) {
			sound.seek(sound.duration() * per);
		}
	},

	/**
	 * The step called within requestAnimationFrame to update the playback position.
	 */
	step: function() {
		var self = this;

		// Get the Howl we want to manipulate.
		var sound = self.playlist[self.index].howl;

		// Determine our current seek position.
		var seek = sound.seek() || 0;
		timer.innerHTML = self.formatTime(Math.round(seek));
		progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

		// If the sound is still playing, continue stepping.
		if (sound.playing()) {
			requestAnimationFrame(self.step.bind(self));
		}
	},

	/**
	 * Format the time from seconds to M:SS.
	 * @param  {Number} secs Seconds to format.
	 * @return {String}      Formatted time.
	 */
	formatTime: function(secs) {
		var minutes = Math.floor(secs / 60) || 0;
		var seconds = (secs - minutes * 60) || 0;

		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
	{
		title: 'Kavinsky - Nightcall',
		file: 'nightcall',
		howl: null
	},
	{
		title: 'Coconuts - Silver Lights',
		file: 'silver_lights',
		howl: null
	},
	{
		title: 'Rust',
		file: 'rust',
		howl: null
	},
	{
		title: 'NARC',
		file: 'narc',
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
// prevBtn.addEventListener('click', function() {
// 	player.skip(false);
// });
// nextBtn.addEventListener('click', function() {
// 	player.skip(true);
// });
progressContainer.addEventListener('click', function(event) {
	player.seek(event.offsetX / progressContainer.offsetWidth);
});

function prepareFFTDisplay() {
	var analyzer = Howler.ctx.createAnalyser();
	Howler.masterGain.connect(analyzer);

	var ctx = analyzerCanvas.getContext("2d");

	analyzer.fftSize = 256;

	var bufferLength = analyzer.frequencyBinCount;

	var dataArray = new Uint8Array(bufferLength);

	var WIDTH = analyzerCanvas.width;
	var HEIGHT = analyzerCanvas.height;

	var barWidth = (WIDTH / bufferLength) * 2.5;
	var barHeight;
	var x = 0;

	function renderFrame() {
		requestAnimationFrame(renderFrame);

		x = 0;

		analyzer.getByteFrequencyData(dataArray);

		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		for (var i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i];
		
		var r = barHeight + (25 * (i/bufferLength));
		var g = 250 * (i/bufferLength);
		var b = 50;

		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

		x += barWidth + 1;
		}
	}

	renderFrame();
}
