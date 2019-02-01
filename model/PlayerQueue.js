module.exports = class PlayerQueue {
    constructor () {
        this.players = [];
    }

    // 새로운 참가자 
    join (player) {
        console.log(`Add Player ${player.name || 'noname'} into player queue`);
        this.players = this.players.concat[player];
        return player;
    }

    // 턴체크 
    getPlayer(idx) {
        console.log(`information requested : player ${idx}`);
        return this.players[idx];
    }

    // 참가자가 게임을 떠남 
    leave (player) {
        console.log(`Player ${player} has left the game`);
        const leftIdx = this.players.indexOf(player);
        let copied = [].concat(this.players);
        if(leftIdx > -1) copied.splice(leftIdx, 1); // 끊어냄 
        this.players = copied;
        console.log('Players who left the game is ', this.players);
    }

    getPlayers () {
        return this.players.map(mem => {
            return mem.id || 'No Id';
        })
    }
}