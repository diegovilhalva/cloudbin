import type { VercelRequest, VercelResponse } from "@vercel/node"
import ImageKit from "imagekit"

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // 🔐 segurança básica (opcional mas recomendado)
  const userId = req.headers["x-user-id"] as string
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const folderPath = req.query.path as string

  if (!folderPath) {
    return res.status(400).json({ error: "path is required" })
  }

  // 🔒 proteção contra traversal
  if (folderPath.includes("..")) {
    return res.status(400).json({ error: "Invalid path" })
  }

  try {
    const files = await imagekit.listFiles({
      path: `/${userId}/${folderPath}`,
      limit: 100,
    })

    return res.status(200).json(files)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      error: "Failed to list files",
    })
  }
}