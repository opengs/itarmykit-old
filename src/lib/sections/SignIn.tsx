import { Button } from '@components/Buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import { userAtom } from '@store/userAtom'
import { useMutation } from '@tanstack/react-query'
import { loginSchema } from '@type/auth'
import { userAtomType } from '@type/user'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {
    const [user, setUser] = useAtom(userAtom)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<userAtomType>({ resolver: zodResolver(loginSchema) })

    const { isError, isLoading, mutate } = useMutation({
        mutationFn: async () => {
            const _data = await window.api.signin(user)
            if (_data.codeError) {
                throw new Error('[signin] - sth error')
            }
            return _data
        },
        mutationKey: ['signin'],
        onSuccess(data) {
            reset()
            toast.success(t('auth.signin.toastSucces') + '😊')
            setTimeout(() => {
                navigate('/profileSelector')
            }, 2000)
        },
        onError() {
            reset()
            toast.error(t('auth.signin.toastError') + '😒')
        },
    })

    const onSubmit: SubmitHandler<userAtomType> = (dataForm) => {
        setUser(dataForm)
        mutate()
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateX: 30 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 30 }}
        >
            <p className='text-[#334155] text-[14px] mt-[12px]'>{t('auth.signin.title')}</p>
            <form className='mt-[24px] w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-between items-center'>
                    <label htmlFor='email' className='text-[#334155] text-[16px] font-[500]'>
                        {t('auth.email')}
                    </label>
                    <input
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
                {isError && <p className='text-red-500'>{t('auth.signin.error')}</p>}
                <div className='mt-[85px] flex justify-between'>
                    <p
                        className='text-[#4663AF] font-[14px] cursor-pointer'
                        onClick={() => navigate('/forgot')}
                    >
                        {t('auth.signin.forgotPassword')}
                    </p>
                    <Button
                        type='submit'
                        text={t('auth.signin.name')}
                        colors='dark20'
                        size='lg'
                        loading={isLoading}
                    />
                </div>
            </form>
        </motion.div>
    )
}
