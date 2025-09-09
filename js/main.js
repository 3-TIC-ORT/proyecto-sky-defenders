var tiempoBala = 0;
var balas;
var botonDisparo;

class BaseLevel extends Phaser.Scene {
  constructor(BaseDelJuego) {
    super(BaseDelJuego);
  }

  preload() {
    const params = new URLSearchParams(window.location.search);
    this.pais = params.get("pais");
    this.tipo = params.get("tipo");

    this.load.spritesheet('avion', '../imgs/animavionde' + this.pais + this.tipo + '.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image('enemigo', '../imgs/enemigo.png');
    this.load.image('bala', '../imgs/bala.png');
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
    botonDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    balas = this.physics.add.group({ defaultKey: 'bala' });

    this.spawnEnemies();

    this.tweens.add({
      targets: this.enemigos.getChildren(),
      x: '+=200',
      ease: 'Linear',
      duration: 2000,
      yoyo: true,
      repeat: -1
    });

    this.physics.add.overlap(balas, this.enemigos, this.hitEnemigo, null, this);
  }

  update(time) {
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

    if (botonDisparo.isDown && time > tiempoBala) {
      const bala = balas.get(this.player.x, this.player.y);
      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.body.velocity.y = -400;
        tiempoBala = time + 400;
      }
    }

    if (this.enemigos.countActive(true) === 0) {
      if (this.nextLevel === 'YouWin') {
        window.location.href = 'YouWin.html';
      } else {
        this.scene.start(this.nextLevel);
      }
    }
  }

  hitEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.destroy();
  }
}

class Level1 extends BaseLevel {
  constructor() {
    super('Level1');
    this.nextLevel = 'Level2';
  }

  spawnEnemies() {
    this.enemigos = this.physics.add.group();
    for (let row = 0; row < 3; row++) {
      this.enemigos.createMultiple({
        key: 'enemigo',
        repeat: 9,
        setXY: { x: 100, y: 100 + row * 80, stepX: 80 },
        setScale: { x: 0.03, y: 0.03 }
      });
    }
  }
}

class Level2 extends BaseLevel {
  constructor() {
    super('Level2');
    this.nextLevel = 'YouWin';
  }

  spawnEnemies() {
    this.enemigos = this.physics.add.group();
    this.enemigos.create(683, 200, 'enemigo').setScale(0.2);
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
  scene: [Level1, Level2]
};

new Phaser.Game(config);
