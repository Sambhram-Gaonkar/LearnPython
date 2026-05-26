import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Exercise } from "@/types/database";

type ExerciseCardProps = {
  dayId: string;
  exercise: Exercise;
  completed?: boolean;
};

export function ExerciseCard({ dayId, exercise, completed }: ExerciseCardProps) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-ink">{exercise.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">{exercise.problem_statement}</p>
        </div>
        {completed && <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{exercise.difficulty}</span>
        <Link
          href={`/dashboard/day/${dayId}/exercise/${exercise.id}`}
          className="rounded-md bg-mint px-4 py-2 text-sm font-semibold text-white hover:bg-mint/90"
        >
          Open
        </Link>
      </div>
    </article>
  );
}
