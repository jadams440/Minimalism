(function () {

    mn.Player = function(c, x0, y0) {

        this.color = c;
        this.x = c * 16;
        this.y = 0;
        this.spritePos = null;
        this.sprites = [];
        this.xVel = 16;
        this.yVel = 0;
        this.onGround = false;

    };

    mn.Player.prototype.init = function(spritePos) {
        this.sprite = mn.settings.sprites[1];
        this.spritePos = spritePos;
        this.marker = mn.settings.sprites[2];
        this.markerPos = [0, 0, 16, 7];
    };

    mn.Player.prototype.render = function(inFocus) {
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
        if (inFocus) {
            mn.settings.ctx.drawImage(this.marker,
                                      this.markerPos[0],
                                      this.markerPos[1],
                                      this.markerPos[2],
                                      this.markerPos[3],
                                      xPos,
                                      yPos - this.markerPos[3],
                                      this.markerPos[2],
                                      this.markerPos[3]
            )
        }
    };

    mn.Player.prototype.update = function(inFocus) {
        // User input
        if (inFocus) {
            if (mn.input.isPressed(37)) {
                this.xVel = -4;
            } else if (mn.input.isPressed(39)) {
                this.xVel = 4;
            } else {
                this.xVel = 0;
            }
            if (mn.input.isPressed(38) && this.onGround) {
                this.yVel = -10;
                this.onGround = false;
            }
        } else {
            this.xVel = 0;
        }

        // Gravity
        this.yVel += 1;
        if (this.yVel > 5) {
            this.yVel = 5;
        }

        // Collisions
        // Top right
        var trstx = Math.floor((this.x + 15) / 16);
        var tretx = Math.floor((this.x + 15 + this.xVel) / 16);
        var trsty = Math.floor((this.y) / 16);
        // Bottom right
        var brstx = Math.floor((this.x + 15) / 16);
        var bretx = Math.floor((this.x + 15 + this.xVel) / 16);
        var brsty = Math.floor((this.y + 24) / 16);
        // Top left
        var tlstx = Math.floor((this.x) / 16);
        var tletx = Math.floor((this.x + this.xVel) / 16);
        var tlsty = Math.floor((this.y) / 16);
        // Bottom left
        var blstx = Math.floor((this.x) / 16);
        var bletx = Math.floor((this.x + this.xVel) / 16);
        var blsty = Math.floor((this.y + 24) / 16);
        // If moving to the right, check the right side for collisions
        if (tretx > trstx) {
            // Check every tile we could hit on the right side
            for (var i = 0; i <= brsty - trsty; i++) {
                if (mn.State.game.level.map[trsty + i][tretx] === this.color ||
                    mn.State.game.level.map[trsty + i][tretx] === 4) {
                    this.x = tretx * 16 - 16 - 1;
                    this.xVel = 0;
                }
            }
        }
        // If moving to the left, check left side for collisions
        if (tletx < tlstx) {
            // Check every tile we could hit on the left side
            for (var i = 0; i <= blsty - tlsty; i++) {
                if (mn.State.game.level.map[tlsty + i][tletx] === this.color ||
                    mn.State.game.level.map[tlsty + i][tletx] === 4) {
                    this.x = tretx * 16 + 1;
                    this.xVel = 0;
                }
            }
        }
        // Recalculate the y positions
        if (this.y + 25 + this.yVel >= 592) {
           this.respawn();
        }
        var trsty = Math.floor((this.y) / 16);
        var trety = Math.floor((this.y + this.yVel) / 16);
        var brsty = Math.floor((this.y + 24) / 16);
        var brety = Math.floor((this.y + 24 + this.yVel) / 16);
        var tlsty = Math.floor((this.y) / 16);
        var tlety = Math.floor((this.y + this.yVel) / 16);
        var blsty = Math.floor((this.y + 24) / 16);
        var blety = Math.floor((this.y + 24 + this.yVel) / 16);
        // If moving down, check bottom side for collisions
        if (this.yVel > 0) {
            if (blety > blsty) {
                // Check bottom left
                if (mn.State.game.level.map[blety][bletx] === this.color ||
                    mn.State.game.level.map[blety][bletx] === 4) {
                    this.yVel = 0;
                    this.y = blety * 16 - 25;
                    this.onGround = true;
                }
                // Check bottom right
                if (mn.State.game.level.map[brety][bretx] === this.color ||
                    mn.State.game.level.map[brety][bretx] === 4) {
                    this.y = blety * 16 - 25;
                    this.yVel = 0;
                    this.onGround = true;
                }
            }
        }
        // If moving up, check top for collisions
        if (this.yVel < 0) {
            if (blety < blsty) {
                // Check top left
                if (mn.State.game.level.map[tlety][tletx] === this.color ||
                    mn.State.game.level.map[tlety][tletx] === 4) {
                    this.yVel = 0;
                    this.y = tlety * 16 + 16 + 1;
                }
                // Check top right
                if (mn.State.game.level.map[trety][tretx] === this.color ||
                    mn.State.game.level.map[trety][tretx] === 4) {
                    this.yVel = 0;
                    this.y = tlety * 16 + 16 + 1;
                }
            }
        }

        this.x += this.xVel;
        this.y += this.yVel;
    };

    mn.Player.prototype.atExit = function() {
        if (mn.State.game.level.atExit(this.x + 8, this.y + 16, this.color)) {
            return true;
        } else {
            return false;
        }
    }

    mn.Player.prototype.getTile = function() {
        var x = Math.floor((this.x + 8) / 16);
        var y = Math.floor((this.y + 13) / 16);
        return [x, y];
    };

   mn.Player.prototype.intersects = function(cX, cY) {

       var plx = this.x;
       var prx = this.x + 15;
       var pty = this.y;
       var pby = this.y + 24;
       var clx = cX * 16;
       var crx = cX * 16 + 16;
       var cty = cY * 16;
       var cby = cY * 16 + 16;
       if ((plx > clx && plx < crx) || (prx > clx && prx < crx)) {
           if ((pty < cby && pty > cty) || (pby < cby && pby > cty)) {
               return true;
           }
       }
       return false;
   },

   mn.Player.prototype.setSpawn = function(r) {
       this.x0 = r[0] * 16;
       this.y0 = r[1] * 16;
   },

   mn.Player.prototype.respawn = function() {
       this.x = this.x0;
       this.y = this.y0;
       this.xVel = 0;
       this.yVel = 0;
   }

}());