(function () {

    mn.menuState = {

        cursorX: 0,
        cursorY: 0,
        barX: 0,
        barY: 0,

        init: function() {
            this.sprite = mn.settings.sprites[5];
            this.spritePos = [0, 0, 800, 592];
        },

        enter: function() {
            mn.settings.setMenuKeyboard();
        },

        exit: function() {

        },

        render: function() {
            mn.settings.ctx.drawImage(this.sprite,
                                      this.spritePos[0],
                                      this.spritePos[1],
                                      this.spritePos[2],
                                      this.spritePos[3],
                                      0,
                                      0,
                                      this.spritePos[2],
                                      this.spritePos[3]
            );

            // Cursor
            mn.settings.ctx.fillStyle = "black";
            mn.settings.ctx.fillRect(355 + this.barX * 100,
                                     0,
                                     50,
                                     592
            );
            mn.settings.ctx.fillRect(286,
                                     50 + this.barY * 100,
                                     800 - 286,
                                     50
            );

            // Levels
            for (var i = 0; i < mn.maps.length; i++) {
                var x = i % 4;
                var y = Math.floor(i / 4);
                if (localStorage.getItem(i.toString() + ".completed") === "1") {
                    mn.settings.ctx.fillStyle = "black";
                } else {
                    mn.settings.ctx.fillStyle = "white";
                }
                mn.settings.ctx.fillRect(355 + x * 100,
                                         50 + y * 100,
                                         50,
                                         50
                );
            }

            // Level details
            var highlightedLevel = this.cursorX + this.cursorY * 4;
//            if (localStorage.getItem(highlightedLevel.toString() + ".completed") === "1") {
//                mn.settings.ctx.font = 'bold 12pt Arial';
//                mn.settings.ctx.fillStyle = 'CAD506';
//                mn.settings.ctx.fillText("Fewest color swaps:",
//                                         30,
//                                         40);
//                mn.settings.ctx.fillText(localStorage.getItem(highlightedLevel.toString() + ".changes"),
//                                         240,
//                                         40);
//                mn.settings.ctx.fillText("Fewest remaining colors:",
//                                         30,
//                                         75);
//                mn.settings.ctx.fillText(localStorage.getItem(highlightedLevel.toString() + ".colors"),
//                                         240,
//                                         75);
//            }
        },

        update: function() {
            if (Gamepad.In.onDown.DR) {
                if (this.cursorX < 3) {
                    if (this.cursorY * 4 +  this.cursorX + 1 < mn.maps.length) {
                        this.cursorX++;
                    }
                }
            }
            if (Gamepad.In.onDown.DL) {
                if (this.cursorX > 0) {
                    this.cursorX--;
                }
            }
            if (Gamepad.In.onDown.DD) {
                if ((this.cursorY + 1) * 4 +  this.cursorX < mn.maps.length) {
                    this.cursorY++;
                }
            }
            if (Gamepad.In.onDown.DU) {
                if (this.cursorY > 0) {
                    this.cursorY--;
                }
            }
            if (Gamepad.In.onDown.A) {
                mn.State.startLevel(this.cursorX + this.cursorY * 4);
            }

            this.barX = this.barX + (this.cursorX - this.barX) / 7;
            this.barY = this.barY + (this.cursorY - this.barY) / 7;
        }

    };

}());