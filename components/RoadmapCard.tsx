import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import type { DaySummary } from "@/lib/roadmap";
import { ProgressBar } from "./ProgressBar";

type RoadmapCardProps = {
  day: DaySummary;
};

export function RoadmapCard({ day }: RoadmapCardProps) {
  const isComplete = day.totalExercises > 0 && day.completedExercises === day.totalExercises;
  const percent = day.totalExercises === 0 ? 0 : Math.round((day.completedExercises / day.totalExercises) * 100);

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-steel">Day {day.day_number}</p>
          <h2 className="mt-1 text-lg font-bold text-ink">{day.title}</h2>
        </div>
        {isComplete ? <CheckCircle2 className="h-5 w-5 text-mint" /> : <Circle className="h-5 w-5 text-ink/30" />}
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/65">{day.description}</p>
      <div className="mt-4">
        <ProgressBar value={percent} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
          {day.completedExercises}/{day.totalExercises} exercises
        </span>
        <Link className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90" href={`/dashboard/day/${day.id}`}>
          {day.completedExercises > 0 ? "Continue" : "Start Day"}
        </Link>
      </div>
    </article>
  );
}
