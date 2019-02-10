const express = require('express');
const router = express.Router();
const gameRouter = require('./router/game');
const authRouter = require('./router/auth');

router.use('/game', gameRouter);
router.use('/auth', authRouter);

module.exports = router;