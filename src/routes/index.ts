

import Login from "@/pages/auth/Login"
import RootError from "@/pages/error/Root"
import { createBrowserRouter } from "react-router"
import { loginAction } from "./actions/login"
import Signup from "@/pages/auth/Signup"
import { signupAction } from "./actions/signup"



export const router = createBrowserRouter([
    {
        path: "/",
        ErrorBoundary: RootError
    },
    {
        path: "/auth",
        children: [
            {
                path: "login",
                Component: Login,
                action: loginAction
            },
            {
                path: "signup",
                Component: Signup,
                action:signupAction,
            }
        ]
    }
])