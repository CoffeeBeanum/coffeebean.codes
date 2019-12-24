$(document).ready(function() {
	let urlVarText = getUrlVars()["m"]
	if (urlVarText) {
		$("#text-input").val(urlVarText.replace(/\+/g, ' '))
	}
	
	new Clipboard('#link-button', {
		text: function() {
			return getRawLocation() + "?m=" + escapeHtml($("#text-input").val());
		}
	});
                  
    $("textarea").keydown(autosize);
});

function readString() {
	let string = $("#text-input").val()
	
	let audioQueue = [];
	
	string.toLowerCase().split('').forEach(character => {
		audioQueue.push(getAudioFor(character));
	})
	
    audioQueue = audioQueue.filter(item => item);
    
	playQueue(audioQueue);
}

$("#text-input").on("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#play-button").click();
  }
});
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}
