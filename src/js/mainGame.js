class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}
	create() {
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		this.home = this.add.image(460,210,"home").setScale(0.6);
		this.home.setOrigin(0,0);
		// sprites
		this.candy = this.add.sprite(300, 300, "candy");
		this.ghost = this.physics.add.sprite(200, 200, "ghost");
		

		// var bullets = this.physics

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
		ghosts.playAnimation("ghost_walk", [0,1]);
	

		// play animations
		this.candy.play("candy_beam");
		this.ghost.play("ghost_walk");
		this.bullet.play("bullet-move");

		// ghostShootTime = this.time.addEvent({ delay: 5000, callback: ghostShoot, callbackScope: this, loop: true });
		
		// this.physics.add.overlap(this.candy,this.home,crash,null,this);

		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
	}

	update() {
		this.ghost.setVelocity(0);

		this.ghostShoot();

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
		// var candy = this.physics.add.sprite( this.ghost.x, this.ghost.y, "candy");
		this.bullet = this.physics.add.image(ghost.x,ghost.y,'bullet').setScale(0.8);
		bullet.play("bullet-move");
		// candy.play("candy_beam");
		candy.body.velocity.x = (config.width/2)-candy.body.x;
		candy.body.velocity.y = (config.height/2)-candy.body.y;

		// var candy = this.physics.add.sprite( this.ghost.x, this.ghost.y, "candy");
		// candy.body.velocity.x = (config.width/2)-candy.body.x;
		// candy.body.velocity.y = (config.height/2)-candy.body.y;

		if (candy.x > 200){
			candy.destroy();
		}
	}


}

