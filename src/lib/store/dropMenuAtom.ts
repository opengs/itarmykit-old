import { atom } from 'jotai'

export const dropdownAtom = atom(false)

export enum DdosModules {
    DB1000N = 'DB1000N',
    MHDDOS_PROXY = 'MHDDOS_PROXY',
    WANDAL = 'WANDAL',
    WERSR = 'WERSR',
    GRAPES = 'GRAPES',
    PINELE = 'PINELE',
}

export const dropMenuAtom = atom<DdosModules | false>(false)
