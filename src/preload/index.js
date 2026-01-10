import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  processMessageToChatGPT: (chatMessages) => {
    return ipcRenderer.invoke('process-message-to-chatgpt', chatMessages) // arrow function with {} requires explicit "return" to return values
  },
  processMessageToGemini: (chatMessage) =>
    ipcRenderer.invoke('process-message-to-gemini', chatMessage) // arrow function without {} automatically return values
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
