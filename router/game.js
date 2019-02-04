const Game = require('../model/Game.js');
const router = require('express').Router();
let GlobalVars = require('../state/GlobalVars');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Game router = Time: ', Date.now());
  next();
});

router.post('/commit', (req, res) => {
  // Room validation / Number validation
  console.log('commit Api called', req.body);
  let result = 'SUCCESS', message = '';
  let roomId = req.body.gameId;
  let number = req.body.number;
  try {
    if(!GlobalVars.rooms[roomId]) 
      throw `Could not commit the number ${number} since gameId ${roomId} is invalid`;
  } catch(exception) {
    console.error('Exception occurs while commit a number', exception);
    result = 'FAIL';
    message = JSON.stringify(exception);
  }
  res.json({
    result : result,
    number : req.body.num,
    message : message
  });
});

router.post('/create', (req, res) => {
  console.log('create request body', req.body);
  // console.log('create request session', req.session);
  let game = new Game();
  let gameId = game.gameId;
  GlobalVars.rooms = Object.assign({}, GlobalVars.rooms, {[gameId] : {}});
  res.json({
    result : 'SUCCESS',
    game : game
  })
});

router.post('/join', (req, res) => {
  // Room validation
  console.log('join API called', req.body);
  let toJoin = req.body.gameId;
  let result = 'SUCCESS', message = '';
  try {
    console.log('Rooms which registered in global', GlobalVars.rooms);
    let room = GlobalVars.rooms[toJoin];
    if(!room) throw `Invalid gameId : ${toJoin}`;
    message = `Successfully joined the game ${toJoin}`
  } catch (exception) {
    console.error(exception);
    result = 'FAIL';
    message = JSON.stringify(exception);
  }
  res.json({
    result : result,
    message : message
  })
})

module.exports = router;