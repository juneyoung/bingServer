// const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const apiRouters = require('./router');
const port = 9080;

console.log(`Process ENV ${process.env}`);

// === Before express ===
// let server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html'
//     });
//     res.end('Server On');
// });

try {

    /* *** Set body parser for the API Server *** */
    // app.use(bodyParser.json({ type: 'application/*+json' }))
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    app.use(bodyParser.text({ type: 'text/html' }))
    // create application/x-www-form-urlencoded parser
    // parse application/json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    /* *** Run the Server *** */
    // server.listen(port);
    // console.log(`listen ${port}`);
    app.use('/api', apiRouters);
    app.listen(port, () => {
        console.log(`listen ${port}`);    
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}