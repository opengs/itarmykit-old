import { itemVariants, menuVariants } from '@motions/motionDropmenu'
import { languageAtom, selectLanguageAtom } from '@store/languageAtom'
import { motion } from 'framer-motion'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flag_svg } from '../images'

export const SelectLanguage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()
    const language = useAtomValue(languageAtom)
    const setSelectLanguage = useSetAtom(selectLanguageAtom)

    useEffect(() => {
        i18n.changeLanguage(language.tag)
    }, [language])

    return (
        <div
            className=' bg-[#F3F6FD] dark:bg-[#141A22] w-[120px] h-[35px] p-[5.2px] rounded-lg cursor-pointer z-10'
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className='flex justify-center dark:text-white gap-2 items-center'>
                {<language.flag />}
                {language.name}
            </span>
            <motion.div
                variants={menuVariants}
                animate={isOpen ? 'open' : 'closed'}
                initial='closed'
                exit='closed'
            >
                <motion.div className=' rounded-lg mt-2 bg-[#F3F6FD] dark:bg-[#334155] dark:text-white drop-shadow-md'>
                    <motion.div
                        className=' hover:bg-[#334155] hover:text-white dark:hover:bg-white dark:hover:text-[#334155] hover:rounded-md flex gap-2 items-center p-1 px-3'
                        variants={itemVariants}
                        onClick={() => setSelectLanguage('pl')}
                    >
                        <Flag_svg.POLAND />
                        Poland
                    </motion.div>

                    <motion.div
                        className=' hover:bg-[#334155] hover:text-white dark:hover:bg-white dark:hover:text-[#334155] hover:rounded-md flex gap-2 items-center p-1 px-3'
                        variants={itemVariants}
                        onClick={() => setSelectLanguage('en')}
                    >
                        <Flag_svg.USA />
                        USA
                    </motion.div>

                    <motion.div
                        className=' hover:bg-[#334155] hover:text-white dark:hover:bg-white dark:hover:text-[#334155] hover:rounded-md flex gap-2 items-center p-1 px-3'
                        variants={itemVariants}
                        onClick={() => setSelectLanguage('ua')}
                    >
                        <Flag_svg.UKRAINE />
                        USA
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
