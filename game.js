(function () {

    mn.gameState = {

        level: mn.level,
        players: [],

        init: function() {
            this.players = [];
            this.level.init();
            var yellowPlayer = mn.player;
            this.players.push(yellowPlayer);
            this.players[0].init();
        },

        enter: function() {
            this.init();
        },

        exit: function() {

        },

        render: function() {
            this.level.render();
            this.players[0].render();
        }
    }

}());