import { app, Menu, MenuItemConstructorOptions, nativeImage, Tray } from 'electron'
import { join } from 'node:path'
import { mainWindow } from '.'

let isMainWindowVisible = true

export const newTray = () => {
    const iconPath = join(__dirname, '../../src/lib/images/icons/logo.png')
    const iconImage = nativeImage.createFromPath(iconPath)
    const tray = new Tray(iconImage)
    tray.setToolTip('ITArmy')

    tray.on('click', () => {
        mainWindow?.isVisible() ? mainWindow.hide() : mainWindow?.show()
    })

    const updateTrayMenu = () => {
        const showHideLabel = isMainWindowVisible ? 'HIDE' : 'SHOW'

        const template: MenuItemConstructorOptions[] = [
            { label: 'DDOS ON', click: () => {} },
            {
                label: showHideLabel,
                click: () => {
                    if (mainWindow?.isVisible()) {
                        mainWindow.hide()
                        isMainWindowVisible = false
                    } else {
                        mainWindow?.show()
                        isMainWindowVisible = true
                    }
                    updateTrayMenu()
                },
            },
            { type: 'separator' },
            { label: 'EXIT', click: () => app.exit() },
        ]

        const contextMenu = Menu.buildFromTemplate(template)
        tray.setContextMenu(contextMenu)
    }

    updateTrayMenu()
}
