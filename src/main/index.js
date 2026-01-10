import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
<<<<<<< Updated upstream
=======
const { GoogleGenerativeAI } = require('@google/generative-ai')

const dotenv = require('dotenv')

dotenv.config()
>>>>>>> Stashed changes

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 550,
    // width: 800,
    // height: 800,
    show: false,
    autoHideMenuBar: true,
    frame: false, 
    

    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.setPosition(925, 120)
  mainWindow.resizable = false
  mainWindow.setSkipTaskbar(true)
  mainWindow.on('ready-to-show', () => {
  mainWindow.show()
    
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // mainWindow.loadFile('./src/renderer/chat.jsx')
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // mainWindow.loadURL('https://cpall.ekoapp.com/recents/group/6669208b1ecfde693c96d366/chat/t/6669208b1ecfde19a296d368')
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
<<<<<<< Updated upstream
=======

ipcMain.handle('process-message-to-chatgpt', async (event, chatMessages) => {
  const API_KEY = process.env.OPENAI_API_KEY

  const apiMessages = chatMessages.map((messageObject) => {
    let role = ''
    if (messageObject.sender === 'ChatGPT') {
      role = 'assistant'
    } else {
      role = 'user'
    }
    return { role: role, content: messageObject.message }
  })

  const apiRequestBody = {
    model: 'gpt-3.5-turbo',
    content: apiMessages
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(apiRequestBody)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`API error! message: ${data.error.message}`)
    }

    console.log(data)
    return data
  } catch (error) {
    console.error('Error:', error.message)
  }
})

ipcMain.handle('process-message-to-gemini', async (event, chatMessage) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent(chatMessage.message);
  return result.response.text();
  // const API_KEY = process.env.GEMINI_API_KEY
  // const genAI = new GoogleGenerativeAI(API_KEY)
  // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  // const prompt = chatMessage.message

  // const result = await model.generateContent(prompt)
  // const response = await result.response
  // const text = response.text()
  // //console.log(text)
  // return text
})
>>>>>>> Stashed changes
