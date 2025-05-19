const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize-window'),
  close: () => ipcRenderer.send('close-window'),
  startApp: () => ipcRenderer.send('start-app'),
  workApp: () => ipcRenderer.send('open-workspace'),
  onNavigate: (callback) => ipcRenderer.on('navigate', callback),
  sendChatMessage: (message) => ipcRenderer.send('chat-message', message)
});