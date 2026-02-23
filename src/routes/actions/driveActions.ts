
import { getCurrentUserFolder } from "@/lib/appwrite"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import type { ActionFunction } from "react-router"

const apiKey = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`)

type CreateFolderInput = {
  folderName: string
  parentFolderPath?: string
  currentFolderName?: string
}

type RenameFileInput = {
  filePath: string
  newName: string
}

type DeleteFileInput = {
  fileId: string
  
}

export const createFolder = async (data:CreateFolderInput) => {
    const options: AxiosRequestConfig = {
        method: "POST",
        url: "https://api.imagekit.io/v1/folder",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${apiKey}`
        },
        data: {
            folderName: data.folderName,
            parentFolderPath: `${data?.currentFolderName ?? ""}/${data?.parentFolderPath ?? "/"}`,

        }
    }

    try {
        await axios.request(options)
        return { ok: true, message: "Folder created successfully" }
    } catch (error) {
        return { ok: false, error }
    }
}
export const renameFile = async (data:RenameFileInput) => {
    const options: AxiosRequestConfig = {
        method: "PUT",
        url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/rename`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${apiKey}`
        },
        data: {
            filePath: data?.filePath,
            newFileName:data?.newName,
            purgeCache:true,

        }
    }

    try {
        await axios.request(options)
        return { ok: true, message: "File renamed successfully" }
    } catch (error) {
        return { ok: false, error }
    }
}

export const deleteFile = async (data:DeleteFileInput)=>{
     const options: AxiosRequestConfig = {
        method: "DELETE",
        url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/${data.fileId}`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${apiKey}`
        },
    }

    try {
        await axios.request(options)
        return { ok: true, message: "File deletd successfully" }
    } catch (error) {
        return { ok: false, error }
    }
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
      currentFolderName, 
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

    return await deleteFile({
      fileId: body.fileId,
    })
  }

  return { ok: false, error: "Invalid method" }
}