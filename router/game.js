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
  // console.log('create request session', req.session);
  let game = new Game();
  let gameId = game.gameId;
  GlobalVars.socketIO.emit('create', {
    room : gameId
  });
  GlobalVars.rooms = Object.assign({}, GlobalVars.rooms, {[gameId] : {}});
  res.json({
    result : 'SUCCESS',
    game : game
  })
});

router.post('/join', (req, res) => {
  console.log('join API called', req.body);
  let toJoin = req.body.gameId;
  let result = 'SUCCESS', message = '';
  try {
    console.log('Rooms which registered in global', GlobalVars.rooms);
    let room = GlobalVars.rooms[toJoin];
    if(!room) throw `Invalid gameId : ${toJoin}`;
    GlobalVars.socketIO.emit('join', {
      room : toJoin
    });
    message = `Successfully joined the game ${toJoin}`
  } catch (exception) {
    console.error(exception);
    result = 'FAIL';
    message = exception;
  }
  res.json({
    result : result,
    message : message
  })
})

module.exports = router;