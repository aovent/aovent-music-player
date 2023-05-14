const { readdirSync } = require('fs');
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    receive: (channel, callback) => {
        ipcRenderer.on(channel, (_, ...args) => callback(...args));
      },
  getFolderContents: () => {
    const folderPath = './folder';
    try {
      const files = readdirSync(folderPath);
      ipcRenderer.send('folderContents', files);
    } catch (error) {
      ipcRenderer.send('folderContentsError', error.message);
    }
  }
});