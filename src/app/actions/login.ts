"use server"
import { createId } from '@paralleldrive/cuid2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { comparePassword } from '~/lib/auth';

export async function login(password: string) {
    

    const isCorrect = await comparePassword(password)

    if (isCorrect) {
        cookies().set({
            name: "session",
            value: createId(),
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/"
        })

        redirect("/admin")
        return
    }

    throw new Error("Lösenord matchar inte")
}