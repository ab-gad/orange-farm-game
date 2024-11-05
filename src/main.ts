import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { WellDone } from './scenes/WellDone';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '##B7C827',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        WellDone,
    ],
    plugins: {
        global: [{
            key: 'rexRoundRectanglePlugin',
            plugin: RoundRectanglePlugin,
            start: true
        }]
    }
};
export default new Game(config);