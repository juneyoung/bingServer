const express = require('express');
const router = express.Router();
const gameRouter = require('./router/game');
const memberRouter = require('./router/member');

router.use('/game', gameRouter);
router.use('/member', memberRouter);
//test
router.get('/test', (req, res) => {
    console.log('api - test ', __dirname)
    res.sendFile(`${__dirname}/static/test.html`);
});

module.exports = router;