import { useNavigate } from "@tanstack/react-router";
import { TEAMS } from "./products";
import { TeamCrest } from "./TeamCrest";

const LEAGUES_ORDER = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Rest of World",
  "National Teams",
  "Eastern Conference",
  "Western Conference",
];

const LEAGUE_LABELS: Record<string, string> = {
  "Premier League": "Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "La Liga": "La Liga 🇪🇸",
  "Serie A": "Serie A 🇮🇹",
  "Bundesliga": "Bundesliga 🇩🇪",
  "Ligue 1": "Ligue 1 🇫🇷",
  "Rest of World": "קבוצות העולם 🌍",
  "National Teams": "נבחרות לאומיות 🌎",
  "Eastern Conference": "NBA — Eastern Conference 🏀",
  "Western Conference": "NBA — Western Conference 🏀",
};

function LeagueSection({ league, teams, onTeamClick }: {
  league: string;
  teams: typeof TEAMS;
  onTeamClick: (slug: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] whitespace-nowrap">
          {LEAGUE_LABELS[league] ?? league}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1">
        {teams.map((team) => (
          <button
            key={team.slug}
            onClick={() => onTeamClick(team.slug)}
            className="group flex flex-col items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-[#D4AF37]/35 hover:bg-white/[0.03] transition-all duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(243,207,93,0.35)]">
              <TeamCrest team={team} size={42} />
            </div>
            <span className="text-[10px] font-medium text-center text-foreground/60 group-hover:text-[#F3CF5D] transition-colors leading-tight max-w-[68px] truncate">
              {team.nameHe}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function FeaturedCollections() {
  const navigate = useNavigate();

  const byLeague = LEAGUES_ORDER.reduce<Record<string, typeof TEAMS>>(
    (acc, league) => {
      const t = TEAMS.filter((tm) => tm.league === league);
      if (t.length > 0) acc[league] = t;
      return acc;
    },
    {}
  );

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 border-t border-border">
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#F3CF5D] mb-3">
          Teams &amp; Clubs
        </p>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.02em]">
          כל <span className="text-gold-shine">הקבוצות</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
          {TEAMS.length} קבוצות — חולצות עונה נוכחית וקולקציות רטרו אייקוניות.
          לחצו על לוגו קבוצה לכניסה לקולקציה המלאה.
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(byLeague).map(([league, teams]) => (
          <LeagueSection
            key={league}
            league={league}
            teams={teams}
            onTeamClick={(slug) => navigate({ to: "/teams/$team", params: { team: slug } })}
          />
        ))}
      </div>
    </section>
  );
}
