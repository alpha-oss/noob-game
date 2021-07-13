class Candy extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = scene.ghost.x;
        var y = scene.ghost.y;

        super(scene, x, y, "candy");

        // scene.add.existing(this);

        // this.play("candy_beam");
        // scene.physics.world.enableBody(this);

        scene.projectiles.add(this);

    }
}