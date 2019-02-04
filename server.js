const app = require('express')();       // express app
const http = require('http');
let socketIO = require('socket.io');    // socket io for message ... could replace with http2/sse(server-sent-events)
let GlobalVars = require('./state/GlobalVars');
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
    /* *** Index page redirection *** */
    app.get('/', (req, res) => {
        // res.sendFile(`${__dirname}/static/test.html`)
        res.sendFile(`${__dirname}/test/simpleClient.html`)
    });

    const httpServer = http.createServer(app);
    let socketIOInstance = socketIO(httpServer);
    GlobalVars.socketIO = socketIOInstance;


    /* *** Define socket event *** */
    socketIOInstance.of('/chat').on('connection', (socket) => {
        // 사용자가 숫자를 커밋한다.
        socket.on('commit', (data) => {

            console.log('Server recieved data ', data);
            // socketIOInstance.emit()

            // 접속된 모든 사용자에게 데이터를 전달한다 
            // socketIOInstance.emit('commit', data);

            // 에코 - 자신에게만 되돌려주는 메세지 
            // socket.emit('commit', data);

            // 발신자를 제외한 모든 사용자에게 데이터를 전달한다 
            // socket.broadcast.emit('commit', data);

            // 특정 클라이언트에게만 메시지를 전송한다
            // socketIOInstance.to(id).emit('commit', data);
        });
    });

    httpServer.listen(port, () => {
        console.log(`Server Listening on the port ${port}`);
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}