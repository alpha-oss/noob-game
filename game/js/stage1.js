class stage1 extends Phaser.Scene {
	constructor() {
		super("stage1");
	}
	
	init(data) {
		this.user = data;
	}
	
	create() {
		
		// to vector object used to calculate stuff (distance bw two objects)
		this.target = new Phaser.Math.Vector2();
		
		// // background image
		// this.bg = this.add.image(0, 0, "bg");
		// this.bg.setOrigin(0, 0);
		
		// player object
		this.player = this.add.image(config.width / 2, config.height / 2, "player");
		this.physics.add.existing(this.player, false);
		this.player.body.collideWorldBounds = true;
		// this.player.body.worldBounce = true;
		
		console.log(this.player);
		// this.physics.add.collider(this.player);
		// player atributes cause extending phaser object is aparently a bad idea in phaser.
		this.playerSpeed = 350;
		this.playerDashCharges = 2;
		this.playerDashSpeed = 30;
		this.playerDashFlag = 0;
		this.playerHealth = 5;
		// this.physics.add.collider(this.player);
		
		this.user.score = 0;
		
		// ghost group object
		this.ghosts = this.physics.add.group({
			frameQuantity: 1,
			key: 'ghost',
			maxSize: 10,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100,
		});

		// candies - bullet on the screen rn
		// this.candies = [];
		
		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds); // placing the ghosts randomly
		this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0, 1]);
		
		
		
		// timed events
		this.time.addEvent({ delay: 9000, callback: this.ghostAppears, callbackScope: this, loop: true });
		this.time.addEvent({ delay: 1000, callback: this.ghostShoot, callbackScope: this, loop: true });
		this.time.addEvent({ delay: 5000, callback: this.incScore, callbackScope: this, loop: true });
		
		this.distance = Phaser.Math.Distance.Between(
			this.player.x,
			this.player.y,
			this.target.x,
			this.target.y
		);

		// if (this.player.speed > 0) {
		// 	if (this.distance < 4) {
		// 		this.player.body.reset(target.x, target.y);
		// 	}
		// }

		// create cursor keys (input for the game)
		this.cursorKeys = this.input.keyboard.createCursorKeys();

		// some game UI
		this.userLabel = this.add.text(10, 10, `WE HAVE A NEW CHALLLENGER: ${this.user.name}`, { font: '30px Courier', fill: '#00ff00' });
		this.scoreLabel = this.add.text(10, 40, `SCORE ${this.user.score}`, { font: '30px Courier', fill: '#00ff00' });
		this.playerHealthLabel = this.add.text(10, 70, `HEALTH ${this.playerHealth}`, { font: '30px Courier', fill: '#00ff00' });
		this.dashChargesLabel = this.add.text(10, 100, `DASH CHARGE ${this.playerDashCharges}`, { font: '30px Courier', fill: '#00ff00' });

	}

	update() {

		if (!this.playerHealth) {
			this.scene.start("endScene", this.user);
		}

		this.ghostFlip();
		this.playerMove();

		if (this.playerDashCharges < 2) {
			if (!this.playerDashFlag) { 
				this.time.addEvent({ delay: 1000, callback: this.incCharge, callbackScope: this, loop: false });
			}
			this.playerDashFlag = 1;
		}
	}

	incCharge() {
		this.playerDashFlag = 0;
		this.playerDashCharges += 1;
		this.dashChargesLabel.text = "DASH CHARGE " + this.playerDashCharges;
	}

	incScore() {
		this.user.score += 15;
		this.scoreLabel.text = "SCORE " + this.user.score;
	}

	playerMove() {

		this.player.body.setVelocityX(0);
		this.player.body.setVelocityY(0);

		// player movement
		if (this.cursorKeys.left.isDown) {
			this.player.body.setVelocityX(-this.playerSpeed);

			if (this.cursorKeys.space.isDown && this.playerDashCharges > 0) {
				this.playerDashCharges -= 1;
				this.player.body.setVelocityX(-this.playerSpeed * this.playerDashSpeed);
				this.dashChargesLabel.text = "DASH CHARGE " + this.playerDashCharges;
			}
		} else if (this.cursorKeys.right.isDown) {
			this.player.body.setVelocityX(this.playerSpeed);
			
			if (this.cursorKeys.space.isDown && this.playerDashCharges > 0) {
				this.playerDashCharges -= 1;
				this.player.body.setVelocityX(this.playerSpeed * this.playerDashSpeed);
				this.dashChargesLabel.text = "DASH CHARGE " + this.playerDashCharges;
			}
		}
		
		if (this.cursorKeys.up.isDown) {
			this.player.body.setVelocityY(-this.playerSpeed);
			
			if (this.cursorKeys.space.isDown && this.playerDashCharges) {
				this.playerDashCharges -= 1;
				this.player.body.setVelocityY(-this.playerSpeed * this.playerDashSpeed);
				this.dashChargesLabel.text = "DASH CHARGE " + this.playerDashCharges;
			}
		} else if (this.cursorKeys.down.isDown) {
			this.player.body.setVelocityY(this.playerSpeed);

			if (this.cursorKeys.space.isDown && this.playerDashCharges) {
				this.playerDashCharges -= 1;
				this.player.body.setVelocityY(this.playerSpeed * this.playerDashSpeed);
				this.dashChargesLabel.text = "DASH CHARGE " + this.playerDashCharges;
			}
		}
		
		// if (this.cursorKeys.space.isDown) {
			// 	console.log(this.player.body.facing)
			// 	dir = this.player.body.facing
		// 	if (dir == 11) {

		// 	}
		// }

		// // dash recovery
	}

	ghostFlip() {
		this.ghosts.children.iterate(function (child) {
			// flip ghosts
			if (child.x < config.width / 2) {
				child.flipX = true;
			} else {
				child.flipX = false;
			}
		});
	}

	ghostAppears() {
		if (this.ghosts.getLength() < this.ghosts.maxSize) {
			var ghostX = (Math.random() > 0.5 ? 0 : config.width);
			var ghostY = (Math.random() * (config.height));
			// console.log(ghostX, ghostY);
			var newGhost = this.physics.add.sprite(ghostX, ghostY, "ghost");
			this.ghosts.add(newGhost);
			newGhost.play("ghost_walk");
		}
	}

	ghostShoot() {
		const player = this.player
		const worldBounds = this.physics.world.bounds;
		// let candiesArray = this.candies;

		this.ghosts.children.iterate( function (child) {
			// Ghosts Shoot
			// console.log(candiesArray);
			var candy = child.scene.physics.add.sprite(child.x, child.y, "candy");
			// candiesArray.push(candy);
			
			candy.play('candy_beam');
			
			candyTarget.x = player.x;
			candyTarget.y = player.y;
			
			
			// console.log(candiesArray);

			child.scene.physics.moveToObject(candy, candyTarget, 300);
			child.scene.physics.add.collider(player, candy, function () {
				candy.destroy();
				// child.scene.deathSound.play();
				child.scene.playerHealth--;
				child.scene.playerHealthLabel.text = "HEALTH " + child.scene.playerHealth;
			});
			
			// for ( let i = 0; i <= candiesArray.length; i++) {
			// 	if ( candiesArray[i].x > worldBounds.width || candiesArray[i].x < 200 ) {
			// 		candiesArray[i].destroy();
			// 		// candies.splice()
			// 	}
			// }
			console.log(candy.x);


		});
	}
}
// }