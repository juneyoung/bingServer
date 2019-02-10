const session = require('express-session');
const rs = require('randomstring');

module.exports = (app) => {
    let sessionMiddleware = session({
        secret : rs.generate(),
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    });

    app.use(sessionMiddleware);
}