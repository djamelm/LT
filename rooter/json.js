var userdata = "";
var homedata = "";
var data = require('../data');
var path = require('path'),
    fs =require('fs'),
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
    return Math.floor((max*Math.random())+start)
}
var tirage = (n, max, array = new Array()) => {
    var tablni  = new Array(), tabRetour  = new Array()
    for(i=0;i<n;i++) {
        tablni = melange(max);
        if (tabRetour.includes(tablni) || array.includes(tablni)) {
            i--;
        } else {
            tabRetour.push(tablni);
        }
    }
    return tabRetour
}
var func_tirage = ()=>{
    var num = tirage(4, data.length);
    var classment = tirage(4, 4)
    return {
        "mot": [
            data[num[0]],
            data[num[1]],
            data[num[2]],
            data[num[3]]
        ],
        "classment": classment
    }
}
module.exports = (app, io) => {
    // Express
    app.get('/json/quiz', (req, res) => {
        var num = tirage(4, data.length);
        var classment = tirage(4, 4)
        res.json({
            "mot": [
                data[num[0]],
                data[num[1]],
                data[num[2]],
                data[num[3]]
            ],
            "classment": classment
        })
    })

    // socket.io
    io.on('connection', (socket) => {
        var clientIp = socket.conn.remoteAddress
        socket.emit('tirage', func_tirage())
        socket.on('tirage', (msg) => {
            socket.emit('tirage', func_tirage())
        })
    })
}