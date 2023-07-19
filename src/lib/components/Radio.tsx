interface RadioProps {
    checked?: boolean
    name?: string
    onChange?: () => void
    label?: string
}

const Radio: React.FC<RadioProps> = ({ checked, name, onChange, label }) => {
    return (
        <div className='flex flex-row items-center gap-2'>
            <label className='relative flex cursor-pointer items-center rounded-full'>
                <input
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    type='radio'
                    className="before:content[''] peer relative h-[22px] w-[22px] cursor-pointer appearance-none rounded-full border border-[#334155] text-[#334155] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#334155] checked:before:bg-[#334155] dark:bg-[#F3F6FD]"
                />
                <div className='pointer-events-none absolute left-[4px] top-[4px] text-[#334155] opacity-0 transition-opacity peer-checked:opacity-100'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3.5 w-3.5'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                    >
                        <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
                    </svg>
                </div>
            </label>

            <label className='mb-1 text-[11px] font-bold dark:text-[#F3F6FD]'>{label}</label>
        </div>
    )
}

export default Radio
