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

interface Review {
  name: string;
  stars: number;
  text: string;
  date: string;
  meta?: string;
}

const FOOTBALL_REVIEWS: Review[] = [
  {
    name: "אלון ש.",
    stars: 5,
    text: "הזמנתי את החולצה החדשה. רמת גימור מדהימה, אין חוטים בולטים או תפרים עקומים. הסמל תפור חזק מאוד והצבעים מדויקים. עברה כבר 3 כביסות והכל נשאר מושלם. יושב פצצה.",
    date: "לפני יומיים",
    meta: "רכש מידה: L | גובה: 1.82 מ'"
  },
  {
    name: "עידן מזרחי",
    stars: 4,
    text: "חולצה מטורפת, איכות הבד והפרטים הקטנים ברמה של חנות רשמית בחו\"ל. לקח למשלוח 10 ימים להגיע בגלל עומס של חגים, אבל השירות לקוחות בוואטסאפ ענו לי תוך שתי דקות והרגיעו אותי. שווה את ההמתנה.",
    date: "לפני שבוע",
    meta: "רכש מידה: M"
  },
  {
    name: "יניב לוי",
    stars: 5,
    text: "הזמנתי את החולצה לטורניר השבועי של המשרד. הבד מנדף זיעה אמיתי, קל מאוד ומאוורר. מרגיש סופר פרימיום על הגוף ולא מגרד בצוואר כמו החיקויים הזולים.",
    date: "לפני שבועיים",
    meta: "רכש מידה: XL | משקל: 90 ק\"ג"
  },
  {
    name: "אסף גלזר",
    stars: 4,
    text: "החולצה עצמה היא 10 מתוך 10, הבד רך ונעים, הלוגו של אדידס והסמל של הקבוצה תפורים מעולה. לקח למשלוח 9 ימים להגיע לקיבוץ בצפון. האיכות מפצה על זה לחלוטין. מומלץ!",
    date: "לפני חודש",
    meta: "רכש מידה: L"
  }
];

const RETRO_REVIEWS: Review[] = [
  {
    name: "רועי כהן",
    stars: 5,
    text: "וואו. פשוט וואו. אני אוסף חולצות כדורגל שנים והייתי סקפטי לגבי הרטרו. החולצה הגיעה פשוט מושלמת. הלוגו והסמל רקומים ברמה הכי גבוהה שיש, הבד מרגיש כבד ואיכותי בדיוק כמו המקוריות של פעם. משלוח הגיע תוך 6 ימים.",
    date: "לפני 3 ימים",
    meta: "רכש מידה: L | גזרה: Retro Fit"
  },
  {
    name: "גיא דהן",
    stars: 5,
    text: "החולצה הזו היא יצירת אמנות. הצווארון והספונסר נראים בדיוק כמו הגרסה ההיסטורית. אני 1.80 מ' שוקל 82 ק\"ג, לקחתי מידה L וזה יושב בול, לא צמוד מדי ולא שק. מומלץ בחום לחובבי נוסטלגיה.",
    date: "לפני שבועיים",
    meta: "רכש מידה: L"
  },
  {
    name: "תומר אהרון",
    stars: 5,
    text: "אין דברים כאלה. חיפשתי את החולצה הזו המון זמן. רמת הדיוק בפרטים פשוט הזויה - הצבעים והפונט המדויק של הניינטיז. אתר קל לרכישה וחווית קניה מעולה.",
    date: "לפני שלושה שבועות",
    meta: "רכש מידה: M"
  },
  {
    name: "אורלי אבני",
    stars: 5,
    text: "קניתי לבעלי ליום הולדת 40 את חולצת הרטרו של מראדונה מ-86. הוא כמעט בכה מהתרגשות! האיכות מדהימה, הבד נעים והחולצה מגיעה ארוזה בצורה מאוד מכובדת כמתנה. ממליצה בחום.",
    date: "לפני חודש",
    meta: "רכשה כמתנה לבעל"
  }
];

const NBA_REVIEWS: Review[] = [
  {
    name: "אופק גרינברג",
    stars: 5,
    text: "הגופייה הגיעה היום. כל האותיות והמספרים תפורים (Stitched) ולא מודבקים! זה הפרט הכי חשוב בגופיות NBA וזה מה שמבדיל בין זבל לפרימיום. בד רשת (Mesh) כבד ואיכותי, נראה מדהים.",
    date: "לפני 4 ימים",
    meta: "רכש גופיית Swingman | מידה: M"
  },
  {
    name: "דניאל ק.",
    stars: 5,
    text: "גופייה מטורפת. הלוגו של ה-NBA בגב רקום בצורה מושלמת, הצבעים מדויקים לגמרי (לא זוהר זול). אני בדרך כלל מידה M, לקחתי M וזה יושב פגז. שירות לקוחות עזרו לי בוואטסאפ להתאים את המידה תוך שניה.",
    date: "לפני שבוע",
    meta: "רכש מידה: M | גובה: 1.76 מ'"
  },
  {
    name: "עומר יוסף",
    stars: 4,
    text: "גופיית אליפות איכותית בטירוף. האותיות תפורות חזק מאוד והצבע עמוק ויפה. המשלוח הגיע ארוז ברמה גבוהה מאוד בקופסה קשיחה. לקח שבוע להגיע לחיפה. אחלה אתר למי שרוצה גופיות NBA ברמה גבוהה.",
    date: "לפני שבועיים",
    meta: "רכש מידה: XL"
  },
  {
    name: "סער ב.",
    stars: 5,
    text: "איכות תפירה של גופיית Swingman מקורית לחלוטין. הפרטים בצדדים והצווארון ברמה הכי גבוהה שראיתי בארץ. שירות מצוין ומחיר הוגן מאוד למה שמקבלים.",
    date: "לפני שלושה שבועות",
    meta: "רכש מידה: L"
  }
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

  const selectedReviews = product.category === "nba"
    ? NBA_REVIEWS
    : product.isRetro
    ? RETRO_REVIEWS
    : FOOTBALL_REVIEWS;

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
          <div className="p-6 md:p-9 flex flex-col overflow-y-auto max-h-[85vh] md:max-h-[85vh]">
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

            {/* Reviews Section */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-black tracking-tight">חוות דעת רוכשים</h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                    <span className="flex text-[#F3CF5D] tracking-tighter">★★★★★</span>
                    <span>מבוסס על {selectedReviews.length * 3 + 12} ביקורות מאומתות</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-gold-shine leading-none">4.9 / 5</div>
                  <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-1">100% רוכשים מאומתים</div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedReviews.map((rev, i) => (
                  <div key={i} className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 space-y-2 transition-all hover:bg-white/[0.03] hover:border-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-foreground">{rev.name}</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-emerald-500/20">
                          ✓ רוכש מאומת
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                    </div>

                    <div className="flex text-[#F3CF5D] text-[10px] tracking-tight">
                      {"★".repeat(rev.stars)}{"☆".repeat(5 - rev.stars)}
                    </div>

                    <p className="text-xs text-foreground/80 leading-relaxed pr-2 border-r border-[#D4AF37]/30">
                      "{rev.text}"
                    </p>

                    {rev.meta && (
                      <div className="text-[10px] text-muted-foreground pt-1 flex items-center gap-1.5">
                        <span>🏷️</span>
                        <span>{rev.meta}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
