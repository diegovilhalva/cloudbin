import type { File } from "@/types/all-types"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { CopyIcon, DownloadIcon, EditIcon, EllipsisVerticalIcon, FolderOpenIcon, InfoIcon, ShareIcon, Trash2Icon } from "lucide-react"
import { copyToClipboard, downloadFile } from "@/lib/utils"
import RenameFile from "./RenameFile"
import FileInformation from "./FileInformation"


const FileMenu = ({ file }: { file: File }) => {
    const [renameOpen, setRenameOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setDetailsOpen(true)}>
                        <FolderOpenIcon size={18} className="text-gray-400" />
                        Open File
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => downloadFile(file.url,file.name)}>
                        <DownloadIcon />
                        Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setRenameOpen(true)}>
                        <EditIcon />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ShareIcon />
                            Share
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={async () => await copyToClipboard(file.url)}>
                                    <CopyIcon />
                                    Copy Link
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem className="cursor-pointer" onClick={() => setInfoOpen(true)}>
                        <InfoIcon />
                        File Info
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => setDeleteOpen(true)}>
                        <Trash2Icon />
                        Delete File
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            <RenameFile

            open={renameOpen} 
            onOpenChange={setRenameOpen}
            fileName={file.name}
            filePath={file.filePath} 

            />
            <FileInformation 
            open={infoOpen}
            onOpenChange={setInfoOpen}
            file={file} />
        </>
    )
}

export default FileMenu