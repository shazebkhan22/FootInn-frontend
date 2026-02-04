import { SignupForm } from "@/components/sign-up-form"

export const metadata = {
  title: "Sign Up | FootInn",
  description: "Sign up to your account to access your dashboard and manage your settings.",
}

export default function SignupPage() {
  return (
    <div className="bg-teal-50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  )
}
