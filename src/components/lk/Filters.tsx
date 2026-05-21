import type { Category } from "./products";

export type FilterValue = "all" | Category;

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "football", label: "חנות כדורגל" },
  { value: "nba", label: "גופיות כדורסל NBA" },
];

export function Filters({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div className="inline-flex p-1.5 rounded-full border border-border bg-[#0c0c0c] relative">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 px-5 md:px-7 py-2.5 text-xs md:text-sm rounded-full font-medium tracking-wide transition-colors duration-300 ${
              active ? "text-black" : "text-foreground/70 hover:text-[#F3CF5D]"
            }`}
          >
            {active && (
              <span
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#F3CF5D)",
                  boxShadow: "0 8px 24px -6px rgba(212,175,55,0.55)",
                }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}