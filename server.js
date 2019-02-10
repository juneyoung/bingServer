const express = require('express');
const app = express();       // express app
const http = require('http');
let defaults = require('./static/heroku.json');
const port = process.env.PORT || defaults.port;
const apiRouters = require('./router');


console.log(`Process ENV ${process.env}`);

try {
    /* static resource path */
    app.use(express.static('static'));
    require('./modules/bodyParser')(app);
    require('./modules/cookieParser')(app);
    // require('./modules/cors')(app);
    require('./modules/session')(app);

    /* *** Run the Server *** */
    app.use('/api', apiRouters);
    /* *** Index page redirection *** */
    app.get('/', (req, res) => {
        // res.sendFile(`${__dirname}/static/test.html`)
        res.sendFile(`${__dirname}/test/simpleClient.html`)
    });
    const httpServer = http.createServer(app);
    require('./modules/bingoSocket')(httpServer);
    httpServer.listen(port, () => {
        console.log(`Server Listening on the port ${port}`);
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}