import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/lk/AnnouncementBar";
import { Header } from "@/components/lk/Header";
import { Footer } from "@/components/lk/Footer";
import { ProductCard } from "@/components/lk/ProductCard";
import { ProductModal } from "@/components/lk/ProductModal";
import { CartDrawer, type CartItem } from "@/components/lk/CartDrawer";
import { WhatsAppFloat } from "@/components/lk/WhatsAppFloat";
import { TeamCrest } from "@/components/lk/TeamCrest";
import { PRODUCTS, TEAMS, type Product } from "@/components/lk/products";

export const Route = createFileRoute("/teams/$team")({
  component: TeamPage,
});

function TeamPage() {
  const { team: teamSlug } = Route.useParams();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showRetro, setShowRetro] = useState<boolean | null>(null);

  const teamInfo = TEAMS.find((t) => t.slug === teamSlug);
  const allProducts = PRODUCTS.filter((p) => p.teamSlug === teamSlug);
  const currentProducts = allProducts.filter((p) => !p.isRetro);
  const retroProducts = allProducts.filter((p) => p.isRetro);

  const filtered =
    showRetro === null
      ? allProducts
      : showRetro
      ? retroProducts
      : currentProducts;

  const addToCart = (product: Product, size: string, qty: number = 1) => {
    setCart((c) => {
      const idx = c.findIndex((i) => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...c, { product, size, qty }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (idx: number, qty: number) => {
    setCart((c) => {
      if (qty <= 0) {
        return c.filter((_, i) => i !== idx);
      }
      const next = [...c];
      next[idx] = { ...next[idx], qty };
      return next;
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (!teamInfo) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">קבוצה לא נמצאה</h1>
          <Link to="/" className="text-[#F3CF5D] hover:underline">← חזרה לחנות</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        {/* Team Hero */}
        <section className="relative overflow-hidden">
          {teamInfo.image && (
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url(${teamInfo.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }}
              aria-hidden
            />
          )}
          {!teamInfo.image && (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${teamInfo.primaryColor} 0%, transparent 70%)` }}
              aria-hidden
            />
          )}
          <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-[#F3CF5D] transition-colors mb-8 uppercase tracking-widest"
            >
              <ArrowRight size={13} />
              כל הקולקציות
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <TeamCrest
                team={teamInfo}
                size={80}
                className="w-16 h-16 md:w-20 md:h-20 border border-border p-2 bg-[#0a0a0a]/50 rounded-xl"
              />
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#F3CF5D] mb-1">
                  {teamInfo.league} · {teamInfo.category === "football" ? "Football" : "NBA"}
                </p>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gold-shine">
                  {teamInfo.nameHe}
                </h1>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              {teamInfo.description}
            </p>

            {/* Filter tabs */}
            <div className="flex gap-2 mt-8 flex-wrap">
              {[
                { label: "הכל", value: null },
                { label: "עונה נוכחית", value: false },
                { label: "רטרו קלאסיק", value: true },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => setShowRetro(value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                    showRetro === value
                      ? "border-transparent text-black"
                      : "border-border text-foreground/70 hover:border-[#D4AF37]/60 hover:text-[#F3CF5D]"
                  }`}
                  style={
                    showRetro === value
                      ? { background: "linear-gradient(135deg,#D4AF37,#F3CF5D)" }
                      : undefined
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>אין מוצרים בקטגוריה זו כרגע.</p>
            </div>
          ) : (
            <>
              {/* Current season */}
              {(showRetro === null || showRetro === false) && currentProducts.length > 0 && (
                <div className="mb-12">
                  {showRetro === null && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">עונה נוכחית</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {currentProducts.map((p) => (
                      <ProductCard key={p.id} product={p} onQuickBuy={setActiveProduct} />
                    ))}
                  </div>
                </div>
              )}

              {/* Retro editions */}
              {(showRetro === null || showRetro === true) && retroProducts.length > 0 && (
                <div>
                  {showRetro === null && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">רטרו קלאסיק</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {retroProducts.map((p) => (
                      <ProductCard key={p.id} product={p} onQuickBuy={setActiveProduct} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(idx) => setCart((c) => c.filter((_, i) => i !== idx))}
        onClear={() => setCart([])}
        onUpdateQty={updateCartQty}
      />
    </div>
  );
}
