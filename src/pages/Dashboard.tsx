import { Downloader } from '@components/Downloader'
import { SelectLanguage } from '@components/SelectLanguage'
import Home from '@sections/Home'
import { Toaster } from 'react-hot-toast'

export const Dashboard: React.FC = () => (
    <main className='flex flex-col items-center w-full h-screen bg-[#C4D1F3] transition ease-in delay-50 dark:bg-[#293444]'>
        <div className='flex flex-row mt-4 justify-between w-[870px]'>
            <Downloader />
            <div className='flex gap-2 mt-[8px]'>
                <SelectLanguage />
            </div>
        </div>

        <Home />
        <Toaster position='top-center' />
    </main>
)
