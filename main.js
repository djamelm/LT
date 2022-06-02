//.fvs
const { app, BrowserWindow, Menu, MenuItem } = require('electron')
let mainWindow
const theApp = require('./index');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 920,
        height: 700,
        center: true,
        //icon: __dirname + "www/icon.ico",
        title: 'Facture',
        minWidth: 800,
        minHeight: 200,
        backgroundColor: "#500",
        webPreferences: {
            nodeIntegration: true
        }
    })
    //mainWindow.setMenu(null);
    //mainWindow.loadFile('src/index.html')
    mainWindow.loadURL('http://localhost:80/')
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})