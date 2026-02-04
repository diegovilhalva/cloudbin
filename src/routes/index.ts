

import Login from "@/pages/auth/Login"
import RootError from "@/pages/error/Root"
import { createBrowserRouter } from "react-router"
import { loginAction } from "./actions/login"



export const router = createBrowserRouter([
    {
        path:"/",
        ErrorBoundary:RootError
    },
    {
        path:"/auth",
        children:[
            {
                path:"login",
                Component:Login,
                action:loginAction
            },
           
        ]
    }
])