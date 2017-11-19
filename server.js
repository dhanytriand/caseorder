'use strict';

require('dotenv').config();

// set application environment
global.ENV = process.env.NODE_ENV || 'development'
global.async = require('async')
global.path = require('path')

const port = process.env.PORT || 3000
global.express = require('express')
global.myConfig = {}
const fw = express()
const fs = require('fs')
const http = require('http')
const core = require('./core')(fw, __dirname)
const basepath = 'apps'

if(fs.existsSync(path.normalize(__dirname + "/" + basepath + '/config/' + ENV + '/config.js')))
    global.myConfig = require(path.normalize(__dirname + "/" + basepath + '/config/' + ENV + '/config.js'))

core.init(__dirname, basepath)

var httpServer = http.createServer(fw)
httpServer.listen(port)

module.exports = fw
