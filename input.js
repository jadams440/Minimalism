(function() {

    mn.input = {
        moveKeys: [37, 38, 39],
        passiveKeys: [32, 40],

        currenntPressed: {},
        hasBeenPressed: {},

        onKeyDown: function(evt) {
            if (this.moveKeys.indexOf(evt.keyCode) != -1) {
                this.currenntPressed[evt.keyCode] = true;
            }
            this.hasBeenPressed[evt.keyCode] = true;
        },

        onKeyUp: function(evt) {
            if (this.moveKeys.indexOf(evt.keyCode) != -1) {
                this.currenntPressed[evt.keyCode] = false;
            }
        },

        isPressed: function(keyCode) {
            return this.currenntPressed[keyCode];
        },

        wasPressed: function(keyCode) {
            if (this.hasBeenPressed[keyCode]) {
                this.hasBeenPressed[keyCode] = false;
                return true;
            } else {
                return false;
            }
        },

        reset: function() {
            this.currenntPressed = {};
            this.hasBeenPressed = {};
        }
    }

}());