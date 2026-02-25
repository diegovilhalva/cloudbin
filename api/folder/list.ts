import type { VercelRequest, VercelResponse } from "@vercel/node"
import ImageKit from "imagekit"

import { Client, Account,  } from "appwrite"
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})

// Appwrite server SDK
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  

const account = new Account(client)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    const folder = req.query.folder as string
    if (!folder || folder.includes("..")) {
      return res.status(400).json({ error: "Invalid folder" })
    }

    // 🔐 recuperar sessão do cookie
    const session = req.cookies["a_session"]
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    client.setSession(session)

    const user = await account.get()
    const userFolder = user.$id

    const fullPath = `/${userFolder}/${folder}`

    const files = await imagekit.listFiles({
      path: fullPath,
      limit: 100,
    })

    return res.status(200).json(files)
  } catch (err: any) {
    console.error("LIST ERROR:", err)
    return res.status(500).json({
      error: err.message ?? "Failed to list files",
    })
  }
}