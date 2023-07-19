import { atom } from 'jotai'
import { jotaiStore } from './userAtom'

export const themeModeAtom = atom<boolean>(false)

export const autoStartAtom = atom<boolean>(false)

export const hideTrailAtom = atom<boolean>(false)

export const autoUpdatesAtom = atom<boolean>(false)

export const attackDdosAtom = atom<boolean>(false)

export const attackScaleAtom = atom<number>(1)

jotaiStore.sub(hideTrailAtom, () => {
    window.api.setHideTrail(jotaiStore.get(hideTrailAtom))
})

jotaiStore.sub(autoStartAtom, () => {
    window.api.setAutoStart(jotaiStore.get(autoStartAtom))
})
