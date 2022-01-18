const path = require('path');
const { app, BrowserWindow } = require('electron')
require('./renderHandler')
// let watcher = require('./monitor')

// console.log(process)

if(process.env.NODE_ENV !== 'production') {
  const debug = require('electron-debug')
  debug()
}
const file_path = path.join(__dirname, '..', '..', 'dist/renderer/index.html')
const URL = process.env.NODE_ENV === 'production' ? `file://${file_path}` : 'http://localhost:3000'
// const URL = `file://${file_path}`

let win 
function creatWindow(params) {
  win = new BrowserWindow({
    id: 1,
    height: 670,
    minHeight: 670,
    minWidth: 1000,
    width: 1000,
    // transparent: true,
    backgroundColor: '#99FFFFFF',
    opacity: 0.98,
    // titleBarStyle: 'hidden',
    trafficLightPosition: { x: 20, y: 20 },
    // titleBarOverlay: {
    //   color: '#2f3241',
    //   symbolColor: '#74b1be'
    // },
    trafficLightPosition: {
      x: 10,
      y: 5
    },
    movable: true,
    webPreferences: {
      contextIsolation: false, // 将contextIsolation 上下文是否是独立的设置为false，否则组件中使用window对象和preload的对象不是一个对象
      preload: __dirname +  '/preload.js',
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  // if(process.env.NODE_ENV === 'production') {
  //   win.loadFile('index.html')
  // } else {
  //   win.loadURL(URL)
  // }
  win.loadURL(URL)
  // watcher(win)
}
app.whenReady().then(() => {
  creatWindow()
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) creatWindow()
  })
})

app.on('close', () => {
  win = null
})

app.on('window-all-close', () => {
  if(process.platform !== 'darwin') app.quit()
})
