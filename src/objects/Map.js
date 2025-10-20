import assetManager from "../utils/assetManager.js";
import { tileSize } from "../../configs.js";

export class Map {
    constructor(content) {

        this.content = content;
    }
    get mapSize() {
        return [this.content[0].length, this.content.length]
    }
    get GameObject() {
        return {

            displayWidth: this.mapSize[0] * tileSize,

            displayHeight: this.mapSize[1] * tileSize
        }
    }
    render(game) {

        let posY = 0;

        game.tileMap = [];

        for (let row of this.content) {
            game.tileMap[posY] = [];

            let posX = 0;

            for (let tileIndex of row) {
                let tile = game.add.image(posX * tileSize, posY * tileSize, assetManager.fileNames[tileIndex]);

                tile.setOrigin(0)

                tile.setScale(50 / tile.displayWidth);

                game.tileMap[posY][posX] = tile;

                posX += 1;
            }
            posY += 1;
        }
    }
}



export function defaultMap() {
    let content = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return new Map(content);
}

