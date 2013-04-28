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
            mn.settings.ctx.fillRect(305,
                                     50 + this.barY * 100,
                                     800 - 305,
                                     50
            );

            // Levels
            for (var i = 0; i < mn.maps.length; i++) {
                var x = i % 4;
                var y = Math.floor(i / 4);
                mn.settings.ctx.fillStyle = "white";
                mn.settings.ctx.fillRect(355 + x * 100,
                                         50 + y * 100,
                                         50,
                                         50
                );
            }
        },

        update: function() {
            if (mn.input.wasPressed(39)) {
                if (this.cursorX < 3) {
                    if (this.cursorY * 4 +  this.cursorX + 1 < mn.maps.length) {
                        this.cursorX++;
                    }
                }
            }
            if (mn.input.wasPressed(37)) {
                if (this.cursorX > 0) {
                    this.cursorX--;
                }
            }
            if (mn.input.wasPressed(40)) {
                if ((this.cursorY + 1) * 4 +  this.cursorX < mn.maps.length) {
                    this.cursorY++;
                }
            }
            if (mn.input.wasPressed(38)) {
                if (this.cursorY > 0) {
                    this.cursorY--;
                }
            }
            if (mn.input.wasPressed(32)) {
                mn.State.startLevel(this.cursorX + this.cursorY * 4);
            }

            this.barX = this.barX + (this.cursorX - this.barX) / 5;
            this.barY = this.barY + (this.cursorY - this.barY) / 5;
        }

    };

}());