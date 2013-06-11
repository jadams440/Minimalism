mn.Player = function() {

    var color = 0,
        x = 0,
        y = 0,
        x0 = 0,
        y0 = 0,
        spritePos = null,
        sprite = null,
        xVel = 16,
        yVel = 0,
        drawXSize = 0,
        drawYSize = 0,
        markerSprite = null,
        markerPos = [0, 0, 16, 7],
        onGround = false;

    function init(c, pos) {
        color = c;
        sprite = mn.settings.sprites[1];
        spritePos = pos;
        drawXSize = spritePos[2];
        drawYSize = spritePos[3];
        markerSprite = mn.settings.sprites[2];
    }

    function render(inFocus) {
        mn.settings.ctx.drawImage(sprite,
                                  spritePos[0],
                                  spritePos[1],
                                  spritePos[2],
                                  spritePos[3],
                                  x,
                                  y,
                                  drawXSize,
                                  drawYSize
        );
        if (inFocus) {
            mn.settings.ctx.drawImage(markerSprite,
                                      markerPos[0],
                                      markerPos[1],
                                      markerPos[2],
                                      markerPos[3],
                                      x,
                                      y - markerPos[3],
                                      markerPos[2],
                                      markerPos[3]
            )
        }
    }

    function updateVelocities(inFocus) {
        if (inFocus) {
            if (Gamepad.In.isDown.DL) {
                xVel = -4;
            } else if (Gamepad.In.isDown.DR) {
                xVel = 4;
            } else {
                xVel = 0;
            }
            if (Gamepad.In.onDown.A && onGround) {
                yVel = -10;
                onGround = false;
            }
        } else {
            xVel = 0;
        }

        // Apply Gravity
        yVel += 1;
        if (yVel > 5) {
            yVel = 5;
        }

        // Collisions

        // Moving Right
        var trstx = Math.floor((x + 15) / 16);
        var tretx = Math.floor((x + 15 + xVel) / 16);
        var trsty = Math.floor((y) / 16);
        var brsty = Math.floor((y + 24) / 16);
        if (tretx > trstx) {
            // Check every tile we could hit on the right side
            for (var i = 0; i <= brsty - trsty; i++) {
                if (mn.State.game.level.getMap()[trsty + i][tretx] === color ||
                    mn.State.game.level.getMap()[trsty + i][tretx] === 4) {
                    x = tretx * 16 - 16;
                    xVel = 0;
                }
            }
        }

        // Moving left
        var tlstx = Math.floor((x) / 16);
        var blsty = Math.floor((y + 24) / 16);
        var tletx = Math.floor((x + xVel) / 16);
        var tlsty = Math.floor((y-1) / 16);
        if (tletx < tlstx) {
            // Check every tile we could hit on the left side
            for (i = 0; i <= blsty - tlsty; i++) {
                if (mn.State.game.level.getMap()[tlsty + i][tletx] === color ||
                    mn.State.game.level.getMap()[tlsty + i][tletx] === 4) {
                    x = tretx * 16;
                    xVel = 0;
                }
            }
        }

        // Moving down
        var blety = Math.floor((y + 24 + yVel) / 16);
        var bletx = Math.floor((x + xVel) / 16);
        var brety = Math.floor((y + 24 + yVel) / 16);
        var bretx = Math.floor((x + 15 + xVel) / 16);
        if (yVel > 0) {
            if (blety > 36) {
                yVel = 0;
                y = blety * 16 - 25;
            }
            else if (blety > blsty) {
                // Check bottom left
                if (mn.State.game.level.getMap()[blety][bletx] === color ||
                    mn.State.game.level.getMap()[blety][bletx] === 4) {
                    yVel = 0;
                    y = blety * 16 - 25;
                    onGround = true;
                }
                // Check bottom right
                if (mn.State.game.level.getMap()[brety][bretx] === color ||
                    mn.State.game.level.getMap()[brety][bretx] === 4) {
                    y = blety * 16 - 25;
                    yVel = 0;
                    onGround = true;
                }
            }
        }

        // Moving up
        var tlety = Math.floor((y-1 + yVel) / 16);
        var trety = Math.floor((y-1 + yVel) / 16);
        tretx = Math.floor((x + 15 + xVel) / 16);
        tletx = Math.floor((x + xVel) / 16);
        if (yVel < 0) {
            if (tlety < tlsty) {
                // Check top left
                if (mn.State.game.level.getMap()[tlety][tletx] === color ||
                    mn.State.game.level.getMap()[tlety][tletx] === 4) {
                    yVel = 0;
                    y = tlety * 16 + 16 + 1;
                }
                // Check top right
                if (mn.State.game.level.getMap()[trety][tretx] === color ||
                    mn.State.game.level.getMap()[trety][tretx] === 4) {
                    yVel = 0;
                    y = tlety * 16 + 16 + 1;
                }
            }
        }
    }

    function update(inFocus) {
        updateVelocities(inFocus);

        // update the positions from the velocities
        x += xVel;
        if (x + 16 > 800) {
            x = 800 - 16;
        }
        if (x < 0) {
            x = 0;
        }
        y += yVel;
        if (y + 25 >= 592) {
            respawn();
        }
        if (y < 0) {
            y = 0;
        }
    }

    function atExit() {
        return mn.State.game.level.atExit(x + 8, y + 16, color);
    }

    function getTile() {
        return [Math.floor((x + 8) / 16), Math.floor((y + 13) / 16)];
    }

    function intersects(cX, cY) {
        var prx = x + 15;
        var pby = y + 24;
        var clx = cX * 16;
        var crx = cX * 16 + 16;
        var cty = cY * 16;
        var cby = cY * 16 + 16;
        if ((x > clx && x < crx) || (prx > clx && prx < crx)) {
            if ((y < cby && y > cty) || (pby < cby && pby > cty)) {
                return true;
            }
        }
        return false;
    }

    function setSpawn(r) {
        x0 = r[0] * 16;
        y0 = r[1] * 16;
    }

    function respawn() {
        drawXSize = spritePos[2];
        drawYSize = spritePos[3];
        x = x0;
        y = y0;
        xVel = 0;
        yVel = 0;
    }

    function fadeOut(f) {
        drawXSize = drawXSize * f;
        drawYSize = drawYSize * f;
        x = x + (drawXSize * (1 - f)) / 2;
        y = y + (drawYSize * (1 - f) / 3);
    }

    function getColor() {
        return color;
    }

    return {
        init: init,
        render: render,
        update: update,
        setSpawn: setSpawn,
        respawn: respawn,
        atExit: atExit,
        getTile: getTile,
        intersects: intersects,
        getColor: getColor,
        fadeOut: fadeOut
    }

};