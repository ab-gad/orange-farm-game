import { Scene } from 'phaser';
import { Toast } from '../helpers/toast';

export class Game extends Scene {
    private backgroundImage!: Phaser.GameObjects.Image;
    private farm!: Phaser.GameObjects.Image;
    private objectsNames = ['ob-1', 'seed', 'ob-2', 'seed', 'ob-3', 'ob-4', 'seed', 'ob-5'];
    private objects: Phaser.GameObjects.Image[] = [];
    private success!: Phaser.Sound.BaseSound;
    private fail!: Phaser.Sound.BaseSound;
    private complete!: Phaser.Sound.BaseSound;
    private readonly requiredPlants = 3;
    private numOfPlants = 0;

    private dropZones = [
        { x: 537, y: 596, radius: 20, isEmpty: true },
        { x: 591, y: 568, radius: 20, isEmpty: true },
        { x: 642, y: 537, radius: 20, isEmpty: true },
        { x: 594, y: 625, radius: 20, isEmpty: true },
        { x: 650, y: 596, radius: 20, isEmpty: true },
        { x: 698, y: 568, radius: 20, isEmpty: true },
    ];

    constructor() {
        super('Game');
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
        this.success = this.sound.add('success');
        this.fail = this.sound.add('fail');
        this.complete = this.sound.add('complete');

        this.backgroundImage = this.add.image(0, 0, "background");

        this.scaleImagesRelativeTo(this.backgroundImage, undefined, false);

        // Center the image on the screen
        this.backgroundImage.x = this.scale.width / 2;
        this.backgroundImage.y = this.scale.height / 2;

        this.farm = this.add.image(this.scale.width * 0.30, this.scale.height * 0.5, "farm");
        this.scaleImagesRelativeTo(this.farm, this.scale.width * .55)

        this.createSlidTween(this.farm, (this.scale.width * .55 / this.farm.width) * 1.7)

        this.objectsNames.forEach((name, index) => {
            const x = index < 4 ? 220 + 50 * index : 275 + 50 * (index - 4);
            const y = index < 4 ? 475 - 25 * index : 510 - 29 * (index - 4)

            const obj = this.add.image(x, y, name)
                .setScale(0.01)
                .setAlpha(0)
                .setInteractive({ draggable: true })
                .setData({ type: name === 'seed' ? 'seed' : 'obj', originX: x, originY: y });
            this.objects.push(obj);
            this.createGrowTween(obj, 0.03);
            obj.on('drag', (_: any, dragX: number, dragY: number) => {
                obj.x = dragX;
                obj.y = dragY;
            });
            obj.on('pointerup', () => {
                this.checkDropZone(obj);
            });
        })

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

    createSlidTween(image: Phaser.GameObjects.Image, scale: number) {
        return this.tweens.add({
            targets: image,
            x: this.scale.width * .5,
            y: this.scale.height * .5,
            scale: scale, // Grow to original size
            ease: 'Cubic.easeInOut',
            duration: 1000, // Duration in ms
        });
    }
    moveObjToItsOriginalPlace(obj: Phaser.GameObjects.Image) {
        return this.tweens.add({
            targets: obj,
            x: obj.getData('originX'),
            y: obj.getData('originY'),
            ease: 'Cubic.easeInOut',
            duration: 500, // Duration in ms
        });
    }
    createGrowTween(image: Phaser.GameObjects.Image, scale: number) {
        return this.tweens.add({
            targets: image,
            alpha: 1,
            scale: scale, // Grow to original size
            ease: 'Cubic.easeInOut',
            duration: 500, // Duration in ms
            delay: 900, // Duration in ms
        });
    }

    checkDropZone(obj: Phaser.GameObjects.Image) {
        if (obj.getData('type') !== 'seed') {
            const failToast = new Toast(this, this.scale.width * .5, this.scale.height * .9, "لم تختر البذرة!.. حاول مرة اخري", 'failure');
            this.add.existing(failToast);
            this.moveObjToItsOriginalPlace(obj);
            this.fail.play({ volume: 0.01 });
            return;
        };
        let success = false;
        this.dropZones.forEach((zone) => {
            const distance = Phaser.Math.Distance.BetweenPoints(obj, zone);
            if (zone.isEmpty && distance <= zone.radius) {
                success = true;
                this.success.play({ volume: 0.01 });
                this.handleDrop(obj, zone);
                return;
            }
        });
        if (!success) {
            const failToast = new Toast(this, this.scale.width * .5, this.scale.height * .9, "لابد من وضع البذرة في المكان المناسب", 'failure');
            this.add.existing(failToast);
            this.moveObjToItsOriginalPlace(obj);
            this.fail.play({ volume: 0.01 });
        }
    }

    handleDrop(seed: Phaser.GameObjects.Image, zone: { x: number, y: number, isEmpty: boolean }) {
        const successToast = new Toast(this, this.scale.width * .5, this.scale.height * .9, "احسنت !", 'success');
        this.add.existing(successToast);

        this.numOfPlants += 1;
        zone.isEmpty = false;

        seed.destroy();
        const plant = this.add.image(zone.x, zone.y - 15, 'plant1')
            .setScale(0.01)
            .setDepth(1);

        this.tweens.add({
            targets: plant,
            scale: 0.04,
            duration: 1000,
            ease: 'back.out',
            onComplete: () => {
                if (this.numOfPlants >= this.requiredPlants) {
                    this.complete.play({ volume: 0.01 })
                    this.scene.start('WellDone');
                }
            }
        });
    }
}
