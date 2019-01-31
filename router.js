const express = require('express');
const router = express.Router();
const gameRouter = require('./router/game');

router.use('/game', gameRouter);
module.exports = router;