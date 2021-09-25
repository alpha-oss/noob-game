class mainMenu extends Phaser.Scene {
	constructor() {
		super("mainMenu");
	}

    preload() {
        this.load.html('nameform', 'game/assets/user-input.html');
    }

	create() {
		// this.add.text(20, 20, "Loading Game...");
		// let playButton = this.physics.add.image(config.width/2, config.height/2, "player");

		// game title
        this.add.image(600, 200, 'title');
        
        // user input
        var element = this.add.dom(600, 330).createFromCache('nameform');
		
        let htplay = this.add.image(400, 430, 'htplay').setInteractive();
		let play = this.add.image(600, 430, 'play').setInteractive();
		let leaderboard = this.add.image(800, 430, 'trophy').setInteractive();
		
		play.on('pointerdown', () => {
            var userId = element.getChildByName('user-id');
			this.scene.start("mainGame", {name: userId.value, score: 0});
		});

		// element.setPerspective(800);
    	// element.addListener('click');

 	//    element.on('click', function (event) {

    //     if (event.target.name === 'playButton')
    //     {
    //         var inputText = this.getChildByName('nameField');

    //         //  Have they entered anything?
    //         if (inputText.value !== '')
    //         {
    //             //  Turn off the click events
    //             this.removeListener('click');

    //             //  Hide the login element
    //             this.setVisible(false);

    //             //  Populate the text with whatever they typed in
    //             text.setText('Welcome ' + inputText.value);
    //         }
    //         else
    //         {
    //             //  Flash the prompt
    //             this.scene.tweens.add({
    //                 targets: text,
    //                 alpha: 0.2,
    //                 duration: 250,
    //                 ease: 'Power3',
    //                 yoyo: true
    //             });
    //                     }
    //     }

    // });

	}
}