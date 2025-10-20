export default {
    fileURLs: [
        "assets/tiles/tile1.png",
        "assets/sprites/GreenSmile.png"
    ]
    ,
    fileNames: [
        "tile1",
        "greeny"
    ],
    getURLByName(name) {
        let index = this.fileName.indexOf(name);
        if (!index) throw new Error(`the name ${name} is not in the file list!`);
        return this.fileUrl[index]
    },
    preloadAll(game) {
        for (let c = 0; c < this.fileURLs.length; c++) {
            game.load.image(this.fileNames[c], this.fileURLs[c]);
        }
    }
}
