const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const WikipediaService = require('./services/wikipedia-service');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar:true
    });

    win.loadFile(path.join(__dirname, 'dist/games_wiki_test_app/browser/index.html'));
    // win.loadURL('http://localhost:4200');
}

ipcMain.handle('search-game-wikipedia', async (event, gameName) => {
    return await WikipediaService.searchGame(gameName);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});