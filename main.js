class Start extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {

    const params = new URLSearchParams(window.location.search);
    this.pais = params.get("pais"); this.tipo = params.get("tipo");
    
    this.load.spritesheet('avion', 'animavionde' + this.pais + this.tipo + '.png',
    {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {

    this.player = this.physics.add.sprite(683, 700, 'avion');
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('avion', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('avion', { start: 9, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.player.anims.play('idle');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.setVelocityX(0);
    
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play('attack', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('attack', true);
    } else {
      this.player.anims.play('idle', true);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1366,
  height: 678,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [Start]
};

new Phaser.Game(config);
