let button;

class bootGame extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	preload() {
		//images
		this.load.image("bg", "src/assets/bg.png");
		this.load.image("home","src/assets/earth.png")
		this.load.image("bullet","src/assets/bullet.png");
		//sprites
		this.load.spritesheet("ghost", "src/assets/ghost-sprite.png", { //ghost
			frameWidth: 75,
			frameHeight: 75,
		});
		this.load.spritesheet("candy", "src/assets/candy-sprite.png", { // candy
			frameWidth: 22,
			frameHeight: 22,
		});
	}

	create() {

		// create animations
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

		this.anims.create({
			key: 'bullet-move',
			frames: this.anims.generateFrameNumbers("bullet",{
				start: 0,
				end: 1
			}),
			frameRate: 4,
			repeat: -1
		})

		this.scene.start("mainGame");
	}
}
