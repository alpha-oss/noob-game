class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}

	init(data) {
		this.user = data;
	}

	create() {

		// console.log(this);
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);
		// this.add.text(200,200, this.user.name);
		// this.add.text(200,300, this.user.score);

		player = this.physics.add.image(config.width/2, config.height/2, "player");
		// this.input.on(
		// 	"pointerdown",
		// 	function (pointer) {
		// 		target.x = pointer.x;
		// 		target.y = pointer.y;

		// 		// Move at 200 px/s:
		// 		this.physics.moveToObject(player, target, 200);
		// 	},
		// 	this
		// );

		this.ghosts = this.physics.add.group({
			frameQuantity: 1,
			key: 'ghost',
			maxSize: 8,
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
			velocityX: 100,
			velocityY: 100,
		});

		Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		this.physics.add.collider(this.ghosts);
		this.ghosts.playAnimation("ghost_walk", [0, 1]);

		// play animations

		// timed events
		this.time.addEvent({ delay: 9000, callback: this.ghostAppears, callbackScope: this, loop: true });
		this.time.addEvent({ delay: 1000, callback: this.ghostShoot, callbackScope: this, loop: true });
		this.time.addEvent({ delay: 3000, callback: this.incScore, callbackScope: this, loop: true});

		this.distance = Phaser.Math.Distance.Between(
			player.x,
			player.y,
			target.x,
			target.y
		);

		if (player.body.speed > 0) {
			if (distance < 4) {
				player.body.reset(target.x, target.y);
			}
		}

		// create cursor keys
		this.cursorKeys = this.input.keyboard.createCursorKeys();

		// colliders

		this.health = 5;
		this.user.score = 0;

		// set text to screen 
		this.userLabel = this.add.text(10, 10, `WE HAVE A NEWW CHALLLENGER: ${this.user.name}`, { font: '30px Courier', fill: '#00ff00' });
		this.scoreLabel = this.add.text(10, 40, `SCORE ${this.user.score}`, { font: '30px Courier', fill: '#00ff00' });
		this.healthLabel = this.add.text(10, 70, `HEALTH ${this.health}`, { font: '30px Courier', fill: '#00ff00' });

		// this.physics.add.collider(player, this.ghosts, hurt);

	}

	update() {
		
		if(!this.health){
			// if(alert(`NOOB XD, MY GRANDMOM COULD SCORE MORE THAN ${this.score}`)){}
			// else{
			// 	window.location.reload();
			// }
			this.scene.start("endScene", this.user);
		}

		this.ghostFlip();
		this.playerMove();

	}

	incScore() {
		this.user.score += 15;
		this.scoreLabel.text = "SCORE " + this.user.score;
	}

	playerMove(){

		player.setVelocityX(0);
		player.setVelocityY(0);

		// player movement
		if(this.cursorKeys.left.isDown){
			player.setVelocityX(-playerSpeed);
		}else if(this.cursorKeys.right.isDown){
			player.setVelocityX(playerSpeed);
		}

		if(this.cursorKeys.up.isDown){
			player.setVelocityY(-playerSpeed);
		}else if(this.cursorKeys.down.isDown){
			player.setVelocityY(playerSpeed);
		}

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

			// var delay = (Math.random() * 10000);
			// console.log(delay);
			// this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});

		}

	}

	ghostShoot() {
		this.ghosts.children.iterate(function (child) {

			// Ghosts Shoot
			var candy = child.scene.physics.add.sprite(child.x, child.y, "candy");
			candy.play('candy_beam');
			
			candyTarget.x = player.x;
			candyTarget.y = player.y;
			
			child.scene.physics.moveToObject( candy, candyTarget, 300);
			child.scene.physics.add.collider( player, candy, function() {
				candy.destroy();
				// child.scene.deathSound.play();
				child.scene.health--;
				child.scene.healthLabel.text = "HEALTH " + child.scene.health;
			});

		});
	}

	// we ar enot using this yet but do not delete we might use this later.
	ghostMove() {

		this.ghosts.children.iterate(function (child) {

			var radius = 200;
			var randomX = (Math.random() * ((child.x + radius) - (child.x - radius))) + child.x - radius;
			var randomY = (Math.random() * ((child.y + radius) - (child.y - radius))) + child.y - radius;

			child.setVelocityX(randomX - child.x);
			child.setVelocityY(randomY - child.y);

		});

	}


}
