import { AuthForm } from "@/app/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-10">
      <section className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-ink">Create account</h1>
        <p className="mt-2 text-ink/65">Start tracking your lessons, exercises, and progress.</p>
        <div className="mt-6">
          <AuthForm mode="signup" />
        </div>
      </section>
    </main>
  );
}
