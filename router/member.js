const router = require('express').Router();
const qs = require('querystring');
const rs = require('randomstring');
require('dotenv').config();
const redirect_uri = process.env.HOST + '/api/member/githubCallback';
const githubApiPrefix = 'https://github.com/login/oauth/authorize?';

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Member router = Time: ', Date.now());
    next();
});

// define the home page route
// https://fullstack-developer.academy/res-json-vs-res-send-vs-res-end-in-express/
router.post('/login', (req, res) => {
    console.log('github login Api called', req, process.env);
    req.session.csrf_string = rs.generate();
    let paramsStr = qs.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: redirect_uri,
        state: req.session.csrf_string,
        scope: 'user:email'
    });
    const githubAuthUrl = githubApiPrefix + paramsStr;
    res.redirect(githubAuthUrl);    
});

router.get('/githubCallback', (req, res) => {
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