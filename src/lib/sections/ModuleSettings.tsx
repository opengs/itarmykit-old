import { logsAtom } from '@store/statisticsAtom'
import { attackScaleAtom } from '@store/switchsAtom'
import { activeProfileAtom } from '@store/userAtom'
import { Profiles } from '@type/user'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const ModuleSettings: React.FC = () => {
    const logs = useAtomValue(logsAtom)
    const logBoxRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const [attackScale, setAttackScale] = useAtom(attackScaleAtom)
    const profile = useAtomValue(activeProfileAtom)

    useEffect(() => {
        if (logBoxRef.current) {
            logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div className='flex flex-col justify-between h-full w-full'>
            <div>
                <p className='text-[14px]] dark:text-white'>{t('modules.logs')}</p>
                <div
                    ref={logBoxRef}
                    className='w-[300px] h-[109px] bg-[#E7EDFA] rounded-lg drop-shadow-md text-[10px] overflow-y-scroll no-scrollbar p-[2px]'
                >
                    {logs}
                </div>
            </div>

            {profile === Profiles.Advanced && (
                <div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-5 items-center'>
                            <p className='text-[14px] dark:text-white'>{t('modules.scale')}:</p>
                            <p className='text-[16px] font-bold dark:text-white'>{attackScale}</p>
                        </div>

                        <div className=''>
                            <input
                                type='range'
                                step='0.1'
                                min='0'
                                max='10'
                                value={attackScale}
                                onChange={(e) => setAttackScale(Number(e.currentTarget.value))}
                                className='slider w-full bg-[#334155] appearance-none rounded-lg h-3'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModuleSettings
