'use client'
import { use } from 'react'
import DraggableComponent from '@/components/DraggableComponent';
import PageTransitionWrapper from '@/components/motionWrapper/PageTransitionWrapper';
import { shuffleArray } from '@/helpers/shuffleArray';
import { t2a } from '@/helpers/t2a';
import { IPagination, IQuestion } from '@/lib/definition'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation';


const Game = ({
    params,
}: {
    params: Promise<{ level: string }>
}) => {
    const { level } = use(params);
    if (!(level == 'easy' || level == 'intermediate' || level == 'hard')) {
        notFound();
    }
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [pagination, setPagination] = useState<IPagination | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + `/api/questions?limit=10&level=${level}`)
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                setQuestions(json.questions);
                setPagination(json.pagination);
            } catch (error) {

            }
        })()

    }, [])

    return (
        <main className=' w-full h-full flex-1 py-6'>
            <PageTransitionWrapper>
                <div className=' flex flex-col gap-6  '>
                    <h1 className=' font-bold text-xl'>Game Page - level: {level}</h1>
                    {!!pagination &&
                        <div className='p-2 bg-neutral rounded-sm'>
                            <p>total no. of sentences: {pagination.totalItems}</p>
                        </div>
                    }
                    {questions.length > 0 ?
                        <ul className='flex flex-col gap-4' >
                            {questions.map((q, i) => <li className='flex gap-2 flex-col' key={i}>
                                <DraggableComponent>
                                    {shuffleArray(t2a(q.question)).map((word, index) =>
                                        <p className='swappable-item bg-neutral p-2 rounded-xl' key={word + index}>{word}</p>
                                    )}
                                </DraggableComponent>
                            </li>)}
                        </ul>
                        :
                        <div>No sentence is loaded</div>
                    }
                </div>
            </PageTransitionWrapper>
        </main>
    )
}

export default Game