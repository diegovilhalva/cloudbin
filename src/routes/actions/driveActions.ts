
import { getCurrentUserFolder } from "@/lib/appwrite"

import type { ActionFunction } from "react-router"



export const createFolder = async (data: {
  folderName: string
  parentFolderPath?: string
  userId: string
}) => {
  const response = await fetch("/api/imagekit?action=create-folder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  return response.json()
}

export const renameFile = async (data: {
  filePath: string
  newName: string
}) => {
  const response = await fetch("/api/imagekit?action=rename-file", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  return response.json()
}

export const deleteFile = async (fileId: string) => {
  const response = await fetch("/api/imagekit?action=delete-file", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId }),
  })

  return response.json()
}
export const driveActions: ActionFunction = async ({ request }) => {
  const currentFolderName = await getCurrentUserFolder()

  if (!currentFolderName) {
    return { ok: false, error: "User folder not found" }
  }

  const body = await request.json()

  if (request.method === "POST") {
    if (!body.folderName) {
      return { ok: false, error: "Folder name is required" }
    }

    return await createFolder({
      folderName: body.folderName,
      parentFolderPath: body.parentFolderPath,
      userId: currentFolderName,
    })
  }

  if (request.method === "PUT") {
    if (!body.filePath || !body.newName) {
      return { ok: false, error: "Missing rename data" }
    }

    return await renameFile({
      filePath: body.filePath,
      newName: body.newName,
    })
  }

  if (request.method === "DELETE") {
    if (!body.fileId) {
      return { ok: false, error: "File id required" }
    }

    return await deleteFile(body.fileId)
  }

  return { ok: false, error: "Invalid method" }
}