mn.menuState = function() {

    var cursorX = 0,
        cursorY = 0,
        barX = 0,
        barY = 0,
        sprite = null,
        spritePos = [];

    function init() {
        sprite = mn.settings.sprites[5];
        spritePos = [0, 0, 800, 592];
    }

    function enter() {
        mn.settings.setMenuKeyboard();
        barX = 0;
        barY = 0;
        cursorX = 0;
        cursorY = 0;
    }

    function exit() {

    }

    function render() {
        mn.settings.ctx.drawImage(sprite,
                                  spritePos[0],
                                  spritePos[1],
                                  spritePos[2],
                                  spritePos[3],
                                  0,
                                  0,
                                  spritePos[2],
                                  spritePos[3]
        );

        // Cursor
        mn.settings.ctx.fillStyle = "black";
        mn.settings.ctx.fillRect(355 + barX * 100,
                                 0,
                                 50,
                                 592
        );
        mn.settings.ctx.fillRect(286,
                                 50 + barY * 100,
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

            // Level Details
            if (localStorage.getItem(i.toString() + ".colors") !== "1") {
                mn.settings.ctx.fillStyle = "white";
                mn.settings.ctx.fillRect(365 + x * 100,
                                         60 + y * 100,
                                         30,
                                         30
                );
            }

//            if (localStorage.getItem(i.toString() + ".changes") === mn.maps[i].targetChanges) {
//                mn.settings.ctx.fillStyle = "black";
//                mn.settings.ctx.fillRect(375 + x * 100,
//                                         70 + y * 100,
//                                         10,
//                                         10
//                );
//            }
        }
    }

    function update() {
        if (Gamepad.In.onDown.DR) {
            if (cursorX < 3) {
                if (cursorY * 4 +  cursorX + 1 < mn.maps.length) {
                    cursorX++;
                }
            }
        }
        if (Gamepad.In.onDown.DL) {
            if (cursorX > 0) {
                cursorX--;
            }
        }
        if (Gamepad.In.onDown.DD) {
            if ((cursorY + 1) * 4 +  cursorX < mn.maps.length) {
                cursorY++;
            }
        }
        if (Gamepad.In.onDown.DU) {
            if (cursorY > 0) {
                cursorY--;
            }
        }
        if (Gamepad.In.onDown.A) {
            mn.State.startLevel(cursorX + cursorY * 4);
        }

        barX = barX + (cursorX - barX) / 7;
        barY = barY + (cursorY - barY) / 7;
    }

    return {
        enter: enter,
        exit: exit,
        init: init,
        render: render,
        update: update
    }

};