import { Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { INSTAGRAM_URL, buildWhatsAppUrl } from "./products";

export function Footer() {
  return (
    <footer id="about" className="border-t border-border bg-[#070707]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="Legendary Kits" className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]/50" />
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black tracking-[0.15em] uppercase">LEGENDARY</span>
              <span className="text-lg font-black tracking-[0.15em] uppercase text-gold-shine">KITS</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            סטייל ספורט אגדי. חולצות כדורגל וגופיות NBA פרימיום, נבחרות בקפידה,
            במחיר ובאיכות שאף אחד לא מציע בישראל.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 grid place-items-center rounded-full border border-border text-foreground/60 hover:text-[#F3CF5D] hover:border-[#D4AF37]/60 transition-colors"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#F3CF5D] mb-4">קולקציות</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/teams/$team" params={{ team: "real-madrid" }} className="hover:text-[#F3CF5D] transition">ריאל מדריד</Link></li>
            <li><Link to="/teams/$team" params={{ team: "barcelona" }} className="hover:text-[#F3CF5D] transition">ברצלונה</Link></li>
            <li><Link to="/teams/$team" params={{ team: "manchester-united" }} className="hover:text-[#F3CF5D] transition">מנצ׳סטר יונייטד</Link></li>
            <li><Link to="/teams/$team" params={{ team: "lakers" }} className="hover:text-[#F3CF5D] transition">לוס אנג׳לס לייקרס</Link></li>
            <li><Link to="/teams/$team" params={{ team: "bulls" }} className="hover:text-[#F3CF5D] transition">שיקגו בולס</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#F3CF5D] mb-4">מידע</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-[#F3CF5D] transition">אודות LEGENDARY KITS</Link></li>
            <li><Link to="/shipping" className="hover:text-[#F3CF5D] transition">משלוחים והחזרות</Link></li>
            <li><Link to="/faq" className="hover:text-[#F3CF5D] transition">שאלות נפוצות</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#F3CF5D] mb-4">צור קשר</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={buildWhatsAppUrl("שלום LEGENDARY KITS!")} target="_blank" rel="noreferrer" className="hover:text-[#F3CF5D] transition">
                וואטסאפ · 050-810-0032
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-[#F3CF5D] transition inline-flex items-center gap-2">
                <Instagram size={13} /> @legendary_kits7
              </a>
            </li>
            <li>משלוחים: בכל רחבי הארץ</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground tracking-widest uppercase">
        © {new Date().getFullYear()} LEGENDARY KITS · Crafted with gold
      </div>
    </footer>
  );
}
