
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {32: 1, 37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
    e.preventDefault();
}

    function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
}
}

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

    var wheelOpt = supportsPassive ? {passive: false} : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

    // call this to Enable
    function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

    let btnFilter = document.getElementById("btnFilter");
    let filter = document.getElementById("filter");
    let body = document.querySelector("body");
    let text = document.getElementById("module");

    window.onload = function () {
    body.style.overflowY = "hidden";
    disableScroll();
    text.style.opacity = "1";
}

    btnFilter.addEventListener("click", (e => {
    e.preventDefault();
    body.style.overflowY = "auto";
    filter.style.opacity = "0";
    setTimeout(function () {
    filter.remove()
}, 2500)
    enableScroll();
}))


    let audio = document.getElementById("audio");
    let img = document.getElementById("pdp");

    function playSound() {
        audio.play();
    }

    function stopSound() {
        audio.pause();
        audio.currentTime = 0;
    }