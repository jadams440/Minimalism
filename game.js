(function () {

    mn.gameState = {

        level: mn.level,
        players: [],
        playerFocus: [],
        focussedPlayer: null,
        success: false,
        successTime: 1000,
        successTimer: 1000,
        colorChanges: 0,
        remainingColors: 3,

        init: function() {
            this.players = [];
            this.level.init();
            var yellowPlayer = new mn.Player();
            this.players.push(yellowPlayer);
            this.players[0].init(0, [0, 0, 16, 25]);
            this.playerFocus.push(true);
            this.focussedPlayer = 0;
            var redPlayer = new mn.Player();
            this.players.push(redPlayer);
            this.players[1].init(1, [0, 25, 16, 25]);
            this.playerFocus.push(false);
            var bluePlayer = new mn.Player();
            this.players.push(bluePlayer);
            this.players[2].init(2, [0, 50, 16, 25]);
            this.playerFocus.push(false);
            this.successTimer = this.successTime;
            this.colorChanges = 0;
        },

        enter: function() {
            this.success = false;
            this.focussedPlayer = 0;
            this.playerFocus[0] = true;
            this.playerFocus[1] = false;
            this.playerFocus[2] = false;
            mn.settings.setGameKeyboard();
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
            if (!this.success) {
                if (Gamepad.In.onDown.Back) {
                    this.level.resetLevel();
                    for (var i = 0; i < this.players.length; i++) {
                        this.players[i].setSpawn(this.level.spawns[i]);
                        this.players[i].respawn();
                    }
                    this.colorChanges = 0;
                }
                if (Gamepad.In.onDown.Start) {
                    mn.State.returnToMenu();
                }
                if (Gamepad.In.onDown.RB || Gamepad.In.onDown.Y) {
                    this.changeFocus();
                }
                if (Gamepad.In.onDown.B) {
                    var success = this.level.toggleColors(this.players[this.focussedPlayer].getTile(),
                                            this.players[this.focussedPlayer].getColor()
                    );
                    if (success) {
                        this.colorChanges++;
                    }
                }
                this.players[0].update(this.playerFocus[0]);
                this.players[1].update(this.playerFocus[1]);
                this.players[2].update(this.playerFocus[2]);

                // Are all the players at their exits
                if (this.players[0].atExit() && this.players[1].atExit() && this.players[2].atExit()) {
                    this.success = true;
                    localStorage.setItem(this.level.n.toString() + ".completed", "1");
                    if (this.colorChanges < localStorage.getItem(this.level.n.toString() + ".changes") ||
                        localStorage.getItem(this.level.n.toString() + ".changes") === null) {
                        localStorage.setItem(this.level.n.toString() + ".changes",
                                             this.colorChanges.toString());
                    }
                    var remColors = [0,0,0];
                    for (var y = 0; y < this.level.map.length; y++) {
                        for (var x = 0; x < this.level.map[0].length; x++) {
                            for (i = 0; i < 3; i++) {
                                if (this.level.map[y][x] === i) {
                                    remColors[i] = 1;
                                }
                            }
                        }
                    }
                    this.remainingColors = remColors[0] + remColors[1] + remColors[2];
                    if (this.remainingColors < localStorage.getItem(this.level.n.toString() + ".colors") ||
                        localStorage.getItem(this.level.n.toString() + ".colors") === null) {
                            localStorage.setItem(this.level.n.toString() + ".colors",
                                                 this.remainingColors.toString());
                    }
                    this.playerFocus[0] = false;
                    this.playerFocus[1] = false;
                    this.playerFocus[2] = false;
                }
            } else if (this.success) {
                this.successTimer -= mn.settings.interval;
                if (this.successTimer <= 0) {
                    mn.State.returnToMenu();
                } else {
                    for (i = 0; i < this.players.length; i++) {
                        var f = Math.sqrt(this.successTimer / this.successTime);
                        this.players[i].fadeOut(f);
                    }
                }
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
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].setSpawn(this.level.spawns[i]);
                this.players[i].respawn();
            }
            this.successTimer = this.successTime;
            this.colorChanges = 0;
        }
    }

}());