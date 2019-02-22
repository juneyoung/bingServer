const session = require('express-session');
const rs = require('randomstring');
const sessionLifetime = 60*60*1000; // 일단 한시간으로 두고 콜이 올 때마다 미들웨어에서 업데이트 치는 로직이 필요함

module.exports = (app) => {
    let sessionMiddleware = session({
        secret : rs.generate(),
        cookie: { maxAge: sessionLifetime },  
        resave: false,
        saveUninitialized: false
    });

    app.use(sessionMiddleware);
}