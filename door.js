mn.Door = function() {

    var color = 4,
        x = 0,
        y = 0,
        spritePos = null,
        sprite = null,
        xPos = 0,
        yPos = 0;

    function init(x0, y0, c) {
        color = c;
        x = x0;
        y = y0;
        spritePos = [0, 32 * color, 16, 32];
        sprite = mn.settings.sprites[3];
    }

    function render() {
        xPos = x;
        yPos = y;
        mn.settings.ctx.drawImage(sprite,
                                  spritePos[0],
                                  spritePos[1],
                                  spritePos[2],
                                  spritePos[3],
                                  xPos,
                                  yPos,
                                  spritePos[2],
                                  spritePos[3]
        );
    }

    function atExit(x1, y1, c) {
        if (c != color) {
            return false;
        }
        return (x1 > x && x1 < x + 16) && (y1 < y + 32 && y1 > y);
    }

    return {
        init: init,
        render: render,
        atExit: atExit
    }

};
