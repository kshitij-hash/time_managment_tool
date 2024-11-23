"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RegisterSchema } from "../../schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { register } from "../../actions/register"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setIsSubmitting(true)
    register(data)
      .then((response: { success: string } | { error: string }) => {
        setIsSubmitting(false);
        form.reset();
        if ('success' in response) {
          alert(response.success);
        } else {
          alert(response.error);
        }
      })
  }

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Please enter your details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@example.com"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button size="lg" className="w-full" variant="outline">
          <FcGoogle /> Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm">Already have an account?</p>
        <Button variant="link" className="font-normal" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
