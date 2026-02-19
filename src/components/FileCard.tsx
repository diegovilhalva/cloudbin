import React, { useCallback, useMemo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { File } from '@/types/all-types'
import { fileIcons } from '@/assets/icons/file'
import FileMenu from './FileMenu'
import { Image } from '@imagekit/react'
import { formatCustomDate } from '@/lib/utils'
import FileDetails from './FileDetails'

const FileCard = ({ file }: { file: File }) => {
    const [detailOpen, setDetailOpen] = useState(false)
    const thumbNail = useMemo(() => file?.mime.startsWith("image/") ? file.url : file.thumbnail, [file])

    const getFileIcon = useCallback((mime: string) => {
        if (!mime) return fileIcons.default

        if (mime.startsWith("image/")) return fileIcons.image
        if (mime.startsWith("video")) return fileIcons.video


        return fileIcons[mime] || fileIcons.default 
    }, [])

    const Icon = getFileIcon(file.mime)
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-between'>
                        <span className='flex gap-2'>
                            {Icon && <Icon/>}
                            <span>
                                {file.name.slice(0,16)}
                                {file.name.length > 18 ? "..." : ""}
                            </span>
                        </span>
                        <FileMenu file={file} />
                    </CardTitle>
                </CardHeader>
                <CardContent className='grow cursor-pointer' onClick={() => setDetailOpen(true)}>
                <Image urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}  src={thumbNail} width={500} height={500} alt={file.name}  loading="lazy" className="w-full h-full object-cover rounded-lg" />
                </CardContent>
                <CardFooter>
                    <p>
                        Last updated:{"   "}
                        {file.updatedAt ? formatCustomDate(file.updatedAt) : "Unknown"}
                    </p>
                </CardFooter>
            </Card>
            <FileDetails open={detailOpen} file={file} onOpenChange={setDetailOpen}  />
        </>
    )
}

export default FileCard