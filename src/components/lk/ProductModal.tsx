import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { buildWhatsAppLink, type Product, type PlayerVariant, TEAMS } from "./products";
import { JerseyMockup } from "./JerseyMockup";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const FEATURES = [
  { icon: "✨", text: "בד Dry-Fit מקצועי, גמיש ומנדף זיעה." },
  { icon: "🧵", text: "רמת גימור עליונה ותגים מובלטים." },
  { icon: "🧼", text: "עמיד לחלוטין בכביסות (ללא קילופים)." },
  { icon: "📏", text: "גזרה: Standard Fit (מומלץ לקחת את המידה הרגילה שלך)." },
];

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: string) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: Props) {
  const [size, setSize] = useState("M");
  const [player, setPlayer] = useState<PlayerVariant | undefined>(undefined);
  const team = product ? TEAMS.find((t) => t.slug === product.teamSlug) : undefined;

  useEffect(() => {
    setSize("M");
    setPlayer(product?.players?.[0] ?? undefined);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const waLink = buildWhatsAppLink(product, size, player);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] animate-modal-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="סגור"
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full grid place-items-center border border-border bg-black/60 backdrop-blur text-foreground/80 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-black min-h-[300px] md:min-h-[450px]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <JerseyMockup
                team={team}
                product={product}
                view="both"
                playerName={player?.name}
                playerNumber={player?.number}
                className="w-full h-full"
              />
            )}
            <div
              className="absolute top-4 right-4 text-[10px] tracking-[0.25em] uppercase font-black px-3 py-1.5 rounded-sm text-black z-10"
              style={{ background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" }}
            >
              {product.badge ?? "מבצע השקה"}
            </div>
            {product.isRetro && product.era && (
              <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] uppercase text-foreground/80 bg-black/70 backdrop-blur px-3 py-1.5 rounded-sm border border-border z-10">
                {product.era}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-9 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-none">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3CF5D]">
              {product.categoryLabel}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-black leading-tight">
              {product.title}
            </h2>

            {product.description && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-r-2 border-[#D4AF37]/50 pr-3">
                {product.description}
              </p>
            )}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-gold-shine">₪{product.price}</span>
              <span className="text-base text-muted-foreground line-through">₪{product.originalPrice}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F3CF5D] border border-[#D4AF37]/40 rounded-full px-2 py-0.5">
                חיסכון ₪{product.originalPrice - product.price}
              </span>
            </div>

            {/* Player selector */}
            {product.players && product.players.length > 0 && (
              <div className="mt-6">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">בחר שחקן</span>
                <div className="flex flex-wrap gap-2">
                  {product.players.map((p) => {
                    const active = player?.number === p.number && player?.name === p.name;
                    return (
                      <button
                        key={`${p.name}-${p.number}`}
                        onClick={() => setPlayer(p)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                          active
                            ? "border-transparent text-black"
                            : "border-border text-foreground/80 hover:border-[#D4AF37]/60 hover:text-[#F3CF5D]"
                        }`}
                        style={active ? { background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" } : undefined}
                      >
                        {p.name} <span className="opacity-70">#{p.number}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <ul className="mt-5 space-y-2.5 text-sm text-foreground/85">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex gap-3">
                  <span className="shrink-0">{f.icon}</span>
                  <span className="leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>

            {/* Size selector */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">בחר מידה</span>
                <span className="text-xs text-muted-foreground">נבחר: <b className="text-foreground">{size}</b></span>
              </div>
              <div className="flex gap-2">
                {SIZES.map((s) => {
                  const active = s === size;
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`relative h-11 px-3 rounded-md text-sm font-bold border transition-all ${
                        active
                          ? "border-transparent text-black"
                          : "border-border text-foreground/80 hover:border-[#D4AF37]/60 hover:text-[#F3CF5D]"
                      }`}
                      style={active ? { background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" } : undefined}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 grid gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-wa-pulse w-full rounded-full py-4 text-center text-sm md:text-base font-bold tracking-wide text-white"
                style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}
              >
                💬 שלח הזמנה ישירה לוואטסאפ
              </a>
              <button
                onClick={() => { onAddToCart(product, size); onClose(); }}
                className="btn-gold w-full rounded-full py-4 text-sm md:text-base uppercase"
              >
                הוסף לעגלה ורכוש באתר
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed text-center">
              בלחיצה על הכפתור ייפתח צ׳אט בוואטסאפ מול נציג לסגירת המידה,
              הכתובת ופרטי המשלוח בצורה מאובטחת ואישית.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
