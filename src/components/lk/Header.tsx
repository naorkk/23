import { useEffect, useRef, useState } from "react";
import { Instagram, ShoppingBag, Menu, X, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { INSTAGRAM_URL, TEAMS, PRODUCTS } from "./products";
import { TeamCrest } from "./TeamCrest";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const FOOTBALL_LEAGUES = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Rest of World", "National Teams"];
const NBA_LEAGUES = ["Eastern Conference", "Western Conference"];

function NavDropdown({ label, leagues, onClose }: {
  label: string;
  leagues: string[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLabelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    onClose();

    const category = label === "כדורגל" ? "football" : "nba";
    navigate({
      to: "/",
      search: { sport: category },
      hash: "shop",
    });

    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={handleLabelClick}
        className="flex items-center gap-1 text-[13px] tracking-wide text-foreground/75 hover:text-[#F3CF5D] transition-colors uppercase"
      >
        {label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-[480px] rounded-xl border border-[#1F1F1F] bg-[#0a0a0a]/98 backdrop-blur-xl shadow-2xl z-50 p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-x-6">
            {leagues.map((league) => {
              const teams = TEAMS.filter((t) => t.league === league);
              if (!teams.length) return null;
              return (
                <div key={league} className="mb-4">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/70 mb-2">{league}</p>
                  {teams.map((team) => (
                    <button
                      key={team.slug}
                      onClick={() => { navigate({ to: "/teams/$team", params: { team: team.slug } }); setOpen(false); onClose(); }}
                      className="flex items-center gap-2 w-full px-1 py-1.5 rounded-lg text-xs text-foreground/70 hover:text-[#F3CF5D] hover:bg-white/5 transition-colors text-right"
                    >
                      <TeamCrest team={team} size={18} className="shrink-0" />
                      {team.nameHe}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="border-t border-border mt-1 pt-2">
            <Link to="/" hash="shop" onClick={() => { setOpen(false); onClose(); }} className="text-[10px] text-[#D4AF37] hover:text-[#F3CF5D] transition uppercase tracking-wider">
              כל הקולקציה ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length < 2 ? [] : (() => {
    const q = query.trim().toLowerCase();
    const teamResults = TEAMS.filter(
      (t) =>
        t.nameHe.includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.abbrev.toLowerCase().includes(q) ||
        t.league.toLowerCase().includes(q)
    ).slice(0, 5);
    const playerResults = PRODUCTS.filter(
      (p) => p.players?.some((pl) => pl.name.toLowerCase().includes(q)) ||
             p.title.includes(q) ||
             p.era?.toLowerCase().includes(q)
    ).slice(0, 4);
    return { teams: teamResults, products: playerResults };
  })();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasResults = query.trim().length >= 2 && (
    (Array.isArray(results) ? false : (results.teams.length > 0 || results.products.length > 0))
  );

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2 w-52 bg-white/5 border border-border rounded-full px-3 py-1.5 focus-within:border-[#D4AF37]/60 transition-colors">
        <Search size={13} className="text-foreground/50 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="חפש קבוצה, שחקן..."
          className="bg-transparent text-xs text-foreground placeholder:text-foreground/40 focus:outline-none w-full"
          dir="rtl"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="text-foreground/40 hover:text-foreground">
            <X size={12} />
          </button>
        )}
      </div>

      {open && !Array.isArray(results) && (results.teams.length > 0 || results.products.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 w-72 rounded-xl border border-[#1F1F1F] bg-[#0a0a0a]/98 backdrop-blur-xl shadow-2xl z-50 py-2 animate-fade-in">
          {results.teams.length > 0 && (
            <>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/60 px-4 py-1.5">קבוצות</p>
              {results.teams.map((team) => (
                <button
                  key={team.slug}
                  onClick={() => { navigate({ to: "/teams/$team", params: { team: team.slug } }); setQuery(""); setOpen(false); onClose(); }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground/80 hover:text-[#F3CF5D] hover:bg-white/5 transition-colors text-right"
                >
                  <TeamCrest team={team} size={22} className="shrink-0" />
                  <span>{team.nameHe}</span>
                  <span className="text-[10px] text-foreground/40 mr-auto">{team.league}</span>
                </button>
              ))}
            </>
          )}
          {results.products.length > 0 && (
            <>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/60 px-4 py-1.5 mt-1">מוצרים</p>
              {results.products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { navigate({ to: "/teams/$team", params: { team: p.teamSlug } }); setQuery(""); setOpen(false); onClose(); }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-xs text-foreground/70 hover:text-[#F3CF5D] hover:bg-white/5 transition-colors text-right"
                >
                  <span className="truncate">{p.title}</span>
                  {p.era && <span className="text-[10px] text-[#D4AF37]/60 mr-auto shrink-0">{p.era}</span>}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "header-blur" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavDropdown label="כדורגל" leagues={FOOTBALL_LEAGUES} onClose={() => {}} />
          <NavDropdown label="NBA" leagues={NBA_LEAGUES} onClose={() => {}} />
          <a href="/#shop" className="text-[13px] tracking-wide text-foreground/75 hover:text-[#F3CF5D] transition-colors uppercase">החנות</a>
          <Link to="/about" className="text-[13px] tracking-wide text-foreground/75 hover:text-[#F3CF5D] transition-colors uppercase">אודות</Link>
        </nav>

        {/* Search - desktop */}
        <div className="hidden md:block">
          <SearchBar onClose={() => {}} />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearch((v) => !v)}
            className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-border text-foreground/70 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors"
          >
            <Search size={15} />
          </button>

          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="hidden md:grid w-9 h-9 place-items-center rounded-full border border-border text-foreground/70 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors">
            <Instagram size={15} />
          </a>

          <button onClick={onCartOpen} aria-label="עגלה"
            className="relative w-9 h-9 grid place-items-center rounded-full border border-border text-foreground/80 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors">
            <ShoppingBag size={15} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold grid place-items-center bg-[#D4AF37] text-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pr-1">
            <img src="/logo.jpg" alt="Legendary Kits" className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]/50" />
            <span className="hidden sm:block text-base font-black tracking-[0.12em] uppercase font-display text-gold-shine">LK</span>
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-border text-foreground/80" aria-label="תפריט">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearch && (
        <div className="md:hidden px-5 pb-3 animate-fade-in">
          <SearchBar onClose={() => setMobileSearch(false)} />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute inset-x-0 top-16 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-border animate-fade-in z-50 max-h-[80vh] overflow-y-auto">
          <div className="px-5 py-5 space-y-5">
            {/* Category quick filters */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-border">
              <button
                onClick={() => {
                  navigate({ to: "/", search: { sport: "football" }, hash: "shop" });
                  setMobileOpen(false);
                  setTimeout(() => {
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white/[0.02] text-xs font-bold text-foreground hover:text-[#F3CF5D] transition-colors"
              >
                ⚽ כדורגל
              </button>
              <button
                onClick={() => {
                  navigate({ to: "/", search: { sport: "nba" }, hash: "shop" });
                  setMobileOpen(false);
                  setTimeout(() => {
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white/[0.02] text-xs font-bold text-foreground hover:text-[#F3CF5D] transition-colors"
              >
                🏀 גופיות NBA
              </button>
            </div>

            {[...FOOTBALL_LEAGUES, ...NBA_LEAGUES].map((league) => {
              const teams = TEAMS.filter((t) => t.league === league);
              if (!teams.length) return null;
              return (
                <div key={league}>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2">{league}</p>
                  <div className="grid grid-cols-2 gap-x-4">
                    {teams.map((team) => (
                      <button
                        key={team.slug}
                        onClick={() => { navigate({ to: "/teams/$team", params: { team: team.slug } }); setMobileOpen(false); }}
                        className="flex items-center gap-2 py-1.5 text-xs text-foreground/70 hover:text-[#F3CF5D] transition-colors text-right"
                      >
                        <TeamCrest team={team} size={16} className="shrink-0" />
                        {team.nameHe}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="border-t border-border pt-4 grid grid-cols-3 gap-2 text-xs text-foreground/60">
              <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-[#F3CF5D]">אודות</Link>
              <Link to="/shipping" onClick={() => setMobileOpen(false)} className="hover:text-[#F3CF5D]">משלוחים</Link>
              <Link to="/faq" onClick={() => setMobileOpen(false)} className="hover:text-[#F3CF5D]">שאלות</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
