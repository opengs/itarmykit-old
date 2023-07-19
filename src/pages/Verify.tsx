import { Button } from '@components/Buttons'
import { Back, Email } from '@images/icons'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const Verify = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-screen bg-[#C4D1F3] flex justify-center items-center'>
            <div className='bg-[#F3F6FD] w-[450px] h-[400px] p-[40px] rounded-[8px]'>
                <motion.div
                    initial={{ opacity: 0, translateX: 30 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: 30 }}
                >
                    <div className='flex justify-between items-center'>
                        <Back
                            onClick={() => navigate('/forgot')}
                            className='cursor-pointer p-3 pl-0'
                        />
                        <p className='text-center text-slate-700 text-[18px] font-semibold leading-7 tracking-wide'>
                            Verify Your Email
                        </p>
                    </div>
                    <div className='mt-[12px] flex flex-col items-center'>
                        <Email />
                        <p className='w-[250px] mt-[12px] text-center text-slate-700 text-[14px] font-bold leading-normal'>
                            Please Enter The 4 digital code sent To wicof74510@kameili.com
                        </p>
                    </div>
                    <div>
                        <div className='flex justify-center gap-[26px] mt-[14px]'>
                            <input
                                className='w-[34px] h-10 px-3 py-2 bg-indigo-200 rounded-md border border-indigo-200 justify-start items-center font-semibold inline-flex'
                                value={4}
                            />
                            <input
                                className='w-[34px] h-10 px-3 py-2 bg-indigo-200 rounded-md border border-indigo-200 justify-start items-center font-semibold inline-flex'
                                value={5}
                            />
                            <input
                                className='w-[34px] h-10 px-3 py-2 bg-indigo-200 rounded-md border border-indigo-200 justify-start items-center font-semibold inline-flex'
                                value={2}
                            />
                            <input
                                className='w-[34px] h-10 px-3 py-2 bg-indigo-200 rounded-md border border-indigo-200 justify-start items-center font-semibold inline-flex'
                                value={8}
                            />
                        </div>

                        <div className='flex flex-col items-center mt-[14px] gap-[14px]'>
                            <p className='text-slate-700 text-[14px] font-medium underline leading-none'>
                                Resend Code
                            </p>
                            <Button
                                colors='dark20'
                                text='Verify'
                                size='md'
                                onClick={() => navigate('/newPassword')}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
