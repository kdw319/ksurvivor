const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const steamworks = require('steamworks.js');

let mainWindow;
let client;

function initializeSteam() {
  try {
    // K-Highschool Survivor (4353510)
    client = steamworks.init(4353510);
    console.log('Steamworks initialized successfully:', client.localplayer.getName());
  } catch (e) {
    console.error('Steamworks failed to initialize:', e);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    resizable: true,
    fullscreen: true,
    autoHideMenuBar: true,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false
    }
  });

  mainWindow.removeMenu();
  
  // 보안: F12 및 Ctrl+Shift+I 차단 (개발자 도구 접근 방지)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' || (input.control && input.shift && input.key.toLowerCase() === 'i')) {
      event.preventDefault();
    }
  });

  // Keep 16:9 Aspect Ratio
  mainWindow.setAspectRatio(16 / 9);

  mainWindow.loadFile(path.join(__dirname, 'www/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  initializeSteam();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for Steamworks
ipcMain.handle('steam-get-name', () => {
  return client ? client.localplayer.getName() : 'Player';
});

ipcMain.handle('steam-unlock-achievement', (event, achievementId) => {
  if (client && client.achievement.unlock(achievementId)) {
    console.log(`Achievement unlocked: ${achievementId}`);
    return true;
  }
  return false;
});

ipcMain.on('quit-app', () => {
  app.quit();
});

ipcMain.handle('toggle-fullscreen', () => {
  if (mainWindow) {
    const isFull = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFull);
    return !isFull;
  }
  return false;
});
