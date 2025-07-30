import Link from 'next/link'
import React from 'react'
import { IoHome } from 'react-icons/io5'
import NavLink from './NavLInk'
import { RiAdminFill } from 'react-icons/ri'

const Header = () => {
    return (
        <header className='flex'>
            <nav className='flex gap-3'>
                <NavLink  href='/'>Home<IoHome /></NavLink>
                <NavLink href='/admin'>Admin<RiAdminFill/></NavLink>
            </nav>
        </header>
    )
}

export default Header   