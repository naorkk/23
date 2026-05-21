import { ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-jersey.jpg";

export function Hero({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="relative hero-radial overflow-hidden">
      {/* Background image faintly */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
        aria-hidden
      />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")" }}
           aria-hidden />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        {/* LK Badge */}
        <div className="relative inline-block mb-8 md:mb-10">
          <div className="absolute -inset-6 rounded-full bg-[#D4AF37]/15 blur-2xl" aria-hidden />
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border border-[#D4AF37]/50 overflow-hidden animate-glow-pulse">
            <img src="/logo.jpg" alt="Legendary Kits" className="w-full h-full object-cover" />
          </div>
        </div>

        <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#F3CF5D] mb-6 animate-float-up">
          Premium Football & NBA · Israel
        </p>

        <h1 className="font-display font-black uppercase leading-[0.95] tracking-[-0.01em] animate-float-up"
            style={{ animationDelay: "60ms" }}>
          <span className="block text-[clamp(2.5rem,9vw,7rem)] text-foreground tracking-[0.04em]">
            LEGENDARY
          </span>
          <span className="block text-[clamp(2.5rem,9vw,7rem)] text-gold-shine tracking-[0.06em]">
            KITS
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-[15px] md:text-base text-muted-foreground leading-[1.8] animate-float-up"
           style={{ animationDelay: "150ms" }}>
          המקום שבו סטייל, ספורט ואיכות נפגשים. אנחנו מביאים לכם את חולצות
          הכדורגל הרשמיות וגופיות ה-NBA המבוקשות ביותר בעולם, ברמת גימור
          מושלמת ובחומרים האיכותיים ביותר בשוק. אל תתפשרו על פחות מסטייל אגדי.
        </p>

        {/* Launch deal widget */}
        <div className="mt-10 max-w-md mx-auto luxury-dashed rounded-2xl px-6 py-5 animate-float-up"
             style={{ animationDelay: "240ms" }}>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#F3CF5D] mb-1">
            מבצע השקה
          </div>
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-4xl font-black text-gold-shine">₪70</span>
            <span className="text-base text-muted-foreground line-through decoration-[#D4AF37]/40">₪150</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ל-5 הרוכשים הראשונים בלבד
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-float-up"
             style={{ animationDelay: "320ms" }}>
          <button
            onClick={onShopClick}
            className="btn-gold rounded-full px-8 py-4 text-sm md:text-base uppercase inline-flex items-center gap-3"
          >
            לכל הקולקציה עכשיו
            <ArrowLeft size={18} />
          </button>
          <a
            href="#about"
            className="btn-ghost-gold rounded-full px-7 py-4 text-sm uppercase tracking-wider"
          >
            למה דווקא LK?
          </a>
        </div>
      </div>
    </section>
  );
}