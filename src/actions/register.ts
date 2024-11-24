"use server"

import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas/index"
import * as z from "zod"
import prisma from "@/lib/clients/prisma"
import { generateVerificationToken } from "@/lib/utils/token"
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail"

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  const { expires, token } = generateVerificationToken()

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: expires,
    },
  })

  const emailResponse = await sendVerificationEmail(email, token, name)
  if (!emailResponse.success) {
    return { error: "Failed to send verification email!" }
  }

  return {
    success:
      `User registered successfully! Verification email sent to ${email}`,
  }
}
