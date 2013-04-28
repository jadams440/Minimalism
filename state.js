(function() {

    mn.State = {
        menu: mn.menuState,
        game: mn.gameState,
        victory: mn.victoryState,

        currentState: null,

        start: function() {
            this.initInput();
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

        initInput: function() {
            window.addEventListener('keydown', function(evt) {mn.input.onKeyDown(evt);}, false);
            window.addEventListener('keyup', function(evt) {mn.input.onKeyUp(evt);}, false);
        },

        startUpdating: function() {
            mn.State.intervalID = setInterval(mn.State.update, mn.settings.interval);
        },

        update: function() {
            mn.State.currentState.update();
        },

        completedLevel: function() {
            this.currentState.exit();
            this.currentState = this.victory;
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