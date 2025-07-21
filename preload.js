const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    searchGameOnWikipedia: (gameName) => ipcRenderer.invoke('search-game-wikipedia', gameName)
});
