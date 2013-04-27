(function () {

    mn.gameState = {

        level: mn.level,
        players: [],
        playerFocus: [],

        init: function() {
            this.players = [];
            this.level.init();
            var yellowPlayer = new mn.Player(0);
            this.players.push(yellowPlayer);
            this.players[0].init([0, 0, 16, 25]);
            this.playerFocus.push(true);
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
            this.players[0].update(this.playerFocus[0]);
            this.players[1].update(this.playerFocus[1]);
            this.players[2].update(this.playerFocus[2]);
        },

        changeFocus: function() {
            if (this.playerFocus[0] === true) {
                this.playerFocus[0] = false;
                this.playerFocus[1] = true;
            } else if (this.playerFocus[1] === true) {
                this.playerFocus[1] = false;
                this.playerFocus[2] = true;
            } else if (this.playerFocus[2] = true) {
                this.playerFocus[2] = false;
                this.playerFocus[0] = true;
            }
        }
    }

}());