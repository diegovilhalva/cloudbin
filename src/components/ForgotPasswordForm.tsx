

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, type ComponentProps } from "react"
import { useForm } from "react-hook-form"
import { Link, useFetcher } from "react-router"
import { z } from "zod"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Loader2Icon, ArrowLeftIcon } from "lucide-react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"


const formSchema = z.object({
    email: z.email("Please enter a valid email address"),
})

const ForgotPasswordForm = ({ className, ...props }: ComponentProps<'div'>) => {
    const fetcher = useFetcher()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const isLoading = fetcher.state !== "idle"

    useEffect(() => {
        if (!fetcher.data) return

        if (fetcher.data.ok) {
            toast.success("Password reset email sent! Check your inbox")
            form.reset()
        } else {
            
                toast.error(fetcher.data.error ?? "Something went wrong")
        
        }
    }, [fetcher.data,form])

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback((values) => {
        fetcher.submit(values, {
            method: "post",
            encType: "application/json",
        })
    }, [])
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot your password?</CardTitle>
                    <CardDescription>
                        No worries, we'll send you reset instructions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">


                            <div className="grid gap-6">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2Icon className="animate-spin" />}
                                    Send reset email
                                </Button>
                            </div>
                            <div className="text-center  text-sm">
                                <Button variant="link" asChild >
                                    <Link to={"/auth/login"} className="underline underline-offset-4" viewTransition>
                                        <ArrowLeftIcon />
                                        Back to login
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default ForgotPasswordForm