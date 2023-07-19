import { DdosModules } from '@store/dropMenuAtom'
import { newUserAtomType, userAtomType } from '@type/user'
import { contextBridge, ipcRenderer } from 'electron'

export const contextApi = {
    signin: async (value: userAtomType): Promise<{ message: string; codeError: boolean }> =>
        await ipcRenderer.invoke('signin', value),
    signup: async (value: newUserAtomType): Promise<{ message: string; codeError: boolean }> =>
        await ipcRenderer.invoke('signup', value),
    autoStart: (value: boolean) => ipcRenderer.send('autoStart', value),
    getLocale: (): Promise<string> => ipcRenderer.invoke('i18n'),
    setActiveProfile: (value: any) => ipcRenderer.send('setActiveProfile', value),
    getActiveProfile: (): Promise<string> => ipcRenderer.invoke('getActiveProfile'),
    setDataUser: (value: userAtomType) => ipcRenderer.send('setDataUser', value),
    getDataUser: (): Promise<any> => ipcRenderer.invoke('getDataUser'),
    setAutoUpdater: (value: boolean) => ipcRenderer.send('setAutoUpdater', value),
    getAutoUpdater: () => ipcRenderer.invoke('getAutoUpdater'),
    startDownload: (value: { owner: string; repo: string }) =>
        ipcRenderer.send('startDownload', value),
    downloadProgress: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('download-progress', callback),
    moduleCurrentVersion: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('currentVersion', callback),
    attackModule: (args: { status: boolean; module: string; flags: string[] }) =>
        ipcRenderer.send('startDDOS', args),
    moduleInfo: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('moduleInfo', callback),
    attackInfo: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('attackInfo', callback),
    hideWindow: (value: boolean) => ipcRenderer.send('hideWindow', value),
    setTheme: (value: number) => ipcRenderer.send('setTheme', value),
    getTheme: () => ipcRenderer.invoke('getTheme'),
    moduleLogs: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('moduleLogs', callback),
    getVersion: (repo: string) => ipcRenderer.invoke('getVersion', repo),
    getAutoStart: () => ipcRenderer.invoke('getAutoStart'),
    setAutoStart: (autoStart: boolean) => ipcRenderer.send('setAutoStart', autoStart),
    getHideTrail: () => ipcRenderer.invoke('getHideTrail'),
    setHideTrail: (hideTrail: boolean) => ipcRenderer.send('setHideTrail', hideTrail),
    autoCheckNewVersion: () => ipcRenderer.send('autoCheckNewVersion'),
    newVersionInfo: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
        ipcRenderer.on('newVersionModule', callback),
    resetDdos: (value: { module: DdosModules; flags: string[] }) =>
        ipcRenderer.send('resetDdos', value),
}

contextBridge.exposeInMainWorld('api', contextApi)
