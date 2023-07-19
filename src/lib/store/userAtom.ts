import { newUserAtomType, Profiles, userAtomType } from '@type/user'
import { atom, createStore } from 'jotai'
import { configFlags } from '../utils'
import { dropMenuAtom } from './dropMenuAtom'
import { attackDdosAtom, attackScaleAtom } from './switchsAtom'

export const jotaiStore = createStore()

export const userAtom = atom<userAtomType>({ email: '', password: '' })

export const newUserAtom = atom<newUserAtomType>({ email: '', password: '', confirmPassword: '' })

export const activeProfileAtom = atom<Profiles | false>(false)

export const timeChartAtom = atom(true)

jotaiStore.sub(activeProfileAtom, () => {
    window.api.setActiveProfile(jotaiStore.get(activeProfileAtom))
})

export const profileFlagAtom = atom((get) => {
    const profile = get(activeProfileAtom)
    const timeChart = get(timeChartAtom)
    if (profile === Profiles.Advanced) {
        return configFlags(profile, timeChart, get(attackScaleAtom))
    } else {
        return configFlags(profile as Profiles, timeChart)
    }
})

jotaiStore.sub(timeChartAtom, () => {
    const module = jotaiStore.get(dropMenuAtom)
    const status = jotaiStore.get(attackDdosAtom)
    const flags = jotaiStore.get(profileFlagAtom)
    if (status && module) {
        window.api.resetDdos({ module, flags })
    }
})
