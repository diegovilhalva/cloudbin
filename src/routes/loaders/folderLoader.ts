
import { getCurrentUserFolder } from "@/lib/appwrite"
import type { LoaderFunction } from "react-router"
export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName
  if (!folderName) throw new Error("Folder name required")

  const userId = await getCurrentUserFolder()
   
  if (!userId) throw new Error("Unauthorized")

  const res = await fetch(
     `/api/folder/list?path=${userId}/${folderName}`
  )

  if (!res.ok) {
    const t = await res.text()
    console.error(t)
    throw new Error("Failed to load folder")
  }

  return res.json()
}