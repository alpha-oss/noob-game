class mainGame extends Phaser.Scene {
	constructor() {
		super("mainGame");
	}

	create() {
		// add images
		this.bg = this.add.image(0, 0, "bg");
		this.bg.setOrigin(0, 0);

		this.candy = this.add.sprite(300, 300, "candy");
		this.ghost = this.add.sprite(200, 200, "ghost");

		// create animations
		this.anims.create({
			key: "candy_snake",
			frames: this.anims.generateFrameNumbers("candy", {
				start: 0,
				end: 1,
			}),
			frameRate: 5,
			repeat: -1,
		});

		// ghost walk animation
		this.anims.create({
			key: "ghost_walk",
			frames: this.anims.generateFrameNumbers("ghost", {
				start: 0,
				end: 1,
			}),
			frameRate: 5,
			repeat: -1,
		});

		// play animations
		this.ghost.play("ghost_walk");
		this.candy.play("candy_snake");
	}
}
