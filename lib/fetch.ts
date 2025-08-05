'use server'
import z from "zod";
import { revalidateTag } from "next/cache";
import { IAdminFormState, IGame } from "./definition";

//return game by level
export async function getGame(level: string, limit?: number): Promise<IGame> {
    const response = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:8787') + `/api/questions?limit=${limit || 10}&level=${level}`, { cache: 'force-cache', next: { tags: ['game'] } })
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json
}

//create new question
const schema = z.object({
    question: z.string().min(4, "Field must contain at least 4 characters."),
    level: z.string()
});

export async function createQuestion(prevState: {
    message: string, errors: {},
    success: boolean,
}, formData: FormData): Promise<IAdminFormState> {

    const validatedFields = schema.safeParse({
        question: formData.get('question'),
        level: formData.get('level')
    })


    if (!validatedFields.success) {
        return {
            message: '',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    const response = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + '/api/questions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "question": validatedFields.data.question, "level": validatedFields.data.level })
    })

    revalidateTag('game');

    if (!response.ok) {
        return {
            message: '',
            errors: { 'message': 'failed to create new question' },
            success: false,
        };
    }
    return {
        message: "Created new question!",
        errors: {},
        success: true,
    }
}