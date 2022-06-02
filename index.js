// Node js
var http = require('http')
var fs = require('fs')
var path = require('path')
var os = require('os')
var child_process = require('child_process')
// Node js

// Configuration
const host = 'localhost'
const port = 80
// Configuration


// Express & the server
var express = require('express')
var app = express()
var server = http.createServer(app).listen(port, () => {
    child_process.exec("npm run css")
    if(false){
        if (os.platform() == 'win32') {
            child_process.exec("start http://" + host + ":" + port)
        } else if (os.platform() == 'darwin') {
            child_process.exec("open http://" + host + ":" + port)
        } else if (os.platform() == 'linux') {
            child_process.exec("xdg-open http://" + host + ":" + port)
        }
    }else{
        console.log(`Server is running @ http://${host}:${port}/ on ` + os.platform() + ``)
        console.log(`Open http://${host}:${port}/ in your browser`)
    }
})
// Express & the server

// Socket.io
var io = require('socket.io').listen(server, {
    log: false,
    cookie: false
})
// Socket.io

// Route & Create server
app.set('views', path.join(__dirname, '/www/views/'))
app.use('/assets/', express.static(__dirname + '/www/assets/'))
app.use('/', express.static(__dirname + '/www/'))
app.set('view engine', 'ejs')

// More
app.use((req, res, next) => {
    res.locals.pages = {}
    next()
})
// More

// ******** Start ********
require('./rooter/index')(app, io)
require('./rooter/json')(app, io)
// ********  Fin  ********


io.on('connection', (socket) => {
    // Var
    var clientIp = socket.conn.remoteAddress
    console.log(clientIp + ' est connecté.')
    io.emit('console', clientIp + ' est connecté.');
    socket.emit('console', 'tu est ' + clientIp + ' et tu est connecté.');

    socket.on('disconnect', () => {
        console.log(clientIp + ' est déconnecté')
    })
})
