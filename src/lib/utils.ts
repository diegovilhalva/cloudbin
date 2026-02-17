import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



import { formatRelative, isSameYear, format } from "date-fns"
import { ur } from "zod/v4/locales"

export const toTileCase = (str: string) => {
return str[0].toUpperCase() + str.slice(1)
}


export function formatCustomDate(date: string | number | Date) {
  const today = new Date()

  const relativeDay = toTileCase(formatRelative(date, today).split(" at ")[0])

  const relativeDays = [
      "Today",
      "Tomorrow",
      "Yesterday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
  ]

  if (relativeDays.includes(relativeDay)) {
    return relativeDay
  }

  if (isSameYear(date,today)) {
    return format(date, "dd MMM")
  }else{
    return format(date,"dd MMM yyyy")
  }
}


export async function downloadFile(url:string,fileName:string){
  try {
    const response = await fetch(url,{method:"GET"})

    if (!response.ok) {
      throw new Error(`Failed to download: ${response.status}`)
    }

    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)

    const a = document.createElement("a")

    a.href = downloadUrl
    a.download = fileName || url.split("/").pop() || "file"
    document.body.appendChild(a)
    a.click()



    a.remove()
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) { 
    console.log("Download failed",error)
  }
} 

export async function copyToClipboard(url:string) {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch (error) {
    console.log("Failed to copy: ",error)
    return false
  }
}