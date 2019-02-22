const socketIO = require('socket.io');
let GlobalVars = require('../state/GlobalVars');
/*
    이벤트 정의
    message - 시스템 메세지
    chat - 게임 내 채팅 메세지
    gameData - 게임(숫자 커밋, 사용자의 변경) 관련 데이터 전송 
*/
module.exports = (httpServer) => {
	let socketIOInstance = socketIO(httpServer);
    socketIOInstance.on('connection', (socket) => {
        GlobalVars.eventBus = socket;
        console.log('SOCKET.IO A USER CONNECTED');
        socket.on('create', (data) => {
            console.log('SOCKET.IO create called');
            socket.join(data.room);
            socketIOInstance.emit('message', `A room - ${data.room} - created`);
        });

        socket.on('join', (data) => {
            console.log('SOCKET.IO join called', data);
            socket.join(data.room);
            socketIOInstance.emit('message', `New player joined to the room - ${data.room} `);
        });

        socket.on('commit', (data) => {
            console.log('SOCKET.IO join called', data);
            socket.join(data.room);
            socketIOInstance.emit('message', `A player committed a number - ${data.number} to room ${data.room}`);
        });

        socket.on('leave', (data) => {
            let gameId = data.gameId;
            let message = `New player left the game - ${gameId}`;
            let playerQueue = GlobalVars.games[gameId].queue || [];
            if(playerQueue.length < 1) {
                delete GlobalVars[gameId];
                message = `${message}. No player in game ${gameId}. destroyed`;
            } ;
            socketIOInstance.emit('message', message);
        });

        // client 에서 API 를 호출하고 그 결과를 파라미터로 보냄 
        socket.on('gameData', (data) => {
            console.log('game data has changed');
            socketIOInstance.emit('gameData', data);
        })

        socket.on('disconnect', (data) => {
            //
        });
    });
    GlobalVars.socketIO = socketIOInstance; // Add to global, so the controllers can manage own actions like create, join ...	
}