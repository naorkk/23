import { createFileRoute, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnnouncementBar } from "@/components/lk/AnnouncementBar";
import { Header } from "@/components/lk/Header";
import { Hero } from "@/components/lk/Hero";
import { TrustBadges } from "@/components/lk/TrustBadges";
import { FeaturedCollections } from "@/components/lk/FeaturedCollections";
import { ShopFilters, DEFAULT_FILTERS, type ShopFilterState } from "@/components/lk/ShopFilters";
import { ProductCard } from "@/components/lk/ProductCard";
import { ProductModal } from "@/components/lk/ProductModal";
import { CartDrawer, type CartItem } from "@/components/lk/CartDrawer";
import { WhatsAppFloat } from "@/components/lk/WhatsAppFloat";
import { Footer } from "@/components/lk/Footer";
import { PRODUCTS, TEAMS, type Product } from "@/components/lk/products";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ShopFilterState>(DEFAULT_FILTERS);

  // Sync route search params to shop filters state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sportParam = searchParams.get("sport");
    const nextSport = (sportParam === "football" || sportParam === "nba") ? sportParam : "all";
    if (nextSport !== filters.sport) {
      setFilters((prev) => ({ ...prev, sport: nextSport as "all" | "football" | "nba" }));
    }
  }, [location.search]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [filters]);

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (filters.sport !== "all" && p.category !== filters.sport) return false;
      if (filters.league) {
        const team = TEAMS.find((t) => t.slug === p.teamSlug);
        if (!team || team.league !== filters.league) return false;
      }
      if (filters.team && p.teamSlug !== filters.team) return false;
      if (filters.era !== "all") {
        if (filters.era === "retro" && !p.isRetro) return false;
        else if (filters.era === "modern" && p.isRetro) return false;
        else if (filters.era !== "retro" && filters.era !== "modern" && p.eraPeriod !== filters.era) return false;
      }
      if (p.price > filters.maxPrice) return false;
      return true;
    });

    // Sort to prioritize products with pre-generated high-resolution PNG images
    return [...list].sort((a, b) => {
      const aHasImg = a.image ? 1 : 0;
      const bHasImg = b.image ? 1 : 0;
      return bHasImg - aHasImg;
    });
  }, [filters]);

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

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onShopClick={scrollToShop} />
        <TrustBadges />
        <FeaturedCollections />

        {/* Shop */}
        <section id="shop" className="border-t border-border">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
            <div className="flex flex-col items-center text-center mb-10 md:mb-14">
              <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#F3CF5D] mb-3">The Collection</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.02em]">
                <span className="text-gold-shine">הקולקציה</span> המלאה
              </h2>
              <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
                {PRODUCTS.length} פריטים — חולצות עונה נוכחית וקולקציות רטרו אגדיות.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Sidebar filters (handles both mobile button + desktop sidebar) */}
              <ShopFilters
                filters={filters}
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  navigate({
                    to: "/",
                    search: { sport: newFilters.sport !== "all" ? newFilters.sport : undefined },
                    replace: true,
                  });
                }}
                total={filtered.length}
              />

              {/* Products grid */}
              <div className="flex-1 min-w-0 w-full">
                {filtered.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg font-bold">לא נמצאו פריטים</p>
                    <p className="text-sm mt-2">נסו לשנות את הפילטרים</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div id="football" className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
                      {filtered.slice(0, visibleCount).map((p) => (
                        <ProductCard key={p.id} product={p} onQuickBuy={setActiveProduct} />
                      ))}
                    </div>

                    {filtered.length > visibleCount && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 12)}
                          className="btn-ghost-gold rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md transition-all duration-300"
                        >
                          הצג מוצרים נוספים ({filtered.length - visibleCount} נותרו)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-y border-border bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              לא מתפשרים על <span className="text-gold-shine">סטייל אגדי</span>
            </h3>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              5 הראשונים בלבד — חולצה ב-₪70 במקום ₪150. אחרי שייגמרו, נחזור למחיר המלא.
            </p>
            <button onClick={scrollToShop} className="btn-gold mt-8 rounded-full px-8 py-4 text-sm md:text-base uppercase">
              לתפוס מקום בקולקציה
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onAddToCart={addToCart} />
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
