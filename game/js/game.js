var config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 675,
	scene: [bootGame, mainMenu, mainGame, endScene],
	pixelArt: true,
	dom: {
        createContainer: true
    },
	parent: 'user-id',
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

// actually need these ig
// var userId;

var game = new Phaser.Game(config);
