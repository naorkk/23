import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnnouncementBar } from "@/components/lk/AnnouncementBar";
import { Header } from "@/components/lk/Header";
import { Footer } from "@/components/lk/Footer";
import { WhatsAppFloat } from "@/components/lk/WhatsAppFloat";
import { CartDrawer, type CartItem } from "@/components/lk/CartDrawer";
import { buildWhatsAppUrl } from "@/components/lk/products";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
});

const FAQ_ITEMS = [
  {
    q: "מה איכות החולצות?",
    a: "כל החולצות עשויות מבד Dry-Fit מקצועי, גמיש ומנדף זיעה. הגימור כולל תגים מובלטים ועמיד בכביסות חוזרות ללא קילופים.",
  },
  {
    q: "מה הזמן מהזמנה עד קבלת הפריט?",
    a: "לאחר אישור ההזמנה, זמן האספקה הוא 3-5 ימי עסקים לכל רחבי הארץ. הזמנות דחופות ניתן לתאם דרך הוואטסאפ.",
  },
  {
    q: "איך מזמינים?",
    a: "לחצו על הפריט הרצוי, בחרו מידה ושחקן, ולחצו על ׳שלח הזמנה לוואטסאפ׳. תוך שניות תקבלו הודעה מוכנה לשליחה לנציג שלנו.",
  },
  {
    q: "איך אדע איזו מידה לקחת?",
    a: "הגזרה היא Standard Fit — מומלץ לקחת את המידה הרגילה שלך. אם בין מידות, עדיף לעלות מידה. יש ספק? שלחו לנו הודעה ונעזור.",
  },
  {
    q: "האם ניתן להחליף מידה?",
    a: "כן! אנחנו מאפשרים החלפת מידה ללא בעיות. צרו איתנו קשר בוואטסאפ תוך 14 יום מקבלת הפריט והפריט חייב להיות ללא שימוש.",
  },
  {
    q: "מה אמצעי התשלום?",
    a: "ניתן לשלם בביט, פייבוקס, העברה בנקאית, או מזומן בעת המשלוח (בנקודות מסוימות). הכל מסוכם דרך הוואטסאפ.",
  },
  {
    q: "האם הפריטים רשמיים?",
    a: "החולצות שלנו הן רמת איכות גבוהה במיוחד עם גימור פרימיום. הן אינן חולצות רשמיות של הליגות, אלא חולצות פן וספורט איכותיות.",
  },
  {
    q: "האם יש קולקציית רטרו לכל הקבוצות?",
    a: "יש לנו קולקציית רטרו לקבוצות הגדולות: ריאל מדריד 2002, ברצלונה 2009, ארסנל 2004, מנצ׳סטר יונייטד 1999, ליברפול 2005, שיקגו בולס 1996, לייקרס 1996, ועוד. גלשו לעמוד הקבוצה הרלוונטית.",
  },
  {
    q: "האם ניתן להזמין עם שם ומספר מותאם אישית?",
    a: "כן! צרו איתנו קשר בוואטסאפ עם שם ומספר רצויים ונכין עבורכם הצעת מחיר. זמן הייצור לפריטים מותאמים הוא 7-10 ימי עסקים.",
  },
  {
    q: "האם אתם שולחים לחו׳׳ל?",
    a: "כרגע אנחנו פועלים בישראל בלבד. בעתיד נשמח להרחיב. עקבו אחרינו באינסטגרם לעדכונים.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-right text-sm md:text-base font-bold hover:text-[#F3CF5D] transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#D4AF37] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed pr-4 border-r-2 border-[#D4AF37]/40 mr-1">
          {a}
        </div>
      )}
    </div>
  );
}

function FaqPage() {
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
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#F3CF5D] mb-3">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            שאלות <span className="text-gold-shine">נפוצות</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            לא מצאתם תשובה? שלחו לנו הודעה בוואטסאפ — נשמח לעזור.
          </p>
        </div>

        <div className="card-carbon rounded-2xl px-6 md:px-8 py-2">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-12 card-carbon rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black uppercase tracking-tight mb-2">עדיין יש שאלה?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            אנחנו כאן בשבילכם — תמיד ישנה תשובה.
          </p>
          <a
            href={buildWhatsAppUrl("שלום! יש לי שאלה לגבי LEGENDARY KITS 🙋")}
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
