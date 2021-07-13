class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}


	create() {
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		// sprites
		this.candy = this.add.sprite(300, 300, "candy");
		this.ghost = this.physics.add.sprite(200, 200, "ghost");
		this.ghost.setCollideWorldBounds(true);
		
		// this.ghosts = this.physics.add.group();


		this.ghosts = this.physics.add.group({
			key: 'ghost',
			quantity: 5,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
				velocityY: 100
			});
		// var maxObjects = 5;
		// for( var i = 0; i <= maxObjects; i++){
		// 	var ghost = this.physics.add.sprite( 22, 22, "ghost");
		// 	this.ghosts.add(ghost);
			
		// 	ghost.setRandomPosition( 0, 0, game.config.width, game.config.height);
		// 	ghost.setVelocity(100,100);
		// 	ghost.play("ghost-walk");
		// 	ghost.setCollideWorldBounds(true);
		// 	ghost.setBounceX(1);
		// 	ghost.setBounceY(1);
		// 	ghost.runChildUpdate

		// var candy = this.physics.add.sprite( ghost.x, ghost.y, "candy");
		// 	candy.body.velocity.x = (config.width/2)-candy.body.x;
		// 	candy.body.velocity.y = (config.height/2)-candy.body.y;

		// }
		
		// var ghosts = this.physics.add.group({
		// 		key: 'ghost',
		// 		quantity: 5,
		// 		bounceX: 1,
		// 		bounceY: 1,
		// 		collideWorldBounds: true,
		// 		velocityX: 100,
		// 		velocityY: 100
		// 	});
			
		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(this.ghosts);
		// this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0,1]);
		// this.ghosts.playAnimation("ghost_walk", [0,1]);
		// ghosts.rotateAround(,90);

		// play animations
		this.candy.play("candy_beam");
		this.ghost.play("ghost_walk");

		console.log(this.ghost.angle);
		// ghostShootTime = this.time.addEvent({ delay: 500, callback: ghostShoot, callbackScope: this, loop: true });

		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
	}

	update() {

		// var candy = this.physics.add.sprite( this.ghosts.x, this.ghosts.y, "candy");
		// candy.body.velocity.x = (config.width/2)-candy.body.x;
		// candy.body.velocity.y = (config.height/2)-candy.body.y;

		this.ghost.setVelocity(0);
		this.flipGhost();
		this.ghostShoot();
		this.moveGhost();
	}

	moveGhost(){

		if(this.cursorKeys.up.isDown){
			this.ghost.setVelocityY(-200);
		}else if(this.cursorKeys.down.isDown){
			this.ghost.setVelocityY(200);
		}
		
		if(this.cursorKeys.left.isDown){
			this.ghost.setVelocityX(-200);
		}else if(this.cursorKeys.right.isDown){
			this.ghost.setVelocityX(200);
		}
	}

	flipGhost(){
		if(this.ghost.x < config.width/2){
			this.ghost.flipX = true;
		}else{
			this.ghost.flipX = false;
		}
	}

	ghostShoot() {
		var candy = this.physics.add.sprite( this.ghost.x, this.ghost.y, "candy");
		candy.body.velocity.x = (config.width/2)-candy.body.x;
		candy.body.velocity.y = (config.height/2)-candy.body.y;

		// console.log(candy);
		// if (candy.x > 200){
		// 	candy.kill();
		// }
	}
}