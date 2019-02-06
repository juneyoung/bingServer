const app = require('express')();       // express app
const http = require('http');
let socketIO = require('socket.io');    // socket io for message ... could replace with http2/sse(server-sent-events)
let GlobalVars = require('./state/GlobalVars');
const port = 9080;
// const port = 80;    // heroku needs 80

/* routing and parameters */
const bodyParser = require('body-parser');
const apiRouters = require('./router');

/* user session */
const session = require('express-session');
const randomstring = require('randomstring');

console.log(`Process ENV ${process.env}`);
// console.log(`Process ENV ${JSON.stringify(process.env)}`);

try {

    /* *** Set body parser for the API Server *** */
    // app.use(bodyParser.json({ type: 'application/*+json' }))
    // app.use(bodyParser.json({ type: 'application/json' }))
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    app.use(bodyParser.text({ type: 'text/html' }))
    // create application/x-www-form-urlencoded parser
    // parse application/json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    let sessionMiddleware = session({
        secret : randomstring.generate(),
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    });

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
    /* *** Index page redirection *** */
    app.get('/', (req, res) => {
        // res.sendFile(`${__dirname}/static/test.html`)
        res.sendFile(`${__dirname}/test/simpleClient.html`)
    });

    const httpServer = http.createServer(app);
    let socketIOInstance = socketIO(httpServer);

    socketIOInstance.on('connection', (socket) => {
        GlobalVars.eventBus = socket;
        console.log('SOCKET.IO A USER CONNECTED');
        socket.on('create', (data) => {
            console.log('SOCKET.IO create called');
            socket.join(data.room);
            socketIOInstance.emit('message', `A room - ${data.room} - created`);
        });

        socket.on('join', (data) => {
            console.log('SOCKET.IO join called', data);
            socket.join(data.room);
            socketIOInstance.emit('message', `New player joined to the room - ${data.room} `);
        });

        socket.on('commit', (data) => {
            console.log('SOCKET.IO join called', data);
            socket.join(data.room);
            socketIOInstance.emit('message', `A player committed a number - ${data.number} to room ${data.room}`);
        });

        socket.on('leave', (data) => {
            let gameId = data.gameId;
            let message = `New player left the game - ${gameId}`;
            let playerQueue = GlobalVars.games[gameId].queue || [];
            if(playerQueue.length < 1) {
                delete GlobalVars[gameId];
                message = `${message}. No player in game ${gameId}. destroyed`;
            } ;
            socketIOInstance.emit('message', message);
        });

        socket.on('disconnect', (data) => {
            //
        });
    });

    GlobalVars.socketIO = socketIOInstance; // Add to global, so the controllers can manage own actions like create, join ...
    // GlobalVars.socketIO = socketIO;
    
    httpServer.listen(port, () => {
        console.log(`Server Listening on the port ${port}`);
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}