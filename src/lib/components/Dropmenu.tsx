import { DdosModules, dropdownAtom, dropMenuAtom } from '@store/dropMenuAtom'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { itemVariants, menuVariants } from '../motions/motionDropmenu'

export default function Dropmenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [OpenModal, setOpenModal] = useAtom(dropdownAtom)
    const [selectModule, setSelectModule] = useAtom(dropMenuAtom)
    const { t } = useTranslation()
    const text = t('dashboard.selectAnDdos')

    const handleModal = () => {
        setSelectModule(DdosModules.DB1000N)
        setSelectModule(DdosModules.MHDDOS_PROXY)
    }

    return (
        <div
            className='border-2 border-[#D0DAF5] dark:bg-white w-[204px] h-[28px] rounded-lg cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
        >
            <p className='pl-3 pt-[2.5px]'>{selectModule ? selectModule : text}</p>
            <motion.div
                variants={menuVariants}
                animate={isOpen ? 'open' : 'closed'}
                initial='closed'
                exit='closed'
            >
                <motion.div className='w-[203px] h-[24px] rounded-lg mt-2 bg-white drop-shadow-md'>
                    <motion.div
                        className='pl-2 hover:bg-[#334155] hover:text-white hover:rounded-md'
                        variants={itemVariants}
                        onClick={handleModal}
                        onMouseEnter={() => setOpenModal(true)}
                    >
                        DB1000N
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
