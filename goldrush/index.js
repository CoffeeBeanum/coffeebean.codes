var tick = true;

function updateTimer() {
    document.getElementById('debug-span').style.color = tick ? "whitesmoke" : "red"

    document.getElementById('debug-output').innerText = `${window.innerWidth} X ${window.innerHeight}`;

    tick = !tick;
}

let timerInterval = setInterval(updateTimer, 1000);

updateTimer();