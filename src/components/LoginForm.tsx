
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, type ComponentProps } from "react"
import { useForm } from "react-hook-form"
import { Link, useFetcher } from "react-router"
import { email, z } from "zod"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { GoogleLogo } from "@/assets/logo/google"
import { Loader2Icon } from "lucide-react"
import type { SubmitHandler } from "react-hook-form"


const formSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long.")
})
const LoginForm = ({ className, ...props }: ComponentProps<'div'>) => {
    const fetcher = useFetcher()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = fetcher.state !== "idle"

    useEffect(() => {

    }, [])

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback((values) => {

    }, [])
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome Back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button type="button" variant={"outline"} className="w-full"
                                    onClick={() => { }}>
                                    <GoogleLogo colorful />
                                    Login with Google
                                </Button>
                            </div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex  after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                            <Link to={"/auth/forgot-password"} >
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm