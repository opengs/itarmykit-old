import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GUISettings from './GUISettings'
import ModuleSettings from './ModuleSettings'

const Settings: React.FC = () => {
    const [click, setClick] = useState<boolean>(false)
    const { t } = useTranslation()

    return (
        <div className='flex flex-row justify-between items-center w-[560px] h-[340px] gap-4 transition ease-in delay-50 dark:bg-[#293444] bg-[#F3F6FD] drop-shadow-md rounded-lg px-5 py-3'>
            <div className='flex flex-col h-full'>
                <h1 className='text-[24px]  font-bold text-[#334155] dark:text-white mt-3 pb-2'>
                    {t('dashboard.settings.title')}
                </h1>

                <div className='flex flex-row gap-2'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ opacity: !click ? 1 : 0.5 }}
                        className='w-[100px] h-[34px] bg-[#334155] rounded-md flex justify-center items-center mb-4 cursor-pointer drop-shadow-md'
                        onClick={() => setClick(false)}
                    >
                        <h1 className='text-white text-[14px] font-bold'>
                            {t('dashboard.settings.gui')}
                        </h1>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setClick(true)}
                        animate={{ opacity: click ? 1 : 0.5 }}
                        initial={{ opacity: 0.5 }}
                        className='w-[100px] h-[34px] bg-[#C4D1F3] rounded-md flex justify-center items-center mb-4 cursor-pointer drop-shadow-md'
                    >
                        <h1 className='text-black text-[14px] font-bold'>
                            {t('dashboard.settings.module')}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {!click ? <GUISettings /> : <ModuleSettings />}
        </div>
    )
}

export default Settings
