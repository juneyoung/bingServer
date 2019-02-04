const express = require('express');
const router = express.Router();
const gameRouter = require('./router/game');
const memberRouter = require('./router/member');

router.use('/game', gameRouter);
router.use('/member', memberRouter);

module.exports = router;