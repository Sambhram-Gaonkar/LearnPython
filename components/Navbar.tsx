import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-ink/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-ink">
          Python Learning Roadmap
        </Link>
        <nav className="flex items-center gap-3">
          <Link className="rounded-md px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5" href="/login">
            Login
          </Link>
          <Link className="rounded-md bg-mint px-4 py-2 text-sm font-semibold text-white hover:bg-mint/90" href="/signup">
            Start Learning
          </Link>
        </nav>
      </div>
    </header>
  );
}
