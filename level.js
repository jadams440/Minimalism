mn.level = function() {

    var map = [],
        doors = [],
        spawns = [],
        nAtExit = 0,
        n = null,
        xPos = 0,
        yPos = 0,
        sprite = null,
        spritePos = [];

    function init() {
        // Set the sprites
        sprite = mn.settings.sprites[0];
        spritePos = [];
        spritePos.push([0, 0, 16, 16]);
        spritePos.push([16, 0, 16, 16]);
        spritePos.push([32, 0, 16, 16]);
        spritePos.push([48, 0, 16, 16]);
        spritePos.push([64, 0, 16, 16]);
    }

    function render() {
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                var i = map[y][x];
                xPos = x * mn.settings.tileSize;
                yPos = y * mn.settings.tileSize;
                mn.settings.ctx.drawImage(sprite,
                                          spritePos[i][0],
                                          spritePos[i][1],
                                          spritePos[i][2],
                                          spritePos[i][3],
                                          xPos,
                                          yPos,
                                          mn.settings.tileSize,
                                          mn.settings.tileSize
                );
            }
        }
        for (i = 0; i < doors.length; i++) {
            doors[i].render();
        }
    }

    function loadMap(nLevel) {
        nAtExit = 0;

        n = nLevel;
        map = [];
        for (var y = 0; y < mn.maps[n].tileshigh; y++) {
            map.push([]);
            for (var x = 0; x < mn.maps[n].tileswide; x++) {
                map[y].push(mn.maps[n].tiles[y][x]);
            }
        }

        // Exit doors
        doors = [];
        var newDoor = new mn.Door(mn.maps[n].exit0[0] * 16,
                                  (mn.maps[n].exit0[1] - 1) * 16,
                                  0);
        newDoor.init();
        doors.push(newDoor);
        newDoor = new mn.Door(mn.maps[n].exit1[0] * 16,
                              (mn.maps[n].exit1[1] - 1) * 16,
                              1);
        newDoor.init();
        doors.push(newDoor);
        newDoor = new mn.Door(mn.maps[n].exit2[0] * 16,
                              (mn.maps[n].exit2[1] - 1) * 16,
                              2);
        newDoor.init();
        doors.push(newDoor);

        // Spawn points for each color
        spawns = [];
        spawns.push(mn.maps[n].spawn0);
        spawns.push(mn.maps[n].spawn1);
        spawns.push(mn.maps[n].spawn2);
    }

    function resetLevel() {
        map = [];
        for (var y = 0; y < mn.maps[n].tileshigh; y++) {
            map.push([]);
            for (var x = 0; x < mn.maps[n].tileswide; x++) {
                map[y].push(mn.maps[n].tiles[y][x]);
            }
        }
    }

    function atExit(x, y, c) {
        for (var i = 0; i < doors.length; i++) {
            if (doors[i].atExit(x, y, c)) {
                return true;
            }
        }
        return false;
    }

    function toggleColors(startTile, pColor) {
        var cColor = map[startTile[1]][startTile[0]];
        if (cColor >= 3) {
            return false;
        }
        var nColor;
        if (pColor === 0) {
            if (cColor === 1) {
                nColor = 2;
            } else if (cColor === 2) {
                nColor = 1;
            }
        } else if (pColor === 1) {
            if (cColor === 0) {
                nColor = 2;
            } else if (cColor === 2) {
                nColor = 0
            }
        } else if (pColor === 2) {
            if (cColor === 0) {
                nColor = 1;
            } else if (cColor === 1) {
                nColor = 0;
            }
        }
        var queue = [];
        var collision = false;
        var updatedTiles = [];
        if (mn.State.game.players[nColor].intersects(startTile[0], startTile[1])) {
            collision = true;
        }
        map[startTile[1]][startTile[0]] = nColor;
        updatedTiles.push([startTile[0], startTile[1]]);
        queue.push(startTile);
        while (queue.length > 0) {
            var cX = queue[0][0];
            var cY = queue[0][1];
            queue.shift();
            // up
            if (cY > 0) {
                if (map[cY-1][cX] === cColor) {
                    if (mn.State.game.players[nColor].intersects(cX, cY-1)) {
                        collision = true;
                    }
                    queue.push([cX, cY-1]);
                    map[cY-1][cX] = nColor;
                    updatedTiles.push([cX, cY-1]);
                }
            }
            // down
            if (cY < 36) {
                if (map[cY+1][cX] === cColor) {
                    if (mn.State.game.players[nColor].intersects(cX, cY+1)) {
                        collision = true;
                    }
                    queue.push([cX, cY+1]);
                    map[cY+1][cX] = nColor;
                    updatedTiles.push([cX, cY+1]);
                }
            }
            // right
            if (cX < 50) {
                if (map[cY][cX+1] === cColor) {
                    if (mn.State.game.players[nColor].intersects(cX+1, cY)) {
                        collision = true;
                    }
                    queue.push([cX+1, cY]);
                    map[cY][cX+1] = nColor;
                    updatedTiles.push([cX+1, cY]);
                }
            }
            // left
            if (cX > 0) {
                if (map[cY][cX-1] === cColor) {
                    if (mn.State.game.players[nColor].intersects(cX-1, cY)) {
                        collision = true;
                    }
                    queue.push([cX-1, cY]);
                    map[cY][cX-1] = nColor;
                    updatedTiles.push([cX-1, cY]);
                }
            }
        }
        if (collision) {
            for (var i = 0; i < updatedTiles.length; i++) {
                map[updatedTiles[i][1]][updatedTiles[i][0]] = cColor;
            }
            return false;
        } else {
            return true;
        }
    }

    function getSpawns() {
        return spawns;
    }

    function getMap() {
        return map;
    }

    function getN() {
        return n;
    }

    return {
        init: init,
        render: render,
        loadMap: loadMap,
        atExit: atExit,
        resetLevel: resetLevel,
        toggleColors: toggleColors,
        getSpawns: getSpawns,
        getMap: getMap,
        getN: getN
    }

};