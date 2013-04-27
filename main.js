window.onload = function () {

    // Sort out the canvas
    mn.settings.canvas = document.getElementById("game");
    mn.settings.canvas.width = mn.settings.canvasWidth;
    mn.settings.canvas.height = mn.settings.canvasHeight;
    mn.settings.ctx = mn.settings.canvas.getContext("2d");

    // Load everything here and just wait until its loaded
    function loadSprites() {
        var remaining = mn.settings.nToLoad;
        for (var i = 0; i < mn.settings.nToLoad; i++) {
            mn.settings.sprites[i] = new Image();
            mn.settings.sprites[i].src = mn.settings.toLoad[i];
            mn.settings.sprites[i].onload = function() {
                remaining--;
                if (remaining <= 0) {
                    play();
                }
            }
        }
    }

    function play() {
        mn.State.start();
    }

    loadSprites();

};