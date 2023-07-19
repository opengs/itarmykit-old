import { nativeStore } from '@electron/nativeStore'
import { Modules } from '@type/realese'
import AdmZip from 'adm-zip'
import { app, WebContents } from 'electron'
import fetch from 'node-fetch'
import fs from 'node:fs'
import path from 'node:path'
import tar from 'tar'
import { ModuleInfo } from '../../lib/types/version'

const downloadFile = async (
    downloadUrl: string,
    filePath: string,
    progressCallback: (value: number) => void
) => {
    const response = await fetch(downloadUrl)
    const fileStream = fs.createWriteStream(filePath)
    const contentLength = +response.headers.get('content-length')
    let downloadedBytes = 0

    response.body.on('data', (chunk) => {
        downloadedBytes += chunk.length
        const progress = (downloadedBytes / contentLength) * 100

        progress >= 100 ? progressCallback(0) : progressCallback(progress)
    })

    await new Promise<void>((resolve, reject) => {
        response.body.pipe(fileStream)
        response.body.on('error', (err: any) => {
            reject(err)
        })
        fileStream.on('finish', function () {
            resolve()
        })
    })
}

const installedFile = async (webContents: WebContents, downloadUrl: string, filePath: string) => {
    webContents.send('download-progress', 0)

    await downloadFile(downloadUrl, filePath, (progress) => {
        webContents.send('download-progress', progress)
    })

    const installedFilePath = path.join(app.getPath('appData'), 'itarmy', 'installed')
    if (fs.existsSync(installedFilePath)) {
        if (filePath.endsWith('.zip')) {
            const zip = new AdmZip(filePath)
            zip.extractAllTo(installedFilePath)
        } else if (filePath.endsWith('.tar.gz')) {
            tar.extract({
                file: filePath,
                cwd: installedFilePath,
            })
        }
    } else {
        fs.mkdirSync(installedFilePath, { recursive: true })
        if (filePath.endsWith('.zip')) {
            const zip = new AdmZip(filePath)
            zip.extractAllTo(installedFilePath)
        } else if (filePath.endsWith('.tar.gz')) {
            tar.extract({
                file: filePath,
                cwd: installedFilePath,
            })
        }
    }
}

export const downloadAndInstallRelease = async (
    owner: string,
    repo: string,
    currentVersion: string | unknown,
    webContents: WebContents
) => {
    try {
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`
        const response = await fetch(apiUrl)
        //@ts-ignore
        const releases: Modules = await response.json()
        nativeStore.setModules({ owner, repo })

        if (!Array.isArray(releases) || releases.length === 0) {
            webContents.send('moduleInfo', ModuleInfo.NoAction)
            return
        }

        const latestRelease = releases[0]
        const latestVersion = latestRelease.tag_name

        if (currentVersion === latestVersion) {
            webContents.send('moduleInfo', ModuleInfo.CurrentVersion)
            return
        }

        const asset = latestRelease.assets.find((asset) => {
            const assetName = asset.name.toLowerCase()

            let arch = ''
            let platform = ''

            if (process.arch === 'x64' && process.platform === 'win32') {
                arch = 'amd64'
                platform = 'windows'
            } else if (process.arch === 'x64') {
                arch = 'amd64'
                platform = process.platform
            } else {
                arch = process.arch
                platform = process.platform
            }

            return assetName.includes(arch) && assetName.includes(platform)
        })

        if (!asset) {
            webContents.send('moduleInfo', ModuleInfo.NotFoundPlatform)
            return
        }

        const downloadUrl = asset.browser_download_url
        const fileName = asset.name
        const directoryPath = path.join(app.getPath('appData'), 'itarmy', 'uninstalled')
        const filePath = path.join(app.getPath('appData'), 'itarmy', 'uninstalled', fileName)
        if (fs.existsSync(directoryPath)) {
            installedFile(webContents, downloadUrl, filePath)
        } else {
            fs.mkdirSync(directoryPath, { recursive: true })
            installedFile(webContents, downloadUrl, filePath)
        }

        return latestRelease.tag_name
    } catch (err) {
        webContents.send('moduleInfo', ModuleInfo.ApiGitHubError)
    }
}
