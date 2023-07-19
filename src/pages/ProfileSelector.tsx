import { Button } from '@components/Buttons'
import { Layout } from '@components/Layout'
import { SVG } from '@images/index'
import { activeProfileAtom } from '@store/userAtom'
import { Profiles } from '@type/user'
import { cva } from 'class-variance-authority'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const selectCards = cva(
    [
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-[24px]',
        'cursor-pointer',
        'p-2',
        'border-dashed',
        'border-2',
    ],
    {
        variants: {
            select: { true: ['border-slate-800'], false: ['border-transparent'] },
        },
        defaultVariants: {
            select: false,
        },
    }
)

export const ProfileSelector = () => {
    const [activeProfile, setActiveProfile] = useAtom(activeProfileAtom)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleSelectProfile = (title: Profiles) => {
        setActiveProfile(title)
        window.api.setActiveProfile(title)
    }

    const handleContinue = () => navigate('/dashboard')

    const tableProfiles = [
        {
            title: Profiles.Work,
            text: t('profiles.work'),
            image: SVG.Work,
        },
        {
            title: Profiles.Home,
            text: t('profiles.home'),
            image: SVG.Home,
        },
        {
            title: Profiles.Institiution,
            text: t('profiles.institiution'),
            image: SVG.Institiution,
        },
        {
            title: Profiles.Advanced,
            text: t('profiles.advanced'),
            image: SVG.Advanced,
        },
    ]

    return (
        <Layout>
            <div className='w-[880px] h-[380px] bg-[#E7EDFA] py-[14px] flex flex-col items-center gap-[60px] rounded-lg drop-shadow-md'>
                <h1 className='text-[#334155] text-[24px] font-bold text-center'>
                    Select your user type
                </h1>
                <div className=' flex gap-[44px]'>
                    {tableProfiles.map((profile) => (
                        <div
                            key={profile.title}
                            className={twMerge(
                                selectCards({ select: activeProfile === profile.title })
                            )}
                            onClick={() => handleSelectProfile(profile.title)}
                        >
                            <h2>{profile.text}</h2>
                            <profile.image />
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-center'>
                    {activeProfile ? (
                        <Button
                            text={t('profiles.buttonCon')}
                            colors='dark20'
                            size='md'
                            onClick={handleContinue}
                            className='w-[100px]'
                        />
                    ) : (
                        <Button
                            text={t('profiles.buttonCon')}
                            colors='light20'
                            size='md'
                            disabled
                            className='w-[100px]'
                        />
                    )}
                </div>
            </div>
        </Layout>
    )
}
