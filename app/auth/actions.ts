"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

type AuthState = {
  error?: string;
};

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
