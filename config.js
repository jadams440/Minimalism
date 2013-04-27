var mn = mn || {};

(function () {

    mn.settings = {};

    mn.settings = {

        // Canvas settings
        canvas: null,
        ctx: null,
        canvasHeight: 592,
        canvasWidth: 800,

        // Update interval
        interval: 1000,

        // Sprite settings
        tileSize: 16,
        nToLoad: 2,
        sprites: [],
        toLoad: [
            "assets/tileset.png",
            "assets/player.png"
        ]

    };

}());