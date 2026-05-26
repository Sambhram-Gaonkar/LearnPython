"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login, signup } from "./actions";

type AuthFormProps = {
  mode: "login" | "signup";
  next?: string;
};

export function AuthForm({ mode, next = "/dashboard" }: AuthFormProps) {
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState(action, {});
  const isLogin = mode === "login";

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
      <input type="hidden" name="next" value={next} />
      {!isLogin && (
        <label className="block">
          <span className="text-sm font-medium text-ink">Full name</span>
          <input
            name="fullName"
            type="text"
            className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 outline-none focus:border-mint focus:ring-2 focus:ring-mint/20"
            placeholder="Your name"
          />
        </label>
      )}
      <label className="block">
        <span className="text-sm font-medium text-ink">Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 outline-none focus:border-mint focus:ring-2 focus:ring-mint/20"
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 outline-none focus:border-mint focus:ring-2 focus:ring-mint/20"
          placeholder="At least 6 characters"
        />
      </label>
      {state.error && (
        <p className="rounded-md border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-mint px-4 py-2.5 font-semibold text-white transition hover:bg-mint/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLogin ? "Login" : "Create account"}
      </button>
      <p className="text-center text-sm text-ink/65">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <Link className="font-medium text-mint hover:underline" href={isLogin ? "/signup" : "/login"}>
          {isLogin ? "Create an account" : "Login"}
        </Link>
      </p>
    </form>
  );
}
