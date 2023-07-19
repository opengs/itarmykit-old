export enum Profiles {
    Work = 'work',
    Home = 'home',
    Institiution = 'institiution',
    Advanced = 'advanced',
}

export type newUserAtomType = {
    email: string
    password: string
    confirmPassword: string
}

export type userAtomType = {
    email: string
    password: string
}
