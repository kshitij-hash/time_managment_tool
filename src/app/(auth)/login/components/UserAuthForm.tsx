"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { FaGoogle, FaSpinner } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      const response = await signIn("google", {callbackUrl: "/profile"})
      console.log(response)
    } catch (error) {
      console.error(error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleAuth}>
        {isLoading ? (
          <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Continue with Google
      </Button>
    </div>
  )
}