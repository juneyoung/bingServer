const router = require('express').Router();
const qs = require('querystring');
const rs = require('randomstring');
const requestModule = require('request');

require('dotenv').config();
const redirect_uri = process.env.HOST + '/api/member/githubCallback';
const githubApiLogInPrefix = 'https://github.com/login/oauth/authorize?',
githubApiAccessTokenPrefix = 'https://github.com/login/oauth/access_token?';

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Member router = Time: ', Date.now());
    next();
});

// define the home page route
// https://fullstack-developer.academy/res-json-vs-res-send-vs-res-end-in-express/
router.post('/login', (req, res) => {
    console.log('github login Api called', req.body); // , process.env
    req.session.csrf_string = rs.generate();
    let paramsStr = qs.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: redirect_uri,
        state: req.session.csrf_string,
        scope: 'user:email'
    });
    const githubAuthUrl = githubApiLogInPrefix + paramsStr;
    console.log(githubAuthUrl);
    // 화면에서 처리하면 이상한가...
    res.redirect(githubAuthUrl);
});

router.all('/githubCallback', (req, res) => {
    console.log('githubCallback Api called', req.body);  // user session create
    let result = 'SUCCESS';
    const code = req.query.code;
    const returnedState = req.query.state;
    console.log('Callback session 검증', req.session.csrf_string, returnedState);
    //인증할 때 
    if (req.session.csrf_string === returnedState) {
        const accessTokenQs = qs.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            state: req.session.csrf_string,
            redirect_uri: redirect_uri,
        });
        requestModule.post(
          {
            url: githubApiAccessTokenPrefix + accessTokenQs
          },
          (error, response, body) => {
            console.log('Your Access Token: ');
            console.log(qs.parse(body));
            req.session.access_token = qs.parse(body).access_token;
            console.log('AFTER LOGIN REQUEST SESSION', req.session);
          }
        );
    } 
    // access token 발급 이후 
    else {
        console.log('Session ID 불일치 ', req.query)
        if(req.session.access_token) {
            // 이미 로그인 된 사용자 
        } else {
            result = 'FAIL';
        }
    }
    res.json ({
        result : result,
        accessToken : req.session.access_token || ''
    });
});

router.post('/logout', (req, res) => {
    console.log('logout Api called');   // user session destroy
    res.json({
        result : 'SUCCESS'
    });
});

module.exports = router;