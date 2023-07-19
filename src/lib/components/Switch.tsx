import { variantBg, variantsCircle, variantsText } from '@motions/motionSwitch'
import { motion } from 'framer-motion'
import React from 'react'

interface SwitchProps {
    isOn: any
    toggleSwitch: (value: any) => void
}

export const Switch: React.FC<SwitchProps> = ({ isOn, toggleSwitch }) => {
    return (
        <motion.div
            className='w-[48px] h-[30px] bg-white flex justify-start items-center rounded-[50px] p-[2px] cursor-pointer'
            onClick={toggleSwitch}
            variants={variantBg}
            animate={isOn === true ? 'on' : 'off'}
            initial={isOn === true ? 'on' : 'off'}
            exit={isOn === true ? 'on' : 'off'}
        >
            <motion.div
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                className='w-[24px] h-[24px] bg-[#334155] text-white rounded-[40px] relative'
                variants={variantsCircle}
                animate={isOn === true ? 'on' : 'off'}
                initial={isOn === true ? 'on' : 'off'}
                exit={isOn === true ? 'on' : 'off'}
            >
                <motion.p
                    variants={variantsText}
                    animate={isOn === true ? 'on' : 'off'}
                    initial={isOn === true ? 'on' : 'off'}
                    exit={isOn === true ? 'on' : 'off'}
                    className='text-[10px] font-bold absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                >
                    ON
                </motion.p>
                <motion.p
                    variants={variantsText}
                    animate={!isOn === true ? 'on' : 'off'}
                    initial={!isOn === true ? 'on' : 'off'}
                    exit={!isOn === true ? 'on' : 'off'}
                    className='text-[10px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                >
                    OFF
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
