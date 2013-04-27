(function() {

    mn.input = {
        moveKeys: [37, 38, 39],
        passiveKeys: [32, 40],

        currenntPressed: {},
        wasPressed: {},

        onKeyDown: function(evt) {
            if (this.moveKeys.indexOf(evt.keyCode) != -1) {
                this.currenntPressed[evt.keyCode] = true;
            }
            this.wasPressed[evt.keyCode] = true;
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
            if (this.wasPressed[keyCode]) {
                this.wasPressed[keyCode] = false;
                return true;
            } else {
                return false;
            }
        }
    }

}());