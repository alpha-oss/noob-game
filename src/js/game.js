class SimpleGame {
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", {
      preload: this.preload,
      create: this.create,
    });
  }

  //game:Phaser.Game;

  preload() {
    this.load.image("logo", "/assets/shit.png");
  }

  create() {
    var logo = this.add.sprite(this.world.centerX, this.world.centerY, "logo");
    logo.anchor.setTo(0.5, 0.5);
  }
}

window.onload = () => {
  var game = new SimpleGame();
};
