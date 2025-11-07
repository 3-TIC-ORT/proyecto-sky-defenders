let tiempoBala = 0;
let balas;
let botonDisparo;
let enemigosDestruidos = 0;
let vidasrestantes = 30000000000;
let puntaje = document.getElementById("puntaje");
let vidas = document.getElementById("vidas");
let niveles = document.getElementById("niveles");
let vidaBoss = document.getElementById("vidaBoss");
let nivelActual = 2;
let gameInstance;
let fondo;
let velocidadFondo = 2;
let musicaActiva = true;
let esActivos = true;
let musicVolume = 1;
let effectsVolume = 1;
let lastMusicVolume = musicVolume;
let lastEffectsVolume = effectsVolume;
let tiempo = 0;
let intervaloTiempo = null;
let contadorActivo = false;
let bossHP = 3000;

const menuBoton = document.getElementById("menuBoton");
const menuDiv = document.getElementById("menu-div");
const reanudarBoton = document.getElementById("reanudarBoton");
const reintentarBoton = document.getElementById("reintentarBoton");
const inicioBoton = document.getElementById("inicioBoton");
const cfg = document.getElementById("cfg");
const cfgDiv = document.getElementById("cfg-div");
const esBoton = document.getElementById("esBoton");
const musicaBoton = document.getElementById("musicaBoton");
const atrasBoton = document.getElementById("atrasBoton");
const audio = document.getElementById("audio");
const audioDisparo = document.getElementById("audioDisparo");
const musicSlider = document.getElementById("musicVolume");
const effectsSlider = document.getElementById("effectsVolume");
const musicValue = document.getElementById("musicValue");
const effectsValue = document.getElementById("effectsValue");
const pantallaDeCarga = document.getElementById("loading");

function iniciarContador() {
  if (contadorActivo) return;

  contadorActivo = true;
  intervaloTiempo = setInterval(() => {
    tiempo++;

    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    const formato = minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
    document.getElementById("tiempo").textContent = "Tiempo: " + formato;
  }, 1000);
}

function pausarContador() {
  clearInterval(intervaloTiempo);
  contadorActivo = false;
}

musicSlider.value = musicVolume;
musicValue.innerText = Math.round(musicVolume * 100) + "%";

effectsSlider.value = effectsVolume;
effectsValue.innerText = Math.round(effectsVolume * 100) + "%";

audio.volume = musicVolume;

musicSlider.addEventListener("input", (e) => {
  musicVolume = parseFloat(e.target.value);
  musicValue.innerText = Math.round(musicVolume * 100) + "%";
  audio.volume = musicVolume;
});

effectsSlider.addEventListener("input", (e) => {
  effectsVolume = parseFloat(e.target.value);
  effectsValue.innerText = Math.round(effectsVolume * 100) + "%";
});

function playEffect(audioElement) {
  if (!audioElement) return;
  const clone = audioElement.cloneNode();
  clone.volume = effectsVolume;
  clone.play();
}

const originalGameConstructor = Phaser.Game;
Phaser.Game = function (config) {
  gameInstance = new originalGameConstructor(config);
  return gameInstance;
};

menuBoton.addEventListener("click", () => {
  pausarContador();
  menuDiv.style.display = "flex";

  const activeScene = gameInstance.scene.getScenes(true)[0];
  activeScene.scene.pause();
});

reintentarBoton.addEventListener("click", () => {
  window.location.reload();
});

reanudarBoton.addEventListener("click", () => {
  menuDiv.style.display = "none";

  const pausedScene = gameInstance.scene
    .getScenes(false)
    .find((s) => s.sys.isPaused());

  if (pausedScene) pausedScene.scene.resume();
  iniciarContador();
});

inicioBoton.addEventListener("click", () => {
  window.location.href = "../html/inicio.html";
});

cfg.addEventListener("click", () => {
  cfgDiv.style.display = "flex";
  menuDiv.style.display = "none";
});

esBoton.addEventListener("click", () => {
  if (esActivos) {
    lastEffectsVolume = effectsVolume;
    esBoton.src = "../imgs/Boton No Audio.png";
    esBoton.classList.add("esBotonMuteado");
    esBoton.classList.remove("esBoton");
    effectsSlider.value = 0;
    effectsValue.innerText = "0%";
    effectsVolume = 0;
  } else {
    esBoton.src = "../imgs/Boton Audio.png";
    esBoton.classList.add("esBoton");
    esBoton.classList.remove("esBotonMuteado");
    effectsSlider.value = lastEffectsVolume;
    effectsValue.innerText = Math.round(lastEffectsVolume * 100) + "%";
    effectsVolume = lastEffectsVolume;
  }
  esActivos = !esActivos;
});

musicaBoton.addEventListener("click", () => {
  if (musicaActiva) {
    lastMusicVolume = musicVolume;
    audio.pause();
    musicaBoton.src = "../imgs/Boton No Musica.png";
    musicaBoton.classList.add("musicaBotonMuteado");
    musicaBoton.classList.remove("musicaBoton");
    musicSlider.value = 0;
    musicValue.innerText = "0%";
    musicVolume = 0;
    audio.volume = 0;
  } else {
    musicaBoton.src = "../imgs/Boton Musica.png";
    musicaBoton.classList.add("musicaBoton");
    musicaBoton.classList.remove("musicaBotonMuteado");
    musicSlider.value = lastMusicVolume;
    musicValue.innerText = Math.round(lastMusicVolume * 100) + "%";
    musicVolume = lastMusicVolume;
    audio.volume = musicVolume;
    audio.play().catch(() => {});
  }
  musicaActiva = !musicaActiva;
});

musicSlider.addEventListener("input", (e) => {
  musicVolume = parseFloat(e.target.value);
  musicValue.innerText = Math.round(musicVolume * 100) + "%";
  audio.volume = musicVolume;

  if (musicVolume === 0) {
    musicaBoton.src = "../imgs/Boton No Musica.png";
    musicaBoton.classList.add("musicaBotonMuteado");
    musicaBoton.classList.remove("musicaBoton");
    musicaActiva = false;
    audio.pause();
  } else {
    musicaBoton.src = "../imgs/Boton Musica.png";
    musicaBoton.classList.add("musicaBoton");
    musicaBoton.classList.remove("musicaBotonMuteado");
    musicaActiva = true;
    if (audio.paused) audio.play();
  }
});

effectsSlider.addEventListener("input", (e) => {
  effectsVolume = parseFloat(e.target.value);
  effectsValue.innerText = Math.round(effectsVolume * 100) + "%";

  if (effectsVolume === 0) {
    esBoton.src = "../imgs/Boton No Audio.png";
    esBoton.classList.add("esBotonMuteado");
    esBoton.classList.remove("esBoton");
    esActivos = false;
  } else {
    esBoton.src = "../imgs/Boton Audio.png";
    esBoton.classList.add("esBoton");
    esBoton.classList.remove("esBotonMuteado");
    esActivos = true;
  }
});

atrasBoton.addEventListener("click", () => {
  cfgDiv.style.display = "none";
  menuDiv.style.display = "flex";
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    const activeScene = gameInstance.scene.getScenes(true)[0];
    const pausedScene = gameInstance.scene
      .getScenes(false)
      .find((s) => s.sys.isPaused());

    if (menuDiv.style.display === "flex") {
      menuDiv.style.display = "none";
      if (pausedScene) pausedScene.scene.resume();
      iniciarContador();
    } else {
      menuDiv.style.display = "flex";
      if (activeScene) activeScene.scene.pause();
      pausarContador();
    }
  }
});

function transitionToScene(text) {
  const h1 = document.getElementById("transition-text");
  h1.textContent = text;

  h1.classList.add("show");

  setTimeout(() => {
    h1.classList.remove("show");
  }, 2000);
  return nivelActual;
}

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

    this.load.spritesheet("bossBrazoDerecho", "../imgs/bossBrazoDerecho.png", {
      frameWidth: 491,
      frameHeight: 400,
    });

    this.load.spritesheet(
      "bossBrazoIzquierdo",
      "../imgs/bossBrazoIzquierdo.png",
      {
        frameWidth: 491,
        frameHeight: 400,
      }
    );

    this.load.spritesheet("bossCabeza", "../imgs/bossCabeza.png", {
      frameWidth: 493,
      frameHeight: 286,
    });

    this.load.spritesheet("Estrella-boss", "../imgs/estrellaAtaqueBoss.png", {
      frameWidth: 95,
      frameHeight: 94,
    });

    this.load.spritesheet("Esfera-boss", "../imgs/esferaAtaqueBoss.png", {
      frameWidth: 174,
      frameHeight: 174,
    });

    this.load.spritesheet("Laser-boss", "../imgs/rayoLaserAtaqueBoss.png", {
      frameWidth: 186,
      frameHeight: 600,
    });

    this.load.image("fondo", "../imgs/Fondo.png");

    this.load.image("bala", "../imgs/bala.png");

    this.load.image("balaenem", "../imgs/balaenem.png");
  }

  create() {
    fondo = this.add.tileSprite(
      0,
      0,
      this.scale.width,
      this.scale.height,
      "fondo"
    );
    fondo.setOrigin(0, 0);

    this.player = this.physics.add
      .sprite(this.scale.width / 2, this.scale.height * 0.9, "avion1")
      .setScale(2);

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

    this.enemyShootEvent = this.time.addEvent({
      delay: 600,
      callback: this.enemyShoot,
      callbackScope: this,
      loop: true,
    });

    this.spawnEnemies();

    if (this.enemigos) {
      this.enemigos.getChildren().forEach((enemigo) => {
        this.tweens.add({
          onYoyo: () => {
            this.enemigos.incY(0.3);
          },
          onRepeat: () => {
            this.enemigos.incY(0.3);
          },
          targets: enemigo,
          x: enemigo.x + 250,
          ease: "Linear",
          duration: 2000,
          yoyo: true,
          repeat: -1,
        });
      });
    }

    this.enemyCollider = this.physics.add.overlap(
      balas,
      this.enemigos,
      this.hitEnemigo,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.balaenem,
      this.hitPlayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemigos,
      this.gameOver,
      null,
      this
    );

    pantallaDeCarga.style.display = "none";

    audio.play();

    iniciarContador();
  }

  update(time) {
    this.player.setVelocityX(0);

    fondo.tilePositionY -= velocidadFondo;

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
        tiempoBala = time + 4;
        playEffect(audioDisparo);
      }
    }

    if (this.enemigos) {
      this.enemigos.children.iterate((enemigo) => {
        if (
          enemigo &&
          enemigo.active &&
          enemigo.y - enemigo.displayHeight / 2 > this.sys.game.config.height
        ) {
          this.gameOver();
        }
      });
    }
  }

  hitEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.play("enemigo_daño");

    enemigo.once("animationcomplete-enemigo_daño", () => {
      enemigo.destroy();

      enemigosDestruidos += 10;
      puntaje.innerText = "Puntaje: " + enemigosDestruidos;

      this.enemyShootEvent.delay += 100;

      if (this.enemigos.countActive(true) === 0) {
        if (this.nextLevel === "YouWin") {
          localStorage.clear();
          localStorage.setItem("puntaje", JSON.stringify(enemigosDestruidos));
          localStorage.setItem("tiempo", JSON.stringify(tiempo));
          window.location.href = "YouWin.html";
        } else {
          transitionToScene("Nivel: " + nivelActual);
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
  gameOver() {
    localStorage.clear();
    localStorage.setItem("puntaje", JSON.stringify(enemigosDestruidos));
    localStorage.setItem("tiempo", JSON.stringify(tiempo));
    window.location.href =
      "GameOver.html?pais=" + this.pais + "&tipo=" + this.tipo;
  }
  hitPlayer(player, balaenem) {
    balaenem.destroy();
    vidas.innerText = "Vidas: " + (vidasrestantes -= 1);
    if (vidasrestantes <= 0) {
      this.gameOver();
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
    this.nextLevel = "Level3";
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
    nivelActual = 3;

    this.enemyShootEvent = this.time.addEvent({
      delay: 600,
      callback: this.enemyShoot,
      callbackScope: this,
      loop: true,
    });

    this.enemigos.getChildren().forEach((enemigo) => {
      this.tweens.add({
        onYoyo: () => {
          this.enemigos.incY(0.01);
        },
        onRepeat: () => {
          this.enemigos.incY(0.01);
        },
        targets: enemigo,
        x: enemigo.x + 100,
        ease: "Linear",
        duration: 2000,
        yoyo: true,
        repeat: -1,
      });
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

    this.balasBoss = this.physics.add.group();
    this.ataqueActivo = false;

    this.bossHead = this.bossGroup
      .getChildren()
      .find((p) => p.texture.key === "bossCabeza");
    this.bossBrazoDerecho = this.bossGroup
      .getChildren()
      .find((p) => p.texture.key === "bossBrazoDerecho");
    this.bossBrazoIzquierdo = this.bossGroup
      .getChildren()
      .find((p) => p.texture.key === "bossBrazoIzquierdo");

    if (this.enemyCollider) {
      this.physics.world.removeCollider(this.enemyCollider);
    }

    this.time.addEvent({
      delay: 1000,
      callback: this.tryEstrella,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.tryEsfera,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.tryLaser,
      callbackScope: this,
      loop: true,
    });

    const animacionesBoss = [
      {
        key: "bossBrazoDerecho-Ataque-1",
        sprite: "bossBrazoDerecho",
        start: 0,
        end: 6,
        repeat: 0,
        frameRate: 10,
      },
      {
        key: "bossBrazoDerecho-Ataque-1-1",
        sprite: "bossBrazoDerecho",
        start: 6,
        end: 12,
        repeat: 0,
        frameRate: 10,
      },
      {
        key: "bossBrazoDerecho-Ataque-1-Aviso",
        sprite: "bossBrazoDerecho",
        start: 13,
        end: 14,
        repeat: 2,
        frameRate: 5,
      },
      {
        key: "bossBrazoDerecho-Ataque-2",
        sprite: "bossBrazoDerecho",
        start: 28,
        end: 30,
        repeat: -1,
        frameRate: 10,
      },
      {
        key: "bossBrazoDerecho-Ataque-2-2",
        sprite: "bossBrazoDerecho",
        start: 31,
        end: 33,
        repeat: -1,
        frameRate: 10,
      },
      {
        key: "bossBrazoDerecho-Ataque-2-Aviso",
        sprite: "bossBrazoDerecho",
        start: 42,
        end: 43,
        repeat: -1,
        frameRate: 10,
      },

      {
        key: "bossBrazoIzquierdo-Ataque-1",
        sprite: "bossBrazoIzquierdo",
        start: 0,
        end: 6,
        repeat: 0,
        frameRate: 10,
      },
      {
        key: "bossBrazoIzquierdo-Ataque-1-1",
        sprite: "bossBrazoIzquierdo",
        start: 6,
        end: 12,
        repeat: 0,
        frameRate: 10,
      },
      {
        key: "bossBrazoIzquierdo-Ataque-1-Aviso",
        sprite: "bossBrazoIzquierdo",
        start: 13,
        end: 14,
        repeat: 2,
        frameRate: 5,
      },
      {
        key: "bossBrazoIzquierdo-Ataque-2",
        sprite: "bossBrazoIzquierdo",
        start: 28,
        end: 30,
        repeat: -1,
        frameRate: 10,
      },
      {
        key: "bossBrazoIzquierdo-Ataque-2-2",
        sprite: "bossBrazoIzquierdo",
        start: 31,
        end: 33,
        repeat: -1,
        frameRate: 10,
      },
      {
        key: "bossBrazoIzquierdo-Ataque-2-Aviso",
        sprite: "bossBrazoIzquierdo",
        start: 42,
        end: 43,
        repeat: -1,
        frameRate: 10,
      },

      {
        key: "bossCabeza-Idle",
        sprite: "bossCabeza",
        start: 0,
        end: 5,
        repeat: -1,
        frameRate: 10,
      },

      {
        key: "bossCabeza-Ataque1",
        sprite: "bossCabeza",
        start: 11,
        end: 21,
        repeat: 0,
        frameRate: 10,
      },

      {
        key: "bossCabeza-Idle-Ataque2",
        sprite: "bossCabeza",
        start: 22,
        end: 29,
        repeat: 0,
        frameRate: 10,
      },

      {
        key: "bossCabeza-Idle-Ataque3",
        sprite: "bossCabeza",
        start: 33,
        end: 34,
        repeat: -1,
        frameRate: 10,
      },
    ];

    this.anims.create({
      key: "estrella_anim",
      frames: this.anims.generateFrameNumbers("Estrella-boss", {
        start: 0,
        end: 8,
      }),
      frameRate: 6,
      repeat: 0,
      frameRate: 10,
    });

    this.anims.create({
      key: "esfera_anim",
      frames: this.anims.generateFrameNumbers("Esfera-boss", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: "laser_apareciendo",
      frames: this.anims.generateFrameNumbers("Laser-boss", {
        start: 0,
        end: 9,
      }),
      frameRate: 20,
      repeat: 0,
      frameRate: 10,
    });

    this.anims.create({
      key: "laser_encendido",
      frames: this.anims.generateFrameNumbers("Laser-boss", {
        start: 10,
        end: 11,
      }),
      frameRate: 15,
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: "laser_apagado",
      frames: this.anims.generateFrameNumbers("Laser-boss", {
        start: 8,
        end: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });

    animacionesBoss.forEach(({ key, sprite, start, end, repeat, frameRate }) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(sprite, { start, end }),
        frameRate: frameRate,
        repeat: repeat,
      });
    });

    this.bossArms.forEach((brazo, i) => {
      this.tweens.add({
        targets: brazo,
        y: brazo.y - 20,
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });
    });

    this.physics.add.overlap(balas, this.bossGroup, this.hitBoss, null, this);
  }

  spawnEnemies() {
    this.bossGroup = this.physics.add.group();

    const centerX = this.scale.width / 2;
    const topY = 100;

    const cabeza = this.bossGroup
      .create(centerX, topY, "bossCabeza")
      .setDepth(2)
      .setScale(1.25);

    const brazoDerecho = this.bossGroup
      .create(centerX - 440, 200, "bossBrazoIzquierdo")
      .setDepth(1);

    const brazoIzquierdo = this.bossGroup
      .create(centerX + 440, 200, "bossBrazoDerecho")
      .setDepth(1);

    this.bossParts = [brazoDerecho, brazoIzquierdo, cabeza];
    this.bossArms = [brazoDerecho, brazoIzquierdo];

    cabeza.play("bossCabeza-Idle");
  }

  tryEstrella() {
    if (this.ataqueActivo) return;
    const chance = Math.random();
    if (chance <= 0.3) {
      this.ataqueEstrella();
    }
  }

  tryEsfera() {
    if (this.ataqueActivo) return;
    const chance = Math.random();
    if (chance <= 0.7) {
      this.ataqueActivo = true;
      this.bossArms[1].play("bossBrazoDerecho-Ataque-1-Aviso");
      this.bossArms[0].play("bossBrazoIzquierdo-Ataque-1-Aviso");
      this.bossBrazoIzquierdo.once(
          "bossBrazoIzquierdo-Ataque-1-Aviso",
          () => {
        this.ataqueEsfera();
      });
    }
  }

  tryLaser() {
    const chance = Math.random();
    if (chance <= 0.1) {
      this.ataqueEsfera();
    }
  }

  ataqueEstrella() {
    this.ataqueActivo = true;
  
    const brazoIzq = this.bossArms[0];
    const brazoDer = this.bossArms[1];
    const velocidad = 300;
  
    const angulosGrados = [90, 135, 45];
  
    const salidaIzq = {
      x: brazoIzq.x + brazoIzq.displayWidth * 0.27,
      y: brazoIzq.y + brazoIzq.displayHeight * 0.5,
    };
  
    const salidaDer = {
      x: brazoDer.x - brazoDer.displayWidth * 0.2,
      y: brazoDer.y + brazoDer.displayHeight * 0.5,
    };
  
    const dispararDesde = (x, y) => {
      angulosGrados.forEach((grados) => {
        const rad = Phaser.Math.DegToRad(grados);
        const bala = this.balasBoss.get(x, y, "Estrella-boss");
  
        if (bala) {
          bala.setActive(true);
          bala.setVisible(true);
          bala.play("estrella_anim");
  
          bala.body.velocity.x = Math.cos(rad) * velocidad;
          bala.body.velocity.y = Math.sin(rad) * velocidad;
        
        }
      });
      this.ataqueActivo = false;
    };
  
    dispararDesde(salidaIzq.x, salidaIzq.y);
    dispararDesde(salidaDer.x, salidaDer.y);
  }  

  ataqueEsfera() {
    if (this.ataqueActivo) return;
    this.ataqueActivo = true;

    const rightX1 =
      this.bossBrazoDerecho.x -
      this.bossBrazoDerecho.displayWidth / 2 +
      this.bossBrazoDerecho.displayWidth * 0.63;

    const leftX1 =
      this.bossBrazoIzquierdo.x -
      this.bossBrazoIzquierdo.displayWidth / 2 +
      this.bossBrazoIzquierdo.displayWidth * 0.36;

    this.dispararDesde(rightX1, this.bossBrazoDerecho.y + 50);
    this.dispararDesde(leftX1, this.bossBrazoIzquierdo.y + 50);
  }

  dispararDesde(x, y) {
    this.bossBrazoDerecho.play("bossBrazoDerecho-Ataque-1");
    this.bossBrazoIzquierdo.play("bossBrazoIzquierdo-Ataque-1");

    this.bossBrazoIzquierdo.once(
      "animationcomplete-bossBrazoIzquierdo-Ataque-1",
      () => {
        const bala = this.balasBoss.get(x, y, "Esfera-boss");
        if (bala) {
          bala.setActive(true);
          bala.setVisible(true);
          bala.setScale(0.5);
          bala.play("esfera_anim");

          this.bossBrazoDerecho.play("bossBrazoDerecho-Ataque-1-1");
          this.bossBrazoIzquierdo.play("bossBrazoIzquierdo-Ataque-1-1");

          const velocidadInicial = 200;
          bala.body.velocity.x = 0;
          bala.body.velocity.y = velocidadInicial;

          this.time.delayedCall(400, () => {
            if (!bala.active || !this.player) return;

            const angle = Phaser.Math.Angle.Between(
              bala.x,
              bala.y,
              this.player.x,
              this.player.y
            );
            const velocidadFinal = 400;

            bala.body.velocity.x = Math.cos(angle) * velocidadFinal;
            bala.body.velocity.y = Math.sin(angle) * velocidadFinal;
          });
        }
      }
    );
  }
  ataqueLaser() {
    if (!this.bossHead) return;

    const headLeft = this.bossHead.x - this.bossHead.displayWidth / 2;
    const x_head_50 = headLeft + this.bossHead.displayWidth * 0.5;
    const yHead = this.bossHead.y + this.bossHead.displayHeight * 0.5;

    const laser = this.balaenem.get(x_head_50, yHead, "Laser-boss");
    if (laser) {
      laser.setActive(true);
      laser.setVisible(true);
      laser.setScale(1.0);
      laser.body.velocity.x = 0;
      laser.body.velocity.y = 500;

      laser.body.setSize(laser.width, laser.height, true);
      this.time.delayedCall(1500, () => {
        if (laser && laser.active) laser.destroy();
      });
    }
  }

  hitBoss(bala, parte) {
    bala.destroy();

    bossHP--;
    vidaBoss.innerText = "Vida del boss: " + bossHP;

    if (bossHP <= 0) {
      this.bossGroup.getChildren().forEach((p) => p.destroy());
      this.bossGroup.clear(true, true);
      enemigosDestruidos += 500;
      puntaje.innerText = "Puntaje: " + enemigosDestruidos;

      localStorage.clear();
      localStorage.setItem("puntaje", JSON.stringify(enemigosDestruidos));
      localStorage.setItem("tiempo", JSON.stringify(tiempo));
      window.location.href = "YouWin.html";
    }
  }

  enemyShoot() {}
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [Level1, Level2, Level3],
};

new Phaser.Game(config);
