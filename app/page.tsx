import Link from "next/link";
import { ArrowRight, BookOpen, Code2, LineChart } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_0.85fr] lg:py-24">
        <div>
          <div className="inline-flex items-center rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-sm font-semibold text-mint">
            30-day beginner roadmap
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-normal text-ink md:text-6xl">
            Python Learning Roadmap
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Learn Python step by step with daily lessons and coding exercises.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-md border border-ink/15 bg-white px-5 py-3 font-semibold text-ink hover:bg-ink/5" href="/login">
              Login
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 font-semibold text-white hover:bg-mint/90" href="/signup">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <div className="grid gap-4">
            {[
              { icon: BookOpen, title: "Daily lessons", text: "Follow small, focused topics from print statements to projects." },
              { icon: Code2, title: "Browser practice", text: "Write and run Python in the browser with CodeMirror and Pyodide." },
              { icon: LineChart, title: "Progress tracking", text: "Save code, output, and completion status with Supabase." }
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-lg border border-ink/10 p-4">
                <item.icon className="mt-1 h-5 w-5 shrink-0 text-mint" />
                <div>
                  <h2 className="font-bold text-ink">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-ink/65">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
