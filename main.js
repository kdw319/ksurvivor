const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const steamworks = require('steamworks.js');

let mainWindow;
let client;

// Enable Steam Overlay hooking for Electron
app.commandLine.appendSwitch('in-process-gpu');
app.commandLine.appendSwitch('disable-direct-composition');
if (steamworks.electronEnableSteamOverlay) {
  steamworks.electronEnableSteamOverlay();
}

function initializeSteam() {
  try {
    // K-Highschool Survivor (4353510)
    client = steamworks.init(4353510);
    if (client) {
      console.log('Steamworks initialized successfully:', client.localplayer.getName());
      // Request stats from Steam servers to enable setting/getting them
      client.stats.request();
    }
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

ipcMain.handle('steam-get-stat', (event, name) => {
  if (client) {
    try {
      return client.stats.get(name);
    } catch (e) {
      console.error(`Failed to get stat ${name}:`, e);
    }
  }
  return 0;
});

ipcMain.handle('steam-unlock-achievement', (event, achievementId) => {
  if (client && client.achievement.unlock(achievementId)) {
    console.log(`Achievement unlocked: ${achievementId}`);
    return true;
  }
  return false;
});

ipcMain.handle('steam-set-stat', (event, name, value) => {
  if (client) {
    try {
      client.stats.set(name, value);
      return true;
    } catch (e) {
      console.error(`Failed to set stat ${name}:`, e);
    }
  }
  return false;
});

ipcMain.handle('steam-store-stats', () => {
  if (client) {
    try {
      client.stats.store();
      return true;
    } catch (e) {
      console.error('Failed to store stats:', e);
    }
  }
  return false;
});

const fs = require('fs');

ipcMain.on('quit-app', () => {
  app.quit();
});

const saveDir = path.join(app.getPath('userData'), 'Saves');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

ipcMain.on('save-data-sync', (event, key, data) => {
  try {
    fs.writeFileSync(path.join(saveDir, key + '.json'), data, 'utf8');
    event.returnValue = true;
  } catch (e) {
    console.error('Save error:', e);
    event.returnValue = false;
  }
});

ipcMain.on('load-data-sync', (event, key) => {
  try {
    const filePath = path.join(saveDir, key + '.json');
    if (fs.existsSync(filePath)) {
      event.returnValue = fs.readFileSync(filePath, 'utf8');
    } else {
      event.returnValue = null;
    }
  } catch (e) {
    console.error('Load error:', e);
    event.returnValue = null;
  }
});

ipcMain.on('delete-data-sync', (event, key) => {
  try {
    const filePath = path.join(saveDir, key + '.json');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    event.returnValue = true;
  } catch (e) {
    console.error('Delete error:', e);
    event.returnValue = false;
  }
});

ipcMain.handle('toggle-fullscreen', () => {
  if (mainWindow) {
    const isFull = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFull);
    return !isFull;
  }
  return false;
});
