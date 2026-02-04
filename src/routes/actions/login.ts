import { redirect } from "react-router"

import { account } from "@/lib/appwrite"

import type { ActionFunction } from "react-router"

import { AppwriteException } from "appwrite"

export const loginAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as LoginForm
    try {
        await account.createEmailPasswordSession({
            ...data,
        })
        return redirect("/drive/home")
    } catch (error) {
        if (error instanceof AppwriteException) {
            return { ok: false,error:error }
        }
        throw error
    }
} 