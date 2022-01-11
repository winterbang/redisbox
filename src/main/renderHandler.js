const { ipcMain, BrowserWindow} = require('electron')
ipcMain.handle('subWindow', async (event, arg) => {
    console.log(BrowserWindow.fromId(1), '=========')
    const parent = BrowserWindow.fromId(1)
    const win = new BrowserWindow({ 
        parent, 
        modal: true,
        width: 800, 
        height: 600, 
        frame: true, 
        closable: true,
        maximizable: false,
        titleBarStyle: 'hidden',
        resizable: true
    })
    // const win = new BrowserWindow({ width: 800, height: 600 })
    console.log(win)
    // Load a remote URL
    win.loadURL('http://localhost:3000/new_connection')
    // win.loadURL('')
})