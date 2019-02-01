module.exports = class Binggo {
    constructor (size) {
        this.size = (!size) ? 3 : size;
        this.board = [[]];
    }

    generate () {
        this.board = [[1,2,3], [4,5,6], [7,8,9]];
        return this;
    }

    getBoard () {
        return this.board;
    }

    getSize () {
        return this.size;
    }
}