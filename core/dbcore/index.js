'use strict';

module.exports = (config, rootpath, basepath) => {

    const DB = require('./db.js')(rootpath, basepath);

    global.Sequelize = require('sequelize');
    global.db = new DB;
    
    let log = true
    if(config.dbconfig.log != undefined)
        log = config.dbconfig.log
    db.addConnection('default', {
        host: config.dbconfig.host,
        user: config.dbconfig.username,
        password: config.dbconfig.password,
        database: config.dbconfig.database,
        log: log,
        dialect: config.dbconfig.dialect,
        timezone: process.env.TZ
    }, true);
    
    return db.connection();
}