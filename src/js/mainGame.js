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
		
		var ghosts = this.physics.add.group({
			key: 'ghost',
			quantity: 5,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100
		});
		

		Phaser.Actions.RandomRectangle(ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(ghosts);
		ghosts.playAnimation("ghost_walk", [0,1])

		// play animations
		this.candy.play("candy_beam");
		this.ghost.play("ghost_walk");

		// ghostShootTime = this.time.addEvent({ delay: 500, callback: ghostShoot, callbackScope: this, loop: true });

		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
	}

	update() {
		this.ghost.setVelocity(0);

		this.ghostShoot();

		this.moveGhost();
	}

	moveGhost(){
		if(this.cursorKeys.left.isDown){
			this.ghost.setVelocityX(-200);
		}else if(this.cursorKeys.right.isDown){
			this.ghost.setVelocityX(200);
		}
	}

	ghostShoot() {
		var candy = this.physics.add.sprite( this.ghost.x, this.ghost.y, "candy");
		candy.play("candy_beam");
		candy.body.velocity.x = 100;

		if (candy.x > 200){
			candy.destroy();
		}
	}


}
