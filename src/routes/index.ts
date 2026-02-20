

import Login from "@/pages/auth/Login"
import RootError from "@/pages/error/Root"
import { createBrowserRouter } from "react-router"
import { loginAction } from "./actions/login"
import Signup from "@/pages/auth/Signup"
import { signupAction } from "./actions/signup"
import ForgotPassword from "@/pages/auth/ForgotPassword"
import { forgotPasswordAction } from "./actions/forgotPassword"
import ResetPassword from "@/pages/auth/ResetPassword"
import { resetPasswordAction } from "./actions/resetPassword"
import AppLayout from "@/layouts/AppLayout"
import { driveLoader } from "./loaders/drive"
import Home from "@/pages/drive/Home"
import { driveActions } from "./actions/driveActions"
import { driveFileLoader } from "./loaders/fileLoader"
import MyDrive from "@/components/MyDrive"
import Recent from "@/components/Recent"
import { driveFolderLoader } from "./loaders/folderLoader"
import FolderPreview from "@/pages/drive/FolderPreview"



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
            },
            {
                path:"forgot-password",
                Component:ForgotPassword,
                action:forgotPasswordAction,
            },
            {
                path:"reset-password",
                Component:ResetPassword,
                action:resetPasswordAction
            }
        ]
    },
    {
        path:"/drive",
        Component:AppLayout,
        loader:driveLoader,
        action:driveActions,
        children:[
            {
                path:"home",
                Component:Home,
                loader:driveFileLoader
            },
            {
                path:"my-drive",
                Component:MyDrive,
                loader:driveFileLoader
            },
            {
                path:"recent",
                Component:Recent,
                loader:driveFileLoader
            },
            {
                path:"folders/:folderName",
                Component:FolderPreview,
                loader:driveFolderLoader
            }
        ]
    }
])