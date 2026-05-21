import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnnouncementBar } from "@/components/lk/AnnouncementBar";
import { Header } from "@/components/lk/Header";
import { Footer } from "@/components/lk/Footer";
import { WhatsAppFloat } from "@/components/lk/WhatsAppFloat";
import { CartDrawer, type CartItem } from "@/components/lk/CartDrawer";
import { buildWhatsAppUrl } from "@/components/lk/products";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-r-4 border-[#D4AF37] pr-4">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-[1.9] space-y-3">{children}</div>
    </div>
  );
}

function ShippingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Link to="/" className="text-xs text-muted-foreground hover:text-[#F3CF5D] transition uppercase tracking-widest mb-8 inline-block">
          ← חזרה לחנות
        </Link>

        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#F3CF5D] mb-3">Shipping & Returns</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            משלוחים <span className="text-gold-shine">&amp; החזרות</span>
          </h1>
        </div>

        <div className="space-y-12">
          <Section title="משלוח רגיל">
            <p>
              אנחנו שולחים לכל רחבי ישראל. לאחר אישור ההזמנה, זמן האספקה הוא <strong className="text-foreground">3-5 ימי עסקים</strong>.
            </p>
            <p>
              עלות המשלוח: <strong className="text-foreground">₪25</strong> לכל הארץ.
              הזמנות מעל ₪200 — משלוח <strong className="text-foreground">חינם</strong>.
            </p>
          </Section>

          <Section title="משלוח מהיר">
            <p>
              צריכים את הפריט מהר יותר? ניתן לתאם משלוח מהיר תוך 24-48 שעות.
              צרו איתנו קשר בוואטסאפ לפרטים ועלויות.
            </p>
          </Section>

          <Section title="איסוף עצמי">
            <p>
              ניתן לאסוף את ההזמנה ממרכז הארץ ללא עלות משלוח.
              פרטי הנקודה יישלחו לאחר אישור ההזמנה.
            </p>
          </Section>

          <Section title="מדיניות החזרות והחלפות">
            <p>
              אנחנו רוצים שתהיו מרוצים לחלוטין. מדיניות ההחזרה שלנו:
            </p>
            <ul className="list-disc list-inside space-y-2 pr-2">
              <li>ניתן להחזיר פריט תוך <strong className="text-foreground">14 יום</strong> מקבלת ההזמנה.</li>
              <li>הפריט חייב להיות <strong className="text-foreground">ללא שימוש</strong>, עם התגים המקוריים.</li>
              <li>החלפת מידה — ניתן ומיידי, בכפוף לזמינות.</li>
              <li>פגם ייצור — החזר מלא או החלפה ללא שאלות.</li>
              <li>פריטים מותאמים אישית (שם + מספר) — לא ניתן להחזיר.</li>
            </ul>
          </Section>

          <Section title="תהליך ההחזרה">
            <p>
              לביצוע החזרה:
            </p>
            <ol className="list-decimal list-inside space-y-2 pr-2">
              <li>שלחו לנו הודעה בוואטסאפ עם מספר ההזמנה וסיבת ההחזרה.</li>
              <li>נתאם איתכם איסוף או מסירה של הפריט.</li>
              <li>לאחר קבלת הפריט, נבצע החזר/החלפה תוך 3-5 ימי עסקים.</li>
            </ol>
          </Section>

          <Section title="תשלומים וביטולים">
            <p>
              ניתן לבטל הזמנה שטרם נשלחה ללא עלות. לאחר שליחה, תחול מדיניות ההחזרות לעיל.
            </p>
            <p>
              אמצעי תשלום: ביט, פייבוקס, העברה בנקאית, מזומן בעת המשלוח.
            </p>
          </Section>
        </div>

        <div className="mt-12 card-carbon rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black uppercase tracking-tight mb-2">יש שאלה על המשלוח?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            נשמח לעזור ולתת מענה מיידי.
          </p>
          <a
            href={buildWhatsAppUrl("שלום! יש לי שאלה לגבי משלוח/החזרה 📦")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white uppercase"
            style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}
          >
            💬 שלחו לנו בוואטסאפ
          </a>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(idx) => setCart((c) => c.filter((_, i) => i !== idx))}
        onClear={() => setCart([])}
      />
    </div>
  );
}
