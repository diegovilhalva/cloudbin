import type { LoaderFunction } from "react-router"
import { getCurrentUserFolder } from "@/lib/appwrite"

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName
  if (!folderName) throw new Error("Folder name required")

  const userFolder = await getCurrentUserFolder()
  if (!userFolder) {
    throw new Error("Unauthorized")
  }

  const fullPath = `${userFolder}/${folderName}`

  const res = await fetch(
    `/api/folder/list?path=${encodeURIComponent(fullPath)}`
  )

  if (!res.ok) {
    const err = await res.text()
    console.error(err)
    throw new Error("Failed to load folder")
  }

  return res.json()
}