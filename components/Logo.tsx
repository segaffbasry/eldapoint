import { BAND, DOT, GROUP, LETTERS, VIEWBOX } from "@/lib/logo";

/* The official Eldapoint Group lock-up, drawn from its own vector parts (lib/logo.ts):
   the red band, "Eldapoint" in currentColor (white on navy, navy on light grounds, as the live site uses it),
   the red i-dot, and "GROUP" in white on the band. With `parts`, every shape carries data-part so the preloader
   can build it piece by piece. */
export function Logo({ title = "Eldapoint Group", parts = false, className }: { title?: string; parts?: boolean; className?: string }) {
  const p = (name: string) => (parts ? { "data-part": name } : {});
  return (
    <svg className={`logo ${className ?? ""}`} viewBox={VIEWBOX} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} focusable="false">
      <g {...p("band")}><path d={BAND} fill="var(--red)" /></g>
      {LETTERS.map((d, i) => <path key={i} d={d} fill="currentColor" {...p("letter")} />)}
      <path d={DOT} fill="var(--red)" {...p("dot")} />
      {GROUP.map((d, i) => <path key={i} d={d} fill="var(--white)" {...p("group")} />)}
    </svg>
  );
}
