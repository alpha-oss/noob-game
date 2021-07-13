class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}

	create() {
		console.log(this);
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		// sprites
		this.candy = this.add.sprite(300, 300, "candy");
		this.ghost = this.physics.add.sprite(200, 200, "ghost");
		this.ghost.setCollideWorldBounds(true);
		

		this.ghosts = this.physics.add.group({
			key: 'ghost',
			quantity: 5,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100
		});
			
		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0,1]);


		// play animations
		this.candy.play("candy_beam");
		this.ghost.play("ghost_walk");


		var timedEvent = this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});

		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
	}

	update() {
		this.ghosts.children.iterate(function (child) {
			// flip ghosts
			if(child.x < config.width/2){
				child.flipX = true;
			}else{
				child.flipX = false;
			}
		});

		this.ghost.setVelocity(0);
		this.flipGhost();
		// this.ghostShoot();
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
		console.log('hai');
		this.ghosts.children.iterate(function (child) {

			// Ghosts Shoot
			var candy = child.scene.physics.add.sprite( child.x, child.y, "candy");
			candy.play('candy_beam')
			candy.body.velocity.x = (config.width/2)-candy.body.x;
			candy.body.velocity.y = (config.height/2)-candy.body.y;
			
		});
	}
}