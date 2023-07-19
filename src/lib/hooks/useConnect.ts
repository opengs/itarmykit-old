import { errorAtom, progressAtom } from '@store/downloaderAtom'
import {
    convertBytes,
    efficiencyAtom,
    incomingTrafficAtom,
    logsAtom,
    outgoingTrafficAtom,
    setChartAtom,
    timeAttackAtom,
} from '@store/statisticsAtom'
import { attackDdosAtom } from '@store/switchsAtom'
import { DdosType } from '@type/ddos'
import { ModuleInfo, StatusInfo } from '@type/version'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { moduleInfoi18next } from '../utils'

export const useConnect = () => {
    const setEfficiency = useSetAtom(efficiencyAtom)
    const setIncomingTraffic = useSetAtom(incomingTrafficAtom)
    const setOutgoingTraffic = useSetAtom(outgoingTrafficAtom)
    const setTimeAttack = useSetAtom(timeAttackAtom)
    const setChart = useSetAtom(setChartAtom)
    const setLogs = useSetAtom(logsAtom)
    const setError = useSetAtom(errorAtom)
    const setProgress = useSetAtom(progressAtom)
    const attack = useAtomValue(attackDdosAtom)
    const { t } = useTranslation()

    useEffect(() => {
        if (!attack) {
            toast.success(t('moduleInfo.attackOFF'))
        }
    }, [attack])

    useEffect(() => {
        window.api.moduleInfo((_, moduleInfo: ModuleInfo) => {
            const { name, type } = moduleInfoi18next(moduleInfo)

            if (type === StatusInfo.SUCCESS) {
                toast.success(t(name))
            } else if (type === StatusInfo.INFO) {
                toast(t(name))
            } else {
                if (name === 'moduleInfo.downloadError') {
                    setError(true)
                }
                toast.error(t(name))
            }
        })

        window.api.attackInfo((_, args: DdosType) => {
            const { total } = args
            const efficiencyPercent = (total.responses_received / total.requests_sent) * 100

            setTimeAttack(total.requests_attempted)
            setEfficiency(efficiencyPercent.toFixed(2))
            setIncomingTraffic(convertBytes(total.bytes_received))
            setOutgoingTraffic(convertBytes(total.bytes_sent))
            setChart(args.total_since_last_report.requests_attempted)
        })

        window.api.moduleLogs((_, args: string) => {
            setLogs((prevLogs) => prevLogs + '\n' + args)
        })

        window.api.downloadProgress((_, message: number) => {
            setError(false)
            setProgress(message)
        })

        window.api.newVersionInfo((_, args: { repo: string; latestVersion: string }) => {
            toast(t(`modules.newVersion`, { nameModule: args.repo, version: args.latestVersion }))
        })
    }, [])
}
