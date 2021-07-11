// CREATE NEW GAME OBJECT
var game = new Phaser.Game(1200, 675, Phaser.AUTO, "phaser-example", {
  preload: preload,
  create: create,
  update: update,
  render: render,
});

//////////////////////////////////////////// PRELOAD ////////////////////////////////////////////

function preload() {
  game.load.image("ball", "./assets/bullet.png"); // SNAKE PARTS BUT ITS CALLED BALL, WHY? ASK @CARRBONXX
  game.load.image("bg", "./assets/background.png"); // BACKGROUND
  game.load.spritesheet("ghost", "./assets/ghost-sprite.png", 75, 75); // GHOST
  game.load.spritesheet("candyBullet", "./assets/candy-sprite.png", 22, 22); // CANDY - BULLETS
}
