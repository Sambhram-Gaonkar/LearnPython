import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { ExerciseWorkspace } from "./ExerciseWorkspace";

export default async function ExercisePage({
  params
}: {
  params: Promise<{ dayId: string; exerciseId: string }>;
}) {
  const { dayId, exerciseId } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: exercise, error: exerciseError }, { data: progress, error: progressError }] = await Promise.all([
    supabase.from("exercises").select("*").eq("id", exerciseId).eq("day_id", dayId).single(),
    supabase.from("user_progress").select("*").eq("user_id", user.id).eq("exercise_id", exerciseId).maybeSingle()
  ]);

  if (exerciseError || !exercise) {
    notFound();
  }

  if (progressError) {
    return <p className="rounded-md bg-coral/10 p-4 text-coral">{progressError.message}</p>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Link href={`/dashboard/day/${dayId}`} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to day
      </Link>
      <ExerciseWorkspace userId={user.id} dayId={dayId} exercise={exercise} progress={progress} />
    </div>
  );
}
