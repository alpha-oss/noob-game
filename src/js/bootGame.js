class bootGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    //images
    this.load.image("bg", "src/assets/bg.png");
    //sprites
    this.load.spritesheet("ghost", "src/assets/ghost-sprite.png", {
      frameWidth: 75,
      frameHeight: 75,
    });
    this.load.spritesheet("candy", "src/assets/candy-sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.scene.start("mainGame");
  }
}
