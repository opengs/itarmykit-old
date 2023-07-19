import {
    efficiencyAtom,
    incomingTrafficAtom,
    outgoingTrafficAtom,
    timeAttackAtom,
} from '@store/statisticsAtom'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Icon1, Icon2, Icon3, Icon4 } from '../images/icons'

const Session: React.FC = () => {
    const efficiency = useAtomValue(efficiencyAtom)
    const incomingTraffic = useAtomValue(incomingTrafficAtom)
    const outgoingTraffic = useAtomValue(outgoingTrafficAtom)
    const timeAttack = useAtomValue(timeAttackAtom)
    const { t } = useTranslation()
    return (
        <div className='bg-[#D0DAF5] transition ease-in delay-50 dark:bg-[#293444] w-[560px] h-[90px] rounded-lg drop-shadow-md'>
            <h1 className='py-2 px-4 font-bold dark:text-white'>{t('dashboard.session.title')}</h1>

            <div className='flex justify-between px-5 pt-1'>
                <div className='flex flex-row'>
                    <div className='flex justify-center items-center mr-2'>
                        <Icon1 />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[12px] dark:text-white'>
                            {t('dashboard.session.timeAttacked')}
                        </p>
                        <p className='text-[12px] font-bold dark:text-white'>{timeAttack}</p>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex justify-center items-center mr-2'>
                        <Icon2 />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[12px] dark:text-white'>
                            {t('dashboard.session.efficiency')}
                        </p>
                        <p className='text-[12px] font-bold dark:text-white'>{efficiency}%</p>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex justify-center items-center mr-2'>
                        <Icon3 />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[12px] dark:text-white'>
                            {t('dashboard.session.incomingTraffic')}
                        </p>
                        <p className='text-[12px] font-bold dark:text-white'>{incomingTraffic}</p>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex justify-center items-center mr-2'>
                        <Icon4 />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[12px] dark:text-white'>
                            {t('dashboard.session.outgoingTraffic')}
                        </p>
                        <p className='text-[12px] font-bold dark:text-white'>{outgoingTraffic}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Session
