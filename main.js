const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    console.log('Loading index.html from:', path.join(__dirname, 'dist/games_wiki_test_app/browser/index.html'));
    //   win.loadFile(path.join(__dirname, 'dist/games_wiki_test_app/browser/index.html'));
    win.loadURL('http://localhost:4200');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});