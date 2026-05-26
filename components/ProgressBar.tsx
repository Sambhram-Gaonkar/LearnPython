type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && <div className="mb-2 text-sm font-medium text-ink/70">{label}</div>}
      <div className="h-3 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
