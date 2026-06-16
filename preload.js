const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('steamAPI', {
  getName: () => ipcRenderer.invoke('steam-get-name'),
  getStat: (name) => ipcRenderer.invoke('steam-get-stat', name),
  unlockAchievement: (id) => ipcRenderer.invoke('steam-activate-achievement', id),
  setStat: (name, value) => ipcRenderer.invoke('steam-set-stat', name, value),
  storeStats: () => ipcRenderer.invoke('steam-store-stats'),
  quitApp: () => ipcRenderer.send('quit-app'),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),
  saveDataSync: (key, data) => ipcRenderer.sendSync('save-data-sync', key, data),
  loadDataSync: (key) => ipcRenderer.sendSync('load-data-sync', key),
  deleteDataSync: (key) => ipcRenderer.sendSync('delete-data-sync', key),
  isPC: true
});
