process.env.PORT = process.env.PORT || '3001';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

require('../config/dbStart');
require('../src/app')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `\nApp listening on PORT ${process.env.PORT} and Env: ${process.env.NODE_ENV}`);
});

module.exports = app;