import RenameFile from "@/components/RenameFile"
import { getCurrentUserFolder } from "@/lib/appwrite"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import type { ActionFunction } from "react-router"

const apiKey = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`)

export const createFolder = async (data) => {
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
export const renameFile = async (data) => {
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

export const driveActions: ActionFunction = async ({ request }) => {
    const currentFolderName = await getCurrentUserFolder()

    const data = (await request.json()) as {
        filePath?: string
        newName?: string
        folderName?: string
        parentFolderPath?: string
    }

    if (request.method === "POST") {
        return await createFolder({ ...data, currentFolderName })
    }

    if (request.method === "PUT") {
        return await renameFile({ ...data, currentFolderName })
    }
}