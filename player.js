(function () {

    mn.player = {

        x: 50,
        y: 16 * 15 - 25,
        sprite: null,
        sprites: [],

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
        }

    };

}());