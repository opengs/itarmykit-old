import { WebContents } from 'electron'
import { DdosModules } from '../../lib/store/dropMenuAtom'
import { DdosSchema } from '../../lib/types/ddos'
import { AbstractModule } from './AbstractModule'

const parseMultipleJSON = (input: string) => {
    const fragments = input.split('\n')
    const result = []

    for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i].trim()

        if (fragment.length > 0) {
            try {
                const parsedJSON = JSON.parse(fragment)
                result.push(parsedJSON)
            } catch (error) {
                console.error('JSON parsing error:', error)
            }
        }
    }

    return result
}

export class MHDDOS_PROXY extends AbstractModule {
    protected handleOutput(data: Buffer): void {}

    protected handleErrors(buffer: Buffer): void {
        const decodedString = buffer.toString('utf-8')
        const parsedJSONs = parseMultipleJSON(decodedString)

        parsedJSONs.forEach((element) => {
            const safeInfoSchema = DdosSchema.safeParse(element)
            if (safeInfoSchema.success) {
                this.webContents.send('attackInfo', safeInfoSchema.data)
            }
        })

        this.webContents.send('moduleLogs', decodedString)
    }

    protected handleExit(code: number): void {
        // this.webContents.send('moduleInfo', ModuleInfo.AttackOFF)
    }
}

export const startMHDDOS_PROXY = (
    ddosModules: DdosModules,
    flags: string[],
    webContents: WebContents
) => {
    try {
        const attack = new MHDDOS_PROXY(ddosModules, flags, webContents)
        attack.startModule()
    } catch (err) {
        console.log(err)
    }
}
