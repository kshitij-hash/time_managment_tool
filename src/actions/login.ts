"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas/index"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    console.log(response)
    return { success: "Logged in!" }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error;
  }
}
