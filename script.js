var boot_string_1 = "KIDTECH (C) 1991\n\
BIOS Date DATE Ver: 00.00.01\n\
CPU: Inter(R) CPU 330 @ 40 MHz\n\
Speed: 40 MHz\n";

const boot_string_2 = "Memory Test: 128420 OK\n";

const boot_string_3 = "PMU ROM Version 2055\n\
NVMM ROM Version: 6.027.44\n\
Initializing USB Controllers.. %(700x1)%Done.\n";

const boot_string_4 = "128MB OK\n";

const splash_string_1 = "%(0x10)%.´,.,,.,´.,´.,´´,.´,.´,.,,.,´.,´.,´´,.´,.´,.,,.,´.,´.,´´,.´\n\
,´´,´´,´^~'^^'^^'^^'~,´,´´,´´,.´,.´´.,,'~^'~^^~'^~'^,.´´.,´\n\
,´´,´´,´¶NNNNNNNNNNNN;´,´´,´´,´´´´´´´´íNNNNNNNNNNNNN´´´´´´´\n\
.´,»NNNNNNNNNNNNNNNNNNN*,,.,´.,´.,´´*NNNNNN&=====%NNNNNN*.´\n\
´%NNNNNNNNNNNNNNNNNNNNNI´´´´´´´´´´´´=NNNN===========NNNNNNo\n\
,oNNNNNNNNNNNNNNNNNNNNNI´´,.´,.´,.,,=Næ======@N@======æNNNo\n\
.%NNNNNNNNNNNNNNNNNNNNN*´´.,´.,´´,´´*NNNN===========NNNNNNX\n\
´´´?NNNNNNNNNNNNNNNNN/´´´´´íNNNN;,´´,´íNNNN&=====%NNNNNN=´´\n\
,´.',,',¶NNNNNNNNNNNN;.,´´,~NNNN/.,,.,;NNNN©©©©©©©NN'´''´,´\n\
´´´´´´´´;/;;/;//?NN//'´´´»@§NNNN§Ñ?´´´,;/NN*;;/;;/;;´´´´´´´\n\
.´,.,,.,´.,´»Xooo*I'.´,.,*NNNNNNNN*´,.´,.II%XXo=´.,´.,´´,.´\n\
,´´,´´,´=*'´?£££%,´´,´´,´=NNNNNNNNI´´,´´,´´%£££=´^==,´´´´,´\n\
,´´,´´,´¶N*í^´´´´´´´,´´,´»§§§§§§§§?´´´´´,´´,´´,´´;NN;í,´´´´\n\
.´,.,,´,¶NNNI'´´'.´,.´,.,,.,´.,´.,´´,.´,.´,.,,´,,íNNNNí´,.´\n\
´´´?NNNNNN;.%NNNÉ´´´´´´´´´´´´´´´´´´´´´´´´´´´´XNNNNNNNNNN=´´\n\
,´.,´´,.¶N;.%N£.^NNNNNNNNNNNNNNNNNNNNNNNNNNNN=.*NNNN,.,,.,´\n\
´´,´´´´,´´@NNN£......@N*...~NN´.....=N§....§N=.*NÑ,´´,´´,´´\n\
´´´´´´´´´´,´oNNNÉ....@N*...~NN´.....=N§....§NNNX´´,´´,´´,´´\n\
,´.,´´,.´,.´,.,,^NNNNNN*...~NN´.....=N§..NNNN*,.´,.´,.,,.,´\n\
´´´´´´´´´´´´´´´´´´´´´ÑNNNNNNNNNNNNNNNNNNN´´´´´´´´´´´´´´´´´´\n\
.´,.,,.,´.,´.,´´,.´,.^í^~~^í~^í~^í~~í^~í^´,.,,.,´.,´.,´´,.´";

var on = false

window.addEventListener('load', function () {
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
        const regex = /(\d+)x(\d+)\)\%(.*)/s;
        let matches = split.match(regex);

        console.log(matches)
        
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
            if (character == "\n") {
                $("#screen-text").append("<br>");
            } else {
                $("#screen-text").append(character);
            }
        }, index * modifier + delay);
    }
}

function clearScreen() {
    $("#screen-text").empty();
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

