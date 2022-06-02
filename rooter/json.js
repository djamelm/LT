var userdata = "";
var homedata = "";
var data = require('../data');
var path = require('path'),
    fs = require('fs'),
    os = require('os');
if (process.env.APPDATA) {
    userdata = process.env.APPDATA + path.sep + "Deezloader\\";
    homedata = os.homedir();
} else if (process.platform == "darwin") {
    homedata = os.homedir();
    userdata = homedata + '/Library/Application Support/Deezloader/';
} else if (process.platform == "android") {
    homedata = os.homedir() + "/storage/shared";
    userdata = homedata + "/Deezloader/";
} else if (process.platform == "linux") {
    homedata = os.homedir();
    userdata = homedata + "/Documents/";
} else {
    homedata = os.homedir();
    userdata = homedata + '/.config/Deezloader/';
}
var melange = (max, start = 0) => {
    return Math.floor((max * Math.random()) + start)
}
var tirage = (n, max, array = new Array()) => {
    var tablni = new Array(),
        tabRetour = new Array()
    for (i = 0; i < n; i++) {
        tablni = melange(max);
        if (tabRetour.includes(tablni) || array.includes(tablni)) {
            i--;
        } else {
            tabRetour.push(tablni);
        }
    }
    return tabRetour
}
var func_tirage = () => {
    var num = tirage(4, data.length);
    var classment = tirage(4, 4)
    return {
        "word": [
            data[num[0]].word,
            data[num[1]].word,
            data[num[2]].word,
            data[num[3]].word
        ],
        "sentence": data[num[0]].sentence,
        "classment": classment
    }
}
var inObject = function (object, val) {
    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            if (object[i] === val) {
                return true;
            }
        }
    }
    return false;
};
var search = (msg) => {
    return data.filter(function (el) {
        return inObject(el.msg);
    })
}
module.exports = (app, io) => {
    // socket.io
    io.on('connection', (socket) => {
        var clientIp = socket.conn.remoteAddress
        socket.emit('tirage', func_tirage())
        socket.on('tirage', (msg) => {
            socket.emit('tirage', func_tirage())
        })
        socket.on('search', (msg) => {
            socket.emit('search', search())
        })
    })
}