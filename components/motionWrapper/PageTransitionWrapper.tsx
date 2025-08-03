'use client'
import { IWrapper } from '@/lib/definition'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

const PageTransitionWrapper = ({ children }: IWrapper) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}

            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransitionWrapper