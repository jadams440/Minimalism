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
        ],

        // Set keyboard controls in gamepad.js
        setMenuKeyboard: function() {
            Gamepad.KeyboardMapping.A = 32;     // space to start
        },

        setGameKeyboard: function() {
            Gamepad.KeyboardMapping.A = 38;     // up arrow to Jump
            Gamepad.KeyboardMapping.Back = 82;  // 'r' to reset level
            Gamepad.KeyboardMapping.B = 40;     // down arrow to swap color
            Gamepad.KeyboardMapping.Y = 32;     // space to change player
        }

    };



}());