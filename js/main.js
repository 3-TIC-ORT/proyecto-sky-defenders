let tiempoBala = 0;
let balas;
let botonDisparo;
let enemigosDestruidos = 0;
let vidasrestantes = 3;
let puntaje = document.getElementById("puntaje");
let vidas = document.getElementById("vidas");
let niveles = document.getElementById("niveles");

const menuBoton = document.getElementById("menuBoton");
const menuDiv = document.getElementById("menu-div");
const inicioBoton = document.getElementById("inicioBoton");
const reanudarBoton = document.getElementById("reanudarBoton");
const tablaBoton = document.getElementById("tablaBoton");
const cfg = document.getElementById("cfg");
const cfgDiv = document.getElementById("cfg-div");
const esBoton = document.getElementById("esBoton");
const musicaBoton = document.getElementById("musicaBoton");
const atrasBoton = document.getElementById("atrasBoton");
const audio = document.getElementById("audio");

let gameInstance;

let fondo;
let velocidadFondo = 2

const originalGameConstructor = Phaser.Game;
Phaser.Game = function (config) {
  gameInstance = new originalGameConstructor(config);
  return gameInstance;
};

menuBoton.addEventListener("click", () => {
  menuDiv.style.display = "block";

  const activeScene = gameInstance.scene.getScenes(true)[0];
  activeScene.scene.pause();
});

reanudarBoton.addEventListener("click", () => {
  menuDiv.style.display = "none";

  const pausedScene = gameInstance.scene
    .getScenes(false)
    .find((s) => s.sys.isPaused());
  pausedScene.scene.resume();
});

inicioBoton.addEventListener("click", () => {
  window.location.href = "../html/inicio.html";
});

tablaBoton.addEventListener("click", () => {
  window.location.href = "../html/TablaDeClasificación.html";
});

cfg.addEventListener("click", () => {
  cfgDiv.style.display = "block";
});

esBoton.addEventListener("click", () => {
  alert("Esta opción aún no está disponible.");
});

let musicaActiva = true;

musicaBoton.addEventListener("click", () => {
  if (musicaActiva) {
    audio.pause();
    musicaBoton.textContent = "Música: OFF";
  } else {
    audio.play();
    musicaBoton.textContent = "Música: ON";
  }
  musicaActiva = !musicaActiva;
});

atrasBoton.addEventListener("click", () => {
  cfgDiv.style.display = "none";
});

audio.play();

class BaseLevel extends Phaser.Scene {
  constructor(BaseDelJuego) {
    super(BaseDelJuego);
  }

  preload() {
    const params = new URLSearchParams(window.location.search);
    this.pais = params.get("pais");
    this.tipo = params.get("tipo");

    const tiposConfig = {
      ataque: [
        { frameWidth: 19, frameHeight: 19 },
        { frameWidth: 13, frameHeight: 19 },
      ],
      caza: [
        { frameWidth: 33, frameHeight: 26 },
        { frameWidth: 23, frameHeight: 26 },
        { frameWidth: 25, frameHeight: 26 },
      ],
      cazae: [
        { frameWidth: 37, frameHeight: 22 },
        { frameWidth: 26, frameHeight: 22 },
        { frameWidth: 37, frameHeight: 22 },
      ],
      bombardero: [
        { frameWidth: 41, frameHeight: 36 },
        { frameWidth: 31, frameHeight: 36 },
        { frameWidth: 41, frameHeight: 36 },
      ],
    };

    const frames = tiposConfig[this.tipo];
    frames.forEach((cfg, i) => {
      this.load.spritesheet(
        `avion${i + 1}`,
        `../imgs/animavionde${this.pais}${this.tipo}${i + 1}.png`,
        cfg
      );
    });

    this.load.spritesheet("enemigo", "../imgs/enemigo.png", {
      frameWidth: 28,
      frameHeight: 30,
    });

    this.load.image('fondo', '../imgs/Fondo.png');

    this.load.image("bala", "../imgs/bala.png");

    this.load.image("balaenem", "../imgs/balaenem.png");
  }

  create() {
    
    fondo = this.add.tileSprite(0, 0, 1366, 768, 'fondo');
    fondo.setOrigin(0, 0);

    this.player = this.physics.add.sprite(683, 700, "avion1").setScale(2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "enemigo",
      frames: this.anims.generateFrameNumbers("enemigo", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "enemigo_disparo1",
      frames: this.anims.generateFrameNumbers("enemigo", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "enemigo_disparo2",
      frames: this.anims.generateFrameNumbers("enemigo", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "enemigo_daño",
      frames: this.anims.generateFrameNumbers("enemigo", {
        start: 12,
        end: 13,
      }),
      frameRate: 10,
      repeat: 0,
    });

    const animConfigs = {
      ataque: {
        idle: [24, 29, 10],
        left: [12, 17],
        right: [18, 23],
        right_m: ["avion2", 0, 5],
        left_m: ["avion2", 6, 11],
      },
      caza: {
        idle: [0, 7, 14],
        left: [16, 21],
        right: [8, 13],
        right_m: ["avion2", 0, 7],
        left_m: ["avion3", 0, 7],
      },
      cazae: {
        idle: [0, 0, 10],
        left: [6, 11],
        right: [12, 17],
        right_m: ["avion2", 0, 5],
        left_m: ["avion2", 6, 11],
      },
      bombardero: {
        idle: [0, 9, 18],
        left: [10, 15],
        right: [20, 25],
        right_m: ["avion2", 10, 19],
        left_m: ["avion2", 0, 9],
      },
    };

    const cfg = animConfigs[this.tipo];

    const animList = [
      {
        key: "idle",
        sprite: "avion1",
        start: cfg.idle[0],
        end: cfg.idle[1],
        rate: cfg.idle[2],
        repeat: -1,
      },
      {
        key: "attack",
        sprite: "avion1",
        start: 9,
        end: 14,
        rate: 10,
        repeat: 0,
      },
      {
        key: "left",
        sprite: "avion1",
        start: cfg.left[0],
        end: cfg.left[1],
        rate: 10,
        repeat: 0,
      },
      {
        key: "right",
        sprite: "avion1",
        start: cfg.right[0],
        end: cfg.right[1],
        rate: 10,
        repeat: 0,
      },
      {
        key: "right_m",
        sprite: cfg.right_m[0],
        start: cfg.right_m[1],
        end: cfg.right_m[2],
        rate: 10,
        repeat: -1,
      },
      {
        key: "left_m",
        sprite: cfg.left_m[0],
        start: cfg.left_m[1],
        end: cfg.left_m[2],
        rate: 10,
        repeat: -1,
      },
      {
        key: "daño",
        sprite: "avion1",
        start: 0,
        end: 1,
        rate: 10,
        repeat: 0,
      },
    ];

    animList.forEach(({ key, sprite, start, end, rate, repeat }) => {
      this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(sprite, { start, end }),
        frameRate: rate,
        repeat: repeat,
      });
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

    this.enemigos.getChildren().forEach((enemigo) => {
      this.tweens.add({
        onYoyo: () => {
          this.enemigos.incY(0.1);
        },
        onRepeat: () => {
          this.enemigos.incY(0.1);
        },
        targets: enemigo,
        x: enemigo.x + 200,
        ease: "Linear",
        duration: 2000,
        yoyo: true,
        repeat: -1,
      });
    });

    this.physics.add.overlap(balas, this.enemigos, this.hitEnemigo, null, this);
  }

  update(time) {
    this.player.setVelocityX(0);

    fondo.tilePositionY -= velocidadFondo;

    if (fondo.tilePositionY >= fondo.height) {
        fondo.til
    }
    
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
    } else if (this.player.anims.currentAnim.key !== "daño") {
      this.player.anims.play("idle", true);
    }

    if (botonDisparo.isDown && time > tiempoBala) {
      const bala = balas.get(this.player.x, this.player.y - this.player.height);
      if (bala) {
        bala.setActive(true);
        bala.setVisible(true);
        bala.body.velocity.y = -400;
        tiempoBala = time + 400;
      }
    }
  }

  hitEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.play("enemigo_daño");

    enemigo.once("animationcomplete-enemigo_daño", () => {
      enemigo.destroy();

      enemigosDestruidos += 10;
      puntaje.innerText = "Puntaje: " + enemigosDestruidos;

      if (this.enemigos.countActive(true) === 0) {
        if (this.nextLevel === "YouWin") {
          localStorage.clear();
          localStorage.setItem("puntaje", JSON.stringify(enemigosDestruidos));
          window.location.href = "YouWin.html";
        } else {
          this.scene.start(this.nextLevel);
        }
      }
    });
  }

  enemyShoot() {
    const enemigosVivos = this.enemigos.getChildren().filter((e) => e.active);
    if (enemigosVivos.length === 0) return;

    const enemigo = Phaser.Utils.Array.GetRandom(enemigosVivos);

    enemigo.play("enemigo_disparo1");

    enemigo.once("animationcomplete-enemigo_disparo1", () => {
      const balaenem = this.balaenem.get(
        enemigo.x,
        enemigo.y + enemigo.displayHeight
      );
      if (balaenem) {
        balaenem.setActive(true);
        balaenem.setVisible(true);
        balaenem.body.velocity.y = 200;
      }
      enemigo.play("enemigo_disparo2");
    });

    enemigo.once("animationcomplete-enemigo_disparo2", () => {
      enemigo.play("enemigo");
    });
  }
  hitPlayer(player, balaenem) {
    balaenem.destroy();
    vidas.innerText = "Vidas: " + (vidasrestantes -= 1);
    if (vidasrestantes <= 0) {
      localStorage.clear();
      localStorage.setItem("puntaje", JSON.stringify(enemigosDestruidos));
      window.location.href =
        "GameOver.html?pais=" + this.pais + "&tipo=" + this.tipo;
    }
    player.anims.play("daño");
    player.once("animationcomplete-daño", () => {
      player.play("idle");
    });
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
      const enemigosFila = this.enemigos.createMultiple({
        key: "enemigo",
        repeat: 9,
        setXY: { x: 100, y: 100 + row * 80, stepX: 80 },
      });

      enemigosFila.forEach((enemigo) => {
        enemigo.play("enemigo");
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
    niveles.innerText = "Nivel: 2";

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
      const enemigosFila = this.enemigos.createMultiple({
        key: "enemigo",
        repeat: 12,
        setXY: { x: 100, y: 100 + row * 80, stepX: 80 },
      });

      enemigosFila.forEach((enemigo) => {
        enemigo.play("enemigo");
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
    this.enemigos.create(683, 200, "enemigo").setScale(4);
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
