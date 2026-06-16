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

const fs = require('fs');
const saveDir = path.join(app.getPath('userData'), 'Saves');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}
const logPath = path.join(saveDir, 'steam_debug.log');

function logDebug(msg) {
  const time = new Date().toISOString();
  const line = `[${time}] ${msg}\n`;
  console.log(msg);
  try {
    fs.appendFileSync(logPath, line, 'utf8');
  } catch (e) {
    // ignore
  }
}

// Clean up old log on start
try {
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
} catch (e) {}

function initializeSteam() {
  try {
    logDebug('Initializing Steamworks for AppID 4353510...');
    client = steamworks.init(4353510);
    if (client) {
      logDebug(`Steamworks initialized successfully. Player Name: ${client.localplayer.getName()}, SteamID: ${client.localplayer.getSteamId().steamId.toString()}`);
      // Request stats from Steam servers
      client.stats.request();
    } else {
      logDebug('Steamworks init returned null or undefined client.');
    }
  } catch (e) {
    logDebug(`Steamworks failed to initialize: ${e.message}\n${e.stack}`);
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
  const name = client ? client.localplayer.getName() : 'Player';
  logDebug(`IPC: steam-get-name -> ${name}`);
  return name;
});

ipcMain.handle('steam-get-stat', (event, name) => {
  if (client) {
    try {
      const val = client.stats.get(name);
      logDebug(`IPC: steam-get-stat(${name}) -> ${val}`);
      return val;
    } catch (e) {
      logDebug(`IPC: Failed to get stat ${name}: ${e.message}`);
    }
  } else {
    logDebug(`IPC: steam-get-stat(${name}) requested but Steam client is not initialized.`);
  }
  return 0;
});

ipcMain.handle('steam-activate-achievement', (event, achievementId) => {
  if (client) {
    try {
      logDebug(`IPC: steam-activate-achievement(${achievementId}) requested...`);
      const success = client.achievement.activate(achievementId);
      if (success) {
        logDebug(`IPC: Achievement activated successfully on Steam client: ${achievementId}`);
        client.stats.store(); // Commit immediately
        logDebug(`IPC: Stats stored after achievement activation.`);
      } else {
        logDebug(`IPC: Achievement activation returned false (already unlocked or invalid ID): ${achievementId}`);
      }
      return success;
    } catch (e) {
      logDebug(`IPC: Failed to activate achievement ${achievementId}: ${e.message}`);
    }
  } else {
    logDebug(`IPC: steam-activate-achievement(${achievementId}) requested but Steam client is not initialized.`);
  }
  return false;
});

ipcMain.handle('steam-set-stat', (event, name, value) => {
  if (client) {
    try {
      client.stats.set(name, value);
      logDebug(`IPC: steam-set-stat(${name}, ${value}) set successfully.`);
      return true;
    } catch (e) {
      logDebug(`IPC: Failed to set stat ${name}: ${e.message}`);
    }
  } else {
    logDebug(`IPC: steam-set-stat(${name}, ${value}) requested but Steam client is not initialized.`);
  }
  return false;
});

ipcMain.handle('steam-store-stats', () => {
  if (client) {
    try {
      client.stats.store();
      logDebug('IPC: steam-store-stats committed successfully.');
      return true;
    } catch (e) {
      logDebug(`IPC: Failed to store stats: ${e.message}`);
    }
  } else {
    logDebug('IPC: steam-store-stats requested but Steam client is not initialized.');
  }
  return false;
});


ipcMain.on('quit-app', () => {
  app.quit();
});


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
