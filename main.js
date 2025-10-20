var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000050,
    physics: {
        default: 'arcade',
    },
    dom: {
        createContainer: true
    },
    scene: [
        StartScene, GameStage, Lab
    ]
  };

import GameStage from "./src/scenes/GameStage.js";
import StartScene from "/src/scenes/StartScene.js";
import Lab from "./scenes/Lab/Lab.js";

document.game = new Phaser.Game(config);
