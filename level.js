(function () {

    mn.level = {

        map: [],

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
        }
    };

}());