// CREATE NEW GAME OBJECT
var game = new Phaser.Game(1200, 675, Phaser.AUTO, "phaser-example", {
	preload: preload,
	create: create,
	update: update,
	render: render,
});

//////////////////////////////////////////// PRELOAD ////////////////////////////////////////////

function preload() {
	game.load.image("ball", "./assets/bullet.png");

	// background image
	game.load.image("bg", "./assets/background.png");

	// ghost
	game.load.spritesheet("ghost", "./assets/ghost-sprite.png", 75, 75);
}

// SOME VARIABLES THAT WE WILL NEED LATER
var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 30; //number of snake body sections
var snakeSpacer = 2; //parameter that sets the spacing between sections
var angularSpeed = 200; //angular speed of snake.


// MAKES SNAKE GO BRRRRRR
var moveSnakeForward = () => {
	snakeHead.body.velocity.copyFrom(
		game.physics.arcade.velocityFromAngle(snakeHead.angle, 300)
	);

	// Everytime the snake head moves, insert the new location at the start of the array,
	// and knock the last position off the end

	var part = snakePath.pop();

	part.setTo(snakeHead.x, snakeHead.y);

	snakePath.unshift(part);

	for (var i = 1; i <= numSnakeSections - 1; i++) {
		snakeSection[i].x = snakePath[i * snakeSpacer].x;
		snakeSection[i].y = snakePath[i * snakeSpacer].y;
	}
}

/////////////////////////////////////////////// CREATE ////////////////////////////////////////////

function create() {
	
	// SET GAME PHYSICS
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.startSystem(Phaser.Physics.P2JS);

	// ADD SPRITES
	game.add.sprite(0, 0, "bg");
	game.world.setBounds(0, 0, 800, 600);

	// CREATE INPUT JEYS FOR THE GAME
	cursors = game.input.keyboard.createCursorKeys(); // ARROW KEYS

	////// CREATE SPRITES
	// - GHOST SPRITE
	ghost = game.add.sprite(200, 200, "ghost");
	ghost.anchor.setTo(0.5, 0.5);
	// - SNAKE SPRITE
	snakeHead = game.add.sprite(400, 300, "ball");
	snakeHead.anchor.setTo(0.5, 0.5);

	////// ENABLE PHYSICS FOR SPRITES
	// - GHOST PHYSICS
	game.physics.p2.enable(ghost);
	// NO CLUE WHAT THIS DOES BUT IT HAS TO BE HERE (GHOST)
	ghost.body.setZeroDamping();
	ghost.body.fixedRotation = true;
	
	// - SNAKE PHYSICS
	game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

	//  INIT SNAKE SECTION ARRAY
	for (var i = 1; i <= numSnakeSections - 1; i++) {
		snakeSection[i] = game.add.sprite(400, 300, "ball");
		snakeSection[i].anchor.setTo(0.5, 0.5);
	}

	//  INIT SNAKE PATH ARRAY
	for (var i = 0; i <= numSnakeSections * snakeSpacer; i++) {
		snakePath[i] = new Phaser.Point(400, 300);
	}

	// STOPS THE SNAKE FROM GOING OUT
	snakeHead.body.collideWorldBounds = true;


	///// ANIMATIONS
	// - GHOST
	ghost.animations.add('ghostWalkRight', [0,1], 5, true);
	ghost.animations.add('ghostWalkLeft', [2,3], 5, true);

}

/////////////////////////////////////////////// UPDATE ////////////////////////////////////////////

function update() {

	ghost.animations.play('ghostWalkLeft');

	ghost.body.setZeroVelocity();

	snakeHead.body.velocity.setTo(0, 0);
	snakeHead.body.angularVelocity = 0;

	if (cursors.up.isDown) {
		moveSnakeForward();
	}

	if (cursors.left.isDown) {
		snakeHead.body.angularVelocity = -(angularSpeed);
		moveSnakeForward();
		// ghost.body.moveLeft(400);


	} else if (cursors.right.isDown) {
		snakeHead.body.angularVelocity = angularSpeed;
		moveSnakeForward();

		// ghost.body.moveRight(400);
	}
}

function render() {
	game.debug.spriteInfo(snakeHead, 32, 32);
}