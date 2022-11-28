const { app, BrowserWindow } = require('electron')
const path = require('path')
const remote = require("@electron/remote/main")

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, "assets", "logo.png"),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.loadFile(path.join(__dirname, 'web', 'index.html'))
    remote.initialize()
    remote.enable(win.webContents)
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
