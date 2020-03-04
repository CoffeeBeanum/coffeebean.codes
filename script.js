const regexTiming = /(\d+)\|(\d+)\)\%([^\x05]*)/;

const boot_string = "%(5000|1)%\
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
128MB OK\
%(500|1)% ";

const system_string = "\
A:\\>dir\n\
 Volume in drive A has no label\n\
 Directory of A:\\\n\
\n\
2019-12-10  10:32 AM    <DIR>   gmod\n\
2020-03-04  06:02 PM      8,224 homelib.exe\n\
2019-12-10  10:32 AM    215,526 ibm_monitor.png\n\
2019-12-10  10:32 AM     28,814 idle1.mp3\n\
2019-12-10  10:32 AM     19,889 idle2.mp3\n\
2019-12-10  10:32 AM     55,900 idle3.mp3\n\
2020-03-04  03:12 PM        584 index.html\n\
2019-12-10  10:32 AM        584 led.png\n\
2019-12-10  10:32 AM     70,956 PxPlus_IBM_VGA8.ttf\n\
2019-12-24  09:46 AM    <DIR>   random\n\
2020-03-04  05:51 PM     10,635 script.js\n\
2019-12-10  10:32 AM    235,632 startup.mp3\n\
2020-03-04  05:20 PM      1,522 style.css\n\
             10 File(s) 640,046 bytes\n\
\n\
%(300|1)%\
A:\\>homelib\n\
%(300|1)%\
Loading Library:%(100|50)%......%(400|500)%...%(3000|20)%..........%(200|5)%........................";

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

const library_string = "%(0|3)%\
\n\
    ██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗   \n\
    ██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝   \n\
    ██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝    \n\
    ██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝     \n\
    ███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║      \n\
    ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      \n\
\n\
-=[ Epic pro stuff ]=14ms=-- - ·\n\
\n\
  ERROR: Unexpected EOF.\n\
\n\
-=[ Random stuff ]==273ms=-- - ·\n\
\n\
  > %(0|0)%<a href='random/vocalizer' target='_blank'>Vocalizer</a>%(10|3)% - cutting-edge voice synthesizer.\n\
\n\
  > %(0|0)%<a href='random/connor' target='_blank'>Detroit running simulator</a>%(10|3)% - it had to be done.\n\
\n\
██████████████████████████████████████████████▀▀▀▀▀▀▀▀▀▀▀▀█\n\
██████████████████████████████████████████████  %(0|0)%<a onclick='shutdown()' href='javascript:;'>SHUTDOWN</a>%(10|3)%  █\n\
██████████████████████████████████████████████▄▄▄▄▄▄▄▄▄▄▄▄█";

const shutdown_string = "\n\n\n\n\n\n\n\n\n\
                IT'S NOW SAFE TO TURN OFF\n\
                      YOUR COMPUTER";

const startupAudio = new Howl({ 
	src: ['startup.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.4,
	onend: function() {
		idleAudio.play();
	}
});
const idleAudio = new Howl({
	src: ['idle1.mp3'],
	autoplay: false,
	loop: true,
	volume: 0.4
});

var on = false

window.addEventListener('load', function () {
	calculateScreenSize();
})

function startup() {
	if (on == true) { return }
	on = true

	let date = new Date();
	let dateString = date.toLocaleString();    
	let processed_boot_string = boot_string.replace("DATE", dateString);

	startupAudio.play();
	
	$("#led-image").toggle()
	
	clearScreen();

	presentMessage(processed_boot_string, function() {
		clearScreen();
        presentMessage(system_string, function() {
			clearLine(23, 50, function() {
				presentMessage(library_string);
			});
		});
	});
}

function shutdown() {
	clearLine(21, 70, function() {
		presentMessage(shutdown_string);

		setTimeout(function() {
			clearScreen();
			on = false;
			$("#led-image").toggle()
			startupAudio.pause();
			idleAudio.pause();
		}, 1500);
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
 
            if ($("#screen-text").html().substr($("#screen-text").html().length - 10) === '&lt;/a&gt;') {
                $("#screen-text").html(convertHTMLEntity($("#screen-text").html()));
            }
 
            if (callback != null && index == string.length - 1) { callback(); }
        }, index * modifier + delay);
    }
}
 
function convertHTMLEntity(text){
    const span = document.createElement('span');
 
    return text
        .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
            span.innerHTML = entity;
            return span.innerText;
        });
}

function clearScreen() {
    $("#screen-text").empty();
}

function clearLine(numberOfLines = 1, delay = 0, callback) {
	let scheduledRemoval = 0;
	while (scheduledRemoval < numberOfLines) {

		let completion = callback;
		if (scheduledRemoval < numberOfLines - 1) { completion = null; }

		setTimeout(function() {
			while ($("#screen-text").html().length > 1 && $("#screen-text").html()[0] != "\n") {
				$("#screen-text").html($("#screen-text").html().substring(1));
			}
			$("#screen-text").html($("#screen-text").html().substring(1));
			if (completion != null) { completion(); }
		}, delay * (scheduledRemoval + 1));

		scheduledRemoval ++;
	}
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

$("body").click(function() {
	startup();
});

$(window).resize(function() {
	calculateScreenSize();
});
