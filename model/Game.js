const Player = require('./Player');
const PlayerQueue = require('./PlayerQueue');
const Binggo = require('./Binggo');
const RandomString = require('randomstring');

// export default 안됨. import 구문 사용 불가  
module.exports = class Game {
    constructor () {
        this.gameId = RandomString.generate();
        this.queue = new PlayerQueue();
        this.binggo = new Binggo().generate();
        this.turn = 0;
        this.created = new Date();
    }

    join (Player) {
        this.queue.join(Player);
    }

    leave (Player) {
        this.queue.leave(Player);
    }

    getMeta () {
        return {
            gameId : this.gameId,
            turn : this.turn,
            created : this.created,
            players : this.queue.getPlayers(),
            board : this.binggo.getBoard()
        };
    }
}

