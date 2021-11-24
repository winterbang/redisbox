const { app, BrowserWindow } = require('electron')
// let watcher = require('./monitor')
const debug = require('electron-debug')
debug()
console.log('process.env.NODE_ENV')
const URL = process.env.NODE_ENV === 'production' ? `file://${__dirname}/index.html` : 'http://localhost:3000/'

let win 
function creatWindow(params) {
  win = new BrowserWindow({
    height: 670,
    minHeight: 670,
    minWidth: 1000,
    width: 1000,
    titleBarStyle: 'hidden',
    movable: true,
    webPreferences: {
      contextIsolation: false, // 将contextIsolation 上下文是否是独立的设置为false，否则组件中使用window对象和preload的对象不是一个对象
      preload: __dirname +  '/preload.js'
    }
  })

  if(process.env.NODE_ENV === 'production') {
    win.loadFile('index.html')
  } else {
    win.loadURL(URL)
  }

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