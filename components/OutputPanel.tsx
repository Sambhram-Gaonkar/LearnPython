type OutputPanelProps = {
  output: string;
};

export function OutputPanel({ output }: OutputPanelProps) {
  return (
    <section className="rounded-lg border border-ink/10 bg-ink p-4 text-white">
      <h2 className="text-sm font-semibold text-white/80">Output</h2>
      <pre className="mt-3 min-h-24 whitespace-pre-wrap rounded-md bg-black/25 p-3 text-sm leading-6 text-white">
        {output || "Run your code to see output here."}
      </pre>
    </section>
  );
}
