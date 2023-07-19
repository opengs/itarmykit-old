import { Loader } from '@components/Loader'
import { Images } from '@images/index'
import { useStarting } from '../lib/hooks/useStarting'

export const ScreenLoading = () => {
    useStarting()

    return (
        <div className='w-full h-screen bg-[#C4D1F3] flex flex-col justify-center items-center'>
            <div className='flex items-center gap-[20px]'>
                <img src={Images.Logo} className='w-[68px] h-[68px]' />
                <h1 className='text-[#000] text-[60px] font-bold'>IT ARMY</h1>
            </div>

            <Loader />
        </div>
    )
}
