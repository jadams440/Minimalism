(function() {

    mn.input = {
        moveKeys: [37, 38, 39],
        passiveKeys: [32],

        pressed: {},

        onKeyDown: function(evt) {
            if (this.moveKeys.indexOf(evt.keyCode) != -1) {
                this.pressed[evt.keyCode] = true;
            }
            if (this.passiveKeys.indexOf(evt.keyCode) != -1) {
                this.pressed[evt.keyCode] = true;
            }
        },

        onKeyUp: function(evt) {
            if (this.moveKeys.indexOf(evt.keyCode) != -1) {
                this.pressed[evt.keyCode] = false;
            }
        },

        isPressed: function(keyCode) {
            return this.pressed[keyCode];
        },

        wasPressed: function(keyCode) {
            if (this.pressed[keyCode]) {
                this.pressed[keyCode] = false;
                return true;
            } else {
                return false;
            }
        }
    }

}());