import { DdosModules } from '@store/dropMenuAtom'
import { Profiles, userAtomType } from '@type/user'
import axios from 'axios'
import { app, ipcMain } from 'electron'
import { ModuleInfo } from '../lib/types/version'
import { autoCheckNewVersion } from './modules/autoCheckNewVersions'
import { downloadAndInstallRelease } from './modules/download'
import { selectModule } from './modules/selectModule'
import { stopModuleProcess } from './modules/stopModule'
import { nativeStore } from './nativeStore'

export const handleIpcMain = () => {
    ipcMain.handle('signin', async (event, args) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/signin', args, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch {
            return { message: 'blad wystapil', codeError: true }
        }
    })

    ipcMain.handle('signup', async (event, args) => {
        try {
            const { email, password } = args
            const response = await axios.post(
                'http://localhost:3001/auth/signup',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            return response.data
        } catch {
            return { message: 'error occurred', codeError: true }
        }
    })

    ipcMain.on('autoStart', (_, value: boolean) => {
        app.setLoginItemSettings({
            openAtLogin: value,
            openAsHidden: value,
        })
    })

    ipcMain.handle('i18n', () => {
        const locale = app.getLocale()

        return locale
    })
    ipcMain.on('setActiveProfile', (_, args: Profiles) => {
        nativeStore.setActiveProfile(args)
    })
    ipcMain.handle('getActiveProfile', () => {
        return nativeStore.getActiveProfile()
    })
    ipcMain.on('setDataUser', (_, newUser: userAtomType) => {
        nativeStore.setUser(newUser)
    })
    ipcMain.handle('getDataUser', () => {
        return nativeStore.getUser()
    })
    ipcMain.on('startDownload', (event, args: { owner: string; repo: DdosModules }) => {
        const { owner, repo } = args
        const webContents = event.sender
        const currentVersion = nativeStore.getNameModuleVersion(repo)

        downloadAndInstallRelease(owner, repo, currentVersion, webContents)
            .then((latestRelease) => {
                if (latestRelease) {
                    nativeStore.setNameModuleVersion(repo, latestRelease)
                    webContents.send('moduleInfo', ModuleInfo.Download)
                }
            })
            .catch((error) => {
                console.error('Wystąpił błąd:', error)
                webContents.send('moduleInfo', ModuleInfo.DownloadError)
            })
    })

    ipcMain.on(
        'startDDOS',
        (event, args: { status: boolean; module: DdosModules; flags: string[] }) => {
            const webContents = event.sender
            const moduleProcess = nativeStore.getAttack()
            if (!moduleProcess && !args.status) {
                selectModule(args.module, args.flags, webContents)
            } else {
                stopModuleProcess(moduleProcess)
                nativeStore.setAttack(false)
            }
        }
    )
    ipcMain.on('setTheme', (_, theme: boolean) => {
        nativeStore.setTheme(theme)
    })
    ipcMain.handle('getTheme', () => {
        const theme = nativeStore.getTheme()
        if (theme === undefined) {
            nativeStore.setTheme(false)
            return false
        } else {
            return theme
        }
    })

    ipcMain.handle('getVersion', (_, repo: DdosModules) => {
        return nativeStore.getNameModuleVersion(repo)
    })

    ipcMain.handle('getAutoStart', () => {
        return nativeStore.getAutoStart()
    })

    ipcMain.on('setAutoStart', (_, autoStart: boolean) => {
        nativeStore.setAutoStart(autoStart)
    })

    ipcMain.handle('getHideTrail', () => {
        return nativeStore.getHideTrail()
    })

    ipcMain.on('setHideTrail', (_, hideTrail: boolean) => {
        nativeStore.setHideTrail(hideTrail)
    })
    ipcMain.on('autoCheckNewVersion', (event) => {
        const webContents = event.sender
        autoCheckNewVersion(webContents)
    })
    ipcMain.on('resetDdos', (event, args: { module: DdosModules; flags: string[] }) => {
        const webContents = event.sender
        selectModule(args.module, args.flags, webContents)
    })
}
