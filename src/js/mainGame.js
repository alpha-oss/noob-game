class mainGame extends Phaser.Scene{
    constructor(){
        super("mainGame");
    }

    preload(){
        this.load.image('bg','../assets/bg.png')
    }

    create(){
        this.add.image(0,0,'bg');
    }

}