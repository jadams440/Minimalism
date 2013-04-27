(function () {

    mn.victoryState = {

        visible: false,

        init: function() {
            this.sprite = mn.settings.sprites[4];
            this.spritePos = [0, 0, 800, 592];
        },

        enter: function() {
            this.visible = false;
        },

        exit: function() {
            this.visible = false;
        },

        render: function() {
            if (!this.visible) {
                mn.settings.ctx.drawImage(this.sprite,
                                          this.spritePos[0],
                                          this.spritePos[1],
                                          this.spritePos[2],
                                          this.spritePos[3],
                                          0,
                                          0,
                                          this.spritePos[2],
                                          this.spritePos[3]
                );
            }
            this.visible = true;
        },

        update: function() {

        }

    };

}());
