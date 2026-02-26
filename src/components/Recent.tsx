import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLoaderData } from "react-router"
import FileCard from "./FileCard"
import type { File } from "@/types/all-types"


const Recent = () => {
    const { recentFiles } = useLoaderData()
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
                            href={`/drive/my-drive`}
                            className="capitalize"
                        >
                            My Drive
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </BreadcrumbList>
            </Breadcrumb>    <Breadcrumb className="mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/drive">
                            Drive
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                    <BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbLink
                            href={`/drive/recent`}
                            className="capitalize"
                        >
                            Recent
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-medium">Recent Files</h1>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {recentFiles.map((file: File, i: number) => (
                    <FileCard file={file} key={i} />
                ))}
            </section>
        </>
    )
}

export default Recent