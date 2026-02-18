import type { FileDetailsType } from "@/types/all-types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState } from "react"
import FilePreview from "./FilePreview"
import ImgPreviewSidebar from "./ImgPreviewSidebar"


const FileDetails = ({ open, onOpenChange, file }: FileDetailsType) => {
    const isVideo = file.mime.startsWith("video/")
    const isImage = file.mime.startsWith("image/")
    const thumbnail = isImage ? file.url : file.thumbnail

    const [loading, setLoading] = useState(false)
    const [selectedTransforms, setSelectedtransforms] = useState<string[]>([])

    const [prompts, setPrompts] = useState<{ [key: string]: string }>({})

    const transformQuery = selectedTransforms.length > 0 ? `tr=${selectedTransforms.join(":")}` : ""

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-screen h-screen max-w-none rounded-none sm:rounded-lg sm:max-w-6xl overflow-auto">
                <DialogHeader className="border-b pb-2">
                    <DialogTitle>File Details</DialogTitle>
                    <DialogDescription>
                        <strong>{file.name}</strong>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <FilePreview file={file} isVideo={isVideo} thumbnail={thumbnail} transformQuery={transformQuery} loading={loading} setLoading={setLoading} isImage={isImage} />
                    <div className="w-80 border-lg bg-background p-4 flex flex-col">
                     {/*   {isImage  ? (
                            <ImgPreviewSidebar 
                            file={file} 
                            selectedTransforms={selectedTransforms}
                            prompts={prompts}
                            handleToggle={handletoggle}
                            handlePromptChange={handlePromptChange}
                            />
                        ):(
                            <div className="border">

                            </div>
                        )}*/}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FileDetails