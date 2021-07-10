var game = new Phaser.Game(1200, 675, Phaser.AUTO, "phaser-example", {
<<<<<<< HEAD
  preload: preload,
  create: create,
  update: update,
  render: render,
=======
	preload: preload,
	create: create,
	update: update,
	render: render,
>>>>>>> 5c5c9a1dc0fa2fc05becb55e95256bcc6653c003
});

function preload() {
	game.load.image("ball", "./assets/bullet.png");
	game.load.image("backg", "./assets/background.png");
}

var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 30; //number of snake body sections
var snakeSpacer = 2; //parameter that sets the spacing between sections

var angularSpeed = 200; //angular speed of snake.

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


function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, "backg");
	game.world.setBounds(0, 0, 800, 600);

	cursors = game.input.keyboard.createCursorKeys();

	snakeHead = game.add.sprite(400, 300, "ball");
	snakeHead.anchor.setTo(0.5, 0.5);

	game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

	//  Init snakeSection array
	for (var i = 1; i <= numSnakeSections - 1; i++) {
		snakeSection[i] = game.add.sprite(400, 300, "ball");
		snakeSection[i].anchor.setTo(0.5, 0.5);
	}

	//  Init snakePath array
	for (var i = 0; i <= numSnakeSections * snakeSpacer; i++) {
		snakePath[i] = new Phaser.Point(400, 300);
	}
}

function update() {
	snakeHead.body.velocity.setTo(0, 0);
	snakeHead.body.angularVelocity = 0;

	if (cursors.up.isDown) {
		moveSnakeForward();
	}

	if (cursors.left.isDown) {
		snakeHead.body.angularVelocity = -(angularSpeed);
		moveSnakeForward();

	} else if (cursors.right.isDown) {
		snakeHead.body.angularVelocity = angularSpeed;
		moveSnakeForward();
	}
}

function render() {
	game.debug.spriteInfo(snakeHead, 32, 32);
}
