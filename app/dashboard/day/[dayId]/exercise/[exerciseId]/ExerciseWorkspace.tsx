"use client";

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, Lightbulb, Loader2, Play, RotateCcw, Save } from "lucide-react";
import { CodeEditor } from "@/components/CodeEditor";
import { OutputPanel } from "@/components/OutputPanel";
import { normalizeCode } from "@/lib/code";
import { createClient } from "@/lib/supabaseClient";
import { runPython } from "@/lib/pyodideRunner";
import type { Exercise, UserProgress } from "@/types/database";

type ExerciseWorkspaceProps = {
  userId: string;
  dayId: string;
  exercise: Exercise;
  progress: UserProgress | null;
};

export function ExerciseWorkspace({ userId, dayId, exercise, progress }: ExerciseWorkspaceProps) {
  const supabase = useMemo(() => createClient(), []);
  const starterCode = normalizeCode(exercise.starter_code);
  const [code, setCode] = useState(normalizeCode(progress?.code) || starterCode);
  const [output, setOutput] = useState(progress?.output ?? "");
  const [message, setMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, startSaving] = useTransition();
  const [completed, setCompleted] = useState(Boolean(progress?.is_completed));

  async function handleRun() {
    setIsRunning(true);
    setMessage("");
    const result = await runPython(code);
    setOutput(result);
    setIsRunning(false);
  }

  function handleReset() {
    setCode(starterCode);
    setOutput("");
    setMessage("Starter code restored.");
  }

  function saveProgress(markCompleted: boolean) {
    startSaving(async () => {
      setMessage("");
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          day_id: dayId,
          exercise_id: exercise.id,
          code,
          output,
          is_completed: markCompleted || completed,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id,exercise_id" }
      );

      if (error) {
        setMessage(error.message);
        return;
      }

      if (markCompleted) {
        setCompleted(true);
      }
      setMessage(markCompleted ? "Exercise marked as completed." : "Progress saved.");
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{exercise.difficulty}</span>
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-steel/10 px-3 py-1 text-xs font-semibold text-steel">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </span>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-ink">{exercise.title}</h1>
        <p className="mt-4 leading-7 text-ink/70">{exercise.problem_statement}</p>
        {exercise.expected_output && (
          <div className="mt-5 rounded-lg bg-paper p-4">
            <h2 className="text-sm font-bold text-ink">Expected output</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">{exercise.expected_output}</p>
          </div>
        )}
        <details className="mt-5 rounded-lg border border-ink/10 bg-white p-4">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-bold text-ink">
            <Lightbulb className="h-4 w-4 text-coral" />
            Hints
          </summary>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/65">
            {(exercise.hints ?? []).map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </details>
      </section>

      <section className="space-y-4">
        <CodeEditor value={code} onChange={setCode} />
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-md bg-mint px-4 py-2.5 text-sm font-semibold text-white hover:bg-mint/90 disabled:opacity-70"
          >
            {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run Code
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Code
          </button>
          <button
            onClick={() => saveProgress(false)}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5 disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={() => saveProgress(true)}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Mark as Completed
          </button>
        </div>
        {message && <p className="rounded-md border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70">{message}</p>}
        <OutputPanel output={output} />
      </section>
    </div>
  );
}
