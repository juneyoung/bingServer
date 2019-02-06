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
  let gameId = req.body.gameId;
  let number = req.body.number;
  let game = null;
  try {
    game = GlobalVars.games[gameId];
    if(!game) throw `Could not commit the number ${number} since gameId ${gameId} is invalid`;
    game.commit(number);
  } catch(exception) {
    console.error('Exception occurs while commit a number', exception);
    result = 'FAIL';
    message = JSON.stringify(exception);
  }
  res.json({
    result : result,
    message : message,
    game : game || {}
  });
});

router.post('/create', (req, res) => {
  console.log('create request body', req.body);
  // console.log('create request session', req.session);
  let game = new Game(req.body.rows, req.body.max, req.body.winRows);
  let gameId = game.gameId;
  GlobalVars.games = Object.assign({}, GlobalVars.games, {[gameId] : game});
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
  let game = null;
  try {
    console.log('Rooms which registered in global', GlobalVars.games);
    game = GlobalVars.games[toJoin];
    if(!game) throw `Invalid gameId : ${toJoin}`;
    message = `Successfully joined the game ${toJoin}`
  } catch (exception) {
    console.error(exception);
    result = 'FAIL';
    message = JSON.stringify(exception);
  }
  res.json({
    result : result,
    message : message,
    game : game || {}
  })
})

module.exports = router;