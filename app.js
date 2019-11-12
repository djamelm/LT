// Node js
var http = require('http')
var fs = require('fs')
var path = require('path')
var os = require('os')
var child_process = require('child_process')
// Node js

// Configuration
const host = 'localhost'
const port = 1010
// Configuration

// Express & the server
var express = require('express')
var app = express()
var server = http.createServer(app).listen(port, () => {
    var open = false
    if (os.platform() == 'win32' && open) {
        child_process.exec("start http://" + host + ":" + port)
    } else if (os.platform() == 'darwin' && open) {
        child_process.exec("open http://" + host + ":" + port)
    } else if (os.platform() == 'linux' && open) {
        child_process.exec("xdg-open http://" + host + ":" + port)
    } else {
        console.log(`Server is running @ http://${host}:${port}/ on ` + os.platform() + ``)
        console.log(`Open http://${host}:${port}/ in your browser`)
        console.log(os.homedir())
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
app.use('/Musique/', express.static('/root/Musique/'))
app.use('/', express.static(__dirname + '/www/'))
app.set('view engine', 'ejs')

// More
/*
app.use((req, res, next) => {
    if (req.session.flash) {
        res.locals.flash = req.session.flash
        req.session.flash = undefined
    }
    req.flash = (type, content) => {
        if (req.session.flash === undefined) {
            req.session.flash = {}
        }
        req.session.flash[type] = content
    }
    next()
})*/
app.use((req, res, next) => {/*
    var session = req.session,
        user = {}
    //session.rn = '181837036538'; session.password = '16cdf0eaed80a35151a0340ef91a55bf'
    */res.locals.pages = {}/*
    if (session.rn == null) {
        session.rn = undefined
        session.password = undefined
        next()
    } else {
        if (user.password === "masterm2ero" && ) {
            session.rn = user.rn
            session.password = user.password
            res.locals.user = user
        } else {
            session.rn = undefined
            session.password = undefined
            res.locals.user = {}
        }
        */next()/*
    }
*/})
// More

// ******** Start ********
require('./rooter/index')(app, io)
require('./rooter/json')(app, io)
// ********  Fin  ********


io.on('connection', (socket) => {
    // Var
    var clientIp = socket.conn.remoteAddress
    // var session = socket.handshake.session
    // Var

    // console.log(clientIp + ' est connecté.')
    io.emit('console', clientIp + ' est connecté.');
    socket.emit('console', 'tu est ' + clientIp + ' et tu est connecté.');

    socket.on('disconnect', () => {
        console.log(clientIp + ' est déconnecté')
    })
})
