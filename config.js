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
        interval: 20,

        // Sprite settings
        tileSize: 16,
        nToLoad: 6,
        sprites: [],
        toLoad: [
            "assets/tileset.png",
            "assets/player.png",
            "assets/marker.png",
            "assets/door.png",
            "assets/victory.png",
            "assets/start.png"
        ]

    };

}());