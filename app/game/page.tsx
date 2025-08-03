'use client'
import DraggableComponent from '@/components/DraggableComponent';
import { shuffleArray } from '@/helpers/shuffleArray';
import { t2a } from '@/helpers/t2a';
import { IQuestion } from '@/lib/definition'
import { useEffect, useState } from 'react'


const Game = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + '/api/questions?limit=10')
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                setQuestions(json);
            } catch (error) {

            }
        })()

    }, [])

    return (
        <main className=' w-full h-full flex flex-col flex-1 gap-6 '>
            <h1 className=' font-bold text-xl'>Game Page</h1>
            <ul className='flex flex-col gap-4' >
                {questions.length > 0 && questions.map((q, i) => <li className='flex gap-2' key={i}><DraggableComponent>{shuffleArray(t2a(q.question)).map((word, index) => <p className='swappable-item bg-neutral p-2 rounded-xl' key={word + index}>{word}</p>)}  </DraggableComponent></li>)}

            </ul>

        </main>
    )
}

export default Game