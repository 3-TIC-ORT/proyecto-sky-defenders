export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        // Fondo con scroll
        this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

        // Jugador
        this.player = this.physics.add.sprite(400, 500, 'ship');
        this.player.setCollideWorldBounds(true);

        // Animaciones
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ship', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.anims.play('idle');

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Mover el fondo
        this.background.tilePositionY -= 2;

        // Resetea velocidad
        this.player.setVelocityX(0);

        // Movimiento lateral
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else {
            this.player.anims.play('idle', true);
        }
    }
}
