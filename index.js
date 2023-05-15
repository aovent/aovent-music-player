const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    icon: "src/img/aovent.png",
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    },
    autoHideMenuBar: true
  });

  mainWindow.loadFile('./src/interface/index.html');
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('folderContents', (event, files) => {
    const fileNames = files.map(file => `${file}=/=`).join('');
    event.reply('folderContentsResponse', fileNames);
  });

  ipcMain.on('folderContentsError', (event, error) => {
    event.reply('folderContentsResponse', `Error: ${error}`);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});