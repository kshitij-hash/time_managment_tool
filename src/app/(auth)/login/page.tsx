import { UserAuthForm } from "./components/UserAuthForm"

export default function AuthenticationPage() {
  return (
    <div className="container flex justify-center items-center flex-col min-h-screen mx-auto p-4 max-w-4xl">
      <UserAuthForm />
    </div>
  )
}
