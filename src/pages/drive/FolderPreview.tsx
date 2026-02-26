import FileCard from '@/components/FileCard'
import type { File } from '@/types/all-types'
import { useLoaderData, useParams } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const FolderPreview = () => {
  const files = useLoaderData<File[]>()
  const { folderName = "" } = useParams()

  const segments = folderName.split("/").filter(Boolean)

  if (!files.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <span className="text-5xl mb-4">📂</span>
        <p className="text-lg">This folder is empty</p>
        <p className="text-sm">Upload files to get started</p>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/drive">
              Drive
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, i) => {
            const path = segments.slice(0, i + 1).join("/")

            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href={`/drive/folders/${path}`}
                  className="capitalize"
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        📁 {segments.at(-1)}
        <span className="text-sm text-muted-foreground font-normal">
          ({files.length})
        </span>
      </h1>

      {/* Grid */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {files.map((file) => (
          <FileCard file={file} key={file.fileId} />
        ))}
      </section>
    </>
  )
}

export default FolderPreview