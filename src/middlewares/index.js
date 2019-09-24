const cors = require('cors');
const bodyParser = require('body-parser');
const authorize = require('./authorize');

module.exports = (app) => {

    app.use(cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(authorize);
};