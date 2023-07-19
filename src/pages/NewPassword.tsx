import { Button } from '@components/Buttons'
import { Back, PadLock } from '@images/icons'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const NewPassword = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-screen bg-[#C4D1F3] flex justify-center items-center'>
            <div className='bg-[#F3F6FD] w-[450px] h-[400px] p-[40px] rounded-[8px]'>
                <motion.div
                    initial={{ opacity: 0, translateX: 30 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: -30 }}
                >
                    <div className='flex justify-between items-center'>
                        <Back
                            onClick={() => navigate('/verify')}
                            className='cursor-pointer p-3 pl-0'
                        />
                        <p className='text-center text-slate-700 text-[18px] font-semibold leading-7 tracking-wide'>
                            Create New Password
                        </p>
                    </div>
                    <div className='mt-[12px] flex flex-col items-center'>
                        <PadLock />
                        <p className='w-[250px] mt-[12px] text-center text-slate-700 text-[14px] font-bold leading-normal'>
                            Your New Password Must Be Diffrent from Previously Udsed Password.
                        </p>
                    </div>
                    <div>
                        <label className='text-slate-700 text-[14px] font-medium leading-none'>
                            New password
                        </label>
                        <input
                            className='w-full h-9 px-3 py-2 bg-white rounded-md border border-violet-50 justify-start items-center inline-flex'
                            placeholder='******************'
                            type='password'
                        />
                        <label className='text-slate-700 text-[14px] font-medium leading-none'>
                            Confirm new password
                        </label>
                        <input
                            className='w-full h-9 px-3 py-2 bg-white rounded-md border border-violet-50 justify-start items-center inline-flex'
                            placeholder='******************'
                            type='password'
                        />

                        <div className='flex justify-center mt-[5px]'>
                            <Button
                                colors='dark20'
                                text='Send'
                                size='md'
                                onClick={() => navigate('/')}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
