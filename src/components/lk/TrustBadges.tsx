import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "קנייה בטוחה", text: "תשלום מאובטח · אחריות מלאה על המוצר" },
  { icon: Truck, title: "משלוחים מהירים", text: "שילוח עד הבית בכל הארץ תוך 2–4 ימי עסקים" },
  { icon: Sparkles, title: "איכות פרימיום", text: "בד Dry-Fit · תגים מובלטים · גימור עליון" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.title} className="text-center md:text-right flex md:block flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full grid place-items-center border border-[#D4AF37]/40 text-[#F3CF5D] bg-[#D4AF37]/5">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div className="md:mt-4">
                <div className="font-bold tracking-wide">{b.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}