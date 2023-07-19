import { selectLanguageAtom } from '@store/languageAtom'
import { autoStartAtom, hideTrailAtom, themeModeAtom } from '@store/switchsAtom'
import { activeProfileAtom } from '@store/userAtom'
import { Profiles } from '@type/user'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useStarting = () => {
    const { i18n } = useTranslation()
    const setI18n = useSetAtom(selectLanguageAtom)
    const setTheme = useSetAtom(themeModeAtom)
    const setActiveProfile = useSetAtom(activeProfileAtom)
    const setHideTrail = useSetAtom(hideTrailAtom)
    const setAutoStart = useSetAtom(autoStartAtom)
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            const locale = await window.api.getLocale()
            setI18n(locale)
            i18n.changeLanguage(locale)

            const theme = await window.api.getTheme()
            setTheme(theme)
            if (theme) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }

            const hideTrail = await window.api.getHideTrail()
            setHideTrail(hideTrail ? true : false)

            const autoStart = await window.api.getAutoStart()
            setAutoStart(autoStart ? true : false)

            window.api.autoCheckNewVersion()

            const active = await window.api.getActiveProfile()
            if (active) {
                setActiveProfile(active as Profiles)
                navigate('/dashboard')
            } else {
                navigate('/profiles')
            }
        })()
    }, [])
}
