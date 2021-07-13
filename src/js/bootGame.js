let button;

class bootGame extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//images
		this.load.image("bg", "src/assets/bg.png");
		//sprites
		this.load.spritesheet("ghost", "src/assets/ghost-sprite.png", {
			frameWidth: 75,
			frameHeight: 75,
		});
		this.load.spritesheet("candy", "src/assets/candy-sprite.png", {
			frameWidth: 22,
			frameHeight: 22,
		});
	}

	create() {
		this.scene.start("mainGame");
	}
}
