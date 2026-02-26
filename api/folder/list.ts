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

    const rawPath = req.query.path as string
    if (!rawPath || rawPath.includes("..")) {
      return res.status(400).json({ error: "Invalid path" })
    }

    // Garante que começa com / e não tem // duplos
    const path = "/" + rawPath.replace(/^\/+/, "").replace(/\/+/g, "/")

    console.log("Listing path:", path) // aparece nos logs do Vercel

    const files = await imagekit.listFiles({
      path,
      limit: 100,
      includeFolder: true,
      type:"all"
    })

    return res.status(200).json(files)
  } catch (err: any) {
    console.error("IMAGEKIT LIST ERROR:", JSON.stringify(err))
    return res.status(500).json({
      error: "Failed to list files",
      detail: err?.message ?? String(err),
    })
  }
}
