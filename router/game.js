const Game = require('../model/Game');
const Player = require('../model/Player');
const router = require('express').Router();
let GlobalVars = require('../state/GlobalVars');

// Check signed in or not
router.use((req, res, next) => {
  try {
    if(!req.session.signed) throw 'Sign in required';
    next();
  } catch (e) {
    res.json({
      result : 'FAIL',
      message : e.toString()
    });
  }
});

router.post('/commit', (req, res) => {
  // Room validation / Number validation
  console.log('commit Api called body', req.body);
  console.log('commit Api called session', req.session);
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

// 생성시 현재 세션 유저를 가지는 사용자 배열을 생성해서 game 과 연동해줘야 함 
router.post('/create', (req, res) => {
  let result = 'SUCCESS', message = '', game = null;

  try {
    game = new Game(req.body.rows, req.body.max, req.body.winRows);
    let gameId = game.gameId;
    GlobalVars.games = Object.assign({}, GlobalVars.games, {[gameId] : game});
    // sessionId, name, profile
    let user = req.session.user;
    console.log(`CREATE GAME ====> ${JSON.stringify(user)}`);
    let player = new Player(req.session.id, user.displayName, user.image.url);
    console.log('Game before join', game, player);
    game.join(player);
    console.log('Game after join', game, player);
  } catch (e) {
    result = 'FAIL';
    message = e.toString();
  }
  
  res.json({
    result : result,
    message : message,
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
    let user = req.session.user;
    let player = new Player(req.session.id, user.displayName, user.image.url);
    game.join(player);
    console.log('Game a player has joined', game);
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