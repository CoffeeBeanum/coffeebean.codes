$('body').addClass('stop-scrolling');

let audio = new Audio('now.mp3');
audio.volume = 0.4;
audio.loop = true;

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
}

let body = document.body,
    html = document.documentElement;

let height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

window.scrollTo(0, height/2 - window.innerHeight/2);

$(window).on('scroll', function(){
    let s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();

    let scroll = (s / (d - c));

    if (scroll < 0.1) scroll = 0.1;

    let audioSpeed = 1 / (Math.tan(scroll-1) - Math.tan(-1));

    audio.playbackRate = audioSpeed.toFixed(1);
    let connorSpeed = (0.35 * 2) * scroll;

    $('.connor').css('animation', 'gif-connor ' + connorSpeed.toFixed(2) + 's infinite steps(1)');
});

let state = 0;

$('#splash').on('click', function () {
    if (state === 0) {
        state = 1;
        $('#splash').css('cursor', 'default');
        sequence();
        audio.play();
    }
});

function sequence() {
    setTimeout(function() {
        $('body').removeClass('stop-scrolling');
        $('#splash').fadeOut();
    }, 11000);
    $('#splashConnor').css('height', '0px');
}
