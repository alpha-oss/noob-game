class mainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  create() {
    //background
    this.bg = this.add.image(0, 0, "bg");
    this.bg.setOrigin(0, 0);

    //ghost
    this.ghost = this.add.sprite(200, 200, "ghost");
    this.anims.create({
      key: "ghost_walk",
      frames: this.anims.generateFrameNumbers("ghost", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.ghost.play("ghost_walk");

    //candy-snake
    this.candy;
  }

  update() {}
}
