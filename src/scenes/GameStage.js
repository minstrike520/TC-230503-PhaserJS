import { cursorScrollFactor } from "../../configs.js"
import { Map, defaultMap } from "../objects/Map.js";
import { minimalZoom, zoomFactor } from "../../configs.js";
import assetManager from "../utils/assetManager.js";
import ui from "../objects/ui.js";
import SpriteContainer from "../objects/SpriteContainer.js";
import spriteAddPanel from "../objects/spriteAddPanel.js";

export function zoomCamera(game, deltaY, nonScalable) {
    if (!(game.cameras.main.zoom >= minimalZoom || deltaY < 0)) return;

    let original = game.cameras.main.zoom;
    let zoom = game.cameras.main.zoom - deltaY * zoomFactor;
    let multiplier = zoom / original;
    game.cameras.main.setZoom(zoom);

    for (let gameObject of nonScalable)
        gameObject.setScale(gameObject.scale / multiplier)
    console.log(game.inGameUI.getBounds().x)
}

export default class GameStage extends Phaser.Scene {
    constructor() {
        super("gameStage");
        // document.gamestage = this;
    }
    preload() {
        this.load.image('sprite1', 'assets/sprites/GreenSmile.png');
        assetManager.preloadAll(this);
    }
    create() {
        this.tileMap = defaultMap();
        this.cameras.main.setZoom(2).setOrigin(0);
        this.inGameUI = ui(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sprites = new SpriteContainer(this);
        this.panel = spriteAddPanel(this, this.sprites);
        this.nonScalable = [this.inGameUI, this.panel];
        this.input.on('wheel',
            (pointer, gameObjects, deltaX, deltaY, deltaZ) => zoomCamera(this, deltaY, this.nonScalable)
        );
    }
    update() {
        let cameraMain = this.cameras.main;
        let bottomRight = [cameraMain.scrollX + cameraMain.displayWidth, cameraMain.scrollY + cameraMain.displayHeight]

        //this.inGameUI.setPosition(cameraMain.scrollX,cameraMain.scrollY);

        function cursorsBinding(game) {
            if (game.cursors.left.isDown) {
                cameraMain.scrollX -= cursorScrollFactor;
            }
            else if (game.cursors.right.isDown) {
                cameraMain.scrollX += cursorScrollFactor;
            }
            if (game.cursors.up.isDown) {
                cameraMain.scrollY -= cursorScrollFactor;
            }
            else if (game.cursors.down.isDown) {
                cameraMain.scrollY += cursorScrollFactor;
            }
        }; cursorsBinding(this);

        this.txt.setText(
            [
                `TopLeft: ${Math.floor(cameraMain.scrollX)}, ${Math.floor(cameraMain.scrollY)}`,
                `BottomRight: ${Math.floor(bottomRight[0])}, ${Math.floor(bottomRight[1])}`,
            ])
        //console.log(this.inGameUI.list[0].x, this.inGameUI.x)
    }
}
[
    "scrollX",
    "displayWidth",
    "zoom"

]

