(function () {

    mn.Door = function(x, y, c) {
        this.color = c;
        this.x = x;
        this.y = y;
        this.spritePos = null;
        this.sprite = null;
    };

    mn.Door.prototype.init = function() {
        this.sprite = mn.settings.sprites[3];
        this.spritePos = [0, 32 * this.color, 16, 32];
    };

    mn.Door.prototype.render = function() {
        var xPos = this.x;
        var yPos = this.y;
        mn.settings.ctx.drawImage(this.sprite,
                                  this.spritePos[0],
                                  this.spritePos[1],
                                  this.spritePos[2],
                                  this.spritePos[3],
                                  xPos,
                                  yPos,
                                  this.spritePos[2],
                                  this.spritePos[3]
        );
    };

}());
