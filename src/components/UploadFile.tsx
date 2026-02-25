
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import { useLocation } from "react-router"
import { UploadIcon } from "lucide-react"
import { functions } from "@/lib/appwrite"
import { useFolder } from "@/contexts/FolderContext"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}



const UploadFile = ({ open, onOpenChange }: Props) => {
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const abortController = new AbortController()
    const location = useLocation()

    const currentFolderName = useFolder()

    const getAuthData = useCallback(async () => {
        try {
            const response = await functions.createExecution({
                functionId: import.meta.env.VITE_APPWRITE_FN_ID,
                xpath: "/auth",
                async:false
            })

            if (response.responseStatusCode !== 200) {
                throw new Error(`Request failed with status ${response.status}: ${response.errors}`)
            }
            const data = JSON.parse(response.responseBody)
            return data

        } catch (error) {
            console.log(error)
            throw new Error("Authentication request failed")
        }
    }, [])


    const handleUpload = useCallback(async () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) return toast.error("Please select a file to upload")
        const pathname = location.pathname
        const folderPath = location.pathname.startsWith("/drive/folders/") ? pathname.split("/folders")[1] : null

        try {
            setIsUploading(true)
            const { signature, expire, token, publicKey } = await getAuthData()

            await upload({
                file,
                fileName: file.name,
                folder: folderPath ? `/${currentFolderName}/${folderPath}` : `/${currentFolderName}`,
                expire,
                token,
                signature,
                publicKey,
                onProgress: (event) => {
                    setProgress(Math.round((event.loaded / event.total) * 100))
                },
                abortSignal: abortController.signal
            })
            toast.success("File uploaded sucessfully")


            if (fileInputRef.current) fileInputRef.current.value = "";
            setProgress(0)
            onOpenChange(false)
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                toast.warning(`Upload abort: ${error.message}`)
            } else if (error instanceof ImageKitInvalidRequestError) {
                toast.error(`Inavalid request: ${error?.message}`)
            } else if (error instanceof ImageKitUploadNetworkError) {
                toast.error(`Network error: ${error.message}`)
            } else if (error instanceof ImageKitServerError) {
                toast.error(`Server error: ${error.message}`)
            } else {
                toast.error("Unexpected upload error")
            }
        } finally {
            setIsUploading(false)
        }
    }, [location.pathname, abortController.signal, currentFolderName, getAuthData, onOpenChange])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-none rounded-none sm:rounded-lg sm:max-w-md">
                <DialogHeader className="border-b pb-2">
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <UploadIcon /> Upload File
                    </DialogTitle>
                    <DialogDescription>
                        Select a file to upload to{" "}
                        <span className="font-semibold">Cloudbin</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input type="file" ref={fileInputRef} className="cursor-pointer" disabled={isUploading} />
                    {progress > 0 && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                Uploading...
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2 rounded-full transition-all duration-300" />
                        </div>
                    )}
                </div>
                <DialogFooter className="flex flex-col gap-2">
                    {!isUploading ? (
                        <Button onClick={handleUpload} className="w-full flex items-center justify-center gap-2">
                            Upload File
                        </Button>
                    ) : (
                        <Button variant="secondary" size="sm" className="w-full  flex items-center justify-center gap-2" onClick={() => { }}>
                            Cancel
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadFile