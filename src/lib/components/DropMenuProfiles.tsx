import { itemVariants, menuVariants } from '@motions/motionDropmenu'
import { activeProfileAtom } from '@store/userAtom'
import { Profiles } from '@type/user'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const DropMenuProfiles = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useAtom(activeProfileAtom)
    const { t } = useTranslation()

    const changeProfile = (newProfile: Profiles) => {
        setProfile(newProfile)
    }

    return (
        <div
            className='border-2 border-[#D0DAF5] dark:bg-white h-[28px] rounded-lg cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
        >
            <p className='pl-3 pt-[2.5px]'>
                {profile ? t(`profiles.${profile}`) : t('profiles.headline')}
            </p>
            <motion.div
                variants={menuVariants}
                animate={isOpen ? 'open' : 'closed'}
                initial='closed'
                exit='closed'
            >
                <motion.div className=' rounded-lg mt-2 bg-white drop-shadow-md'>
                    <motion.div
                        className='pl-2 hover:bg-[#334155] hover:text-white hover:rounded-md'
                        variants={itemVariants}
                        onClick={() => changeProfile(Profiles.Home)}
                    >
                        {t('profiles.home')}
                    </motion.div>
                    <motion.div
                        className='pl-2 hover:bg-[#334155] hover:text-white hover:rounded-md'
                        variants={itemVariants}
                        onClick={() => changeProfile(Profiles.Work)}
                    >
                        {t('profiles.work')}
                    </motion.div>
                    <motion.div
                        className='pl-2 hover:bg-[#334155] hover:text-white hover:rounded-md'
                        variants={itemVariants}
                        onClick={() => changeProfile(Profiles.Institiution)}
                    >
                        {t('profiles.institiution')}
                    </motion.div>
                    <motion.div
                        className='pl-2 hover:bg-[#334155] hover:text-white hover:rounded-md'
                        variants={itemVariants}
                        onClick={() => changeProfile(Profiles.Advanced)}
                    >
                        {t('profiles.advanced')}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
