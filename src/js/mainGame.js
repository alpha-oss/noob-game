class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}
	create() {
		console.log(this);
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

<<<<<<< HEAD
		this.home.setOrigin(0,0);
		// sprites
		this.candy = this.add.sprite(300, 300, "candy");
		this.ghost = this.physics.add.sprite(200, 200, "ghost");
		

		// var bullets = this.physics

		var ghosts = this.physics.add.group({
=======
		this.ghosts = this.physics.add.group({
			frameQuantity: 5,
>>>>>>> upstream/main
			key: 'ghost',
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100,
			// active: false,
            // visible: false,
		});

<<<<<<< HEAD
		Phaser.Actions.RandomRectangle(ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(ghosts);
		ghosts.playAnimation("ghost_walk", [0,1]);
	

		// play animations
		this.candy.play("candy_beam");
		this.ghost.play("ghost_walk");
		// ghostShootTime = this.time.addEvent({ delay: 5000, callback: ghostShoot, callbackScope: this, loop: true });
		
=======
		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0,1]);

		// play animations

		// timed events
		this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});
		this.time.addEvent({ delay: 5000, callback: this.ghostAppears, callbackScope: this, loop: true});

>>>>>>> upstream/main
		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
	}

	update() {

		// this.candy.children.iterate(function (child) {
		// 	// kill candy
		// 	if(child.x > config.width-100){
		// 		child.destroy();
		// 	}
		// });

<<<<<<< HEAD
		this.moveGhost();

	}

	// crash(candy){
	// 	candy.disableBody(true,true);
	// }

	moveGhost(){
		if(this.cursorKeys.left.isDown){
			this.ghost.setVelocityX(-200);
		}else if(this.cursorKeys.right.isDown){
			this.ghost.setVelocityX(200);
		}
		else{
			this.ghost.setVelocityX(0);
		}

		if(this.cursorKeys.up.isDown){
			this.ghost.setVelocity(-200);
		}
		else if(this.cursorKeys.down.isDown){
			this.ghost.setVelocity(200);
		}
	}

	ghostShoot() {
		var candy = this.physics.add.sprite( this.ghost.x, this.ghost.y, "candy");
		
		candy.play("candy_beam");
		candy.body.velocity.x = (config.width/2)-candy.body.x;
		candy.body.velocity.y = (config.height/2)-candy.body.y;

		
		if (candy.x > 200){
			candy.destroy();
		}
=======
		this.ghosts.children.iterate(function (child) {
			// flip ghosts
			if(child.x < config.width/2){
				child.flipX = true;
			}else{
				child.flipX = false;
			}
		});

	}

	ghostShoot() {
		this.ghosts.children.iterate(function (child) {

			// Ghosts Shoot
			var candy = child.scene.physics.add.sprite( child.x, child.y, "candy");
			candy.play('candy_beam');
			candy.body.velocity.x = (config.width/2)-candy.body.x;
			candy.body.velocity.y = (config.height/2)-candy.body.y;
			
		});
>>>>>>> upstream/main
	}
	
	ghostAppears() {
		// console.log('hai');

		// var ghostsDetails = this.ghosts.getChildren();
		// console.log(ghostsDetails);
		
		// this.body.reset(x, y);

		// this.ghosts.add(mainGame ,"ghost");
		// this.ghosts.clear();

<<<<<<< HEAD
}

=======
		// Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		// this.physics.add.collider(this.ghosts);
		// this.ghosts.playAnimation("ghost_walk", [0,1]);

	}
}
>>>>>>> upstream/main
