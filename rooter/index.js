
var os = require('os'), path = require('path'), fs = require('fs-extra'), child_process = require('child_process')
var userdata = "";
var homedata = "";
var file = function (appname) {
    if (process.env.APPDATA) {
        userdata = process.env.APPDATA + path.sep + appname + "\\";
        homedata = os.homedir();
    } else if (process.platform == "darwin") {
        homedata = os.homedir();
        userdata = homedata + '/Library/Application Support/' + appname + '/';
    } else if (process.platform == "android") {
        homedata = os.homedir() + "/storage/shared";
        userdata = homedata + "/" + appname + "/";
    } else {
        homedata = os.homedir();
        userdata = homedata + '/.config/' + appname + '/';
    }
    if (!fs.existsSync(userdata + "config.json")) {
        fs.outputFileSync(userdata + "config.json", fs.readFileSync(__dirname + path.sep + "default.json", 'utf8'));
    }
    if (!fs.existsSync(userdata + "db.json") && fs.existsSync(__dirname + path.sep + "db.json")) {
        fs.outputFileSync(userdata + "config.json", fs.readFileSync(__dirname + path.sep + "db.json", 'utf8'));
    }
    let configFile = require(userdata + path.sep + "config.json");
    let DBFile = require(userdata + path.sep + "db.json");
    return {
        home: homedata,
        user: userdata,
        config: configFile,
        db: DBFile
    }
}

function find(startPath,filter){
    var table = [];
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);

        /*if (stat.isDirectory()){
            find(filename,filter); //recurse
        }
        else */if (filename.indexOf(filter)>=0) {
            //console.log('-- found: ',filename);
            table.push(filename)
        };
    };
    return table;
};
module.exports = (app) => {
	app.get('/', (req, res) => {
        res.locals.pages.title = "Word Bit"
        res.locals.pages.description = "Tu veux apprandre tamazight. On est la pour toi. on t'aide a apprandre on te aidras avec des quize(comme un jeux) pour mieux se raplait."
        res.locals.pages.keywords = "lrc maker,lrc generate, lrc, lyrice##"
        res.render('index')
	})
	app.get('/404', (req, res) => {
	    res.locals.loguser = true
		res.render('404')
	})
}