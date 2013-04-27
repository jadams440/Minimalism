(function() {

    mn.State = {
        game: mn.gameState,

        currentState: null,

        start: function() {
            this.initInput();
            this.currentState = this.game;
            this.currentState.enter();
            this.render();
        },

        render: function() {
            this.currentState.render();
        },

        initInput: function() {
            window.addEventListener('keydown', function(evt) {mn.input.onKeyDown(evt);}, false);
            window.addEventListener('keyup', function(evt) {mn.input.onKeyUp(evt);}, false);
        }

    }

}());