class Start extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {
    this.load.image('background', 'fondosimple.png');

    this.load.spritesheet('ship', 'animavióndeestadosunidosataque.png', { 
      frameWidth: 30, 
      frameHeight: 150 
    });      
  }

  create() {
    this.add.image(400, 300, 'background');

    this.player = this.physics.add.sprite(400, 500, 'ship');
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('ship', { start: 10, end: 19 }),
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
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [Start]
};

new Phaser.Game(config);
