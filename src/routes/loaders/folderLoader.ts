


import type { LoaderFunction,  } from "react-router"







export const driveFolderLoader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName
  if (!folderName) throw new Error("Folder name required")

  const res = await fetch(
    `/api/folder/list?derncodeURIComponent(folderName)}`,
    {
      headers: {
        "x-user-id": localStorage.getItem("userId") ?? "",
      },
    }
  )

  if (!res.ok) throw new Error("Failed to load folder")

  return res.json()
}