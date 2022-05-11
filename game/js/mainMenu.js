class mainMenu extends Phaser.Scene {
	constructor() {
		super("mainMenu");
	}

	preload() {
		this.load.html('nameform', 'game/assets/user-input.html');
	}

	create() {
		
		// game title
		this.add.image(600, 200, 'title');

		// user input
		var element = this.add.dom(600, 330).createFromCache('nameform');

		let htplay = this.add.image(400, 430, 'htplay').setInteractive();
		let play = this.add.image(600, 430, 'play').setInteractive();
		let leaderboard = this.add.image(800, 430, 'trophy').setInteractive();

		play.on('pointerdown', () => {
			var userId = element.getChildByName('user-id');
			this.scene.start("stage1", { name: userId.value, score: 0 });
		});
	}
}