class bootGame extends Phaser.Scene {
	
	constructor() {
		super("bootGame");
	}

	preload() {
		//images
		// main menu images
		this.load.image("title", "game/assets/title.png");
		this.load.image("play", "game/assets/play.png");
		this.load.image("htplay", "game/assets/htplay.png");
		this.load.image("trophy", "game/assets/gleaderboard.png");
		// game images
		this.load.image("bg", "game/assets/bg.png");
		this.load.image("player", "game/assets/samurai.png");
		// game sprites
		this.load.spritesheet("ghost", "game/assets/ghost-sprite.png", {
			//ghosts
			frameWidth: 75,
			frameHeight: 75,
		});
		this.load.spritesheet("candy", "game/assets/candy-sprite.png", {
			// candy
			frameWidth: 22,
			frameHeight: 22,
		});
	}

	create() {
		
		// animations
		this.anims.create({
			key: "candy_beam",
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

		this.scene.start("mainMenu");
	}
}
