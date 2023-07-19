import { Variants } from 'framer-motion'

export const variantsCircle: Variants = {
    on: {
        translateX: '20px',
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(51 65 85)',
    },
    off: {
        translateX: '0',
        backgroundColor: 'rgb(51, 65, 85)',
        color: 'rgb(255,255,255)',
    },
}

export const variantsText: Variants = {
    on: {
        opacity: 1,
    },
    off: {
        opacity: 0,
    },
}

export const variantBg: Variants = {
    on: {
        backgroundColor: 'rgb(51, 65, 85)',
        border: '1px solid rgb(51, 65, 85)',
    },
    off: {
        backgroundColor: 'rgb(255,255,255)',
        border: '1px solid rgb(51, 65, 85)',
    },
}
