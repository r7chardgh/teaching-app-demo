'use client'
import React, { useEffect, useState } from 'react'
import { IoClose, IoGameController, IoHome } from 'react-icons/io5'
import NavLink from './NavLInk'
import { RiAdminFill } from 'react-icons/ri'
import { TbSun, TbSunOff } from 'react-icons/tb'
import { BiMenu } from 'react-icons/bi'

const Header = () => {
    const [theme, setTheme] = useState('light');
    const [toggleMenu, setToggleMenu] = useState(false);
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    // Update theme when user toggles
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Apply theme to <html> element
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);


    return (
        <header className='flex gap-6 justify-between w-full relative transition-all'>
            <nav className='flex gap-3 relative w-full'>
                <button className='z-30 sm:hidden p-2 cursor-pointer hover:bg-neutral rounded-full text-3xl' onClick={() => setToggleMenu(!toggleMenu)}>{toggleMenu ? <IoClose /> : <BiMenu />}</button>
                <div onClick={() => setToggleMenu(false)} className={'flex flex-col sm:flex-row gap-4 absolute z-30 sm:relative bg-background top-20 sm:top-0 w-full ' + `${toggleMenu ? ' visible' : ' invisible sm:visible'}`}>
                    <NavLink href='/'>Home<IoHome /></NavLink>
                    <NavLink href='/admin'>Admin<RiAdminFill /></NavLink>
                    <NavLink href='/game'>Game<IoGameController /></NavLink>
                </div>
            </nav>
            <button onClick={toggleTheme} className=' absolute z-30 right-0 top-3 p-2 text-2xl rounded-full cursor-pointer w-12'>
                <span className='-left-2 top-1/2 -translate-y-1/2 absolute w-full h-3 rounded-2xl bg-textPrimary'></span>
                <div className={`z-30 bg-textPrimary text-background rounded-full shadow p-1 absolute -left-4 top-1/2 -translate-y-1/2 transition-all ${theme === 'dark' ? ' translate-x-full' : ''}`}>
                    {theme === 'dark' ? <TbSunOff /> : <TbSun />}
                </div>
            </button>
            <div onClick={() => setToggleMenu(false)} className={'bg-background fixed z-10 w-svw h-svh top-0 left-0 ' + `${toggleMenu ? ' visible sm:invisible' : ' invisible'}`}></div>
        </header>
    )
}

export default Header   