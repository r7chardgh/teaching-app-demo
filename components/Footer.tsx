'use client'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    return (
        <footer>用心製造 | <Link href='https://richardtsang.vercel.app/'>Richard Tsang</Link> © Copyright {new Date().getFullYear()}</footer>
    )
}

export default Footer