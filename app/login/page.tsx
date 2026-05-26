import { AuthForm } from "@/app/auth/AuthForm";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-10">
      <section className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-ink">Login</h1>
        <p className="mt-2 text-ink/65">Continue your Python roadmap and coding practice.</p>
        <div className="mt-6">
          <AuthForm mode="login" next={params.next} />
        </div>
      </section>
    </main>
  );
}
