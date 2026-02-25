export const listFiles = async (params: {
  path: string
  sort?: "ASC_CREATED" | "DESC_CREATED"
  type?: "folder"
}) => {
  const query = new URLSearchParams(params as any).toString()

  const response = await fetch(`/api/list-files?${query}`)

  const text = await response.text()
  if (!text) return []

  const json = JSON.parse(text)

  if (!json.ok) {
    throw new Error(json.error || "Failed to list files")
  }

  return json.data
}