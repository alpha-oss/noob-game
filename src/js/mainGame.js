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
		// this.ghost = this.add.sprite(200, 200, "ghost");
		
		// ghosts
		this.ghostGeng = this.physics.add.group();

		var maxObjects = 5;
		for (var i = 0; i < maxObjects; i++){
			var ghost = this.physics.add.sprite(500,500,"ghost");
			this.ghostGeng.add(ghost);
			ghost.setRandomPosition(0,0,1200,675);
			
			ghost.play("ghost_walk");
			ghost.setVelocity(100,100);
			ghost.setCollideWorldBounds(true);
			ghost.setBounce(1);
		}

		// play animations
		this.candy.play("candy_snake");
		// this.ghost.play("ghost_walk");
		
	}
}
