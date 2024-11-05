import { Scene } from 'phaser';

export class WellDone extends Scene {
    backgroundImage: Phaser.GameObjects.Image;
    finish: Phaser.GameObjects.Image;

    constructor() {
        super('WellDone');
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

        this.finish = this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, "finish").setScale(0.1).setAlpha(0.5);
        this.createGrowTween(this.finish, this.scale.width * .45 / this.finish.width)
        // this.scaleImagesRelativeTo(this.finish, this.scale.width * .45);





        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }

    createGrowTween(image: Phaser.GameObjects.Image, scale: number) {
        return this.tweens.add({
            targets: image,
            alpha: 1,
            scale: scale, // Grow to original size
            ease: 'Cubic.easeInOut',
            duration: 500, // Duration in ms
        });
    }
}
