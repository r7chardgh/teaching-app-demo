'use client'
import { IWrapper } from '@/lib/definition';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react'

const DraggableComponent = dynamic(
    () => import('@shopify/draggable').then(mod => {
        // This code runs only on the client-side
        return function DraggableWrapper({ children }: IWrapper) {
            const containerRef = useRef(null);

            useEffect(() => {
                if (containerRef.current) {
                    const draggable = new mod.Swappable(containerRef.current, {
                        draggable: '.swappable-item', // Class of draggable elements
                        mirror: {
                            constrainDimensions: true,
                        },
                        //handle: '.draggable-handle', // Optional: Class of drag handle
                    });

                    // Add event listeners for drag events (e.g., sortable:stop, draggable:moved)
                    // draggable.on('sortable:stop', (event) => { /* handle reordering */ });

                    return () => {
                        draggable.destroy(); // Clean up on component unmount
                    };
                }
            }, [children]); // Re-initialize if children change

            return <div className='flex gap-6 flex-wrap select-none border-textPrimary p-4' ref={containerRef}>{children}</div>;
        };
    }),
    { ssr: false } // Disable SSR for this component
);

export default DraggableComponent;

