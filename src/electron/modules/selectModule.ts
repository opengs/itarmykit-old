import { WebContents } from 'electron'
import { DdosModules } from '../../lib/store/dropMenuAtom'
import { startDB1000N } from './DB1000N'
import { startMHDDOS_PROXY } from './MHDDOS_PROXY'

export const selectModule = (
    ddosModules: DdosModules,
    flags: string[],
    webContents: WebContents
) => {
    switch (ddosModules) {
        case DdosModules.DB1000N:
            startDB1000N(ddosModules, flags, webContents)
            break
        case DdosModules.MHDDOS_PROXY:
            startMHDDOS_PROXY(ddosModules, flags, webContents)
            break
        case DdosModules.GRAPES:
            console.log('no module')
            break
        case DdosModules.PINELE:
            console.log('no module')
            break
        case DdosModules.WANDAL:
            console.log('no module')
            break
        case DdosModules.WERSR:
            console.log('no module')
            break
        default:
            console.log('no module')
            break
    }
}
