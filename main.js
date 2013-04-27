window.onload = function () {

    // Sort out the canvas
    mn.settings.canvas = document.getElementById("game");
    mn.settings.canvas.width = mn.settings.canvasWidth;
    mn.settings.canvas.height = mn.settings.canvasHeight;
    mn.settings.ctx = mn.settings.canvas.getContext("2d");

};