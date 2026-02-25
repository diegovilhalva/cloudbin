
import type { LoaderFunction } from "react-router"

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName
  if (!folderName) throw new Error("Folder name required")

  const res = await fetch(
    `/api/folder/list?folder=${encodeURIComponent(folderName)}`,
    {
      credentials: "include", 
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error(text)
    throw new Error("Failed to load folder")
  }

  return res.json()
}