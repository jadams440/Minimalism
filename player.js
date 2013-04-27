(function () {

    mn.player = {

        x: 0,
        y: 16 * 15 - 25,
        sprite: null,
        sprites: [],
        xVel: 16,

        init: function() {
            this.sprite = mn.settings.sprites[1];
            this.sprites.push([0, 0, 16, 25]);
        },

        render: function() {
            var xPos = this.x;
            var yPos = this.y;
            mn.settings.ctx.drawImage(this.sprite,
                                      this.sprites[0][0],
                                      this.sprites[0][1],
                                      this.sprites[0][2],
                                      this.sprites[0][3],
                                      xPos,
                                      yPos,
                                      this.sprites[0][2],
                                      this.sprites[0][3]
            )
        },

        update: function() {
            if (this.x + 16 >= mn.settings.canvasWidth) {
                this.xVel = -16;
            }
            if (this.x - 16 < 0) {
                this.xVel = 16;
            }
            this.x += this.xVel;
        }

    };

}());