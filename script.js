const regexTiming = /(\d+)\|(\d+)\)\%([^\x05]*)/;

const about_link = "https://github.com/McKiddo";
const github_link = "https://github.com/McKiddo/mckiddo.github.io";

const pre_boot_string = "%(500|1)%\
\n\n\
     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀       ▀▀▀▀▀▀▀     \n\
     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀▀     \n\
       ▀▀▀▀▀      ▀▀▀▀   ▀▀▀▀▀    ▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀      \n\
       ▀▀▀▀▀      ▀▀▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀      \n\
       ▀▀▀▀▀      ▀▀▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀ ▀▀▀▀▀▀▀ ▀▀▀▀▀      \n\
       ▀▀▀▀▀      ▀▀▀▀   ▀▀▀▀▀    ▀▀▀▀▀  ▀▀▀▀▀  ▀▀▀▀▀      \n\
     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀   ▀▀▀   ▀▀▀▀▀▀     \n\
     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀    ▀    ▀▀▀▀▀▀     \n\
\n\
                     Personal Computer                     \n\
\n\
╔═════════════════════════════════════════════════════════╗\n\
║        This system is for authorized users only.        ║\n\
║   Usage of this system may be monitored and recorded.   ║\n\
╚═════════════════════════════════════════════════════════╝\n\
\n\n\n\
Press ESC to enter BIOS\
%(1800|1)% "

const boot_string = "%(0|1)%\
KIDTECH (C) 1991\n\
BIOS Date DATE Ver: 00.00.03\n\
CPU: Intel(R) CPU 330 @ 40 MHz\n\
Speed: 40 MHz\n\
\n\
%(2400|1)%\
Memory Test: %(200|1)%128420 OK\n\
\n\
%(1600|1)%\
PMU ROM Version 2055\n\
NVMM ROM Version: 6.027.44\n\
Initializing USB Controllers.. %(700|1)%Done.\n\
\n\
%(300|1)%\
128MB OK\
%(500|1)% ";

const bios_string = "\
┌─────────────────────────────────────────────────────────┐\n\
│%(0|0)%<a onclick='linkBoot()' href='javascript:;'>[← Back]</a>%(0|1)%▒▒▒▒▒▒[ Generic SETUP Version 0.03]▒▒▒▒▒▒▒▒[2055]│\n\
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒╔═════════════════════════════════════════╗▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║       Current SETUP Configuration       ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║───────────────────────┬─────────────────║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [0] Time              │ TIME        ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [1] Date              │ DATE      ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [2] Floppy Disk A:    │ DS/HD 1.2m 5¼\"\" ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [3] Floppy Disk B:    │ Not Installed   ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [4] Hard Disk 1 (C:)  │ Type 2          ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [5] Hard Disk 2 (D:)  │ Not Installed   ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [6] Base Memory       │ 420k            ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [7] Expansion Memory  │ 128000k         ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [8] Math Coprocessor  │ Not Installed   ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒║ [9] Primary Display   │ Special (EGA)   ║▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒╚═════════════════════════════════════════╝▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│\n\
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│\n\
└─────────────────────────────────────────────────────────┘\n\
"

const system_string = "\
A:\\Archive>dir\n\
 Volume in drive A has no label\n\
\n\
 Directory of A:\\Archive\n\
\n\
07/01/2020  01:14 AM    <DIR>          .\n\
07/01/2020  01:14 AM    <DIR>          ..\n\
12/08/2019  11:21 PM    <DIR>          gmod\n\
07/01/2020  01:01 AM    <DIR>          home_audio\n\
03/08/2020  10:23 PM           254,729 ibm_monitor.png\n\
07/05/2020  01:47 PM               814 index.html\n\
12/10/2019  02:32 AM               584 led.png\n\
01/16/2016  01:00 AM            70,956 PxPlus_IBM_VGA8.ttf\n\
07/01/2020  01:08 AM    <DIR>          random\n\
07/14/2020  09:37 PM            17,635 script.js\n\
07/05/2020  01:47 PM             1,796 style.css\n\
               6 File(s)        346,514 bytes\n\
               5 Dir(s)         278,256 bytes free\n\
\n\
%(300|1)%\
A:\\>homelib_2\n\
%(300|1)%\
Loading Archive:%(100|50)%......%(400|500)%...%(2400|20)%..........%(200|5)%........................";

const library_string = "%(0|3)%\
      Welcome to...            ╔═╗┌┬┐┬ ┬┌─┐┌─┐             \n\
                          𝓣𝓱𝓮 ╚═╗ │ │ │├┤ ├┤              \n\
     █████╗ ██████╗  ██████╗██╗╚═╝ ┴ └─┘└  └ ██╗███████╗   \n\
    ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝   \n\
    ███████║██████╔╝██║     ███████║██║██║   ██║█████╗     \n\
    ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝     \n\
    ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗   \n\
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝   \n\
\n\
              · - --=[ Featured stuff ]=-- - ·             \n\
\n\
  > %(0|0)%<a onclick='linkProject(0)' href='javascript:;'>TRION TX-200E</a>%(10|3)% - Hi-Fi stereo cassette player.\n\
\n\
  > %(0|0)%<a onclick='linkProject(1)' href='javascript:;'>Vocalizer</a>%(10|3)% - cutting-edge voice synthesizer.\n\
  > %(0|0)%<a onclick='linkProject(2)' href='javascript:;'>Detroit running simulator</a>%(10|3)% - it had to be done.\n\
\n\
                                              %(0|0)%<a onclick='linkMore()' href='javascript:;'>More Stuff ></a>%(10|3)% \n\
\n\
██▀▀▀▀▀▀▀▀▀██▀▀▀▀▀▀▀▀▀▀███████████████████████▀▀▀▀▀▀▀▀▀▀▀▀█\n\
██  %(0|0)%<a onclick='linkAbout()' href='javascript:;'>About</a>%(10|3)%  ██  %(0|0)%<a onclick='linkGithub()' href='javascript:;'>GitHub</a>%(10|3)%  ███████████████████████  %(0|0)%<a onclick='shutdown()' href='javascript:;'>SHUTDOWN</a>%(10|3)%  █\n\
██▄▄▄▄▄▄▄▄▄██▄▄▄▄▄▄▄▄▄▄███████████████████████▄▄▄▄▄▄▄▄▄▄▄▄█";

const more_string = "\n\n\n\n\n\n\n\n\n\
            · - --=[ Nothing here yet ]=-- - ·\n\
\n\
                        [ %(0|0)%<a onclick='linkMoreBack()' href='javascript:;'>Go Back</a>%(0|1)% ]";

const link_string = "%(0|0)%<a onclick='linkProjectBack()' href='javascript:;'>← Back</a>                    Preview         <a onclick='linkOriginal()' href='javascript:;'>Open in new tab ↑</a>"

const shutdown_string = "\n\n\n\n\n\n\n\n\n\
                IT'S NOW SAFE TO TURN OFF\n\
                      YOUR COMPUTER";

const restore_string = "Cache corruption detected.\n\
System was not shutdown properly.\n\
\n\
Reconstructing Cache Metadata.\n\
Please do not interrupt this process.\n\
\n\
%(300|1)%Active Archive session found.\n\
\n\
%(600|1)%Restoring session%(100|60)%....%(100|20)%.........%(100|40)%........%(400|10)%....................."

const startupAudio = new Howl({ 
	src: ['home_audio/startup.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.4,
	onend: function() {
		idleAudio.play();
	}
});

const shutdownAudio = new Howl({
	src: ['home_audio/shutdown.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.4
});

const idleAudio = new Howl({
	src: ['home_audio/idle_loop.mp3'],
	autoplay: false,
	loop: true,
	volume: 0.4
});

const beepAudio = new Howl({
	src: ['home_audio/beep.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.1
});

const activity1Audio = new Howl({
	src: ['home_audio/activity/activity1.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.05
});

const activity2Audio = new Howl({
	src: ['home_audio/activity/activity2.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.05
});

const activity3Audio = new Howl({
	src: ['home_audio/activity/activity3.mp3'],
	autoplay: false,
	loop: false,
	volume: 0.01
});

const activityAudios = [
	activity1Audio,
	activity2Audio,
	activity3Audio
];

const projectLinks = [
	"random/trion",
	"random/vocalizer",
	"random/connor"
];

function playActivitySound(forced) {
	if (forced || getRandomInt(0, 5) == 0) {
		activityAudios[getRandomInt(0, 2)].play();
	}
}

var on = false;
var BIOSMode = false;
var canEnterBIOS = false;

var currentProjectIndex = 0;

window.addEventListener('load', function () {
	calculateScreenSize();
})

function startup() {
	if (on == true) { return }
	on = true;

	let fastBoot = Cookies.get("fastBoot");

	let date = new Date();
	let dateString = date.toLocaleString();    
	let processed_boot_string = boot_string.replace("DATE", dateString);

	shutdownAudio.stop();
	startupAudio.play();
	
	$("#led-image").fadeOut(100);
	
	clearScreen();

	if (fastBoot == "true") {
		presentMessage(restore_string, function() {
			clearLine(9, 50, function() {
				presentHomepage();
			});
		});
	} else {
		canEnterBIOS = true;
		presentMessage(pre_boot_string, function() {
			clearScreen();

			canEnterBIOS = false;

			if (BIOSMode) {
				Cookies.set("fastBoot", "false", { expires: 1 });
				
				let date = new Date();

				let timeString = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' }).format(date)
				let dateString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)

				let processed_bios_string = bios_string.replace("TIME", timeString).replace("DATE", dateString);

				presentMessage(processed_bios_string);
			} else {
				beepAudio.play();

				presentMessage(processed_boot_string, function() {
					clearScreen();
					presentMessage(system_string, function() {
						clearLine(21, 50, function() {
							presentHomepage();
						});
					});
				});
			}
		});
	}
}

function linkAbout() {
	window.open(about_link, "_blank");
}

function linkGithub() {
	window.open(github_link, "_blank");
}

function linkMore() {
	clearLine(21, 50, function() {
		presentMessage(more_string);
	});
}

function linkMoreBack() {
	clearLine(12, 50, function() {
		presentHomepage();
	});
}

function linkProject(index) {
	clearLine(21, 50, function() {
		$('#screen-text').css("height", "6%");
		
		currentProjectIndex = index;
		
		presentMessage(link_string);
		
		$('#screen-container').append(`<object id='screen-embed' data='${projectLinks[index]}/index.html'>`);
	});
}

function linkProjectBack() {
	$('#screen-embed').remove();
	
	$('#screen-text').css("height", "100%");
	
	clearScreen();
	presentMessage(library_string);
}

function linkOriginal() {
	window.open(`${projectLinks[currentProjectIndex]}/index.html`, "_blank"); 
}

function linkBoot() {
	BIOSMode = false;

	let date = new Date();
	let dateString = date.toLocaleString();    
	let processed_boot_string = boot_string.replace("DATE", dateString);

	clearLine(21, 70, function() {
		setTimeout(function() {
			beepAudio.play();

			presentMessage(processed_boot_string, function() {
				clearScreen();
				presentMessage(system_string, function() {
					clearLine(21, 50, function() {
						presentHomepage();
					});
				});
			});
		}, 1500);
	});
}

function presentHomepage() {
	Cookies.set("fastBoot", "true", { expires: 1 });

	presentMessage(library_string);
}

function shutdown() {
	Cookies.set("fastBoot", "false", { expires: 1 });

	startupAudio.stop();
	idleAudio.stop();
	shutdownAudio.play();

	clearLine(21, 70, function() {
		presentMessage(shutdown_string);

		setTimeout(function() {
			clearScreen();
			on = false;
			$("#led-image").fadeIn(100);
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
			
			playActivitySound(false);
 
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

			playActivitySound(true);

			if (completion != null) { completion(); }
		}, delay * (scheduledRemoval + 1));

		scheduledRemoval ++;
	}
}

function handleKeyDown(event) {
	if (event.keyCode == 27 && canEnterBIOS) { BIOSMode = true; }
}

function calculateScreenSize() {
	if ($('#display-container').width() < 800) {
        let widthRatio = $('#display-container').width() / 800;
		let rightMargin = 75 * widthRatio;
		
		$('.screen-aligned').css("transform", "scale(" + widthRatio + ")");
		$('#display-container').css("height", 583 * widthRatio + "px");
		$('#led-image').css("width", 25 * widthRatio + "px");
	} else {
		$('.screen-aligned').css("transform", "scale(1)");
		$('#display-container').css("height", "583px");
        $('#led-image').css("width", "25px");
	}
}

document.body.addEventListener('click', function() {
	startup();
});

window.addEventListener('keydown', function(event){
    handleKeyDown(event);
});

window.onresize = function() { calculateScreenSize(); }
window.onorientationchange = function() { calculateScreenSize(); }

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
