// const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routers = require('./router');
const port = 9080;

console.log(`Process ENV ${process.env}`);

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// === Before express ===
// let server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html'
//     });
//     res.end('Server On');
// });

try {
    // server.listen(port);
    // console.log(`listen ${port}`);
    app.use('/', routers);
    app.listen(port, () => {
        console.log(`listen ${port}`);    
    })
} catch (e) {
    console.error('Failed to boot the server', e);
}