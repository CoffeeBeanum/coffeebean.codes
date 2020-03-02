let audioCtx;

var boot_string_1 = "KIDTECH (C) 1991\n\
BIOS Date DATE Ver: 00.00.01\n\
CPU: Intel(R) CPU 330 @ 40 MHz\n\
Speed: 40 MHz\n\n";

const boot_string_2 = "Memory Test: 128420 OK\n\n";

const boot_string_3 = "PMU ROM Version 2055\n\
NVMM ROM Version: 6.027.44\n\
Initializing USB Controllers.. %(700x1)%Done.\n\n";

const boot_string_4 = "128MB OK\n\n";

const splash_string_1 = "%(0x3)%\
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
                        
	boot_string_1 = boot_string_1.replace("DATE", dateString);
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
        presentMessage(boot_string_1);
	}, 5000);
	setTimeout(function() {
        presentMessage(boot_string_2);
	}, 8300);
	setTimeout(function() {
        presentMessage(boot_string_3);
	}, 10000);
	setTimeout(function() {
        presentMessage(boot_string_4);
	}, 11000);
	setTimeout(function() {
        clearScreen();
        presentMessage(splash_string_1)
	}, 13000);
}

function presentMessage(message) {
    let splits = message.split("%(");
        
    for (let split of splits) {
        const regex = /(\d+)x(\d+)\)\%([^\x05]*)/;
        let matches = split.match(regex);
        
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
		$('#screen-text').css("font-size", "2vw");
		$('#screen-text').css("height", "75vw");
        $('#led-image').css("width", "3vw");
        
        let widthRatio = $('.screen-container').width() / 800;
        let rightMargin = 75 * widthRatio;
        
        $('#led-image').css("right", rightMargin + "px");
	} else {
		$('#screen-text').css("font-size", "16px");
		$('#screen-text').css("height", "600px");
        $('#led-image').css("width", "25px");
        $('#led-image').css("right", "75px");
	}
}

function playIdleAudio() {
	if(window.webkitAudioContext) {
		audioCtx = new window.webkitAudioContext();
	} else {
		audioCtx = new window.AudioContext();
	}
	
	let source = audioCtx.createBufferSource();
	request = new XMLHttpRequest();

	request.open('GET', 'idle1.mp3', true);

	request.responseType = 'arraybuffer';

	request.onload = function() {
		var audioData = request.response;

		audioCtx.decodeAudioData(audioData, function(buffer) {
			myBuffer = buffer;
			source.buffer = myBuffer;
			source.loop = true;
			
			let gainNode = audioCtx.createGain();
			gainNode.gain.value = 0.4;
			
			gainNode.connect(audioCtx.destination);
			source.connect(gainNode);
		},

		function(e){"Error with decoding audio data" + e.err});

		}

	request.send();
	
	source.start(0);
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
