import axios from "axios"
import type { AxiosRequestConfig } from "axios"

const apiKey = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`)

export const createFolder = async (data) => {
    const options: AxiosRequestConfig = {
        method: "POST",
        url: "https://api.imagekit.io/v1/folder",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:`Basic ${apiKey}`
        },
        data:{
            folderName:data.folderName,
            parentFolderPath:`${data?.currentFolderName ?? ""}/${data?.parentFolderPath ?? "/"}`,

        }
    }

    try {
        await axios.request(options)
        return { ok: true, message: "Folder created successfully" }
    } catch (error) {
        return { ok: false, error }
    }
}