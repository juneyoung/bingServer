// Google Login
const router = require('express').Router();

// 기록자 ...
router.use(function timeLog(req, res, next) {
    console.log('SNS AUTH router = Time: ', Date.now());
    next();
});

router.all('/me', (req, res) => {
    let result = 'SUCCESS', message = '', user = {}, signed = false;
    try {
        // 세션에서 읽어라 무슨 기준일지는 고민해보기 ///
        console.log('Session ME called : req.session ', req.session);
        console.log('Session ME called : req.cookies ', req.cookies);
        let session = req.session;
        signed = session.signed;
        if(signed) {
            user = session.user;
            console.log('Logined user', user);
        }
    } catch(exception) {
        console.error('Session READ Failed', exception);
        result = 'FAIL';
        message = exception.toString();
        user = Object.assing({}, user, { signed : false });
    }
    res.json({
        result : result,
        message : message,
        signed : signed,
        user : user
    })
});

module.exports = router;
