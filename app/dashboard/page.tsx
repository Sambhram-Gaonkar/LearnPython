import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Gauge } from "lucide-react";
import { RoadmapCard } from "@/components/RoadmapCard";
import { ProgressBar } from "@/components/ProgressBar";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { calculateProgress, getNextExercise, summarizeDays, type DayWithExercises } from "@/lib/roadmap";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: days, error: daysError }, { data: progress, error: progressError }] = await Promise.all([
    supabase.from("roadmap_days").select("*, exercises(*)").order("day_number", { ascending: true }),
    supabase.from("user_progress").select("*").eq("user_id", user.id)
  ]);

  if (daysError || progressError) {
    return <ErrorState message={daysError?.message ?? progressError?.message ?? "Unable to load dashboard."} />;
  }

  const roadmapDays = (days ?? []) as DayWithExercises[];
  const progressRows = progress ?? [];
  const summaries = summarizeDays(roadmapDays, progressRows);
  const totals = calculateProgress(roadmapDays, progressRows);
  const next = getNextExercise(roadmapDays, progressRows);
  const displayName = user.user_metadata.full_name ?? user.email ?? "Python learner";

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm" id="progress">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-mint">Welcome back</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">{displayName}</h1>
            <p className="mt-2 text-ink/65">Keep moving through one focused Python topic at a time.</p>
          </div>
          {next && (
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mint px-5 py-3 font-semibold text-white hover:bg-mint/90"
              href={`/dashboard/day/${next.dayId}/exercise/${next.exerciseId}`}
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Metric icon={BookOpen} label="Roadmap days" value={String(roadmapDays.length)} />
          <Metric icon={CheckCircle2} label="Completed exercises" value={`${totals.completedExercises}/${totals.totalExercises}`} />
          <Metric icon={Gauge} label="Progress" value={`${totals.progressPercent}%`} />
        </div>
        <div className="mt-6">
          <ProgressBar value={totals.progressPercent} label="Overall progress" />
        </div>
      </section>

      <section className="mt-8" id="roadmap">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Roadmap</h2>
            <p className="mt-1 text-sm text-ink/65">30 days of beginner-friendly lessons and exercises.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {summaries.map((day) => (
            <RoadmapCard key={day.id} day={day} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-4">
      <Icon className="h-5 w-5 text-steel" />
      <p className="mt-3 text-sm text-ink/60">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-coral/30 bg-coral/10 p-5 text-coral">
      <h1 className="font-bold">Dashboard could not load</h1>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
