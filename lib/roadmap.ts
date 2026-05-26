import type { Exercise, RoadmapDay, UserProgress } from "@/types/database";

export type DayWithExercises = RoadmapDay & {
  exercises: Exercise[];
};

export type DaySummary = DayWithExercises & {
  completedExercises: number;
  totalExercises: number;
};

export function summarizeDays(days: DayWithExercises[], progress: UserProgress[]): DaySummary[] {
  const completedIds = new Set(progress.filter((item) => item.is_completed).map((item) => item.exercise_id));

  return days.map((day) => {
    const completedExercises = day.exercises.filter((exercise) => completedIds.has(exercise.id)).length;
    return {
      ...day,
      completedExercises,
      totalExercises: day.exercises.length
    };
  });
}

export function calculateProgress(days: DayWithExercises[], progress: UserProgress[]) {
  const totalExercises = days.reduce((sum, day) => sum + day.exercises.length, 0);
  const completedExercises = new Set(progress.filter((item) => item.is_completed).map((item) => item.exercise_id)).size;
  const progressPercent = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100);

  return { totalExercises, completedExercises, progressPercent };
}

export function getNextExercise(days: DayWithExercises[], progress: UserProgress[]) {
  const completedIds = new Set(progress.filter((item) => item.is_completed).map((item) => item.exercise_id));

  for (const day of days) {
    const nextExercise = day.exercises.find((exercise) => !completedIds.has(exercise.id));
    if (nextExercise) {
      return { dayId: day.id, exerciseId: nextExercise.id };
    }
  }

  const firstDay = days[0];
  const firstExercise = firstDay?.exercises[0];
  return firstDay && firstExercise ? { dayId: firstDay.id, exerciseId: firstExercise.id } : null;
}
