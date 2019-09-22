module.exports = (app) => {
    require('./routes')(app);
    return app;
};