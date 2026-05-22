import { TEAMS, type Product } from "./products";
import { JerseyMockup } from "./JerseyMockup";

export function ProductCard({
  product,
  onQuickBuy,
}: {
  product: Product;
  onQuickBuy: (p: Product) => void;
}) {
  const team = TEAMS.find((t) => t.slug === product.teamSlug);

  return (
    <article 
      onClick={() => onQuickBuy(product)}
      className="group card-carbon rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 active:scale-[0.98]"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={800}
            height={800}
            className="zoom-img w-full h-full object-cover"
          />
        ) : (
          <JerseyMockup
            team={team}
            product={product}
            view="front"
            className="w-full h-full object-cover zoom-img"
          />
        )}

        {/* Badge */}
        <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3">
          <div
            className="text-[8px] md:text-[10px] tracking-[0.25em] uppercase font-black px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-black"
            style={{ background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" }}
          >
            {product.badge ?? "מבצע השקה"}
          </div>
        </div>
        {/* Category tag */}
        <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/70 bg-black/60 backdrop-blur px-2 py-0.5 md:px-2.5 md:py-1 rounded-sm border border-border">
          {product.categoryLabel}
        </div>

        {/* Custom Print Badge */}
        {!product.image && (
          <div className="absolute bottom-2.5 right-2.5 md:bottom-3 md:right-3 text-[8px] md:text-[9px] tracking-wider font-black px-2 py-0.5 md:px-2.5 md:py-1 rounded-sm bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)] z-10">
            ✨ הדפסה אישית חינם
          </div>
        )}

        {/* Quick buy - Desktop Only */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block">
          <button
            type="button"
            className="btn-gold w-full rounded-full py-3 text-sm uppercase tracking-wider"
          >
            לרכישה מהירה
          </button>
        </div>
      </div>

      <div className="p-3 md:p-5 flex flex-col justify-between flex-1 gap-2">
        <div>
          <h3 className="font-bold text-xs md:text-base leading-snug text-foreground group-hover:text-[#F3CF5D] transition-colors line-clamp-2">
            {product.title}
          </h3>
          {product.era && (
            <p className="text-[9px] md:text-[10px] text-[#D4AF37] tracking-widest uppercase mt-0.5">{product.era}</p>
          )}
          <p className="text-[10px] md:text-xs text-muted-foreground tracking-wider mt-0.5 uppercase">{product.team}</p>
        </div>
        <div className="flex items-baseline justify-between pt-1.5 border-t border-white/[0.04] mt-auto">
          <div className="text-sm md:text-lg font-black text-gold-shine leading-none">₪{product.price}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground line-through">₪{product.originalPrice}</div>
        </div>
      </div>
    </article>
  );
}
