import { Variants } from 'framer-motion'

export const menuVariants: Variants = {
    closed: {
        scaleY: 0,
        zIndex: 0,
        transition: {
            delay: 0.15,
        },
        transformOrigin: 'top',
    },
    open: {
        scaleY: 1,
        transition: {
            type: 'spring',
            duration: 0.4,
            delayChildren: 0.2,
            staggerChildren: 0.05,
        },
        transformOrigin: 'top',
    },
}

export const itemVariants: any = {
    closed: { x: -2, opacity: 0 },
    open: { x: 0, opacity: 1 },
    transition: { opacity: { duration: 0.2 } },
}
