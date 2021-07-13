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
var snake;
var cursors;
//Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);
