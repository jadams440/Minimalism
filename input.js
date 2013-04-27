(function() {

    mn.input = {
        LEFT: 37,
        RIGHT: 38,
        UP: 38,

        pressed: {
            LEFT: false,
            RIGHT: false,
            UP: false
        },

        onKeyDown: function(evt) {
            this.isPressed[evt.keyCode] = true;
        },

        onKeyUp: function(evt) {
            this.isPressed[evt.keyCode] = false;
        },

        isPressed: function(keyCode) {
            return this.pressed[keyCode];
        }
    }

}());