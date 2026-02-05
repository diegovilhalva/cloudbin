
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, type ComponentProps } from "react"
import { useForm } from "react-hook-form"
import { Link, useFetcher, useSearchParams } from "react-router"
import { z } from "zod"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Loader2Icon, ArrowLeftIcon } from "lucide-react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})

const ResetPasswordForm = ({ className, ...props }: ComponentProps<'div'>) => {
    const fetcher = useFetcher()
    const [searchParams] = useSearchParams()


    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const isLoading = fetcher.state !== "idle"

    useEffect(() => {
        if (!fetcher.data) return

        if (fetcher.data.ok) {
            toast.success("Password has been reset successfully")
            form.reset()
        } else {

            toast.error(fetcher.data.error ?? "Failed to reset password")

        }
    }, [fetcher.data, form])

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback((values) => {
        fetcher.submit({
            ...values,
            userId,
            secret
        }, {
            method: "post",
            encType: "application/json",
        })
    }, [userId, secret])
    if (!userId || !secret) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Invalid recovery link</CardTitle>
                    <CardDescription>
                        This password reset link is invalid or has expired.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Set new password</CardTitle>
                    <CardDescription>
                       Your new password must be different from the previous one.

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">


                            <div className="grid gap-6">
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your new password" {...field} className="tracking-wider" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm your new password" {...field} className="tracking-wider" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2Icon className="animate-spin" />}
                                    Reset password
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

        </div>
    )
}

export default ResetPasswordForm