const express = require('express');
const app = express();
const port = 9080;

/* routing and parameters */
const bodyParser = require('body-parser')
const apiRouters = require('./router');

/* user session */
const session = require('express-session');
const randomstring = require('randomstring');

console.log(`Process ENV ${process.env}`);

try {

    /* *** Set body parser for the API Server *** */
    // app.use(bodyParser.json({ type: 'application/*+json' }))
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    app.use(bodyParser.text({ type: 'text/html' }))
    // create application/x-www-form-urlencoded parser
    // parse application/json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    /* session */
    app.use(
        session({
            secret : randomstring.generate(),
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: false
        })
    );
    /* *** Run the Server *** */
    app.use('/api', apiRouters);
    app.listen(port, () => {
        console.log(`listen ${port}`);    
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}