const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('steamAPI', {
  getName: () => ipcRenderer.invoke('steam-get-name'),
  unlockAchievement: (id) => ipcRenderer.invoke('steam-unlock-achievement', id),
  quitApp: () => ipcRenderer.send('quit-app'),
  isPC: true
});
