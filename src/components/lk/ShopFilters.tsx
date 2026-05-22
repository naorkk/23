import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { TEAMS } from "./products";

export interface ShopFilterState {
  sport: "all" | "football" | "nba";
  league: string;
  team: string;
  era: "all" | "retro" | "modern" | "90s" | "00s" | "10s";
  maxPrice: number;
}

export const DEFAULT_FILTERS: ShopFilterState = {
  sport: "all",
  league: "",
  team: "",
  era: "all",
  maxPrice: 150,
};

const FOOTBALL_LEAGUES = [...new Set(TEAMS.filter((t) => t.category === "football").map((t) => t.league))];
const NBA_LEAGUES = [...new Set(TEAMS.filter((t) => t.category === "nba").map((t) => t.league))];

const ERA_OPTIONS = [
  { value: "all", label: "כל העידנים" },
  { value: "modern", label: "מודרני (2020+)" },
  { value: "10s", label: "שנות ה-2010" },
  { value: "00s", label: "שנות ה-2000" },
  { value: "90s", label: "שנות ה-90" },
  { value: "retro", label: "כל הרטרו" },
];

interface Props {
  filters: ShopFilterState;
  onChange: (f: ShopFilterState) => void;
  total: number;
}

export function ShopFilters({ filters, onChange, total }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const set = (partial: Partial<ShopFilterState>) =>
    onChange({ ...filters, ...partial });

  const reset = () => onChange(DEFAULT_FILTERS);
  const hasActive =
    filters.sport !== "all" ||
    filters.league !== "" ||
    filters.team !== "" ||
    filters.era !== "all" ||
    filters.maxPrice < 150;

  const currentLeagues =
    filters.sport === "football"
      ? FOOTBALL_LEAGUES
      : filters.sport === "nba"
      ? NBA_LEAGUES
      : [...FOOTBALL_LEAGUES, ...NBA_LEAGUES];

  const currentTeams = TEAMS.filter((t) => {
    if (filters.sport !== "all" && t.category !== filters.sport) return false;
    if (filters.league && t.league !== filters.league) return false;
    return true;
  });

  const FilterContent = () => (
    <div className="space-y-6 text-sm">
      {/* Active / reset */}
      {hasActive && (
        <button
          onClick={reset}
          className="flex items-center gap-2 text-xs text-[#F3CF5D] hover:text-white transition-colors"
        >
          <X size={13} /> נקה פילטרים
        </button>
      )}

      {/* Sport */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-3">ספורט</p>
        <div className="flex flex-col gap-2">
          {[{ v: "all", l: "הכל" }, { v: "football", l: "כדורגל" }, { v: "nba", l: "NBA" }].map(({ v, l }) => (
            <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => set({ sport: v as ShopFilterState["sport"], league: "", team: "" })}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  filters.sport === v
                    ? "border-[#D4AF37] bg-[#D4AF37]"
                    : "border-border group-hover:border-[#D4AF37]/60"
                }`}
              />
              <span
                onClick={() => set({ sport: v as ShopFilterState["sport"], league: "", team: "" })}
                className={`cursor-pointer transition-colors ${
                  filters.sport === v ? "text-[#F3CF5D]" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* League */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-3">ליגה / קונפרנס</p>
        <select
          value={filters.league}
          onChange={(e) => set({ league: e.target.value, team: "" })}
          className="w-full bg-[#111] border border-border rounded-lg px-3 py-2 text-sm text-foreground/80 focus:outline-none focus:border-[#D4AF37]/60"
        >
          <option value="">כל הליגות</option>
          {currentLeagues.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Team */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-3">קבוצה</p>
        <select
          value={filters.team}
          onChange={(e) => set({ team: e.target.value })}
          className="w-full bg-[#111] border border-border rounded-lg px-3 py-2 text-sm text-foreground/80 focus:outline-none focus:border-[#D4AF37]/60"
        >
          <option value="">כל הקבוצות</option>
          {currentTeams.map((t) => (
            <option key={t.slug} value={t.slug}>{t.nameHe}</option>
          ))}
        </select>
      </div>

      {/* Era */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-3">עידן</p>
        <div className="flex flex-col gap-2">
          {ERA_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => set({ era: value as ShopFilterState["era"] })}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  filters.era === value
                    ? "border-[#D4AF37] bg-[#D4AF37]"
                    : "border-border group-hover:border-[#D4AF37]/60"
                }`}
              />
              <span
                onClick={() => set({ era: value as ShopFilterState["era"] })}
                className={`cursor-pointer transition-colors ${
                  filters.era === value ? "text-[#F3CF5D]" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-3">
          מחיר מקסימלי: ₪{filters.maxPrice}
        </p>
        <input
          type="range"
          min={70}
          max={150}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#D4AF37]"
        />
        <div className="flex justify-between text-[10px] text-foreground/40 mt-1">
          <span>₪70</span>
          <span>₪150</span>
        </div>
      </div>

      <div className="text-[10px] tracking-widest uppercase text-foreground/40 pt-2">
        {total} פריטים
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile quick filters + more filters button */}
      <div className="lg:hidden w-full mb-6 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none scroll-smooth">
          {/* Main "More Filters" Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold shrink-0 transition-all ${
              hasActive
                ? "border-[#D4AF37] text-[#F3CF5D] bg-[#D4AF37]/10"
                : "border-border text-foreground/80 bg-white/[0.01]"
            }`}
          >
            <SlidersHorizontal size={13} />
            <span>סינון</span>
            {hasActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            )}
          </button>

          {/* Quick Sport Pills */}
          {[
            { label: "הכל", active: filters.sport === "all" && filters.era === "all", onClick: () => set({ sport: "all", era: "all", league: "", team: "" }) },
            { label: "⚽ כדורגל", active: filters.sport === "football" && filters.era !== "retro" && filters.era !== "modern", onClick: () => set({ sport: "football", era: "all", league: "", team: "" }) },
            { label: "🏀 NBA", active: filters.sport === "nba" && filters.era !== "retro" && filters.era !== "modern", onClick: () => set({ sport: "nba", era: "all", league: "", team: "" }) },
            { label: "⏳ רטרו קלאסיק", active: filters.era === "retro", onClick: () => set({ era: "retro", league: "", team: "" }) },
            { label: "✨ מודרני", active: filters.era === "modern", onClick: () => set({ era: "modern", league: "", team: "" }) }
          ].map((pill) => (
            <button
              key={pill.label}
              onClick={pill.onClick}
              className={`px-3.5 py-2 rounded-full text-xs font-bold shrink-0 transition-all border ${
                pill.active
                  ? "border-[#D4AF37] text-black border-transparent"
                  : "border-border text-foreground/75 bg-white/[0.01]"
              }`}
              style={pill.active ? { background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" } : undefined}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a0a] border-l border-border p-6 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold uppercase tracking-wider">פילטרים</span>
              <button onClick={() => setMobileOpen(false)} className="text-foreground/60 hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 card-carbon rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={14} className="text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">פילטרים</span>
          </div>
          <FilterContent />
        </div>
      </aside>
    </>
  );
}
