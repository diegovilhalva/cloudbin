import { redirect, type LoaderFunction } from "react-router"
import { AppwriteException } from "appwrite"
import { getCurrentUserFolder } from "@/lib/appwrite"
import { listFiles } from "@/lib/driveApi"

export const driveFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder()

    if (!folderName) {
      throw new Error("User folder not found")
    }

    const [files, recentFiles, folders] = await Promise.all([
      listFiles({ path: folderName }),
      listFiles({ path: folderName, sort: "DESC_CREATED" }),
      listFiles({ path: folderName, type: "folder" }),
    ])

    return { files, recentFiles, folders }
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect("/auth/login")
    }
    throw error
  }
}