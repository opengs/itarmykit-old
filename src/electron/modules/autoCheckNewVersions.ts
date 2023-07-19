import { nativeStore } from '@electron/nativeStore'
import { WebContents } from 'electron'
import cron from 'node-cron'
import { DdosModules } from '../../lib/store/dropMenuAtom'
import { ModuleInfo } from '../../lib/types/version'

let task: cron.ScheduledTask | null = null

export const autoCheckNewVersion = (webContents: WebContents) => {
    if (task) {
        task.stop()
    }

    task = cron.schedule('0 * * * *', () => {
        const modules = nativeStore.getModules()
        let infoModules = []
        if (modules) {
            modules.forEach(async ({ owner, repo }) => {
                try {
                    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`
                    const response = await fetch(apiUrl)
                    //@ts-ignore
                    const releases: Modules = await response.json()

                    if (!Array.isArray(releases) || releases.length === 0) {
                        return
                    }

                    const latestRelease = releases[0]
                    const latestVersion = latestRelease.tag_name
                    const currentVersion = nativeStore.getNameModuleVersion(repo as DdosModules)

                    if (currentVersion !== latestVersion) {
                        webContents.send('newVersionModule', { repo, latestVersion })
                        infoModules.push(latestVersion)
                    }
                } catch (err) {
                    console.error(err)
                }
            })
        } else {
            if (infoModules.length === 0) {
                webContents.send('moduleInfo', ModuleInfo.NoUpdatedDetected)
            }
        }
    })
}
