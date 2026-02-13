import React, { useCallback, useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import type { File } from '@/types/all-types'
import { fileIcons } from '@/assets/icons/file'

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
                        
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}

export default FileCard