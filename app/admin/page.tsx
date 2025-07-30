'use client'
import React, { useActionState, useState } from 'react'

const AdminPage = () => {
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [message, handleSubmit, isPending] = useActionState(addQuestionToDB, newQuestion); //main dish
     function addQuestionToDB(prevState: string, queryData: any) {
        setNewQuestion('');
        return "submitted";
    }
    return (

        <main className=' w-full h-full flex flex-col flex-1 gap-6 '>
            <h1 className=' font-bold text-xl'>Admin Page</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto '>
                <div className='flex flex-col gap-2'>

                    <label className='' htmlFor='newQuestion'>New Question:</label>
                    <input className='border-1 p-2 rounded-xl' placeholder='enter the new question' id='newQuestion' type='text' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                </div>
                <button type="submit" className='px-4 py-3 bg-gray-600 rounded-lg'>add new question</button>
                    {isPending ? <p>submitting...</p> : message}
            </form>
        </main>
    )
}

export default AdminPage