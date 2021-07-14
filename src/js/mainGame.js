class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}

	create() {
		// console.log(this);
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		snakeHead = this.physics.add.image(100, 300, "pump");
		this.input.on(
		  "pointerdown",
		  function (pointer) {
			target.x = pointer.x;
			target.y = pointer.y;
	
			// Move at 200 px/s:
			this.physics.moveToObject(snakeHead, target, 200);
		  },
		  this
		);

		this.ghosts = this.physics.add.group({
			frameQuantity: 1,
			key: 'ghost',
			maxSize: 8,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100,
			// active: false,
            // visible: false,
		});

		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0,1]);

		// play animations

		// timed events
		this.time.addEvent({ delay: 5000, callback: this.ghostAppears, callbackScope: this, loop: true});
		// this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});
		// this.time.addEvent({ delay: 10000, callback: this.ghostMove, callbackScope: this, loop: true});

		this.distance = Phaser.Math.Distance.Between(
			snakeHead.x,
			snakeHead.y,
			target.x,
			target.y
		  );
	  
		  if (snakeHead.body.speed > 0) {
			if (distance < 4) {
			  snakeHead.body.reset(target.x, target.y);
			}
		  }

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

		this.ghosts.children.iterate(function (child) {
			// flip ghosts
			if(child.x < config.width/2){
				child.flipX = true;
			}else{
				child.flipX = false;
			}
		});

	}

	ghostAppears() {
		// console.log('hai');

		// var ghostsDetails = this.ghosts.getChildren();
		// console.log(ghostsDetails);
		
		// this.body.reset(x, y);
		if(this.ghosts.getLength() < this.ghosts.maxSize){

			console.log('hai');
			var ghostX = (Math.random() > 0.5 ? 0 : config.width); 
			var ghostY = (Math.random() * (config.height));
			console.log(ghostX, ghostY);
			var newGhost = this.physics.add.sprite( ghostX, ghostY, "ghost"); 
			this.ghosts.add(newGhost);
			newGhost.play("ghost_walk");

			var delay = (Math.random() * 10000);
			console.log(delay);
			// this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});
		
		}
		// this.ghosts.clear();

		// Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		// this.physics.add.collider(this.ghosts);
		// this.ghosts.playAnimation("ghost_walk", [0,1]);

	}

	ghostShoot() {
		this.ghosts.children.iterate(function (child) {

			// Ghosts Shoot
			var candy = child.scene.physics.add.sprite( child.x, child.y, "candy");
			candy.play('candy_beam');
			candy.body.velocity.x = (config.width/2)-candy.body.x;
			candy.body.velocity.y = (config.height/2)-candy.body.y;
			
		});
	}
	
	ghostMove() {
	
		this.ghosts.children.iterate(function (child) {

			var radius = 200;
			var randomX = (Math.random() * ((child.x+radius) - (child.x-radius))) + child.x-radius;
			var randomY = (Math.random() * ((child.y+radius) - (child.y-radius))) + child.y-radius;

			child.setVelocityX(randomX - child.x);
			child.setVelocityY(randomY - child.y);
			// child.setVelocityY(1000)

			// Ghosts Shoot
			// var candy = child.scene.physics.add.sprite( child.x, child.y, "candy");
			// candy.play('candy_beam');
			// candy.body.velocity.x = (config.width/2)-candy.body.x;
			// candy.body.velocity.y = (config.height/2)-candy.body.y;
			
		});
	
	}

	
}
