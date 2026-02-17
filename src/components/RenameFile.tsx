import { useCallback, useEffect, useState } from "react"
import { useFetcher } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface Props {
    open:boolean
    onOpenChange:(open:boolean) => void
    fileName:string
    filePath:string
    onSuccess?: () => void
}

const RenameFile = ({open,onOpenChange,fileName,filePath,onSuccess}:Props) => {
    const fetcher = useFetcher()

    const [newFileName,setNewFileName] = useState(fileName)
    const isLoading = fetcher.state !== "idle"

    useEffect(() => {
        if (open) setNewFileName(fileName)
    },[open,fileName])

    useEffect(() => {
        if (!fetcher.data) return

        if (fetcher.data.ok) {
            toast.success("File rename succesfully")
            onSuccess?.()
            onOpenChange(false)
        }else{
            toast.error(fetcher.data.error ?? "Failed torename file.")
        }
    },[onOpenChange,onSuccess,fetcher.data])

    const handleSubmit = useCallback(() => {
        if (!newFileName.trim()){
            toast.error("File name cannot be empty")
            return
        }

        fetcher.submit({
            filePath, newName:newFileName
        },{
            method:"put",
            encType:"application/json",
            action:"/drive"
        })
    },[newFileName,filePath])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename File</DialogTitle>
                <DialogDescription>
                    Change the name of <strong>{fileName}</strong>
                </DialogDescription>
            </DialogHeader>
            <Input value={newFileName} onChange={(e) => setNewFileName(e.target.value)} 
            placeholder="Enter new file" className="mt-4"/>
            <DialogFooter>
                <Button variant={"outline"} onClick={() => onOpenChange(false)} disabled={fetcher.state == "submitting"}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Renaming..." : "Save"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default RenameFile