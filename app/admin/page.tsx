'use client'
import React, { useActionState, useState } from 'react'

const AdminPage = () => {
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [level, setLevel] = useState<string>('easy');
    const [message, handleSubmit, isPending] = useActionState(addQuestionToDB, newQuestion); //main dish
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

        <main className=' w-full h-full flex flex-col flex-1 gap-6 '>
            <h1 className=' font-bold text-xl'>Admin Page</h1>
            <form action={handleSubmit} className='flex flex-col gap-4 m-auto w-full sm:w-[600px]'>
                <div className='flex flex-col gap-2'>

                    <label className='' htmlFor='newQuestion'>New Question:</label>
                    <input required className='border-1 p-2 rounded-xl' placeholder='enter the new question' id='newQuestion' type='text' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <label htmlFor='level'>Level:</label>
                    <select name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="easy">easy</option>
                        <option value="intermediate">intermediate</option>
                        <option value="hard">hard</option>
                    </select>
                </div>
                <button type="submit" className='px-4 py-3 bg-gray-600 rounded-lg'>add new question</button>
                {isPending ? <p>submitting...</p> : message}
            </form>
        </main>
    )
}

export default AdminPage