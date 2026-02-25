import type { VercelRequest, VercelResponse } from "@vercel/node"
import axios from "axios"

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { path, sort, type } = req.query

  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Missing path" })
  }

  try {
    const response = await axios.get(
      "https://api.imagekit.io/v1/files",
      {
        params: {
          path,
          sort,
          type,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.IMAGEKIT_PRIVATE_KEY + ":"
          ).toString("base64")}`,
        },
      }
    )

    return res.status(200).json(response.data)
  } catch (error: any) {
    return res.status(500).json({
      error: error?.response?.data || error.message,
    })
  }
}