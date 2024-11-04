import { Scene } from 'phaser';

export class MainMenu extends Scene {
    private backgroundImage!: Phaser.GameObjects.Image;
    private orangeFarm!: Phaser.GameObjects.Image;
    private farm!: Phaser.GameObjects.Image;
    private startBtn!: Phaser.GameObjects.Image;
    private startText!: Phaser.GameObjects.Image;
    private seed!: Phaser.GameObjects.Image;
    private mudGround!: Phaser.GameObjects.Image;
    private inGameSound!: Phaser.Sound.BaseSound;


    constructor() {
        super('MainMenu');
    }

    private scaleImagesRelativeTo(
        object: Phaser.GameObjects.Image,
        scaleWidth: number = this.scale.width,
        preserveRatio: boolean = true
    ) {
        preserveRatio
            ? object.setScale(scaleWidth / object.width)
            : object.setScale(
                scaleWidth / object.width,
                this.scale.height / object.height
            );
    }

    create() {
        this.backgroundImage = this.add.image(0, 0, "background");

        this.scaleImagesRelativeTo(this.backgroundImage, undefined, false);
        // Center the image on the screen
        this.backgroundImage.x = this.scale.width / 2;
        this.backgroundImage.y = this.scale.height / 2;

        this.inGameSound = this.sound.add('inGameSound');
        this.inGameSound.play({ loop: true, volume: 0.01 })

        this.farm = this.add.image(this.scale.width * 0.30, this.scale.height * 0.5, "farm").setScale(0.1).setAlpha(0.5);
        this.orangeFarm = this.add.image(this.scale.width * 0.75, 200, "orangeFarm").setScale(0.1).setAlpha(0.5);
        this.startText = this.add.image(this.scale.width * 0.75, this.scale.height * 0.55, "startText").setScale(0.1).setAlpha(0.5);

        this.seed = this.add.image(this.scale.width * 0.7, this.scale.height * 0.75, "seed").setScale(0.1).setAlpha(0.5);
        this.mudGround = this.add.image(this.scale.width * 0.80, this.scale.height * 0.75, "mudGround").setScale(0.1).setAlpha(0.5);

        this.startBtn = this.add.image(this.scale.width * 0.5, this.scale.height * 0.85, "startBtn").setScale(0.1).setAlpha(0.5).setInteractive();


        this.createGrowthTween(this.orangeFarm, (this.scale.width * .5) / this.orangeFarm.width);
        this.createGrowthTween(this.farm, (this.scale.width * .55) / this.farm.width);
        this.createGrowthTween(this.seed, (this.scale.width * .15) / this.seed.width);
        this.createGrowthTween(this.mudGround, (this.scale.width * .12) / this.mudGround.width);
        this.createGrowthTween(this.startBtn, (this.scale.width * .15) / this.startBtn.width);
        this.createGrowthTween(this.startText, (this.scale.width * .4) / this.startText.width);

        this.createHoverAnimation(this.startBtn, (this.scale.width * .15) / this.startBtn.width);

        this.startBtn.on('pointerup', () => {
            this.scene.start('Game');
        });
    }

    createGrowthTween(image: Phaser.GameObjects.Image, scale: number) {
        return this.tweens.add({
            targets: image,
            alpha: 1,
            scale: scale, // Grow to original size
            ease: 'bounce.out', // Bouncy easing
            duration: 1000, // Duration in ms
        });
    }

    private createHoverAnimation(image: Phaser.GameObjects.Image, originalScale: number) {
        const hoverTween = this.tweens.add({
            targets: image,
            scale: originalScale * 1.1,
            ease: 'power2',
            duration: 400,
            yoyo: true,
            repeat: -1
        }).pause();

        const hoverOutTween = this.tweens.add({
            targets: image,
            scale: originalScale,
            ease: 'power2',
            duration: 500,
            repeat: 0
        }).pause();

        image.on('pointerover', () => {
            hoverTween.play();
            hoverOutTween.pause();
        });

        image.on('pointerout', () => {
            hoverOutTween.play();
            hoverTween.pause();
        });
    }
}
