(function () {

    mn.gameState = {

        level: mn.level,
        players: [],
        playerFocus: [],
        focussedPlayer: null,

        init: function() {
            this.players = [];
            this.level.init();
            var yellowPlayer = new mn.Player(0);
            this.players.push(yellowPlayer);
            this.players[0].init([0, 0, 16, 25]);
            this.playerFocus.push(true);
            this.focussedPlayer = 0;
            var redPlayer = new mn.Player(1);
            this.players.push(redPlayer);
            this.players[1].init([0, 25, 16, 25]);
            this.playerFocus.push(false);
            var bluePlayer = new mn.Player(2);
            this.players.push(bluePlayer);
            this.players[2].init([0, 50, 16, 25]);
            this.playerFocus.push(false);
        },

        enter: function() {
            this.init();
        },

        exit: function() {

        },

        render: function() {
            this.level.render();
            this.players[0].render(this.playerFocus[0]);
            this.players[1].render(this.playerFocus[1]);
            this.players[2].render(this.playerFocus[2]);
        },

        update: function() {
            if (mn.input.wasPressed(32)) {
                this.changeFocus();
            }
            if (mn.input.wasPressed(40)) {
                this.level.toggleColors(this.players[this.focussedPlayer].getTile(),
                                        this.players[this.focussedPlayer].color
                );
            }
            this.players[0].update(this.playerFocus[0]);
            this.players[1].update(this.playerFocus[1]);
            this.players[2].update(this.playerFocus[2]);

            // Are all the players at their exits
            if (this.players[0].atExit() && this.players[1].atExit() && this.players[2].atExit()) {
                mn.State.completedLevel();
            }
        },

        changeFocus: function() {
            if (this.playerFocus[0] === true) {
                this.playerFocus[0] = false;
                this.playerFocus[1] = true;
                this.focussedPlayer = 1;
            } else if (this.playerFocus[1] === true) {
                this.playerFocus[1] = false;
                this.playerFocus[2] = true;
                this.focussedPlayer = 2;
            } else if (this.playerFocus[2] = true) {
                this.playerFocus[2] = false;
                this.playerFocus[0] = true;
                this.focussedPlayer = 0;
            }
        },

        loadLevel: function(n) {
            this.level.loadMap(n);
        }
    }

}());