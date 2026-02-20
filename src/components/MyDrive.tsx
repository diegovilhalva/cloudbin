import { useLoaderData } from "react-router"
import FileCard from "./FileCard"
import type { File } from "@/types/all-types"


const MyDrive = () => {
    const { files } = useLoaderData()
    return (
        <>
            <h1 className="text-2xl font-medium">My Drive</h1>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {files.map((file:File,i:number) => (
                        <FileCard file={file} key={i} />
                    ))}
            </section>
        </>
    )
}

export default MyDrive