import { auth } from "@/auth"
import Image from "next/image"
import { SignOutButton } from "../components/SignOutButton";

export default async function Profile() {
  const session = await auth()
  const user = session?.user;

  return (
    <div className="container flex justify-center items-center flex-col min-h-screen mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold">Profile</h1>
      {user ? (
        <div className="flex flex-col items-center">
          <Image src={user.image ?? "https://github.com/shadcn.png"} width={50} height={50} alt="user profile image" className="rounded-full w-20 h-20" />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-lg text-gray-500">{user.email}</p>
          <SignOutButton />
        </div>
      ) : (
        <p className="text-lg text-gray-500">You are not signed in</p>
      )}
    </div>
  )
}
