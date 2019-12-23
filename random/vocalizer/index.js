const audioFiles = {
	A: 'vocal/a.mp3',
	E: 'vocal/e.mp3',
	I: 'vocal/i.mp3',
	O: 'vocal/o.mp3',
	U: 'vocal/u.mp3',
	H: 'vocal/h.mp3',
	L: 'vocal/l.mp3',
	N: 'vocal/n.mp3',
	G: 'vocal/g.mp3',
	PAUSE: 'vocal/pause.mp3'
}

function getAudioFor(character) {
	switch (character) {
		case "a":
			return new Audio(audioFiles.A);
			break;
		case "e":
			return new Audio(audioFiles.E);
			break;
		case "i":
			return new Audio(audioFiles.I);
			break;
		case "o":
			return new Audio(audioFiles.O);
			break;
		case "u":
			return new Audio(audioFiles.U);
			break;
		case "h":
			return new Audio(audioFiles.H);
			break;
		case "l":
			return new Audio(audioFiles.L);
			break;
		case "n":
			return new Audio(audioFiles.N);
			break;
		case "g":
			return new Audio(audioFiles.G);
			break;
		case " ":
			return new Audio(audioFiles.PAUSE);
			break;
		case ".":
			return new Audio(audioFiles.PAUSE);
			break;
		default:
			return null;
	}
}

function playQueue(audioQueue) {
    let index = -1;
	
	playAudio(index, audioQueue);
}

function playAudio(index, audioQueue) {
	index++;
	
	console.log(audioQueue[index]);
	
    if (index == audioQueue.length) return;
	
    audioQueue[index].onended = setTimeout(function() {
		playAudio(index, audioQueue);
	}, 80)
    audioQueue[index].play();
}

function readString() {
	let string = $("#text-input").val()
	
	let audioQueue = []
	
	string.toLowerCase().split('').forEach(character => {
		audioQueue.push(getAudioFor(character));
	})
	
	audioQueue = audioQueue.filter(item => item)
	
	playQueue(audioQueue);
}

$("#text-input").on("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#play-button").click();
  }
});