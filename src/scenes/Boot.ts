import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/images/background.png');
        this.load.image('loading', 'assets/images/loading.png');
        this.load.image('orangeFarm', 'assets/images/orange-farm.png');
        this.load.image('house', 'assets/images/house.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}

