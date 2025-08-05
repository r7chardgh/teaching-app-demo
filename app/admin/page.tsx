'use client'
import PageTransitionWrapper from '@/components/motionWrapper/PageTransitionWrapper';
import { IAdminFormState } from '@/lib/definition';
import { createQuestion } from '@/lib/fetch';
import React, { useActionState, useEffect, useState } from 'react'

const initialState: IAdminFormState = {
    message: '',
    errors: {},
    success: false,
};
const AdminPage = () => {
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [level, setLevel] = useState<string>('easy');
    const [state, formAction, isPending] = useActionState(createQuestion, initialState);

    useEffect(() => {
      if(state.success){
        setNewQuestion('')
      }
    }, [state.success])

    return (
        <main className=' w-full h-full flex-1 py-6'>
            <PageTransitionWrapper>
                <div className='flex flex-col gap-6'>
                    <h1 className=' font-bold text-xl'>Admin Page</h1>
                    <form action={formAction} className='flex flex-col gap-6 m-auto w-full sm:w-[600px]'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor='newQuestion'>New Question:</label>
                                <input required className='border-1 p-2 rounded-xl focus:text-accent' placeholder='enter the new question' name='question' id='newQuestion' type='text' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                                {state.errors?.question && <p className='text-red-500'>{state.errors.question}</p>}
                            </div>
                            <div className='flex flex-col gap-2'>

                                <label htmlFor='level'>Level:</label>
                                <select className='border-1 p-2 rounded-xl focus:bg-accent' name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                                    <option className='mt-2' value="easy">easy</option>
                                    <option value="intermediate">intermediate</option>
                                    <option value="hard">hard</option>
                                </select>
                                {state.errors?.level && <p className='text-red-500'>{state.errors.level}</p>}
                            </div>
                        </div>
                        <button disabled={isPending} type="submit" className='px-4 py-3 bg-accent rounded-lg cursor-pointer'>{isPending ? 'submitting...' : 'add new question'}</button>
                        {state.success && <p aria-live='polite'>submitted</p>}
                    </form>
                </div>
            </PageTransitionWrapper>
        </main>
    )
}

export default AdminPage