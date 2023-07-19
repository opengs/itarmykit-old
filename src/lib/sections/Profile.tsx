import { Button } from '@components/Buttons'
import { useTranslation } from 'react-i18next'

const Profile: React.FC = () => {
    const { t } = useTranslation()
    return (
        <div className='w-[190px] px-3 flex flex-row justify-between h-[48px] rounded-lg bg-[#F3F6FD] transition ease-in delay-50 dark:bg-[#141A22] drop-shadow-md'>
            <div className='py-1'>
                <h1 className='text-[14px] dark:text-white'>{t('dashboard.myid')}:</h1>
                <p className='text-[12px] dark:text-white'>99.11.10.91</p>
            </div>
            <div className='flex justify-center items-center'>
                <Button text={t('dashboard.signOut')} size='md' color='light40' href='/' />
            </div>
        </div>
    )
}

export default Profile
