function getAudioFor(character) {
	if (character == " " || character == ".") {
		character = "pause";
	}
	
	let route = `vocal/${character}.mp3`;

	return new Audio(route);
}

function playQueue(audioQueue) {
    let index = -1;
	
	playAudio(index, audioQueue);
}

function playAudio(index, audioQueue) {
	index++;
	
    if (index == audioQueue.length) return;
	
    audioQueue[index].onended = setTimeout(function() {
		playAudio(index, audioQueue);
	}, 80)
    audioQueue[index].play();
}