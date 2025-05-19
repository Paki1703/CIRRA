const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  });

  mainWindow.loadFile('index.html');
}

ipcMain.on('open-workspace', () => {
  if (mainWindow) {
    mainWindow.webContents.send('navigate', 'work');
  }
});

ipcMain.on('chat-message', (event, message) => {
  console.log("Получено сообщение:", message);

  // Эмуляция ответа
  setTimeout(() => {
    const responses = [
      "Интересная мысль!",
      "Дайте мне подумать об этом...",
      "Хорошо, я понимаю, о чём вы.",
      "Могу помочь с этим вопросом."
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];

    event.reply('chat-response', response);
  }, 1000);
});


app.whenReady().then(createWindow);

ipcMain.on('minimize-window', () => {
  if (mainWindow && !mainWindow.isMinimized()) {
    mainWindow.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.on('start-app', () => {
  console.log("Пользователь начал работу с CIRRA");
  // Здесь можно запустить функции ИИ или открыть новое окно
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});