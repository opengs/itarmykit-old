import { Button } from '@components/Buttons'
import { Chart } from '@components/Chart'
import Dropmenu from '@components/Dropmenu'
import ModuleModal from '@components/ModuleModal'
import Radio from '@components/Radio'
import { Switch } from '@components/Switch'
import { dropMenuAtom } from '@store/dropMenuAtom'
import { attackDdosAtom, themeModeAtom } from '@store/switchsAtom'
import { activeProfileAtom, profileFlagAtom, timeChartAtom } from '@store/userAtom'
import { motion } from 'framer-motion'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnect } from '../hooks/useConnect'
import Session from './Session'
import Settings from './Settings'

const Home: React.FC = () => {
    const theme = useAtomValue(themeModeAtom)
    const [attack, setAttack] = useAtom(attackDdosAtom)
    const [click, setClick] = useState<boolean>(false)
    const [text, setText] = useState<'Settings' | 'Dashboard'>('Settings')
    const { t } = useTranslation()
    const nameModule = useAtomValue(dropMenuAtom)
    const profile = useAtomValue(activeProfileAtom)
    const flags = useAtomValue(profileFlagAtom)
    const [timeChart, setTimeChart] = useAtom(timeChartAtom)
    useConnect()

    const ChangeSection = () => {
        setClick((prevChecked) => !prevChecked)
        if (text === 'Settings') {
            setText('Dashboard')
        } else {
            setText('Settings')
        }
    }

    const handleAttack = () => {
        if (nameModule && profile) {
            setAttack(!attack)
            window.api.attackModule({ status: attack, module: nameModule, flags })
        }
    }

    return (
        <div className='w-[870px] h-[380px] flex flex-row px-5 py-5 justify-between absolute top-[90px] drop-shadow-md transition ease-in delay-50 dark:bg-[#141A22] bg-[#F3F6FD] rounded-lg z-0'>
            <div className='w-[280px] px-3 py-2 h-[340px] bg-white dark:bg-[#293444] rounded-lg drop-shadow-md flex flex-col justify-between'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center justify-between px-2 mt-2'>
                        <p className='font-bold text-[14px] dark:text-white'>
                            {t('dashboard.ddos')}
                        </p>
                        <motion.div animate={{ opacity: nameModule ? 1 : 0.5 }}>
                            <Switch isOn={attack} toggleSwitch={handleAttack} />
                        </motion.div>
                    </div>

                    <p className='text-black text-[12px] pl-2 mt-2 dark:text-white'>
                        {t('dashboard.selectModule')}
                    </p>

                    <div className='flex justify-center items-center mt-4'>
                        <Dropmenu />
                    </div>
                </div>

                <div className='flex justify-center flex-row mb-2'>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            text={
                                text === 'Dashboard'
                                    ? t('dashboard.title')
                                    : t('dashboard.settings.title')
                            }
                            size='lg'
                            colors={theme ? 'dark20' : 'light40'}
                            onClick={ChangeSection}
                        />
                    </motion.div>
                </div>
            </div>

            <div className='pl-5 flex flex-col justify-start'>
                {!click ? (
                    <div className='flex flex-col justify-between h-full'>
                        <Session />
                        <div className='flex flex-row gap-3'>
                            <Chart />

                            <div className='flex flex-col gap-3'>
                                <p className='text-justify font-bold text-[14px] uppercase text-[#334155] dark:text-[#C4D1F3]'>
                                    {t('dashboard.chart.display')}:
                                </p>

                                <Radio
                                    onChange={() => {
                                        setTimeChart(true)
                                    }}
                                    checked={timeChart}
                                    name='hour'
                                    label={t('dashboard.chart.hours')}
                                />
                                <Radio
                                    onChange={() => {
                                        setTimeChart(false)
                                    }}
                                    checked={!timeChart}
                                    name='minute'
                                    label={t('dashboard.chart.minute')}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Settings />
                )}
            </div>
            <ModuleModal />
        </div>
    )
}

export default Home
