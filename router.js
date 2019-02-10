const express = require('express');
const router = express.Router();
const gameRouter = require('./router/game');
const authRouter = require('./router/auth');
const sessionRouter = require('./router/session');

router.use('/game', gameRouter);
router.use('/auth', authRouter);
router.use('/session', sessionRouter);

module.exports = router;