const RandomString = require('randomstring');

// export default 안됨. import 구문 사용 불가  
module.exports = class Game {
    constructor (rows, max, winRows) {
        this.gameId = RandomString.generate();
        // this.queue = new PlayerQueue();
        this.queue = [];
        this.turn = 0;
        this.created = new Date();
        this.committed = [];    // 입력된 숫자의 배열
        this.minNum = 1;

        this.status = 'none'; // [ 'none' , 'pause', 'playing' ]
        this.rows = (!rows) ? 3: rows;
        this.maxNum = (!max) ? 12 : max;
        this.winRows = (!winRows) ? 3 : winRows;
    }

    join (player) {
        console.log('Join user', player);
        if(this.queue.indexOf(player) > -1) throw `${player} is already in the game`;
        this.queue = this.queue.concat(player);
        console.log('successfully joined', player.name);
    }

    leave (player) {
        console.log('Left user', player);
        // let filteredUser = {
        //     name : player.displayName,
        //     profile : player.profileImage
        // }
        const leftIdx = this.queue.indexOf(player);
        if(leftIdx > -1) throw `${player} is already left the game`;
        let copied = [].concat(this.queue);
        copied.splice(leftIdx, 1); // 끊어냄 
        this.queue = copied;
        console.log('Players who left the game is ', this.queue);
    }

    commit (number) {
        if(number < this.minNum) throw `${number} is lower than MINIMUM value ${this.minNum}`;
        if(number > this.maxNum) throw `${number} is lower than MINIMUM value ${this.maxNum}`;
        if(this.committed.indexOf(number) > -1) throw `A duplicated number. ${number} is already committed`;
        this.committed = this.committed.concat(number*1);   // Multiply 1 for number format exception
        this.turn += 1; // Apply turn;
    }
}

