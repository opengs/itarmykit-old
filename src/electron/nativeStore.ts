import Store from 'electron-store'
import { ChildProcessWithoutNullStreams } from 'node:child_process'
import { DdosModules } from '../lib/store/dropMenuAtom'
import { Profiles, userAtomType } from '../lib/types/user'

interface Module {
    owner: string
    repo: string
}

const myStore = new Store<{
    activeProfile: Profiles
    theme: boolean
    attack: ChildProcessWithoutNullStreams
    user: userAtomType
    autoStart: boolean
    hideTrail: boolean
    modules: Module[]
}>()

const getActiveProfile = () => {
    return myStore.get('activeProfile')
}
const setActiveProfile = (activeProfile: Profiles) => {
    myStore.set('activeProfile', activeProfile)
}

const getUser = () => {
    return myStore.get('user')
}
const setUser = (newUser: userAtomType) => {
    myStore.set('user', newUser)
}

const getTheme = () => {
    return myStore.get('theme')
}
const setTheme = (theme: boolean) => {
    myStore.set('theme', theme)
}

const getAutoStart = () => {
    return myStore.get('autoStart')
}
const setAutoStart = (autoStart: boolean) => {
    myStore.set('autoStart', autoStart)
}

const getHideTrail = () => {
    return myStore.get('hideTrail')
}
const setHideTrail = (hideTrail: boolean) => {
    myStore.set('hideTrail', hideTrail)
}

const getNameModuleVersion = (repo: DdosModules) => {
    return myStore.get(repo)
}
const setNameModuleVersion = (repo: DdosModules, latestRelease: string) => {
    myStore.set(repo, latestRelease)
}

const getAttack = () => {
    return myStore.get('attack')
}
const setAttack = (nameModuleProcess: ChildProcessWithoutNullStreams | false) => {
    myStore.set('attack', nameModuleProcess)
}

const getModules = (): Module[] | undefined => {
    return myStore.get('modules')
}

const getModule = (owner: string): Module | undefined => {
    const modules = myStore.get('modules')
    return modules.find((module) => module.owner === owner)
}

const setModules = (newModule: Module) => {
    const modules = myStore.get('modules')

    if (modules) {
        const existingModuleIndex = modules.findIndex((module) => module.owner === newModule.owner)

        if (existingModuleIndex !== -1) {
            modules[existingModuleIndex] = newModule
        } else {
            modules.push(newModule)
        }

        myStore.set('modules', modules)
    } else {
        myStore.set('modules', [newModule])
    }
}

export const nativeStore = {
    getActiveProfile,
    setActiveProfile,
    getUser,
    setUser,
    getTheme,
    setTheme,
    getNameModuleVersion,
    setNameModuleVersion,
    getAttack,
    setAttack,
    getAutoStart,
    setAutoStart,
    getHideTrail,
    setHideTrail,
    getModules,
    setModules,
    getModule,
}
