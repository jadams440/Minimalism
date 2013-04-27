(function() {

    mn.State = {
        game: mn.gameState,

        currentState: null,

        start: function() {
            this.currentState = this.game;
            this.currentState.enter();
            this.render();
        },

        render: function() {
            this.currentState.render();
        }

    }

}());