'use client'
import { useEffect, useState } from 'react'

const ConnectionFailedBanner = () => {
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        (async function () {
            try {
                const res = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + '/api/questions');
                setError(await res.json());
            } catch (error) {

            }
        })()
    }, [])

    return (
        <div className={'fixed bottom-15 rounded-2xl left-6 p-2 flex gap-2 bg-neutral'}><span className={!!error ? 'text-green-400' : 'text-red-400'}>●</span>database is {!!error ? 'connected' : 'disconnected'}</div>
    )
}

export default ConnectionFailedBanner