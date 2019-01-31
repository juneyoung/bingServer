const router = require('express').Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Member router = Time: ', Date.now());
  next();
});

// define the home page route
// https://fullstack-developer.academy/res-json-vs-res-send-vs-res-end-in-express/
router.post('/login', (req, res) => {
  console.log('github login Api called', req);
  res.json({
    result : 'SUCCESS'
  });
});

router.post('/githubCallback', (req, res) => {
    console.log('githubCallback Api called', req.body);  // user session create
    res.json({
        result : 'SUCCESS'
    });
});

router.post('/logout', (req, res) => {
  console.log('logout Api called');   // user session destroy
  res.json({
    result : 'SUCCESS'
  });
});

module.exports = router;