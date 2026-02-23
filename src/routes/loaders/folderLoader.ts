import { getCurrentUserFolder } from "@/lib/appwrite";
import axios from "axios";
import { redirect } from "react-router";

import type { LoaderFunction,  } from "react-router"
import type { AxiosRequestConfig } from "axios"
import { AppwriteException } from "appwrite"

const apiKey = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`)


const getFilesByFolder = async (path: string) => {
    const folderName = getCurrentUserFolder()

    const options: AxiosRequestConfig = {
        method: "GET",
        url: import.meta.env.VITE_IMAGEKIT_API_ENDPOINT,
        params: {
            path: `/${folderName}/${path}`
        },
        headers: {
            Accept: "application/json",
            Authorization: `Basic ${apiKey}`
        }

    }

    try {
        const  {data}  = await axios.request(options)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const driveFolderLoader: LoaderFunction = async ({ params }) => {
    try {
        const folderName = params.folderName

        if (!folderName) {
            throw new Error("Folder namis is reuired")
        }

        const files = await getFilesByFolder(folderName)
        return files
    } catch (error) {
        if (error instanceof AppwriteException) {
            return redirect("/auth/login")
        }

        throw error
    }
}