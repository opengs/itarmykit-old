import { DropMenuProfiles } from '@components/DropMenuProfiles'
import { Switch } from '@components/Switch'
import { autoStartAtom, hideTrailAtom, themeModeAtom } from '@store/switchsAtom'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

const GUISettings: React.FC = () => {
    const [theme, setTheme] = useAtom(themeModeAtom)
    const [hideTrail, setHideTrail] = useAtom(hideTrailAtom)
    const [autoStart, setAutoStart] = useAtom(autoStartAtom)
    const { t } = useTranslation()

    const handleAutoStart = () => {
        setAutoStart(!autoStart)
        window.api.autoStart(!autoStart)
    }

    const handleHideInTrail = () => {
        setHideTrail(!hideTrail)
        window.api.hideWindow(!hideTrail)
    }

    const hadnleThemeSwitch = () => {
        setTheme(!theme)
        if (!theme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <div className='flex flex-col justify-between h-full w-full'>
            <div className='mt-3'>
                <div className='flex flex-row justify-between gap-5 py-2'>
                    <p className='dark:text-white text-[12px]'>{t('dashboard.settings.hide')}</p>
                    <Switch isOn={hideTrail} toggleSwitch={handleHideInTrail} />
                </div>

                <div className='flex flex-row justify-between gap-5 py-2 '>
                    <p className='dark:text-white text-[12px]'>
                        {t('dashboard.settings.autoStart')}
                    </p>
                    <Switch isOn={autoStart} toggleSwitch={handleAutoStart} />
                </div>

                <div className='flex flex-row justify-between gap-5 py-2'>
                    <p className='dark:text-white text-[12px]'>{t('dashboard.settings.theme')}</p>
                    <Switch isOn={theme} toggleSwitch={hadnleThemeSwitch} />
                </div>
                <div className='py-2'>
                    <DropMenuProfiles />
                </div>
            </div>
        </div>
    )
}

export default GUISettings
