import { useCallback, useEffect, useState } from "react"
import { useFetcher } from "react-router"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const NewFolder = ({ open, onOpenChange }: Props) => {
    const fetcher = useFetcher()

    const [folderName, setFolderName] = useState('New Folder')
    const [parentFolderPath, setParentFolderPath] = useState('/')
    const isLoading = fetcher.state !== "idle"

    useEffect(() => {
        if (!fetcher.data) return;

        if (fetcher.data.ok) {
            toast.success("Folder created sucessfully")
            onOpenChange(false)
        }else{
            console.log(fetcher.data.error)
            toast.error(fetcher.data.error ?? "Failed to created folder")
        }
    }, [fetcher.data,parentFolderPath])

    const handleSubmit = useCallback(() => {
        fetcher.submit({
            folderName,
            parentFolderPath,

        },{
            action:"/drive",
            method:"post",
            encType:"application/json",
        
        })
    }, [folderName,parentFolderPath])
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Create Folder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="folderName">Folder name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="folderName" value={folderName} onChange={(e) => setFolderName(e.currentTarget.value)} placeholder="Enter new folder" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="parentFolderPath">Parent Folder path
                        </Label>
                        <Input id="parentFolderPath" value={parentFolderPath} onChange={(e) => setParentFolderPath(e.currentTarget.value)} placeholder="/ (option)" required />
                    </div>
                    <DialogFooter>
                        <Button variant={"outline"} onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? "Creating Folder...": "Create Folder"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NewFolder