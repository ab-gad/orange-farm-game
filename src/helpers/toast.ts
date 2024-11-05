import Phaser from 'phaser';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

export class Toast extends Phaser.GameObjects.Container {
    private textObject: Phaser.GameObjects.Text;
    private background: RoundRectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, message: string, type: 'success' | 'failure') {
        super(scene, x, y);

        // Background
        const backgroundColor = type === 'success' ? 0x32CD32 : 0xFFC324;
        this.background = new RoundRectangle(this.scene, 0, 0, 500, 60, 15, backgroundColor);
        this.add(this.background);

        // Text
        const textColor = '#FFFFFF';
        this.textObject = this.scene.add.text(0, 0, message, {
            fontSize: '18px',
            color: textColor,
            align: 'center',
            fontStyle: 'bold'
        });
        this.add(this.textObject);

        // Center content
        this.textObject.setPosition(-this.textObject.width * .5, -this.textObject.height * .5);

        // Set depth
        this.setDepth(999); // Ensure toast appears above other elements

        // Animate appearance
        this.alpha = 0;
        this.scaleX = 0.5;
        this.scaleY = 0.5;

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'back.out'
        });

        // Auto-remove after 3 seconds
        this.scene.time.delayedCall(2000, () => {
            this.destroyToast();
        }, [], this);
    }

    private destroyToast() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 200,
            ease: 'back.in',
            onComplete: () => {
                this.destroy(true);
            }
        });
    }
}
