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

    if (this.tipo === "ataque") {
      this.load.spritesheet('avion', '../imgs/animavionde' + this.pais + this.tipo + '.png', {
        frameWidth: 32,
        frameHeight: 32
      });  
    } else if (this.tipo === "caza") {
      this.load.spritesheet('avion', '../imgs/animavionde' + this.pais + this.tipo + '.png', {
        frameWidth: 41,
        frameHeight: 41
      });
    } else {
      this.load.spritesheet('avion', '../imgs/animavionde' + this.pais + this.tipo + '.png', {
        frameWidth: 41,
        frameHeight: 46
      });
    }

    this.load.image('enemigo', '../imgs/enemigo.png');
    this.load.image('bala', '../imgs/bala.png');
  }

  create() {
    this.player = this.physics.add.sprite(683, 700, 'avion');
    this.player.setCollideWorldBounds(true);

    if(this.tipo === "ataque"){
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('avion', { start: 0, end:  5}),
        frameRate: 10,
        repeat: -1
      });
    }else if(this.tipo === "caza"){
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('avion', { start: 0, end:  5}),
        frameRate: 10,
        repeat: -1
      });
    }else {
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('avion', { start: 0, end:  9}),
        frameRate: 18,
        repeat: -1
      });
    }

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('avion', { start: 9, end: 14 }),
      frameRate: 10,
      repeat: -1
    });

    if(this.tipo === "ataque"){  
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('avion', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: 0
      });
    }else if(this.tipo === "caza"){
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('avion', { start: 24, end: 29 }),
        frameRate: 10,
        repeat: 0
      });
    }else {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('avion', { start: 24, end: 29 }),
        frameRate: 10,
        repeat: 0
      });
    }

    if(this.tipo === "ataque"){
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('avion', { start: 36, end: 41 }),
        frameRate: 10,
        repeat: 0
      });
    }else if(this.tipo === "caza"){
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('avion', { start: 36, end: 41 }),
        frameRate: 10,
        repeat: 0
      });
    }else {
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('avion', { start: 48, end: 53 }),
        frameRate: 10,
        repeat: 0
      });  
   }
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('avion', { start: 36, end: 41 }),
      frameRate: 10,
      repeat: 0
    });


    if(this.tipo === "ataque"){
      this.anims.create({
        key: 'right_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 27, end: 32 }),
        frameRate: 10,
        repeat: -1
      });
    }else if(this.tipo === "caza"){
      this.anims.create({
        key: 'right_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 36, end: 45 }),
        frameRate: 10,
        repeat: -1
      });
    }else {
      this.anims.create({
        key: 'right_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 36, end: 45 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if(this.tipo === "ataque"){
      this.anims.create({
        key: 'left_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 45, end: 50 }),
        frameRate: 10,
        repeat: -1
      });  
    }else if(this.tipo === "caza"){
      this.anims.create({
        key: 'left_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 45, end: 50 }),
        frameRate: 10,
        repeat: -1
      });  
    }else {
      this.anims.create({
        key: 'left_m',
        frames: this.anims.generateFrameNumbers('avion', { start: 60, end: 69 }),
        frameRate: 10,
        repeat: -1
      });  
    }

    this.player.anims.play('idle');


    this.cursors = this.input.keyboard.createCursorKeys();
    botonDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    balas = this.physics.add.group({ defaultKey: 'bala' });

    this.enemyBullets = this.physics.add.group({ defaultKey: 'bala' });

    this.time.addEvent({
      delay: 600,
      callback: this.enemyShoot,
      callbackScope: this,
      loop: true
    });
    
    this.physics.add.overlap(this.enemyBullets, this.player, this.hitPlayer, null, this);
    

    this.spawnEnemies();


    this.tweens.add({
      onYoyo: () => {
        this.enemigos.incY(.1);
      },
      onRepeat: () => {
        this.enemigos.incY(.1);
      },
      targets: this.enemigos.getChildren(),
      x: '+=200',
      ease: 'Linear',
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });


    this.physics.add.overlap(balas, this.enemigos, this.hitEnemigo, null, this);
  }


  update(time) {
    this.player.setVelocityX(0);


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      if (this.player.anims.currentAnim.key !== 'left' && this.player.anims.currentAnim.key !== 'left_m') {
        this.player.anims.play('left');
        this.player.once('animationcomplete-left', () => {
          this.player.anims.play('left_m');
        });
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      if (this.player.anims.currentAnim.key !== 'right' && this.player.anims.currentAnim.key !== 'right_m') {
        this.player.anims.play('right');
        this.player.once('animationcomplete-right', () => {
          this.player.anims.play('right_m');
        });
      }
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
  enemyShoot() {
    const enemigosVivos = this.enemigos.getChildren().filter(e => e.active);
    if (enemigosVivos.length === 0) return;

    const enemigo = Phaser.Utils.Array.GetRandom(enemigosVivos);

    const bala = this.enemyBullets.get(enemigo.x, enemigo.y);
    if (bala) {
      bala.setActive(true);
      bala.setVisible(true);
      bala.body.velocity.y = 200;
    }
  }
  hitPlayer(player, bala) {
    bala.destroy();
    this.scene.restart()
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


