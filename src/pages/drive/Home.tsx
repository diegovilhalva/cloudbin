import FileCard from "@/components/FileCard"
import FolderCard from "@/components/FolderCard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { File, FolderCardType } from "@/types/all-types"
import { ChevronDownIcon } from "lucide-react"
import { useLoaderData } from "react-router"


const Home = () => {
  const { files, folders } = useLoaderData()


  return (
    <>
        <Breadcrumb className="mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/drive">
                            Drive
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                    <BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbLink
                            href={`/drive/home`}
                            className="capitalize"
                        >
                           Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </BreadcrumbList>
            </Breadcrumb>
      <h1 className="text-2xl font-medium">
        Welcome to Cloudbin
      </h1>
      <div className="space-y-6 mt-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Folders
            <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map((folder:FolderCardType,i:number) => (
              <FolderCard key={i} folder={folder} />
            ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer">
            Suggested Files ({files.length})
            <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all duration-300">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file:File,i:number) => (
              <FileCard key={i} file={file}  />
            ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}

export default Home