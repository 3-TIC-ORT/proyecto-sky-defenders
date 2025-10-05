var tiempoBala = 0;
var balas;
var botonDisparo;
var enemigosDestruidos = 0;
var vidasrestantes = 3;
var puntaje = document.getElementById("puntaje");
var vidas = document.getElementById("vidas");
var niveles = document.getElementById("niveles");

class BaseLevel extends Phaser.Scene {
  constructor(BaseDelJuego) {
    super(BaseDelJuego);
  }

  preload() {
    const params = new URLSearchParams(window.location.search);
    this.pais = params.get("pais");
    this.tipo = params.get("tipo");

    if (this.tipo === "ataque") {
      this.load.spritesheet(
        "avion",
        "../imgs/animavionde" + this.pais + this.tipo + ".png",
        {
          frameWidth: 19,
          frameHeight: 19,
        }
      );
      this.load.spritesheet(
        "avion1",
        "../imgs/animavionde" + this.pais + this.tipo + "1.png",
        {
          frameWidth: 13,
          frameHeight: 19,
        }
      );
    } else if (this.tipo === "caza") {
      this.load.spritesheet(
        "avion",
        "../imgs/animavionde" + this.pais + this.tipo + ".png",
        {
          frameWidth: 42,
          frameHeight: 42,
        }
      );
    } else {
      this.load.spritesheet(
        "avion",
        "../imgs/animavionde" + this.pais + this.tipo + ".png",
        {
          frameWidth: 41,
          frameHeight: 46,
        }
      );
    }

    this.load.image("enemigo", "../imgs/enemigo.png");
    this.load.image("bala", "../imgs/bala.png");

    this.load.image("balaenem", "../imgs/balaenem.png");
  }

  create() {
    this.player = this.physics.add.sprite(683, 700, "avion");
    this.player.setCollideWorldBounds(true);

    if (this.tipo === "ataque") {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 24,
          end: 29,
        }),
        frameRate: 10,
        repeat: -1,
      });
    } else if (this.tipo === "caza") {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("avion", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
    } else {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("avion", { start: 0, end: 9 }),
        frameRate: 18,
        repeat: -1,
      });
    }

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("avion", { start: 9, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    if (this.tipo === "ataque") {
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 18,
          end: 23,
        }),
        frameRate: 10,
        repeat: 0,
      });
    } else if (this.tipo === "caza") {
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 22,
          end: 27,
        }),
        frameRate: 10,
        repeat: 0,
      });
    } else {
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 24,
          end: 29,
        }),
        frameRate: 10,
        repeat: 0,
      });
    }

    if (this.tipo === "ataque") {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 12,
          end: 17,
        }),
        frameRate: 10,
        repeat: 0,
      });
    } else if (this.tipo === "caza") {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 44,
          end: 49,
        }),
        frameRate: 10,
        repeat: 0,
      });
    } else {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("avion", {
          start: 48,
          end: 53,
        }),
        frameRate: 10,
        repeat: 0,
      });
    }
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("avion", { start: 36, end: 41 }),
      frameRate: 10,
      repeat: 0,
    });

    if (this.tipo === "ataque") {
      this.anims.create({
        key: "right_m",
        frames: this.anims.generateFrameNumbers("avion1", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
    } else if (this.tipo === "caza") {
      this.anims.create({
        key: "right_m",
        frames: this.anims.generateFrameNumbers("avion1", {
          start: 33,
          end: 38,
        }),
        frameRate: 10,
        repeat: -1,
      });
    } else {
      this.anims.create({
        key: "right_m",
        frames: this.anims.generateFrameNumbers("avion1", {
          start: 36,
          end: 45,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (this.tipo === "ataque") {
      this.anims.create({
        key: "left_m",
        frames: this.anims.generateFrameNumbers("avion1", {
          start: 6,
          end: 11,
        }),
        frameRate: 10,
        repeat: -1,
      });
    } else if (this.tipo === "caza") {
      this.anims.create({
        key: "left_m",
        frames: this.anims.generateFrameNumbers("avion1", {
          start: 55,
          end: 60,
        }),
        frameRate: 10,
        repeat: -1,
      });
    } else {
      this.anims.create({
        key: "left_m",
        frames: this.anims.generateFrameNumbers("avion1", {
          start: 60,
          end: 69,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
    this.anims.create({
      key: "daño",
      frames: this.anims.generateFrameNumbers("avion", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: 0,
    });

    this.player.anims.play("idle");

    this.cursors = this.input.keyboard.createCursorKeys();
    botonDisparo = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    balas = this.physics.add.group({ defaultKey: "bala" });

    this.balaenem = this.physics.add.group({ defaultKey: "balaenem" });

    this.time.addEvent({
      delay: 600,
      callback: this.enemyShoot,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.balaenem,
      this.player,
      this.hitPlayer,
      null,
      this
    );

    this.spawnEnemies();

    this.tweens.add({
      onYoyo: () => {
        this.enemigos.incY(0.1);
      },
      onRepeat: () => {
        this.enemigos.incY(0.1);
      },
      targets: this.enemigos.getChildren(),
      x: "+=200",
      ease: "Linear",
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });

    this.physics.add.overlap(balas, this.enemigos, this.hitEnemigo, null, this);
  }

  update(time) {
    if (vidasrestantes <= 0) {
      window.location.href = "GameOver.html";
    }

    this.player.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      if (
        this.player.anims.currentAnim.key !== "left" &&
        this.player.anims.currentAnim.key !== "left_m"
      ) {
        this.player.anims.play("left");
        this.player.once("animationcomplete-left", () => {
          this.player.anims.play("left_m");
        });
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      if (
        this.player.anims.currentAnim.key !== "right" &&
        this.player.anims.currentAnim.key !== "right_m"
      ) {
        this.player.anims.play("right");
        this.player.once("animationcomplete-right", () => {
          this.player.anims.play("right_m");
        });
      }
    } else {
      this.player.anims.play("idle", true);
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
      if (this.nextLevel === "YouWin") {
        window.location.href = "YouWin.html";
      } else {
        this.scene.start(this.nextLevel);
      }
    }
  }

  hitEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.destroy();

    puntaje.innerText = "Puntaje: " + (enemigosDestruidos += 10);
  }
  enemyShoot() {
    const enemigosVivos = this.enemigos.getChildren().filter((e) => e.active);
    if (enemigosVivos.length === 0) return;

    const enemigo = Phaser.Utils.Array.GetRandom(enemigosVivos);

    const balaenem = this.balaenem.get(enemigo.x, enemigo.y);
    balaenem.setActive(true);
    balaenem.setVisible(true);
    balaenem.body.velocity.y = 200;
  }
  hitPlayer(player, balaenem) {
    balaenem.destroy();
    vidas.innerText = "Vidas: " + (vidasrestantes -= 1);
    player.anims.play("daño");
  }
}

class Level1 extends BaseLevel {
  constructor() {
    super("Level1");
    this.nextLevel = "Level2";
  }

  spawnEnemies() {
    this.enemigos = this.physics.add.group();
    for (let row = 0; row < 3; row++) {
      this.enemigos.createMultiple({
        key: "enemigo",
        repeat: 9,
        setXY: { x: 100, y: 100 + row * 80, stepX: 80 },
        setScale: { x: 0.03, y: 0.03 },
      });
    }
  }
}

class Level2 extends BaseLevel {
  constructor() {
    super("Level2");
    this.nextLevel = "Level3";
  }
  create() {
    super.create();
    niveles.innerText = "Nivel: 3";

    this.time.addEvent({
      delay: 300,
      callback: this.enemyShoot,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemies() {
    this.enemigos = this.physics.add.group();
    for (let row = 0; row < 4; row++) {
      this.enemigos.createMultiple({
        key: "enemigo",
        repeat: 12,
        setXY: { x: 100, y: 100 + row * 80, stepX: 80 },
        setScale: { x: 0.03, y: 0.03 },
      });
    }
  }
}

class Level3 extends BaseLevel {
  constructor() {
    super("Level3");
    this.nextLevel = "YouWin";
  }

  create() {
    super.create();
    niveles.innerText = "Nivel: 3";
  }

  spawnEnemies() {
    this.enemigos = this.physics.add.group();
    this.enemigos.create(683, 200, "enemigo").setScale(0.2);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1366,
  height: 768,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [Level1, Level2, Level3],
};

new Phaser.Game(config);
