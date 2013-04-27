(function() {

    mn.input = {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,

        pressed: {
            "37": false,
            "39": false,
            "38": false
        },

        onKeyDown: function(evt) {
            this.pressed[evt.keyCode] = true;
        },

        onKeyUp: function(evt) {
            this.pressed[evt.keyCode] = false;
        },

        isPressed: function(keyCode) {
            return this.pressed[keyCode];
        }
    }

}());