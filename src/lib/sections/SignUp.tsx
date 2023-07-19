import { Button } from '@components/Buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserAtom } from '@store/userAtom'
import { useMutation } from '@tanstack/react-query'
import { registerSchema } from '@type/auth'
import { newUserAtomType } from '@type/user'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

interface SignUpProps {
    backToSignIn: () => void
}

export const SignUp: React.FC<SignUpProps> = ({ backToSignIn }) => {
    const [user, setUser] = useAtom(newUserAtom)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<newUserAtomType>({ resolver: zodResolver(registerSchema) })
    const { t } = useTranslation()

    const { isError, isLoading, mutate } = useMutation({
        mutationFn: async () => {
            const _data = await window.api.signup(user)
            if (_data.codeError) {
                throw new Error('[signup] - sth error')
            }
            return _data
        },
        mutationKey: ['signup'],
        onSuccess(data) {
            reset()
            toast.success(t('auth.signup.toastSucces') + '😊')
            setTimeout(() => {
                backToSignIn()
            }, 2000)
        },
        onError() {
            reset()
            toast.error(t('auth.signin.toastError') + '😒')
        },
    })

    const onSubmit: SubmitHandler<newUserAtomType> = (data) => {
        setUser(data)
        mutate()
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateX: -30 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -30 }}
        >
            <p className='text-[#334155] text-[14px] mt-[12px]'>{t('auth.signup.title')}</p>
            <form className='mt-[24px] w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-between items-center'>
                    <label htmlFor='email' className='text-[#334155] text-[16px] font-[500]'>
                        {t('auth.email')}
                    </label>
                    <input
                        type='text'
                        placeholder={t('auth.exampleEmail')}
                        id='email'
                        className='w-[240px] h-[36px] rounded-[6px] place-content-center placeholder:px-4 focus:outline-slate-600'
                        {...register('email')}
                    />
                </div>
                <p>{errors.email?.message}</p>
                <div className='flex justify-between items-center mt-[12px]'>
                    <label htmlFor='password' className='text-[#334155] text-[16px] font-[500]'>
                        {t('auth.password')}
                    </label>
                    <input
                        type='password'
                        placeholder='********'
                        id='password'
                        className='w-[240px] h-[36px] rounded-[6px] place-content-center placeholder:px-4 focus:outline-slate-600'
                        {...register('password')}
                    />
                </div>
                <p>{errors.password?.message}</p>
                <div className='flex justify-between items-center mt-[12px]'>
                    <label htmlFor='password' className='text-[#334155] text-[16px] font-[500]'>
                        {t('auth.signup.confirmPassword')}
                    </label>
                    <input
                        type='password'
                        placeholder='********'
                        id='password'
                        className='w-[240px] h-[36px] rounded-[6px] place-content-center placeholder:px-4 focus:outline-slate-600'
                        {...register('confirmPassword')}
                    />
                </div>
                <p>{errors.confirmPassword?.message}</p>
                {isError && <p className='text-red-500'>{t('auth.signup.error')}</p>}
                <div className='mt-[35px] flex justify-end'>
                    <Button
                        text={t('auth.signup.name')}
                        colors='dark20'
                        size='lg'
                        type='submit'
                        loading={isLoading}
                    />
                </div>
            </form>
        </motion.div>
    )
}
