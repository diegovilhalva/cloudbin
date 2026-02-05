

import { account } from "@/lib/appwrite"

import type { ActionFunction } from "react-router"

import { AppwriteException } from "appwrite"
import { redirect } from "react-router"

export const resetPasswordAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as { userId: string; secret: string; password: string; }
    try {
        await account.updateRecovery({
           userId:data.userId,
           secret:data.secret,
           password:data.password
        })

        return redirect("/auth/login")
    } catch (error) {
        if (error instanceof AppwriteException) {
            return { ok: false, error: error }
        }
        throw error
    }
} 