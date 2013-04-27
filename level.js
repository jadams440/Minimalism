(function () {

    mn.level = {

        map: [],
        doors: [],
        nAtExit: 0,
        nTotal: 3,

        init: function() {
            this.loadMap(mn.testmap);

            // Set the sprites
            this.sprites = [];
            this.sprites.push([0, 0, 16, 16]);
            this.sprites.push([16, 0, 16, 16]);
            this.sprites.push([32, 0, 16, 16]);
            this.sprites.push([48, 0, 16, 16]);
            this.sprites.push([64, 0, 16, 16]);

        },

        render: function() {
            for (var y = 0; y < this.map.length; y++) {
                for (var x = 0; x < this.map[y].length; x++) {
                    var i = this.map[y][x];
                    var xPos = x * mn.settings.tileSize;
                    var yPos = y * mn.settings.tileSize;
                    mn.settings.ctx.drawImage(mn.settings.sprites[0],
                                              this.sprites[i][0],
                                              this.sprites[i][1],
                                              this.sprites[i][2],
                                              this.sprites[i][3],
                                              xPos,
                                              yPos,
                                              mn.settings.tileSize,
                                              mn.settings.tileSize
                    )
                }
            };
            for (var i = 0; i < this.doors.length; i++) {
                this.doors[i].render();
            }
        },

        loadMap: function(newMap) {
            this.map = [];
            for (var y = 0; y < newMap.tileshigh; y++) {
                this.map.push([]);
                for (var x = 0; x < newMap.tileswide; x++) {
                    this.map[y].push(newMap.tiles[y][x]);
                }
            }

            var newDoor = new mn.Door(49 * 16, 13 * 16, 0);
            newDoor.init();
            this.doors.push(newDoor);
            newDoor = new mn.Door(48 * 16, 13 * 16, 1);
            newDoor.init();
            this.doors.push(newDoor);
            newDoor = new mn.Door(47 * 16, 13 * 16, 2);
            newDoor.init();
            this.doors.push(newDoor);
        },

        atExit: function(x, y, c) {
            for (var i = 0; i < this.doors.length; i++) {
                if (this.doors[i].atExit(x, y, c)) {
                    return true;
                }
            }
            return false;
        },

        toggleColors: function(startTile, pColor) {
            var cColor = this.map[startTile[1]][startTile[0]];
            if (cColor >= 3) {
                return;
            }
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
            this.map[startTile[1]][startTile[0]] = nColor;
            updatedTiles.push([startTile[0], startTile[1]]);
            queue.push(startTile);
            while (queue.length > 0) {
                var cX = queue[0][0];
                var cY = queue[0][1];
                queue.shift();
                // up
                if (cY > 0) {
                    if (this.map[cY-1][cX] === cColor) {
                        if (mn.State.game.players[nColor].intersects(cX, cY-1)) {
                            collision = true;
                        }
                        queue.push([cX, cY-1]);
                        this.map[cY-1][cX] = nColor;
                        updatedTiles.push([cX, cY-1]);
                    }
                }
                // down
                if (cY < 37) {
                    if (this.map[cY+1][cX] === cColor) {
                        if (mn.State.game.players[nColor].intersects(cX, cY+1)) {
                            collision = true;
                        }
                        queue.push([cX, cY+1]);
                        this.map[cY+1][cX] = nColor;
                        updatedTiles.push([cX, cY+1]);
                    }
                }
                // right
                if (cX < 50) {
                    if (this.map[cY][cX+1] === cColor) {
                        if (mn.State.game.players[nColor].intersects(cX+1, cY)) {
                            collision = true;
                        }
                        queue.push([cX+1, cY]);
                        this.map[cY][cX+1] = nColor;
                        updatedTiles.push([cX+1, cY]);
                    }
                }
                // left
                if (cX > 0) {
                    if (this.map[cY][cX-1] === cColor) {
                        if (mn.State.game.players[nColor].intersects(cX-1, cY)) {
                            collision = true;
                        }
                        queue.push([cX-1, cY]);
                        this.map[cY][cX-1] = nColor;
                        updatedTiles.push([cX-1, cY]);
                    }
                }
            }
            if (collision) {
                for (var i = 0; i < updatedTiles.length; i++) {
                    this.map[updatedTiles[i][1]][updatedTiles[i][0]] = cColor;
                }
            }
        }
    };

}());