const bodyParser = require('body-parser');
module.exports = (app) => {
	app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    app.use(bodyParser.text({ type: 'text/html' }))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};