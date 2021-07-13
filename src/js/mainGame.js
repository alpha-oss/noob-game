class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}

	create() {
		console.log(this);
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		this.ghosts = this.physics.add.group({
			frameQuantity: 5,
			key: 'ghost',
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
		this.time.addEvent({ delay: 5000, callback: this.ghostShoot, callbackScope: this, loop: true});
		this.time.addEvent({ delay: 5000, callback: this.ghostAppears, callbackScope: this, loop: true});

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

	ghostShoot() {
		this.ghosts.children.iterate(function (child) {

			// Ghosts Shoot
			var candy = child.scene.physics.add.sprite( child.x, child.y, "candy");
			candy.play('candy_beam');
			candy.body.velocity.x = (config.width/2)-candy.body.x;
			candy.body.velocity.y = (config.height/2)-candy.body.y;
			
		});
	}
	
	ghostAppears() {
		// console.log('hai');

		// var ghostsDetails = this.ghosts.getChildren();
		// console.log(ghostsDetails);
		
		// this.body.reset(x, y);

		// this.ghosts.add(mainGame ,"ghost");
		// this.ghosts.clear();

		// Phaser.Actions.RandomRectangle(this.ghosts.getChildren(), this.physics.world.bounds);
		// this.physics.add.collider(this.ghosts);
		// this.ghosts.playAnimation("ghost_walk", [0,1]);

	}
}