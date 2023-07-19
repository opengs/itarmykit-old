import { nativeStore } from '@electron/nativeStore'
import { app, WebContents } from 'electron'
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { DdosModules } from '../../lib/store/dropMenuAtom'
import { stopModuleProcess } from './stopModule'

export abstract class AbstractModule {
    modulePath: string
    flags: string[]
    webContents: WebContents
    moduleDDos: DdosModules
    executablePath: string
    moduleProcess: ChildProcessWithoutNullStreams

    constructor(moduleDDos: DdosModules, flags: string[], webContents: WebContents) {
        this.flags = flags
        this.webContents = webContents
        this.moduleDDos = moduleDDos
    }

    protected abstract handleOutput(data: Buffer): void

    protected abstract handleErrors(buffer: Buffer): void

    protected abstract handleExit(code: number): void

    protected getModulePath(): void {
        this.modulePath = path.join(
            app.getPath('appData'),
            'itarmy',
            'installed',
            this.moduleDDos.toLocaleLowerCase()
        )
    }

    protected getExecutablePath(): void {
        this.getModulePath()

        if (os.platform() === 'win32') {
            this.executablePath = `${this.modulePath}.exe`
        } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
            this.executablePath = this.modulePath
        } else {
            this.webContents.send('moduleInfo', 'Unsupported operating system.')
            throw new Error('Unsupported operating system.')
        }

        if (!fs.existsSync(this.executablePath)) {
            this.webContents.send('moduleInfo', 'Module not found.')
            throw new Error('Module not found.')
        }
    }

    public startModule() {
        this.getExecutablePath()
        const lastModuleProcces = nativeStore.getAttack()
        if (lastModuleProcces) {
            stopModuleProcess(lastModuleProcces)
        }

        this.moduleProcess = spawn(this.executablePath, this.flags)
        nativeStore.setAttack(this.moduleProcess)

        this.moduleProcess.stdout.on('data', (buffer) => {
            this.handleOutput(buffer)
        })

        this.moduleProcess.stderr.on('data', (buffer) => {
            this.handleErrors(buffer)
        })

        this.moduleProcess.on('error', (error) => {
            throw new Error(`Program launch error: ${error}`)
        })

        this.moduleProcess.on('exit', (code) => {
            this.handleExit(code)
        })
    }
}
