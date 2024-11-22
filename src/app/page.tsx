import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex justify-center items-center flex-col min-h-[90vh] mx-auto p-4 max-w-4xl">
      {/* //* LANDING PAGE (PUBLIC ROUTE) */}
      <h1 className="text-3xl font-bold mb-8">Time Management App</h1>
      <Button className="font-normal" asChild>
        <Link href="/register">Get started</Link>
      </Button>
    </main>
  )
}
