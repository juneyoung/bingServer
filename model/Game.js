const Player = require('./Player');
const PlayerQueue = require('./PlayerQueue');
const RandomString = require('randomstring');

// export default 안됨. import 구문 사용 불가  
module.exports = class Game {
    constructor (rows, max, winRows) {
        this.gameId = RandomString.generate();
        this.queue = new PlayerQueue();
        this.turn = 0;
        this.created = new Date();
        this.committed = [];    // 입력된 숫자의 배열
        this.minNum = 1;

        this.rows = (!rows) ? 3: rows;
        this.maxNum = (!max) ? 12 : max;
        this.winRows = (!winRows) ? 3 : winRows;
    }

    join (player) {
        if(queue.indexOf(player) > -1) throw `${player} is already in the game`;
        this.queue.join(player);
    }

    leave (Player) {
        if(queue.indexOf(player) > -1) throw `${player} is already left the game`;
        this.queue.leave(Player);
    }

    commit (number) {
        if(number < this.minNum) throw `${number} is lower than MINIMUM value ${this.minNum}`;
        if(number > this.maxNum) throw `${number} is lower than MINIMUM value ${this.maxNum}`;
        if(this.committed.indexOf(number) > -1) throw `A duplicated number. ${number} is already committed`;
        this.committed = this.committed.concat(number*1);   // Multiply 1 for number format exception
        this.turn += 1; // Apply turn;
    }
}

