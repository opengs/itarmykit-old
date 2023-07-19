import { SelectLanguage } from '@components/SelectLanguage'
import BottomLogo from '@images/BottomLogo'
import { variantHr, variantsText } from '@motions/motionPageAuth'
import { SignIn } from '@sections/SignIn'
import { SignUp } from '@sections/SignUp'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export const Auth: React.FC = () => {
    const [select, setSelect] = useState<'signIn' | 'singUp'>('signIn')
    const { t } = useTranslation()
    const refSignIn = useRef<HTMLParagraphElement>()
    const refSignUp = useRef<HTMLParagraphElement>()

    return (
        <div className='w-full h-screen bg-[#C4D1F3] flex justify-center items-center'>
            <div className='bg-[#F3F6FD] w-[450px] h-[400px] px-[24px] py-[40px] rounded-[8px]'>
                <div className='flex gap-[24px] p-[14px]'>
                    <motion.p
                        className='text-[18px] cursor-pointer text-[#334155]'
                        onClick={() => {
                            setSelect('signIn')
                        }}
                        animate={select === 'signIn' ? 'select' : 'unSelect'}
                        variants={variantsText}
                        ref={refSignIn}
                    >
                        {t('auth.signin.name')}
                    </motion.p>
                    <motion.p
                        className='text-[18px] cursor-pointer text-[#334155]'
                        onClick={() => {
                            setSelect('singUp')
                        }}
                        animate={select === 'singUp' ? 'select' : 'unSelect'}
                        variants={variantsText}
                        ref={refSignUp}
                    >
                        {t('auth.signup.name')}
                    </motion.p>
                    <SelectLanguage />
                </div>
                <div className='w-full h-[1px] flex items-center bg-[#3341555f]'>
                    <motion.div
                        variants={variantHr(
                            refSignIn.current?.clientWidth,
                            refSignUp.current?.clientWidth
                        )}
                        animate={select === 'signIn' ? 'signin' : 'signup'}
                        className='border border-solid border-1 border-[#334155]'
                    />
                </div>
                {select === 'signIn' ? (
                    <SignIn />
                ) : (
                    <SignUp backToSignIn={() => setSelect('signIn')} />
                )}
            </div>
            <Toaster position='top-center' />
            <div className='absolute bottom-0.5 left-0'>
                <BottomLogo />
            </div>
        </div>
    )
}
