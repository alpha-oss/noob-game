
var config = {
    type: Phaser.AUTO,
    
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug: false
        }

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var walls;
var noob;
var button;
var stars;
var score =0;
var scoretxt , ammo;

function preload(){
    this.load.image('sky','/assets/images/background.png');
    this.load.image('ground','/assets/images/platform.png');
    this.load.image('star', '/assets/images/star.png');
    this.load.image('ammo', '/assets/images/bullet.png');
    this.load.spritesheet('dude', 
        '/assets/images/ghost-sprite.png',
        { frameWidth: 75 , frameHeight: 75 }
    );
}

function create(){

    this.add.image(950,530,'sky');
    // this.add.image(400,300,'star');
    walls = this.physics.add.staticGroup();
    // walls.create(400,568,'ground').setScale(2).refreshBody();
    // walls.create(600,400,'ground');
    // walls.create(50,250,'ground');
    // walls.create(600,120,'ground');

    //Creating player script

    noob = this.physics.add.sprite(100,450,'dude');
    // noob.setBounce(0.2);
    noob.setCollideWorldBounds(true);

    
    //this is for palyer to come fast the more value more fast it will come
    noob.body.setGravityY(-200);
    noob.body.setGravityX(200);

   
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude',{start:0,end:1}),
        frameRate: 10,
        repeat: -1

    });

    this.anims.create({
        key:'turn',
        frames:[{key:'dude',frame:4}],
        frameRate: 20
    });

    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('dude',{start:2,end:3}),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(noob,walls);

    //Star dropping script
    stars = this.physics.add.group({
        key:'star',
        repeat:11,
        setXY: {x: 12, y:0 , stepX: 70}
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));    
    });

    this.physics.add.collider(stars,walls);
    this.physics.add.overlap(noob,stars,collectStar,null,this);

    
    button = this.input.keyboard.createCursorKeys();
    //this will collide player with ground and stop
    
    this.input.on('pointerdown',shoot,this);
    //Displaying score:
    scoretxt = this.add.text(16,16,'score: 0',{fontsize: '33px',fill: '#000'});


 

}

function collectStar(noob,star){
    star.disableBody(true,true);
    score+=10;
    scoretxt.setText('SCORE : '+score);
}


function shoot(){
        ammo = this.physics.add.image(noob.x,noob.y,'ammo').setScale(0.25);
        ammo.setVelocityX(600);
        ammo.setRotation(Phaser.Math.PI2/2);
        this.physics.add.collider(ammo,walls,destroyWall,null,this);
}



function destroyWall(ammo,walls){
    ammo.disableBody(true,true);
    console.log("Strike!!!");
}


function update(){

    if (button.left.isDown){
        noob.setVelocityX(-360);
        noob.anims.play('left',true);
    }
    else if (button.right.isDown){
        noob.setVelocityX(160);
        noob.anims.play('right',true);
    }
    else{
        noob.setVelocityX(0);
        noob.anims.play('turn');
    }

    if(button.up.isDown){
        noob.setVelocityY(-150);
    }else if(button.down.isDown){
        noob.setVelocityY(150);
    }
    else{
        noob.setVelocityY(0);
    }


    // else{
    //     noob.setVelocityX(0);
    //     noob.anims.play('turn');
    // }
    // if (button.up.isDown){
    //     noob.setVelocityY(-115);
    // }
  
}

