import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import SignupForm from "@/components/auth/signup-form"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function SignupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">EstateIQ</h1>
          <p className="mt-2 text-muted-foreground">Create your account</p>
        </div>
        <SignupForm/>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

