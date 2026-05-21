import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/lk/AnnouncementBar";
import { Header } from "@/components/lk/Header";
import { Footer } from "@/components/lk/Footer";
import { WhatsAppFloat } from "@/components/lk/WhatsAppFloat";
import { TrustBadges } from "@/components/lk/TrustBadges";
import { useState } from "react";
import { CartDrawer, type CartItem } from "@/components/lk/CartDrawer";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <Link to="/" className="text-xs text-muted-foreground hover:text-[#F3CF5D] transition uppercase tracking-widest mb-8 inline-block">
          ← חזרה לחנות
        </Link>

        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#F3CF5D] mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            אודות <span className="text-gold-shine">LEGENDARY KITS</span>
          </h1>
        </div>

        {/* Hero image strip */}
        <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-16 border border-[#1F1F1F]">
          <img src="/logo.jpg" alt="Legendary Kits" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl md:text-3xl font-black uppercase tracking-[0.2em] text-gold-shine text-center">
              Premium Football &amp; NBA · Israel
            </p>
          </div>
        </div>

        {/* Story sections */}
        <div className="space-y-12 text-muted-foreground leading-[1.9] text-base">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-r-4 border-[#D4AF37] pr-4">
              הסיפור שלנו
            </h2>
            <p>
              LEGENDARY KITS נולדה מאהבה עמוקה לספורט ולהיסטוריה שלו. אנחנו לא רק מוכרים חולצות — אנחנו שומרים על זיכרונות.
              כל חולצה אצלנו מספרת סיפור: גמר ה-Champions League של 2005 עם ג׳רארד, ה-Last Dance של ג׳ורדן ב-1996,
              הטרבל של פרגוסון ב-1999.
            </p>
            <p className="mt-4">
              אנחנו מאמינים שלבש חולצה של הקבוצה האהובה שלך זה יותר מאשר סטייל — זו הצהרה,
              חיבור לקהילה, ולחלק מהרגעים הגדולים בהיסטוריה של הספורט.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-r-4 border-[#D4AF37] pr-4">
              המחויבות לאיכות
            </h2>
            <p>
              כל פריט ב-LEGENDARY KITS עובר סינון קפדני. אנחנו עובדים אך ורק עם חומרי Dry-Fit פרימיום,
              גזרות מדויקות ותגים מובלטים שנשמרים לאורך שנים. אנחנו לא מוכרים מה שלא היינו לובשים בעצמנו.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-r-4 border-[#D4AF37] pr-4">
              קולקציית הרטרו
            </h2>
            <p>
              הגאווה שלנו. קולקציית הרטרו של LEGENDARY KITS מכסה את הרגעים האייקוניים ביותר בכדורגל ובNBA —
              מחולצת זידאן של ריאל מדריד 2002, דרך ה-Invincibles של ארסנל, ועד לגופיית ג׳ורדן של הבולס.
              כל אחת מהן היא חתיכת היסטוריה.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-r-4 border-[#D4AF37] pr-4">
              שירות אישי
            </h2>
            <p>
              אנחנו עסק קטן עם לב גדול. כל הזמנה מטופלת בצורה אישית דרך וואטסאפ.
              אתם מדברים ישירות עם מי שמאחורי המותג — לא עם בוט, לא עם מוקד שירות.
              יש שאלה? יש בעיה? אנחנו כאן.
            </p>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {[
            { icon: "🏆", title: "איכות אגדית", desc: "Dry-Fit פרימיום, גמיש, מנדף זיעה ועמיד לכביסות." },
            { icon: "🚚", title: "משלוח מהיר", desc: "משלוח לכל הארץ תוך 3-5 ימי עסקים." },
            { icon: "💬", title: "שירות אישי", desc: "הזמנה ישירה דרך וואטסאפ — שירות 1-on-1." },
          ].map((v) => (
            <div key={v.title} className="card-carbon rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gold-shine mb-2">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/"
            className="btn-gold inline-block rounded-full px-8 py-4 text-sm uppercase tracking-wider"
          >
            לחנות המלאה
          </Link>
        </div>
      </main>

      <TrustBadges />
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
