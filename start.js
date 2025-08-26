export class Start extends Phaser.Scene {
    constructor() {
      super('Start');
    }
  
    preload() {
        const params = new URLSearchParams(window.location.search);
        this.pais = params.get("pais");
        this.tipo = params.get("tipo");
  
        this.load.image('background', 'fondossimple.png');
  
        this.load.spritesheet('ship', 'animavionde' + this.pais + this.tipo +'.png', { frameWidth: 176, frameHeight: 96 });
    }
  
    create() {
      this.add.image(400, 300, 'background');
  
      this.player = this.physics.add.sprite(400, 500, 'ship');
      this.player.setCollideWorldBounds(true);
  
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('ship', { start: 6, end: 7 }),
        frameRate: 5,
        repeat: -1
      });
  
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ship', { start: 8, end: 10 }),
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
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play('right', true);
      } else {
        this.player.anims.play('idle', true);
      }
    }
  }
  