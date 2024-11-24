"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas/index"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import prisma from "@/lib/prisma"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if(!existingUser || !existingUser.password) {
    return { error: "User does not exist!" }
  }

  if (existingUser?.emailVerified === null) {
    const { token, expires } = generateVerificationToken()
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verificationToken: token,
        verificationTokenExpires: expires,
      },
    })

    const emailResponse = await sendVerificationEmail(email, token, existingUser.name)
    if (!emailResponse.success) {
      return { error: "Failed to send verification email!" }
    }

    return { success: `Verification email sent to ${email}. Please verify!` }
  }

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    console.log(response)
    return { success: "Logged in!" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}
