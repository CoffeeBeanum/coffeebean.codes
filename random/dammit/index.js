let beep1 = new Audio('beep-psh.mp3');
let beep2 = new Audio('beep-beep-psh.mp3');

let dammit1 = new Audio('dammit1.mp3');
let dammit2 = new Audio('dammit2.mp3');
let dammit3 = new Audio('dammit3.mp3');

beep1.volume = 0.4;
beep2.volume = 0.4;

dammit1.volume = 0.4;
dammit2.volume = 0.4;
dammit3.volume = 0.4;

beep1.onended = function() { dammit() };
beep2.onended = function() { dammit() };

dammit1.onended = function() { dammit() };
dammit2.onended = function() { dammit() };
dammit3.onended = function() { dammit() };

let started = false;

function beep() {
    if (Math.round(Math.random())) {
        beep1.play();
    } else {
        beep2.play();
    }
}

function dammit() {
    let rand = Math.floor(Math.random() * 3);

    switch (rand) {
        case 0:
			dammit1.playbackRate = Math.random() * (0.7 - 1.7) + 1.7;
            dammit1.play();
            break;
        case 1:
			dammit2.playbackRate = Math.random() * (0.7 - 1.7) + 1.7;
            dammit2.play();
            break;
        case 2:
			dammit3.playbackRate = Math.random() * (0.7 - 1.7) + 1.7;
            dammit3.play();
    }
}

function start() {
    if (!started) {
        beep();
        started = true;
    }
}
