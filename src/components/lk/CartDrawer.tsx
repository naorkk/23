import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { buildWhatsAppUrl, type Product } from "./products";

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (idx: number) => void;
  onClear: () => void;
  onUpdateQty: (idx: number, qty: number) => void;
}

export function CartDrawer({ open, onClose, items, onRemove, onClear, onUpdateQty }: Props) {
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const calculateBundlePrice = (qty: number) => {
    if (qty === 0) return { price: 0, original: 0 };
    if (qty === 1) return { price: 70, original: 120 };
    if (qty === 2) return { price: 130, original: 230 };
    if (qty === 3) return { price: 180, original: 380 };
    return { price: 220 + (qty - 4) * 55, original: 400 + (qty - 4) * 100 };
  };

  const bundle = calculateBundlePrice(totalQty);
  const total = bundle.price;
  const effectivePricePerUnit = totalQty > 0 ? bundle.price / totalQty : 0;
  const effectiveOriginalPricePerUnit = totalQty > 0 ? bundle.original / totalQty : 0;

  if (!open) return null;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = items.map((i) => {
      const itemPrice = Math.round(effectivePricePerUnit * i.qty);
      return `• ${i.product.title} · מידה ${i.size} · כמות x${i.qty} · ₪${itemPrice} (מוזל)`;
    });
    const msg =
`🛒 הזמנה חדשה מהאתר — LEGENDARY KITS

שם: ${form.name}
טלפון: ${form.phone}
עיר: ${form.city}
כתובת: ${form.address}
${form.notes ? `הערות: ${form.notes}\n` : ""}
הפריטים:
${lines.join("\n")}

------------------
סה״כ מקורי: ₪${bundle.original}
הנחת מארז קומבו: -₪${bundle.original - bundle.price}
סה״כ לתשלום: ₪${total}`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    onClear();
    setStep("done");
  };

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <aside
        className="absolute top-0 bottom-0 left-0 w-full max-w-md bg-[#0a0a0a] border-l border-[#1F1F1F] flex flex-col"
        style={{ animation: "modal-in 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-black tracking-widest uppercase text-sm">
            {step === "cart" ? "העגלה שלך" : step === "checkout" ? "פרטי הזמנה" : "הזמנה נשלחה"}
          </h3>
          <button onClick={onClose} aria-label="סגור" className="text-foreground/70 hover:text-[#F3CF5D]">
            <X size={20} />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && (
                <div className="text-center text-muted-foreground py-16 text-sm">
                  העגלה ריקה עדיין. הוסיפו פריט פרימיום ✨
                </div>
              )}
              {items.map((i, idx) => {
                const itemPrice = Math.round(effectivePricePerUnit * i.qty);
                const itemOriginal = Math.round(effectiveOriginalPricePerUnit * i.qty);
                return (
                  <div key={idx} className="flex gap-3 card-carbon rounded-xl p-3">
                    <img src={i.product.image} alt="" className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{i.product.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        מידה {i.size}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          type="button"
                          onClick={() => i.qty > 1 ? onUpdateQty(idx, i.qty - 1) : onRemove(idx)}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:border-[#D4AF37] hover:text-[#F3CF5D] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-foreground">{i.qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(idx, i.qty + 1)}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:border-[#D4AF37] hover:text-[#F3CF5D] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end shrink-0">
                      <button
                        onClick={() => onRemove(idx)}
                        aria-label="הסר"
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="text-left shrink-0">
                        <div className="text-sm text-gold-shine font-black">₪{itemPrice}</div>
                        {itemOriginal > itemPrice && (
                          <div className="text-[10px] text-muted-foreground line-through">₪{itemOriginal}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-5 border-t border-border space-y-4">
              {totalQty > 0 && (
                <>
                  {/* Dynamic Combo Upgrade Banner */}
                  <div className="bg-[#121212] border border-[#D4AF37]/35 rounded-xl p-3.5 space-y-1.5 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-bold text-[#F3CF5D]">
                      <span>⚡ מבצע קומבו השקה פעיל!</span>
                      <span>חסכת ₪{bundle.original - bundle.price}!</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed">
                      {totalQty === 1 && "הוסיפו עוד חולצה 1 בלבד לקבלת מארז זוגי ב-130 ₪ בלבד!"}
                      {totalQty === 2 && "הוסיפו עוד חולצה 1 בלבד לקבלת מארז שלשה ב-180 ₪ בלבד! [הכי משתלם]"}
                      {totalQty === 3 && "הוסיפו עוד חולצה 1 בלבד לקבלת מארז רביעייה ב-220 ₪ בלבד!"}
                      {totalQty >= 4 && "הפעלתם את ההנחה המרבית! כל חולצה נוספת ב-55 ₪ בלבד."}
                    </div>
                  </div>

                  {/* Savings Breakdown */}
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex justify-between text-muted-foreground">
                      <span>מחיר מקורי</span>
                      <span className="line-through">₪{bundle.original}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>הנחת קומבו השקה</span>
                      <span>-₪{bundle.original - bundle.price}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm text-muted-foreground">סה״כ</span>
                <span className="text-2xl font-black text-gold-shine">₪{total}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => setStep("checkout")}
                className="btn-gold w-full rounded-full py-3.5 text-sm uppercase disabled:opacity-40 disabled:cursor-not-allowed"
              >
                המשך לרכישה באתר
              </button>
            </div>
          </>
        )}

        {step === "checkout" && (
          <form onSubmit={placeOrder} className="flex-1 overflow-y-auto p-5 space-y-4">
            {[
              { k: "name", label: "שם מלא", type: "text", required: true },
              { k: "phone", label: "טלפון", type: "tel", required: true },
              { k: "city", label: "עיר", type: "text", required: true },
              { k: "address", label: "כתובת + מספר בית", type: "text", required: true },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  required={f.required}
                  value={form[f.k as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full bg-[#0c0c0c] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">הערות</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#0c0c0c] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none"
              />
            </div>

            {/* Checkout Totals Breakdown */}
            <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-4 text-xs space-y-2.5">
              <div className="flex justify-between text-muted-foreground">
                <span>מחיר מקורי</span>
                <span className="line-through">₪{bundle.original}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>הנחת קומבו השקה</span>
                <span>-₪{bundle.original - bundle.price}</span>
              </div>
              <div className="border-t border-border/50 pt-2.5 flex items-baseline justify-between">
                <span className="text-sm font-bold text-foreground">סה״כ לתשלום במזומן / Bit / העברה</span>
                <span className="text-2xl font-black text-gold-shine">₪{total}</span>
              </div>
            </div>

            <button type="submit" className="btn-gold w-full rounded-full py-3.5 text-sm uppercase">
              שלח הזמנה
            </button>
            <button type="button" onClick={() => setStep("cart")} className="w-full text-xs text-muted-foreground hover:text-foreground transition">
              חזרה לעגלה
            </button>
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              נציג שלנו ייצור איתך קשר תוך מספר דקות לאישור ההזמנה ותיאום משלוח.
            </p>
          </form>
        )}

        {step === "done" && (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto rounded-full grid place-items-center text-3xl border border-[#D4AF37]/50 animate-glow-pulse mb-5">
                ✓
              </div>
              <h4 className="text-xl font-black mb-2">ההזמנה נשלחה!</h4>
              <p className="text-sm text-muted-foreground">
                פתחנו לך צ׳אט בוואטסאפ. נחזור אליך בדקות הקרובות לסגירת כל הפרטים.
              </p>
              <button onClick={() => { setStep("cart"); onClose(); }} className="btn-ghost-gold mt-6 rounded-full px-6 py-3 text-sm uppercase">
                סגור
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}