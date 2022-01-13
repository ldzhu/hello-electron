const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile(path.join(__dirname, 'index.html')).then(() => {});

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light';
        } else {
            nativeTheme.themeSource = 'dark';
        }
        return nativeTheme.shouldUseDarkColors;
    });
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system';
    })

    win.webContents.openDevTools();
}

function createGithubWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 1500
    });
    win.loadURL('https://www.baidu.com');
    const content = win.webContents;
    content.openDevTools();
    console.log(content);
}

app.whenReady().then(() => {
    createWindow();
    // createGithubWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})
