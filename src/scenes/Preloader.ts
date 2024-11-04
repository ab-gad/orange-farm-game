import { Scene } from "phaser";

export class Preloader extends Scene {
    private backgroundImage!: Phaser.GameObjects.Image;
    private loading!: Phaser.GameObjects.Image;
    private orangeFarm!: Phaser.GameObjects.Image;
    private house!: Phaser.GameObjects.Image;

    enterTweens() {
        this.tweens.add({
            targets: this.orangeFarm,
            x: 650, // Target x-coordinate
            alpha: 1, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
        });
        this.tweens.add({
            targets: this.house,
            x: 300, // Target x-coordinate
            alpha: 1, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
        });
        this.tweens.add({
            targets: this.loading,
            alpha: 1, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
        });
    }

    leaveTweens() {
        this.tweens.add({
            targets: this.orangeFarm,
            x: this.scale.width + 500, // Target x-coordinate
            alpha: 0.5, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
            onCompleteHandler: () => { },
        });
        this.tweens.add({
            targets: this.house,
            x: -500, // Target x-coordinate
            alpha: 0.5, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
        });

        this.tweens.add({
            targets: this.loading,
            alpha: 0, // Fade-in to full opacity
            duration: 500,
            ease: "Power1",
        });
    }

    private scaleImagesRelativeTo(
        object: Phaser.GameObjects.Image,
        scaleWidth: number = this.scale.width,
        preserveRatio: boolean = true
    ) {
        preserveRatio
            ? object.setScale(scaleWidth / this.backgroundImage.width)
            : object.setScale(
                scaleWidth / this.backgroundImage.width,
                this.scale.height / this.backgroundImage.height
            );
    }

    constructor() {
        super("Preloader");
    }

    init() {
        // We loaded this image in our Boot Scene, so we can display it here
        this.backgroundImage = this.add.image(0, 0, "background");
        this.loading = this.add.image(512, 500, "loading");
        this.house = this.add.image(0, 250, "house");
        this.orangeFarm = this.add.image(this.scale.width, 290, "orangeFarm");

        this.orangeFarm.setAlpha(0.5);
        this.house.setAlpha(0.5);
        this.loading.setAlpha(0.5);

        // this.slideHouseTween.play();
        // this.slideOrangeFarmTween.play();

        // Scale the image to fit the game canvas
        this.scaleImagesRelativeTo(this.backgroundImage, undefined, false);
        this.scaleImagesRelativeTo(this.loading, 700);
        this.scaleImagesRelativeTo(this.house, 1700);
        this.scaleImagesRelativeTo(this.orangeFarm, 1200);

        // Center the image on the screen
        this.backgroundImage.x = this.scale.width / 2;
        this.backgroundImage.y = this.scale.height / 2;

        this.enterTweens();

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 600, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 600, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            setTimeout(() => {
                bar.width = 4 + 460 * progress;
            }, 500);
        });
    }

    preload() {
        // load remote assets
        this.load.image(
            "Codey",
            "https://content.codecademy.com/courses/learn-phaser/codey.png"
        );

        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        // Load images
        this.load.image("ob-1", "images/object-1.png");
        this.load.image("ob-2", "images/object-2.png");
        this.load.image("ob-3", "images/object-3.png");
        this.load.image("ob-4", "images/object-4.png");
        this.load.image("ob-5", "images/object-5.png");
        this.load.image("ob-6", "images/object-6.png");
        this.load.image("cursor", "images/cursor.png");
        this.load.image("farm", "images/farm.png");
        this.load.image("finish", "images/finish.png");
        this.load.image("startBtn", "images/start-button.png");
        this.load.image("startText", "images/start-text.png");
        this.load.image("seed", "images/seed.png");
        this.load.image("plant1", "images/p-1.png");
        this.load.image("plant2", "images/p-2.png");
        this.load.image("plant3", "images/p-3.png");

        // Load Audio files
        this.load.audio("complete", "audio/complete.mp3");
        this.load.audio("fail", "audio/fail.wav");
        this.load.audio("inGameSound", "audio/in-game-sound.mp3");
        this.load.audio("success", "audio/success.mp3");
    }

    create() {
        this.leaveTweens();
        setTimeout(() => {
            this.scene.start("MainMenu");
        }, 500);
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    }
}
