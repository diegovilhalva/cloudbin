import { createContext, useContext, type ReactNode } from "react" 

type Props = {
    folderName:string
    children:ReactNode
}




const FolderContext  = createContext<string | null>(null)

export const FolderProvider = ({folderName,children}:Props) => {
    return(
        <FolderContext.Provider value={folderName}>
            {children}
        </FolderContext.Provider>
    )
}

export const useFolder = () => {
    const ctx = useContext(FolderContext)

    if (!ctx) {
        throw new Error("useFolder must be used inside FolderProvider")
    }

    return ctx
}