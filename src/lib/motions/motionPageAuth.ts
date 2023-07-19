import { Variants } from 'framer-motion'

export const variantHr = (signinWidth?: number, signupWidth?: number): Variants => ({
    signin: {
        translateX: `${14 / 5}px`,
        width: `${signinWidth ? signinWidth * 1.5 : 88}px`,
    },
    signup: {
        translateX: `${signinWidth ? signinWidth + 36 - signupWidth / 5 : 83}px`,
        width: `${signupWidth ? signupWidth * 1.5 : 88}px`,
    },
})

export const variantsText: Variants = {
    select: {
        textShadow: '0.5px 0.5px 0 #334155',
    },
    unSelect: {
        textShadow: '0px 0px 0',
    },
}
