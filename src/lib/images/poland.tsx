const Poland = () => (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={16} fill='none'>
        <mask
            id='a'
            width={24}
            height={16}
            x={0}
            y={0}
            maskUnits='userSpaceOnUse'
            style={{
                maskType: 'luminance',
            }}
        >
            <path fill='#fff' d='M24 0H0v16h24V0Z' />
        </mask>
        <g fillRule='evenodd' clipRule='evenodd' mask='url(#a)'>
            <path fill='#fff' d='M24 16H0V0h24v16Z' />
            <path fill='#DC143C' d='M24 16H0V8h24v8Z' />
        </g>
    </svg>
)
export default Poland
