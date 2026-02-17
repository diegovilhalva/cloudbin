import type { DeleteFileType } from "@/types/all-types"
import { useFetcher } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"


const DeleteFile = ({ open, onOpenChange, fileId, fileUrl }: DeleteFileType) => {
    const fetcher = useFetcher()

    const isLoading = fetcher.state !== "idle"

    useEffect(() => {
        if (!fetcher.data) return

        if (fetcher.data.ok) {
            toast.success("File deleted successfully!")
            onOpenChange(false)
        }else{
            toast.error("Failed to delete file.")
        }
    },[fetcher.data,onOpenChange])


    const handleSubmit = useCallback(() => {
        if (!fileId.trim()) {
            toast.error("File ID cannot be empty")
            return
        }
        fetcher.submit({
            fileId,
            fileUrl
        },{
            method:"delete",
            encType:"application/json",
            action:"/drive"
        })
    },[fileId,fileUrl])
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete File
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => onOpenChange(false)} disabled={fetcher.state !== "submitting"}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} variant="destructive">
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFile