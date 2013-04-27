window.onload = function () {

    // Sort out the canvas
    mn.settings.canvas = document.getElementById("game");
    mn.settings.canvas.width = mn.settings.canvasWidth;
    mn.settings.canvas.height = mn.settings.canvasHeight;
    mn.settings.ctx = mn.settings.canvas.getContext("2d");

    // Load everything here and just wait until its loaded
    mn.tileset = new Image();
    mn.tileset.src = 'assets/tileset.png';
    mn.tileset.onload = play();

    function play() {
        console.log("lets go");
        mn.level.init();
        mn.level.render();
    }

};