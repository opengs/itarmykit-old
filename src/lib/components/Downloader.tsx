import { errorAtom, progressAtom } from '@store/downloaderAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

export interface DownloaderProps {
    status?: boolean
    procent: number
    message?: string
}

export const Downloader: React.FC = () => {
    const progress = useAtomValue(progressAtom)
    const setError = useSetAtom(errorAtom)

    const { t } = useTranslation()

    return progress > 0 ? (
        <div className='w-[414px] mb-6 relative transition ease-in delay-50'>
            <p className=' text-slate-700 dark:text-white font-bold text-[14px]'>
                {t('dashboard.downloader.status')}
            </p>
            <div className='w-full h-[16px] rounded-[24px] overflow-hidden bg-slate-50 dark:bg-[#334155] mt-3'>
                <div
                    className='h-full bg-[#334155] dark:bg-slate-50 rounded-[24px]'
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    ) : (
        <div className='bg-transparent'></div>
    )
}
