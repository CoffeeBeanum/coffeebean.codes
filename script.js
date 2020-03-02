const regexMessage = /(\d+)x(\d+)\)\%([^\x05]*)/;

var boot_string = "%(5000x1)%\
KIDTECH (C) 1991\n\
BIOS Date DATE Ver: 00.00.01\n\
CPU: Intel(R) CPU 330 @ 40 MHz\n\
Speed: 40 MHz\n\
\n\
%(8300x1)%\
Memory Test: %(8400x1)%128420 OK\n\
\n\
%(10000x1)%\
PMU ROM Version 2055\n\
NVMM ROM Version: 6.027.44\n\
Initializing USB Controllers.. %(10700x1)%Done.\n\
\n\
%(11000x1)%\
128MB OK\n\n";

const splash_string = "%(0x3)%\
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

var on = false

window.addEventListener('load', function () {
	calculateScreenSize();
	
	var date = new Date();
	var dateString = date.toLocaleString();
                        
	boot_string = boot_string.replace("DATE", dateString);
})

function startup() {
	if (on == true) { return }
	on = true
	
	let startupAudio = new Audio('startup.mp3');
	startupAudio.volume = 0.4;
	startupAudio.play();
	
	$("#led-image").toggle()
	
	clearScreen();
	presentMessage(boot_string);

	setTimeout(function() {
		playIdleAudio()
	}, 10700);

	setTimeout(function() {
        clearScreen();
        presentMessage(splash_string)
	}, 13000);
}

function presentMessage(message) {
    let splits = message.split("%(");
        
    for (let split of splits) {
        let matches = split.match(regexMessage);
        
        if (matches == null) {
            presentString(split);
        } else {
            presentString(matches[3], parseInt(matches[1]), parseInt(matches[2]));
        }
    }
}

function presentString(string, delay = 0, modifier = 1) {
    for (let index = 0; index < string.length; index++) {
        setTimeout(function() {
            let character = string.charAt(index);
            $("#screen-text").append(htmlEncode(character));
        }, index * modifier + delay);
    }
}

function clearScreen() {
    $("#screen-text").empty();
}

function calculateScreenSize() {
	if ($('.screen-container').width() < 800) {
        let widthRatio = $('.screen-container').width() / 800;
		let rightMargin = 75 * widthRatio;
		
		$('.screen-container').css("height", 583 * widthRatio + "px");
		$('#screen-text').css("transform", "scale(" + widthRatio + ")");
		$('#led-image').css("width", 25 * widthRatio + "px");
	} else {
		$('.screen-container').css("height", "583px");
		$('#screen-text').css("transform", "scale(1)");
        $('#led-image').css("width", "25px");
	}
}

function playIdleAudio() {
	var idleAudio = new Audio('idle1.mp3')
	idleAudio.volume = 0.4;
	idleAudio.addEventListener('timeupdate', function(){
		var buffer = .44
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

function htmlEncode(string) {
  var element = document.createElement("div");
  element.innerText = element.textContent = string;
  string = element.innerHTML;
  return string;
}
