const cors = require('cors');
const bodyParser = require('body-parser');
const authorize = require('./authorize');
const morgan = require('morgan');

module.exports = (app) => {

    app.use(morgan('dev'));

    app.use(cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(authorize);
};