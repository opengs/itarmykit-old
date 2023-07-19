import React from 'react'

interface LayoutProps {
    children: React.ReactElement[] | React.ReactElement
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className='w-full h-screen bg-[#C4D1F3] flex justify-center items-center'>{children}</div>
)
