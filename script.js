var on = false

window.addEventListener('load', function () {
	var date = new Date();
	var dateString = date.toLocaleString();
	
	var oldString = $("#boot-1").html();
	var newString = oldString.replace("DATE", dateString);
	
	$("#boot-1").html(newString);
})

function startup() {
	if (on == true) { return }
	
	on = true
	
	let startupAudio = new Audio('startup.mp3');
	startupAudio.volume = 0.4;
	
	startupAudio.play();
	
	$("#led-image").toggle()
	
	setTimeout(function() {
		playIdleAudio()
	}, 10700);
	
	setTimeout(function() {
		$("#boot-1").toggle()
	}, 5000);
	setTimeout(function() {
		$("#boot-2").toggle()
	}, 8300);
	setTimeout(function() {
		$("#boot-3").css("display", "inline-block")
	}, 10000);
	setTimeout(function() {
		$("#boot-4").css("display", "inline-block")
	}, 10700);
	setTimeout(function() {
		$("#boot-5").toggle()
	}, 11000);
	setTimeout(function() {
		$("#boot-1").toggle()
		$("#boot-2").toggle()
		$("#boot-3").toggle()
		$("#boot-4").toggle()
		$("#boot-5").toggle()
	}, 13000);
}

function playIdleAudio() {
	let idleAudio = new Audio('idle1.mp3');
	idleAudio.volume = 0.4;
	
	idleAudio.addEventListener('timeupdate', function(){
                var buffer = .44
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0
                    this.play()
                }}, false);
	
	idleAudio.play();
}

$("body").click(function() {
	startup();
});

