'use client'
import PageTransitionWrapper from '@/components/motionWrapper/PageTransitionWrapper';
import React, { useActionState, useState } from 'react'

const AdminPage = () => {
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [level, setLevel] = useState<string>('easy');
    const [message, handleSubmit, isPending] = useActionState(addQuestionToDB, newQuestion, ''); //main dish
    async function addQuestionToDB(prevState: string, queryData: any) {
        if (newQuestion.length > 0) {
            try {
                const res = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + '/api/questions', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "question": newQuestion, "level": level })
                })
                if (res.status === 400) { throw new Error("Something went wrong!"); }
                setNewQuestion('');
                return "submitted";
            } catch (error) {
                return 'submit failed'
            }
        }
        return 'no question is added, enter your question on the textfield please'
    }
    return (
        <main className=' w-full h-full flex-1 py-6'>
            <PageTransitionWrapper>
                <div className='flex flex-col gap-6'>
                    <h1 className=' font-bold text-xl'>Admin Page</h1>
                    <form action={handleSubmit} className='flex flex-col gap-6 m-auto w-full sm:w-[600px]'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor='newQuestion'>New Question:</label>
                                <input required className='border-1 p-2 rounded-xl focus:text-accent' placeholder='enter the new question' id='newQuestion' type='text' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>

                                <label htmlFor='level'>Level:</label>
                                <select className='border-1 p-2 rounded-xl focus:bg-accent' name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                                    <option className='mt-2' value="easy">easy</option>
                                    <option value="intermediate">intermediate</option>
                                    <option value="hard">hard</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className='px-4 py-3 bg-accent rounded-lg cursor-pointer'>add new question</button>
                        {isPending ? <p>submitting...</p> : message}
                    </form>
                </div>
            </PageTransitionWrapper>
        </main>
    )
}

export default AdminPage