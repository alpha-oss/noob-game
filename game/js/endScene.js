class endScene extends Phaser.Scene {
		
	constructor() {
		super("endScene");
	}

	init(data) {
		this.user = data;
	}

	create() {

		this.add.text(20, 20, `Game Over ahahahhaha NOOOB EVEN MY GRANDMOM CAN SCORE MORE THAN ${this.user.score}`);
		let playButton = this.add.rectangle(config.width/2, config.height/2, 250, 75, 0x2ECC71);

		console.log(this.user);
		
		fetch("http://localhost:5000/lb/", {
			method: "POST",
			body: JSON.stringify({
				name: this.user.name,
				score: this.user.score,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(res => res.json())
		.then(json => console.log(json));
		
		this.add.text(playButton.x - playButton.width/4, playButton.y - playButton.height/4, "PLAY AGAIN");

		playButton.setInteractive();
		
		playButton.on('pointerdown', () => {
			this.scene.start("mainGame");
		});
	}
}