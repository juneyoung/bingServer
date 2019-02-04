/* 전역에서 쓸 수 있는 무언가 ... */
let GlobalVars = {
    socketIO : null,
    GameList : {
        /*
            gameId : {
                owner : 'owner',
                created : 'yyyy-mm-dd HH:mm:ss',
                players : [],
                turns : [],
                socket : [socket io Object]
            }
        */
    },
    rooms : {}
}
module.exports = GlobalVars;