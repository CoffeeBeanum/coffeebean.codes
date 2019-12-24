let audioDelay = 0;

function getAudioFor(character) {
    switch (character) {
        case "?":
        case "!":
        case ".":
            character = "pause_long";
            break;
        case ",":
        case " ":
            character = "pause_short";
            break;
    }
	
    let audio = new Howl({
      src: [`vocal/${character}.mp3`]
    });
    
    return audio;
}

function playQueue(audioQueue) {
    let index = -1;
	
	playAudio(index, audioQueue);
}

function playAudio(index, audioQueue) {
	index++;
	
    if (index == audioQueue.length) return;
	
    audioQueue[index].on('end', function() {
         setTimeout(function(){ playAudio(index, audioQueue) }, audioDelay);
	})
    
    audioQueue[index].play();
}
