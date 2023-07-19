import { Profiles } from '@type/user'
import { ModuleInfo, StatusInfo } from '@type/version'

export const moduleInfoi18next = (
    moduleInfo: ModuleInfo
): {
    name: string
    type: StatusInfo
} => {
    switch (moduleInfo) {
        case ModuleInfo.ApiGitHubError:
            return { name: 'moduleInfo.apiGitHubError', type: StatusInfo.ERROR }
            break
        case ModuleInfo.AttackOFF:
            return { name: 'moduleInfo.attackOFF', type: StatusInfo.SUCCESS }
            break
        case ModuleInfo.CurrentVersion:
            return { name: 'moduleInfo.currentVersion', type: StatusInfo.INFO }
            break
        case ModuleInfo.ModuleNotFound:
            return { name: 'moduleInfo.moduleNotFound', type: StatusInfo.INFO }
            break
        case ModuleInfo.NoAction:
            return { name: 'moduleInfo.noAction', type: StatusInfo.ERROR }
            break
        case ModuleInfo.NoUpdatedDetected:
            return { name: 'moduleInfo.noUpdatedDetected', type: StatusInfo.INFO }
            break
        case ModuleInfo.NotFoundPlatform:
            return { name: 'moduleInfo.notFoundPlatform', type: StatusInfo.ERROR }
            break
        case ModuleInfo.Unsupported:
            return { name: 'moduleInfo.unsupported', type: StatusInfo.INFO }
            break
        case ModuleInfo.Download:
            return { name: 'moduleInfo.download', type: StatusInfo.SUCCESS }
            break
        case ModuleInfo.DownloadError:
            return { name: 'moduleInfo.downloadError', type: StatusInfo.ERROR }
            break
        default:
            return { name: 'moduleInfo.noSupport', type: StatusInfo.INFO }
    }
}

export const configFlags = (profile: Profiles, time: boolean, attackScale?: number): string[] => {
    switch (profile) {
        case Profiles.Home:
            return [
                '--log-format',
                'json',
                '--refresh-interval',
                `${time ? '1h' : '1m'}`,
                '--scale',
                '0.1',
                '--enable-primitive',
                'false',
            ]
        case Profiles.Work:
            return [
                '--log-format',
                'json',
                '--refresh-interval',
                `${time ? '1h' : '1m'}`,
                '--scale',
                '0.2',
                '--enable-primitive',
                'false',
            ]
        case Profiles.Institiution:
            return [
                '--log-format',
                'json',
                '--refresh-interval',
                `${time ? '1h' : '1m'}`,
                '--scale',
                '0.5',
                '--enable-primitive',
                'false',
            ]
        case Profiles.Advanced:
            return [
                '--log-format',
                'json',
                '--refresh-interval',
                `${time ? '1h' : '1m'}`,
                '--scale',
                `${attackScale ? attackScale : 1}`,
                '--enable-primitive',
                'true',
            ]
    }
}
