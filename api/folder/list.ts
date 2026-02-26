import type { VercelRequest, VercelResponse } from "@vercel/node"
import ImageKit from "imagekit"

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    const path = req.query.path as string
    if (!path || path.includes("..")) {
      return res.status(400).json({ error: "Invalid path" })
    }

    const files = await imagekit.listFiles({
      path: `/${path}`,
      limit: 100,
    })

    return res.status(200).json(files)
  } catch (err) {
    console.error("IMAGEKIT LIST ERROR:", err)
    return res.status(500).json({ error: "Failed to list files" })
  }
}