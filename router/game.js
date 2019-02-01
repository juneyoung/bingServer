const Game = require('../model/Game.js');
const router = require('express').Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Game router = Time: ', Date.now());
  next();
});

// define the home page route
// https://fullstack-developer.academy/res-json-vs-res-send-vs-res-end-in-express/
router.get('/getBoard', (req, res) => {
  console.log('getBoard Api called');
  res.json({
    result : 'SUCCESS',
    number : [[1,2,3],[4,5,6],[7,8,9]]
  });
});

router.post('/putNumber', (req, res) => {
  console.log('putNumber Api called');
  res.json({
    result : 'SUCCESS',
    number : req.body.num
  });
});

router.post('/generate', (req, res) => {
  console.log('generate request body', req.body);
  res.json({
    result : 'SUCESS',
    game : new Game()
  })
});

module.exports = router;