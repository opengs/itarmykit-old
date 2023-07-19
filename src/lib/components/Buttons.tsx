import { cva, type VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const button = cva(
    ['justify-center', 'inline-flex', 'items-center', 'rounded-[24px]', 'text-center'],
    {
        variants: {
            colors: {
                light80: ['text-white', 'bg-[#D0DAF5]'],
                light60: ['text-black', 'bg-[#DCE3F8]'],
                light40: ['text-black', 'bg-[#E7EDFA]'],
                light20: ['text-black', 'bg-[#F3F6FD]'],
                dark80: ['text-white', 'bg-[#2C62CC]'],
                dark60: ['text-white', 'bg-[#214A99]'],
                dark40: ['text-white', 'bg-[#163166]'],
                dark20: ['text-white', 'bg-[#334155]'],
            },
            size: {
                sm: ['w-[65px]', 'h-[28px]', 'text-[12px]'],
                md: ['w-[71px]', 'h-[28px]', 'text-[14px]'],
                lg: ['w-[104px]', 'h-[28px]', 'text-[14px]'],
            },
            underline: { true: ['underline'], false: [] },
            noBg: { true: ['bg-white text-black'], false: [] },
            loading: { true: ['disabled:opacity-50'], false: [] },
        },
        defaultVariants: {
            size: 'sm',
            colors: 'light40',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
        VariantProps<typeof button> {
    href?: string
    underline?: boolean
    noBg?: boolean
    text: string
    loading?: boolean
}

export function Button({
    className,
    href,
    colors,
    text,
    size,
    underline,
    noBg,
    loading,
    ...props
}: ButtonProps) {
    return href ? (
        <Link
            to={href}
            className={twMerge(button({ size, className, colors, underline, noBg }))}
            {...props}
        >
            {text}
        </Link>
    ) : (
        <button
            className={twMerge(button({ size, className, colors, underline, noBg, loading }))}
            {...props}
        >
            {loading ? 'loading...' : text}
        </button>
    )
}
