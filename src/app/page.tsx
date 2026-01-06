"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Star } from "lucide-react";

// Define the Product interface
interface ProductType {
  _id: string;
  name: string;
  price: number;
  category: string;
  isBestSeller: boolean;
  variants?: { price: number }[]; // To handle varied pricing if needed
}

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the Database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter for Best Sellers
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <Hero />
      
      {/* --- BEST SELLERS SECTION --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">Trending Now</h2>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-10">
             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
             {bestSellers.map((product) => (
               <ProductCard 
                 key={product._id}
                 title={product.name} 
                 // Use the first variant price if basePrice is missing, or default to 0
                 price={`₹${product.price || (product.variants && product.variants[0]?.price) || 0}/-`} 
                 category={product.category} 
                 className="h-full"
               />
             ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/menu" className="inline-block border-b-2 border-primary text-primary font-bold hover:text-primary/80 transition-colors pb-1">
            View All Products
          </Link>
        </div>
      </section>

      {/* --- USP / TRUST SECTION --- */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-3">100% Homemade</h3>
                <p className="opacity-90">No preservatives, no chemicals. Just pure, home-baked love in every bite.</p>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-white/20">
                <h3 className="font-playfair text-2xl font-bold mb-3">Premium Ingredients</h3>
                <p className="opacity-90">We use high-quality chocolates, fresh fruits, and authentic pistachios.</p>
            </div>
            <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-3">Custom Designs</h3>
                <p className="opacity-90">From realistic designs to luxury wedding cakes, we bake your imagination.</p>
            </div>
        </div>
      </section>

      {/* --- CUSTOM CAKE BANNER --- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-[#72514D] text-[#FFF8F3] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="md:w-1/2 space-y-6 z-10">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold">Dreaming of a Unique Cake?</h2>
                <p className="text-lg opacity-90 max-w-md">
                   Weddings, birthdays, or just because—we bring your vision to life. 
                   Send us your reference photos and let's bake magic.
                </p>
                <Link 
                  href="/custom-cake"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-background text-[#72514D] px-8 text-base font-bold shadow-lg hover:bg-white transition-all"
                >
                  Start Your Design
                </Link>
             </div>
             {/* Decorative Circle */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold text-foreground">Sweet Words</h2>
              <p className="text-muted-foreground mt-2">What our customers are saying</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border border-border">
                   <div className="flex gap-1 mb-4 text-primary">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-foreground/80 italic mb-6">
                     "Absolutely loved the Kunafa chocolate! It was crunchy, creamy, and not too sweet. Best I've had in Mumbai."
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                        SJ
                      </div>
                      <div>
                        <p className="font-bold text-sm">Sneha J.</p>
                        <p className="text-xs text-muted-foreground">Ordered Kunafa Bar</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}