class mainMenu extends Phaser.Scene {
	constructor() {
		super("mainMenu");
	}

	create() {
		this.add.text(20, 20, "Loading Game...");
		// let playButton = this.physics.add.image(config.width/2, config.height/2, "player");

		let playButton = this.add.rectangle(config.width/2, config.height/2, 250, 75, 0x2ECC71);
		// console.log(getCenter(playButton));
		// playButton.setStrokeStyle(3, 0x2ECC71);
		console.log(playButton.x);
		
		this.add.text(playButton.x - playButton.width/4, playButton.y - playButton.height/4, "PLAY GAME");

		playButton.setInteractive();
		
		playButton.on('pointerdown', () => {
			console.log("bruhh");
		});
	}
}