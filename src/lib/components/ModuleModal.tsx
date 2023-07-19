import NoImg from '@images/NoImg'
import { DdosModules, dropdownAtom, dropMenuAtom } from '@store/dropMenuAtom'
import { themeModeAtom } from '@store/switchsAtom'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Buttons'

const selectNameModule = (dropmenu: DdosModules, version: string) => {
    switch (dropmenu) {
        case DdosModules.DB1000N:
            return {
                name: 'DB1000N',
                author: 'Arriven',
                version: version,
            }
        default:
            return {
                name: 'DB1000N',
                author: 'Arriven',
                version: version,
            }
    }
}

const ModuleModal: React.FC = () => {
    const theme = useAtomValue(themeModeAtom)
    const [OpenModal, setOpenModal] = useAtom(dropdownAtom)
    const dropmenu = useAtomValue(dropMenuAtom)
    const [author, setAuthor] = useState({
        name: 'Name',
        author: 'Author',
        version: 'Version',
    })
    const modalRef = useRef(null)

    const handleModalClose = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenModal(false)
        }
    }

    useEffect(() => {
        ;(async () => {
            if (dropmenu) {
                const version = await window.api.getVersion(dropmenu.toLocaleLowerCase())
                setAuthor(selectNameModule(dropmenu, version))
            }
        })()

        document.addEventListener('mousedown', handleModalClose)
        return () => {
            document.removeEventListener('mousedown', handleModalClose)
        }
    }, [dropmenu])

    return (
        OpenModal && (
            <div
                ref={modalRef}
                className='w-[330px] h-[150px] drop-shadow-md rounded-lg bg-white absolute left-[260px] top-[50px] p-3 flex flex-row justify-between'
            >
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col justify-between h-full'>
                        <div className=''>
                            <p>{author.name}</p>
                            <p>{author.author}</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                size='lg'
                                text={t('modules.download')}
                                colors={theme ? 'dark20' : 'light40'}
                                className='w-[150px] mb-4'
                                onClick={() => {
                                    window.api.startDownload({ owner: 'arriven', repo: 'db1000n' })
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                <div className='flex flex-col gap-2 items-end'>
                    <p>{author.version}</p>
                    <NoImg />
                </div>
            </div>
        )
    )
}

export default ModuleModal
