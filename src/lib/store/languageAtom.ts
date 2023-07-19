import { atom } from 'jotai'
import { JSX } from 'react'
import { Flag_svg } from '../images'

interface languageTypes {
    name: string
    flag: () => JSX.Element
    tag: string
}

export const languageAtom = atom<languageTypes>({
    name: 'Poland',
    flag: Flag_svg.POLAND,
    tag: 'pl',
})

export const selectLanguageAtom = atom(
    (get) => get(languageAtom),
    (get, set, lang: string) => {
        switch (lang) {
            case 'pl':
                set(languageAtom, { name: 'Poland', flag: Flag_svg.POLAND, tag: 'pl' })
                break
            case 'ua':
                set(languageAtom, { name: 'Ukraine', flag: Flag_svg.UKRAINE, tag: 'ua' })
                break
            case 'en':
                set(languageAtom, { name: 'USA', flag: Flag_svg.USA, tag: 'en' })
                break
            default:
                set(languageAtom, { name: 'USA', flag: Flag_svg.USA, tag: 'en' })
        }
    }
)
