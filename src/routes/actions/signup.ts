import { redirect } from "react-router"

import { account,ID } from "@/lib/appwrite"

import type { ActionFunction } from "react-router"

import { AppwriteException } from "appwrite"

export const signupAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as SignupForm
    try {
       const user =  await account.create({
            userId:ID.unique(),
            ...data
        })

        return redirect("/auth/login")
    } catch (error) {
        if (error instanceof AppwriteException) {
            return { ok: false,error:error }
        }
        throw error
    }
} 