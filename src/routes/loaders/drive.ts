import { account } from "@/lib/appwrite"
import { AppwriteException } from "appwrite"
import { redirect } from "react-router"


import type { LoaderFunction } from "react-router"
import { createFolder } from "../actions/driveActions"
export const driveLoader: LoaderFunction = async () => {
   try {
      const currentSession = await account.getSession({ sessionId: 'current' })
      const user = await account.get()
      const folderName = user.$id
      await createFolder({ folderName, parentFolderPath: '/' })
      return { currentSession, user }
   } catch (error) {
      if (error instanceof AppwriteException) {
         return redirect("/auth/login")
      }
      throw error
   }
}