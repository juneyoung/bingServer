const Game = require('../model/Game.js');
const router = require('express').Router();
let GlobalVars = require('../state/GlobalVars');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Game router = Time: ', Date.now());
  next();
});

router.get('/getBoard', (req, res) => {
  console.log('getBoard Api called');
  res.json({
    result : 'SUCCESS',
    number : [[1,2,3],[4,5,6],[7,8,9]]
  });
});

router.post('/commit', (req, res) => {
  console.log('commit Api called');
  res.json({
    result : 'SUCCESS',
    number : req.body.num
  });
});

router.post('/create', (req, res) => {
  console.log('create request body', req.body);
  console.log('create request session', req.session);
  console.log('GenerateGameSokect');
  let game = new Game();
  let gameId = game.gameId;

  // Define game socket action
  let currentGameSocket = GlobalVars.socketIO.of(`/game/${gameId}`).on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log('join to socket', data);
      // socket.game = gameId; // ??? Like room of chatting ?
      socket.join(gameId);
      currentGameSocket.to(gameId).emit('message', 'New people joined');
    });
    socket.on('message', (data) => {
      console.log('socket message event called', data);
    });
  });

  GlobalVars.GameList[game.gameId] = currentGameSocket;
  // Check status of global variables ...
  // console.log('After create game, Gloval state like ... ', GlobalVars);
  res.json({
    result : 'SUCCESS',
    game : game
  })
});

module.exports = router;