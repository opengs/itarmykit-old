import { app, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { join } from 'path'
import { handleIpcMain } from './handleIpcMain'
import { stopModuleProcess } from './modules/stopModule'
import { nativeStore } from './nativeStore'
import { newTray } from './tray'
require('update-electron-app')()
require('dotenv').config()

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
    app.quit()
}

export let mainWindow: BrowserWindow | null = null

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        height: 540,
        width: 960,
        resizable: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            devTools: false,
        },
    })

    const iconPath = join(__dirname, '../../src/lib/images/icons/logo.png')
    const iconImage = nativeImage.createFromPath(iconPath)
    mainWindow.setIcon(iconImage)

    mainWindow.setMenu(null)

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.webContents.openDevTools()

    nativeStore.setAttack(false)

    handleIpcMain()
    newTray()

    require('update-electron-app')({
        repo: 'opengs/itarmykit',
        notifyUser: true,
        setInterval: '5 minutes',
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('will-quit', () => {
    const moduleProcess = nativeStore.getAttack()
    stopModuleProcess(moduleProcess)
})

ipcMain.on('hideWindow', (event, args) => {
    if (args === true) {
        mainWindow.on('close', (event) => {
            event.preventDefault()
            mainWindow.hide()
        })

        mainWindow.on('closed', () => {
            mainWindow = null
        })

        app.on('activate', () => {
            if (mainWindow === null) {
                createWindow()
            } else {
                mainWindow.show()
            }
        })
    } else {
        mainWindow.removeAllListeners('close')
    }
})
