import Link from "next/link";
import { BookOpen, LayoutDashboard, LogOut, TrendingUp } from "lucide-react";
import { logout } from "@/app/auth/actions";

export function Sidebar() {
  return (
    <aside className="border-b border-ink/10 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-4 py-5">
        <Link href="/dashboard" className="px-2 text-lg font-bold text-ink">
          Python Roadmap
        </Link>
        <nav className="mt-5 grid gap-1 lg:flex-1">
          <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5" href="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5" href="/dashboard#roadmap">
            <BookOpen className="h-4 w-4" />
            Roadmap
          </Link>
          <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5" href="/dashboard#progress">
            <TrendingUp className="h-4 w-4" />
            Progress
          </Link>
        </nav>
        <form action={logout}>
          <button className="mt-3 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-coral hover:bg-coral/10">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
