$(document).ready(function() {
	let urlVarText = getUrlVars()["m"]
	if (urlVarText) {
		$("#text-input").val(urlVarText.replace('+', ' '))
	}
	
	new Clipboard('#link-button', {
		text: function() {
			return getRawLocation() + "?m=" + escapeHtml($("#text-input").val());
		}
	});
});

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