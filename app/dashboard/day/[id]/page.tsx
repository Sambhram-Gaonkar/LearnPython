import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { getLesson } from "@/lib/lessons";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import type { DayWithExercises } from "@/lib/roadmap";

export default async function DayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: day, error: dayError }, { data: progress, error: progressError }] = await Promise.all([
    supabase.from("roadmap_days").select("*, exercises(*)").eq("id", id).single(),
    supabase.from("user_progress").select("*").eq("user_id", user.id).eq("day_id", id)
  ]);

  if (dayError || !day) {
    notFound();
  }

  if (progressError) {
    return <p className="rounded-md bg-coral/10 p-4 text-coral">{progressError.message}</p>;
  }

  const currentDay = day as DayWithExercises;
  const lesson = getLesson(currentDay);
  const completedIds = new Set((progress ?? []).filter((item) => item.is_completed).map((item) => item.exercise_id));
  const percent = currentDay.exercises.length === 0 ? 0 : Math.round((completedIds.size / currentDay.exercises.length) * 100);

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <section className="mt-5 rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-steel">Day {currentDay.day_number}</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{currentDay.title}</h1>
        <p className="mt-4 leading-7 text-ink/70">{currentDay.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-sm font-semibold text-ink/70">
            <Clock className="h-4 w-4" />
            {currentDay.estimated_time ?? "45 minutes"}
          </span>
          <span className="rounded-full bg-mint/10 px-3 py-1 text-sm font-semibold text-mint">
            {completedIds.size}/{currentDay.exercises.length} completed
          </span>
        </div>
        <div className="mt-6">
          <ProgressBar value={percent} label="Day progress" />
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-ink">Learning Objectives</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {(currentDay.learning_objectives ?? []).map((objective) => (
            <li key={objective} className="rounded-md bg-paper px-4 py-3 text-sm text-ink/75">
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-ink">Lesson</h2>
        <p className="mt-3 leading-7 text-ink/70">{lesson.intro}</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-normal text-ink/60">Key points</h3>
            <ul className="mt-3 grid gap-2">
              {lesson.keyPoints.map((point) => (
                <li key={point} className="rounded-md bg-paper px-4 py-3 text-sm leading-6 text-ink/75">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-normal text-ink/60">Example</h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-ink p-4 text-sm leading-6 text-white">{lesson.example}</pre>
          </div>
        </div>
        <p className="mt-5 rounded-md border border-mint/20 bg-mint/10 px-4 py-3 text-sm leading-6 text-mint">
          {lesson.practiceNote}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-ink">Exercises</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {currentDay.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} dayId={currentDay.id} exercise={exercise} completed={completedIds.has(exercise.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
