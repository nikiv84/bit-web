var intervalId;
document.addEventListener("keydown", function (event) {
    var x = 0;
    var marioStill = document.querySelector("#mariostill");
    var marioRunning = document.querySelector("#mariorun");
    if (event.keyCode == 39) {
        marioStill.classList.toggle('hidden');
        marioRunning.classList.toggle('hidden');
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = 0;
            return;
        }
        intervalId = setInterval(function () {
            x -= 10;
            document.querySelector("body").style.backgroundPosition = x + 'px ' + "100%";
        }, 50);
    }
});