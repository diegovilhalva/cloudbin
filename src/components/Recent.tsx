import { useLoaderData } from "react-router"
import FileCard from "./FileCard"
import type { File } from "@/types/all-types"


const Recent = () => {
    const { recentFiles } = useLoaderData()
    return (
        <>
            <h1 className="text-2xl font-medium"></h1>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {recentFiles.map((file: File, i: number) => (
                    <FileCard file={file} key={i} />
                ))}
            </section>
        </>
    )
}

export default Recent