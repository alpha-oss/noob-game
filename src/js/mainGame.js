class mainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  create() {
    this.bg = this.add.image(0, 0, "bg");
    this.bg.setOrigin(0, 0);

    this.candy = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "candy"
    );
    this.ghost = this.add.sprite(200, 200, "ghost");

    this.anims.create({
      key: "candy_snake",
      frames: this.anims.generateFrameNumbers("candy"),
      frameRate: 5,
      repeat: -1,
    });
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
    this.candy.play("candy_snake");
  }
}
