import { app, shell, BrowserWindow, ipcMain,screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'


const primaryDisplay = screen.getPrimaryDisplay()
const { width, height } = primaryDisplay.workAreaSize // size of the computer screen


function createWindow() {
  // Create the browser window.


//   x number - The x coordinate of the origin of the rectangle (must be an integer).
// y number - The y coordinate of the origin of the rectangle (must be an integer).
// width number - The width of the rectangle (must be an integer).
// height number - The height of the rectangle (must be an integer).
  const mainWindow = new BrowserWindow({
<<<<<<< Updated upstream
    width: 350,
    height: 550,
=======
    
>>>>>>> Stashed changes
    show: false,
    devTools : true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
    
  })
<<<<<<< Updated upstream
  

=======
 
  let bounds = mainWindow.getBounds() // size of the application window
  mainWindow.setPosition(width - bounds.width, height - bounds.height)


  mainWindow.resizable = false
  mainWindow.setSkipTaskbar(true)
>>>>>>> Stashed changes
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  mainWindow.loadURL('https://cpall.ekoapp.com/recents/group/6669208d070d2e1ffd9d7e48/chat/t/6669208d070d2e53b59d7e4a')

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
