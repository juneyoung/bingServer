const router = require('express').Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Game router = Time: ', Date.now());
  next();
});

// define the home page route
// https://fullstack-developer.academy/res-json-vs-res-send-vs-res-end-in-express/
router.get('/getBoard', (req, res) => {
  console.log('getBoard Api called', req);
  // res.writeHead(200, {
  //   // 'Content-Type' : 'application/json',
  //   'Content-Type' : 'application/octet-stream'
  // });
  // res.end(JSON.stringify({
  //   result : 'SUCCESS',
  //   number : [[1,2,3],[4,5,6],[7,8,9]]
  // }));

  res.json({
    result : 'SUCCESS',
    number : [[1,2,3],[4,5,6],[7,8,9]]
  });
});
// define the about route
router.post('/putNumber', (req, res) => {
  console.log('putNumber Api called', req);
  res.json({
    result : 'SUCCESS',
    number : req.body.num
  });
});

module.exports = router;