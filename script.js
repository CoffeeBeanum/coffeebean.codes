const regexTiming = /(\d+)\|(\d+)\)\%([^\x05]*)/;

var boot_string = "%(5000|1)%\
KIDTECH (C) 1991\n\
BIOS Date DATE Ver: 00.00.03\n\
CPU: Intel(R) CPU 330 @ 40 MHz\n\
Speed: 40 MHz\n\
\n\
%(3300|1)%\
Memory Test: %(100|1)%128420 OK\n\
\n\
%(1600|1)%\
PMU ROM Version 2055\n\
NVMM ROM Version: 6.027.44\n\
Initializing USB Controllers.. %(700|1)%Done.\n\
\n\
%(300|1)%\
128MB OK\n\
\n\
%(1000|1)%\
Reading A:%(100|50)%......%(400|500)%...%(3000|20)%..........%(200|5)%............................";

const splash_string = "%(0|3)%\
███████████████████████████████████████████████████████████\n\
███████████████████████████████████████████████████████████\n\
███████████████████████████████████████████████████████████\n\
███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████\n\
███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░█      = DEMO =       █░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░█ THERES NOTHING HERE █░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░█        YET.         █░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓███████\n\
███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████\n\
███████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████\n\
███████████████████████████████████████████████████████████\n\
███████████████████████████████████████████████████████████\n\
███████████████████████████████████████████████████████████";

const startupAudio = new Audio('startup.mp3');
const idleAudio = new Audio('idle1.mp3')

var on = false

window.addEventListener('load', function () {
	calculateScreenSize();
	
	let date = new Date();
	let dateString = date.toLocaleString();
                        
	boot_string = boot_string.replace("DATE", dateString);
})

function startup() {
	if (on == true) { return }
	on = true

	playStartupAudio();
	
	$("#led-image").toggle()
	
	clearScreen();

	presentMessage(boot_string, function() {
		clearScreen();
        presentMessage(splash_string);
	});
}

function presentMessage(message, callback) {
    let splits = message.split("%(");
		
	let accumulatedDelay = 0;

    for (let [index, split] of splits.entries()) {
		let matches = split.match(regexTiming);

		let completion = callback;
		if (index < splits.length - 1) { completion = null; }

        if (matches != null) {
			presentString(completion, matches[3], accumulatedDelay + parseInt(matches[1]), parseInt(matches[2]));
			accumulatedDelay += parseInt(matches[1]) + matches[3].length * parseInt(matches[2]);
        } else {
			presentString(completion, split);
			accumulatedDelay += split.length;
        }
    }
}

function presentString(callback, string, delay = 0, modifier = 1) {
    for (let index = 0; index < string.length; index++) {
        setTimeout(function() {
            let character = string.charAt(index);
			$("#screen-text").html($("#screen-text").html() + character);

			if (index == string.length - 1) { callback(); }
        }, index * modifier + delay);
    }
}

function clearScreen() {
    $("#screen-text").empty();
}

function calculateScreenSize() {
	if ($('#screen-container').width() < 800) {
        let widthRatio = $('#screen-container').width() / 800;
		let rightMargin = 75 * widthRatio;
		
		$('#screen-container').css("height", 583 * widthRatio + "px");
		$('#screen-text').css("transform", "scale(" + widthRatio + ")");
		$('#led-image').css("width", 25 * widthRatio + "px");
	} else {
		$('#screen-container').css("height", "583px");
		$('#screen-text').css("transform", "scale(1)");
        $('#led-image').css("width", "25px");
	}
}

function playStartupAudio() {
	startupAudio.volume = 0.4;
	startupAudio.addEventListener('timeupdate', function(){
		let buffer = .44
		if(this.currentTime > this.duration - buffer){
			playIdleAudio();
		}
	});
	startupAudio.play();
}

function playIdleAudio() {
	idleAudio.volume = 0.4;
	idleAudio.addEventListener('timeupdate', function(){
		let buffer = .44
		if(this.currentTime > this.duration - buffer){
			this.currentTime = 0
			this.play()
		}
	});
	idleAudio.play();
}

$("body").click(function() {
	startup();
});

$( window ).resize(function() {
	calculateScreenSize();
});
