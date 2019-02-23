'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 660,
    minHeight: 600,
    minWidth: 1000,
    width: 1000,
    // transparent: true,
    // frame: false,
    titleBarStyle: 'hidden',
    // titleBarStyle: 'hiddenInset',
    // titlebarAppearsTransparent: true,
    center: true
    // 'standard-window': false
    // backgroundColor: '#2e2c29'
  })

  mainWindow.loadURL(winURL)
  // console.log(app.getPath('userData'))
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // mainWindow.on('onbeforeunload', (e) => {
  //   console.log('I do not want to be closed')
  //   e.returnValue = false
  //   // return 'Are you sure you want to exit?'
  // })
  console.log(app.getLocale())
  mainWindow.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('openConsole', function (e, data) {
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/console'
    : `file://${__dirname}/index.html#/console`
  let win = new BrowserWindow({ width: 1000, height: 620, webPreferences: {webSecurity: false} })
  win.on('close', function () { win = null })
  console.log(modalPath)
  win.loadURL(modalPath)
  event.returnValue = 'pong'
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
