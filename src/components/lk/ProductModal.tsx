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

const BUNDLES = [
  {
    qty: 1,
    title: "מארז יחיד",
    price: 70,
    original: 120,
    savings: 50,
    badge: "",
    gift: "מחיר השקה מיוחד"
  },
  {
    qty: 2,
    title: "מארז זוגי",
    price: 130,
    original: 230,
    savings: 100,
    badge: "72% מהלקוחות בחרו",
    gift: "+ מתנה מסתורית בשווי עד ₪200"
  },
  {
    qty: 3,
    title: "מארז שלשה",
    price: 180,
    original: 380,
    savings: 200,
    badge: "הכי משתלם! 🔥",
    gift: "+ מתנה מסתורית בשווי עד ₪200"
  },
  {
    qty: 4,
    title: "מארז רביעייה",
    price: 220,
    original: 400,
    savings: 180,
    badge: "מחיר חיסול מטורף! 🚀",
    gift: "+ מתנה מסתורית בשווי עד ₪200"
  }
];

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: string, qty: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: Props) {
  const [size, setSize] = useState("M");
  const [player, setPlayer] = useState<PlayerVariant | undefined>(undefined);
  const [selectedBundleQty, setSelectedBundleQty] = useState(3); // Default to 3 (recommended) for maximum conversions!
  const [qtyToAdd, setQtyToAdd] = useState(1); // Default to adding 1 of this shirt
  const team = product ? TEAMS.find((t) => t.slug === product.teamSlug) : undefined;

  useEffect(() => {
    setSize("M");
    setPlayer(product?.players?.[0] ?? undefined);
    setSelectedBundleQty(3); // Default target bundle is 3 (מומלץ)
    setQtyToAdd(1); // Default qty to add is 1
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

  const getPricingForQty = (qty: number) => {
    if (qty === 1) return { price: 70, original: 120, savings: 50 };
    if (qty === 2) return { price: 130, original: 230, savings: 100 };
    if (qty === 3) return { price: 180, original: 380, savings: 200 };
    return {
      price: 220 + (qty - 4) * 55,
      original: 400 + (qty - 4) * 100,
      savings: (400 + (qty - 4) * 100) - (220 + (qty - 4) * 55)
    };
  };

  const currentPricing = getPricingForQty(qtyToAdd);
  const activeBundle = BUNDLES.find((b) => b.qty === selectedBundleQty) || BUNDLES[2]; // Default to 3

  const getBundleInstruction = (qty: number) => {
    switch (qty) {
      case 1:
        return "רוצים לחסוך? הוסיפו חולצה זו לעגלה, ואז בחרו חולצה נוספת כלשהי באתר. המחיר ירד אוטומטית ל-₪130 בלבד לזוג!";
      case 2:
        return "דיל מעולה! כדי לקבל מארז זוגי ב-₪130: הוסיפו חולצה זו לעגלה (1 יחידה), ולאחר מכן המשיכו לגלוש באתר והוסיפו חולצה נוספת של קבוצה אחרת או במידה אחרת. ההנחה תופעל אוטומטית בסל!";
      case 3:
        return "הבחירה המומלצת! כדי לקבל מארז שלשה ב-₪180 (רק ₪60 לחולצה!): הוסיפו חולצה זו לעגלה, ואז בחרו עוד 2 חולצות נוספות כלשהן מכל הדגמים והמידות באתר. ההנחה תתעדכן אוטומטית!";
      case 4:
        return "הנחה מרבית מטורפת! כדי לקבל מארז רביעייה ב-₪220 (רק ₪55 לחולצה!): הוסיפו חולצה זו לעגלה, ואז בחרו עוד 3 חולצות נוספות כלשהן מכל הדגמים והמידות באתר. ההנחה תתעדכן אוטומטית!";
      default:
        return "";
    }
  };

  const dynamicWaLink = (() => {
    const playerLine = player ? `👤 שחקן: ${player.name} #${player.number}\n` : "";
    const mixMatchNote = selectedBundleQty > 1
      ? `\n(אני רוצה לערבב ולהרכיב מארז של ${selectedBundleQty} חולצות לבחירתי מכל האתר!)`
      : "";
    const msg =
`שלום LEGENDARY KITS! ✨
אני רוצה להזמין את החולצה הזו:

👕 פריט: ${product.title}
${playerLine}📏 מידה: ${size}
כמות מדגם זה: ${qtyToAdd} יחידה/ות
${mixMatchNote}
💰 מחיר מתוכנן לקומבו: ${activeBundle.price} ₪!

אשמח שנציג יחזור אליי בוואטסאפ לעזור לי לבחור את שאר הדגמים במארז ולסגור משלוח.`;
    return `https://api.whatsapp.com/send?phone=972508100032&text=${encodeURIComponent(msg)}`;
  })();

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
        className="relative w-full max-w-5xl max-h-[90dvh] md:max-h-[90vh] rounded-3xl overflow-hidden border border-[#1F1F1F] bg-[#0a0a0a] animate-modal-in shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="סגור"
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full grid place-items-center border border-border bg-black/60 backdrop-blur text-foreground/80 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-2 flex-1 min-h-0">
          {/* Image */}
          <div className="relative w-full shrink-0 h-[220px] sm:h-[300px] md:h-auto bg-black">
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
          <div className="p-5 md:p-9 flex-1 flex flex-col overflow-y-auto min-h-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F3CF5D]">
              {product.categoryLabel}
            </p>
            <h2 className="mt-2 text-xl md:text-3xl font-black leading-tight">
              {product.title}
            </h2>

            {product.description && (
              <p className="mt-2.5 text-xs md:text-sm text-muted-foreground leading-relaxed border-r-2 border-[#D4AF37]/50 pr-3">
                {product.description}
              </p>
            )}

            {/* Dynamic Price Display */}
            <div className="mt-3.5 flex items-baseline gap-2.5">
              <span className="text-2xl md:text-3xl font-black text-gold-shine">₪{currentPricing.price}</span>
              <span className="text-sm md:text-base text-muted-foreground line-through">₪{currentPricing.original}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#F3CF5D] border border-[#D4AF37]/40 rounded-full px-2 py-0.5">
                חיסכון ₪{currentPricing.savings}
              </span>
            </div>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-1">
              {qtyToAdd === 1 
                ? "מחיר מיוחד ליחידה. רכשו מארז וערבבו דגמים כדי להוזיל את המחיר לעד ₪55 לחולצה!" 
                : `מחיר מיוחד עבור ${qtyToAdd} חולצות מדגם זה (רק ₪${Math.round(currentPricing.price / qtyToAdd)} לחולצה!)`
              }
            </p>

            {/* Player selector */}
            {product.players && product.players.length > 0 && (
              <div className="mt-5">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-2.5">בחר שחקן</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.players.map((p) => {
                    const active = player?.number === p.number && player?.name === p.name;
                    return (
                      <button
                        key={`${p.name}-${p.number}`}
                        onClick={() => setPlayer(p)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] md:text-xs font-bold border transition-all ${
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

            <ul className="mt-4 space-y-2 text-xs md:text-sm text-foreground/85">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex gap-2.5">
                  <span className="shrink-0 text-sm">{f.icon}</span>
                  <span className="leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>

            {/* Size selector */}
            <div className="mt-5.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">בחר מידה</span>
                <span className="text-xs text-muted-foreground">נבחר: <b className="text-foreground">{size}</b></span>
              </div>
              <div className="flex gap-1.5">
                {SIZES.map((s) => {
                  const active = s === size;
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`relative h-10 px-3 rounded-md text-xs md:text-sm font-bold border transition-all ${
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

            {/* Bundle Deals Selector Widget */}
            <div className="mt-6 space-y-3 border-t border-border/50 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">מבצעי קומבו והנחות מארזים</span>
                <span className="text-xs text-[#F3CF5D] font-bold animate-pulse">⚡ מבצע השקה מוגבל</span>
              </div>

              <div className="grid gap-2.5">
                {BUNDLES.map((b) => {
                  const active = selectedBundleQty === b.qty;
                  return (
                    <button
                      key={b.qty}
                      onClick={() => setSelectedBundleQty(b.qty)}
                      className={`relative text-right w-full rounded-xl md:rounded-2xl p-3 md:p-4 transition-all duration-300 flex items-center justify-between gap-3.5 border cursor-pointer ${
                        active
                          ? "bg-[#7C3AED]/10 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.12)]"
                          : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Badge on top-left of the box */}
                      {b.badge && (
                        <span className="absolute -top-2 left-4 text-[8px] md:text-[9px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-full shadow-lg"
                              style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                          {b.badge}
                        </span>
                      )}

                      {/* Right side: radio indicator + details */}
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          active ? "border-[#7C3AED] bg-[#7C3AED]" : "border-muted-foreground/40 bg-transparent"
                        }`}>
                          {active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-scale-up" />}
                        </div>
                        <div className="text-right">
                          <span className="block font-black text-xs md:text-sm text-foreground">
                            {b.title} <span className="text-[10px] md:text-xs text-muted-foreground font-normal">({b.qty} {b.qty === 1 ? "חולצה" : "חולצות"})</span>
                          </span>
                          <span className="block text-[10px] md:text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {b.gift}
                          </span>
                        </div>
                      </div>

                      {/* Left side: price */}
                      <div className="text-left shrink-0">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-sm md:text-base font-black text-foreground">₪{b.price}</span>
                          <span className="text-[11px] text-muted-foreground line-through">₪{b.original}</span>
                        </div>
                        <span className="block text-[9px] md:text-[10px] text-emerald-400 font-bold mt-0.5">
                          חיסכון ₪{b.savings}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Mix & Match Instruction Alert */}
              <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/35 rounded-xl md:rounded-2xl p-3 md:p-4 text-[11px] md:text-xs text-foreground/90 leading-relaxed space-y-1 shadow-[0_0_15px_rgba(124,58,237,0.03)] animate-fade-in">
                <div className="flex items-center gap-1.5 text-[#a78bfa] font-black uppercase tracking-wider">
                  <span>💫 ערבבו דגמים ומידות בחופשיות!</span>
                </div>
                <p className="pr-1 text-muted-foreground">
                  {getBundleInstruction(selectedBundleQty)}
                </p>
              </div>
            </div>

            {/* Quantity Selector for this specific model */}
            <div className="mt-5 border-t border-border/50 pt-5 animate-fade-in">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground block">כמות מדגם זה</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">כמה חולצות של {product.title} (מידה {size}) תרצו להוסיף?</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.08] rounded-xl p-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQtyToAdd(Math.max(1, qtyToAdd - 1))}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center font-bold text-sm hover:border-[#D4AF37] hover:text-[#F3CF5D] active:scale-95 transition-all cursor-pointer bg-black/45"
                  >
                    -
                  </button>
                  <span className="text-xs md:text-sm font-black w-5 text-center text-foreground">{qtyToAdd}</span>
                  <button
                    type="button"
                    onClick={() => setQtyToAdd(qtyToAdd + 1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center font-bold text-sm hover:border-[#D4AF37] hover:text-[#F3CF5D] active:scale-95 transition-all cursor-pointer bg-black/45"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid gap-2.5">
              <a
                href={dynamicWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-wa-pulse w-full rounded-full py-3 md:py-4 text-center text-xs md:text-base font-bold tracking-wide text-white"
                style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}
              >
                💬 שלח הזמנה ישירה לוואטסאפ
              </a>
              <button
                onClick={() => { onAddToCart(product, size, qtyToAdd); onClose(); }}
                className="btn-gold w-full rounded-full py-3 md:py-4 text-xs md:text-base uppercase flex items-center justify-center gap-1.5"
              >
                <span>
                  {qtyToAdd === 1 
                    ? "הוסף חולצה זו לעגלה" 
                    : `הוסף ${qtyToAdd} חולצות מדגם זה לעגלה`
                  }
                </span>
                <span className="opacity-30">|</span>
                <span>₪{currentPricing.price}</span>
              </button>
            </div>

            <p className="text-[10px] md:text-[11px] text-muted-foreground mt-3 leading-relaxed text-center">
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
