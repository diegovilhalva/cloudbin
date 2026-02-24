import type { VercelRequest, VercelResponse } from "@vercel/node"
import axios from "axios"

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!
const endpoint = process.env.IMAGEKIT_API_ENDPOINT!

const authHeader = `Basic ${Buffer.from(privateKey + ":").toString("base64")}`

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { action } = req.query

    if (!action) {
      return res.status(400).json({ error: "Missing action" })
    }

    // CREATE FOLDER
    if (req.method === "POST" && action === "create-folder") {
      const { folderName, parentFolderPath, userId } = req.body

      if (!folderName || !userId) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const response = await axios.post(
        "https://api.imagekit.io/v1/folder",
        {
          folderName,
          parentFolderPath: `/${userId}/${parentFolderPath ?? ""}`,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      )

      return res.status(200).json(response.data)
    }

    // RENAME FILE
    if (req.method === "PUT" && action === "rename-file") {
      const { filePath, newName } = req.body

      if (!filePath || !newName) {
        return res.status(400).json({ error: "Missing fields" })
      }

      const response = await axios.put(
        `${endpoint}/rename`,
        {
          filePath,
          newFileName: newName,
          purgeCache: true,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )

      return res.status(200).json(response.data)
    }

    // DELETE FILE
    if (req.method === "DELETE" && action === "delete-file") {
      const { fileId } = req.body

      if (!fileId) {
        return res.status(400).json({ error: "Missing fileId" })
      }

      const response = await axios.delete(`${endpoint}/${fileId}`, {
        headers: {
          Authorization: authHeader,
        },
      })

      return res.status(200).json(response.data)
    }

    // LIST FILES
    if (req.method === "GET" && action === "list-files") {
      const { path } = req.query

      if (!path) {
        return res.status(400).json({ error: "Missing path" })
      }

      const response = await axios.get(endpoint, {
        params: { path },
        headers: {
          Authorization: authHeader,
        },
      })

      return res.status(200).json(response.data)
    }

    return res.status(405).json({ error: "Invalid route" })
  } catch (error: any) {
    return res.status(500).json({
      error: error?.response?.data || error.message,
    })
  }
}