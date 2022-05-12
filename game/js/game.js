var config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 675,
	scene: [bootGame, mainMenu, stage1, stage2, endScene],
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

var distance;
var candyTarget = new Phaser.Math.Vector2();

var game = new Phaser.Game(config);
