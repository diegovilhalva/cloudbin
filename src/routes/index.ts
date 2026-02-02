

import RootError from "@/pages/error/Root"
import { createBrowserRouter } from "react-router"



export const router = createBrowserRouter([
    {
        path:"/",
        ErrorBoundary:RootError
    },
])