'use client'
import { IWrapper } from '@/lib/definition'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface INavLink extends IWrapper, LinkProps {
  href: string;
  className?:string;
}
const NavLink: React.FC<INavLink> = ({ children, href, className}) => {
  const pathname = usePathname();
  return (
    <Link className={`flex gap-2 items-center p-2 ${pathname==href&&' text-linkText'} ${className}`} href={href}>{children}</Link>
  )
}

export default NavLink