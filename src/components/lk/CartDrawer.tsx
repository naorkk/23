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
}

export function CartDrawer({ open, onClose, items, onRemove, onClear }: Props) {
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  if (!open) return null;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = items.map(
      (i) => `• ${i.product.title} · מידה ${i.size} · x${i.qty} · ₪${i.product.price * i.qty}`
    );
    const msg =
`🛒 הזמנה חדשה מהאתר — LEGENDARY KITS

שם: ${form.name}
טלפון: ${form.phone}
עיר: ${form.city}
כתובת: ${form.address}
${form.notes ? `הערות: ${form.notes}\n` : ""}
הפריטים:
${lines.join("\n")}

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
              {items.map((i, idx) => (
                <div key={idx} className="flex gap-3 card-carbon rounded-xl p-3">
                  <img src={i.product.image} alt="" className="w-20 h-20 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{i.product.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      מידה {i.size} · כמות {i.qty}
                    </div>
                    <div className="text-sm text-gold-shine font-black mt-1">
                      ₪{i.product.price * i.qty}
                    </div>
                  </div>
                  <button onClick={() => onRemove(idx)} aria-label="הסר" className="self-start text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-border space-y-3">
              <div className="flex items-baseline justify-between">
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
            <div className="flex items-baseline justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">סה״כ לתשלום במזומן / Bit / העברה</span>
              <span className="text-2xl font-black text-gold-shine">₪{total}</span>
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