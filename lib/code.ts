export function normalizeCode(value: string | null | undefined) {
  return (value ?? "").replace(/\\n/g, "\n");
}
