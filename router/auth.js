// Google Login
const router = require('express').Router();
const rs = require('randomstring');
const { google } = require('googleapis'); 
/*
    Google API 고정 정보 
*/

require('dotenv').config();
// Compare .env key strictly
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    redirect: `${process.env.HOST}/api/auth/googleCallback`
};

// scopes :: https://developers.google.com/identity/protocols/googlescopes
const informationScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
];

const oauth2Client = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // offline 이 아니면 뭐지 ??
    scope: informationScope
}); 

/*
    Google API 고정 정보 종료 
*/


/*
    Google Helper Function 시작
*/

function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth });
}

async function googleLogin(req) {
    const {code, state} = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    if(state !== req.session.cert) throw 'Security Token deos not fit';

    oauth2Client.setCredentials(tokens);
    oauth2Client.on('tokens', (tokens) => {
        if(tokens.refresh_token){
            console.log("리프레시 토큰 :", tokens.refresh_token);
        }
        console.log("액세스 토큰:", tokens.access_token);
    });
    const plus = getGooglePlusApi(oauth2Client);
    const res = await plus.people.get({ userId: 'me' });
    const userData = res.data;
    issueUser(req, userData);
    return userData;
}

/*
    Google Helper Function 종료
*/

function issueUser (req, data) {
    console.log(`Data will stored in session :: ${JSON.stringify(data)}`)
    req.session.signed = true;
    req.session.user = data;
}

// 기록자 ...
router.use(function timeLog(req, res, next) {
    console.log('SNS AUTH router = Time: ', Date.now());
    next();
});

router.all('/googleLogin', (req, res) => {
    console.log('auth router googleLogin', url);
    req.session.cert = rs.generate();
    try {
        console.log(`Before send cert ${req.session.cert}`)
        res.redirect(url + '&state=' + req.session.cert);
    } catch(exception) {
        console.error('External link redirection error', exception);
    }
});

router.all('/googleCallback', async (req, res) => {
    console.log('SNS AUTH router google callback ', req.query.code, process.env.HOST);
    const displayName = await googleLogin(req);
    res.redirect(`${process.env.HOST}`);
});

module.exports = router;
