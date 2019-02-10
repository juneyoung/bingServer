const cors = require('cors');

module.exports = (app) => {
    const corsOpt = function (req, callback) {
        callback(null, {origin : true});
    }
    app.options('*', cors(corsOpt));	
}