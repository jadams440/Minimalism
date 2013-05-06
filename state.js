(function() {

    mn.State = {
        menu: mn.menuState,
        game: mn.gameState,
        victory: mn.victoryState,

        currentState: null,

        start: function() {
            this.victory.init();
            this.menu.init();
            this.game.init();
            this.currentState = this.menu;
            this.currentState.enter();
            this.startUpdating();
            this.startRendering();
        },

        startRendering: function() {
            window.requestAnimFrame(mn.State.startRendering);
            mn.State.currentState.render();
        },

        startUpdating: function() {
            mn.State.intervalID = setInterval(mn.State.update, mn.settings.interval);
        },

        update: function() {
            Gamepad.update();
            mn.State.currentState.update();
        },

        completedLevel: function() {
            this.currentState.exit();
            this.currentState = this.menu;
            this.currentState.enter();
        },

        startLevel: function(n) {
            this.game.loadLevel(n);
            this.currentState.exit();
            this.currentState = this.game;
            this.currentState.enter();
        }

    }

}());