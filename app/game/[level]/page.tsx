import DraggableComponent from '@/components/DraggableComponent';
import PageTransitionWrapper from '@/components/motionWrapper/PageTransitionWrapper';
import { shuffleArray } from '@/helpers/shuffleArray';
import { t2a } from '@/helpers/t2a';
import { notFound } from 'next/navigation';
import Pagination from '@/components/Pagination';
import { getGame } from '@/lib/fetch';

const Game = async ({
    params,
}: {
    params: Promise<{ level: string }>
}) => {
    const { level } = await params;
    if (!(level == 'easy' || level == 'intermediate' || level == 'hard')) {
        notFound();
    }
    const game = await getGame(level);

    return (
        <main className=' w-full h-full flex-1 py-6'>
            <PageTransitionWrapper>
                <div className=' flex flex-col gap-6  '>
                    <h1 className=' font-bold text-xl'>Game Page - level: {level}</h1>
                    {
                        (!!game?.questions) ?
                            <>
                                <div className='p-2 bg-neutral rounded-sm'>
                                    <p>total no. of sentences: {game.pagination.totalItems}</p>
                                </div> <ul className='flex flex-col gap-4' >
                                    {game.questions.map((q, i) => <li className='flex gap-2 flex-col' key={i}>
                                        <DraggableComponent>
                                            {shuffleArray(t2a(q.question)).map((word, index) =>
                                                <p className='swappable-item bg-neutral p-2 rounded-xl cursor-grab' key={word + index}>{word}</p>
                                            )}
                                        </DraggableComponent>
                                    </li>)}
                                </ul>
                                <Pagination currentPage={game.pagination.currentPage || 1} totalPages={game.pagination.totalPages || 1} />
                            </> : <div>No sentence is loaded</div>
                    }
                </div>
            </PageTransitionWrapper>
        </main>
    )
}

export default Game