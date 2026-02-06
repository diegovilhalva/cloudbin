import { account } from "@/lib/appwrite"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useCallback } from "react"




const LogOutButton = () => {
    const navigate = useNavigate()
    const handleLogout = useCallback(async () => {
        try {
            await account.deleteSession({ sessionId: 'current' })
            toast.success("Signed out successfully")
            navigate("/", { viewTransition: true })
        } catch (error) {
            console.log(error)
            toast.error("Failed to sign out")
        }
    }, [])
    return (
        <Button color="second" onClick={handleLogout}>
            Sign out
        </Button>
    )
}

export default LogOutButton