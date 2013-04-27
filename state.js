(function() {

    mn.State = {
        game: mn.gameState,

        currentState: null,

        start: function() {
            this.initInput();
            this.currentState = this.game;
            this.currentState.enter();
            this.startUpdating();
            this.startRendering();
        },

        startRendering: function() {
            window.requestAnimFrame(mn.State.startRendering);
            mn.State.currentState.render();
        },

        initInput: function() {
            window.addEventListener('keydown', function(evt) {mn.input.onKeyDown(evt);}, false);
            window.addEventListener('keyup', function(evt) {mn.input.onKeyUp(evt);}, false);
        },

        startUpdating: function() {
            mn.State.intervalID = setInterval(mn.State.update, mn.settings.interval);
        },

        update: function() {
            mn.State.currentState.update();
        }

    }

}());