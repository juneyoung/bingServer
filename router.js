// const app = require('express').express();
// const memberRouter = require('./router/game');
// const roomRouter = require('./router/room');
const gameRouter = require('./router/game');

// app.use('/api/member', memberRouter);
// app.use('/api/room', roomRouter);
// app.use('/api/game', gameRouter);


const express = require('express');
const router = express.Router();
router.use('/api/game', gameRouter);

module.exports = router;