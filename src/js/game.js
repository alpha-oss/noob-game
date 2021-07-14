var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 675,
  scene: [bootGame, mainGame],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

var snakeHead; //head of snake sprite
var distance;
var target = new Phaser.Math.Vector2();
var game = new Phaser.Game(config);
