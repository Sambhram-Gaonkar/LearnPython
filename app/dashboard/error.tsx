"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-lg border border-coral/30 bg-coral/10 p-5 text-coral">
      <h1 className="font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm">{error.message}</p>
      <button className="mt-4 rounded-md bg-coral px-4 py-2 text-sm font-semibold text-white" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
