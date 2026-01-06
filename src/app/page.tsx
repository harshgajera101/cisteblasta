import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/placeholder-data"; 
import Footer from "@/components/shared/Footer";

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />
      
      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
           {bestSellers.map((product) => (
             <ProductCard 
               key={product.id}
               title={product.name} 
               price={`₹${product.price}/-`} 
               category={product.category} 
               className="h-full"
             />
           ))}
        </div>
      </section>

      {/* Trust/USP Section */}
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

      <Footer/>
    </main>
  );
}