var config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 675,
	scene: [bootGame, mainMenu, mainGame],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
};

var player; //player
var playerSpeed = 200;
var distance;
var target = new Phaser.Math.Vector2();

var candyTarget = new Phaser.Math.Vector2();

var game = new Phaser.Game(config);
