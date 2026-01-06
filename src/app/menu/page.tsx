// "use client";

// import { useState } from "react";
// import ProductCard from "@/components/ui/ProductCard";
// import { products } from "@/lib/placeholder-data";
// import { motion, AnimatePresence } from "framer-motion";

// const categories = ["All", "Cake", "Chocolate", "Jar"];

// export default function MenuPage() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProducts = activeCategory === "All" 
//     ? products 
//     : products.filter(p => p.category === activeCategory);

//   return (
//     <div className="container mx-auto px-4 py-16 flex-grow">
//       {/* Page Header */}
//       <div className="text-center mb-16 space-y-4">
//         <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground">
//           Our <span className="text-primary italic">Menu</span>
//         </h1>
//         <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
//           Explore our wide range of handcrafted delights. Whether you crave the crunch of Kunafa or the softness of Truffle, we have it all.
//         </p>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex flex-wrap justify-center gap-3 mb-12">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
//               activeCategory === cat
//                 ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
//                 : "bg-white text-foreground border-muted hover:border-primary hover:text-primary"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid with Animation */}
//       <motion.div 
//         layout
//         className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10"
//       >
//         <AnimatePresence mode="popLayout">
//           {filteredProducts.map((product) => (
//             <motion.div
//               key={product.id}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ProductCard 
//                 title={product.name} 
//                 price={`₹${product.price}/-`} 
//                 category={product.category}
//                 className="h-full bg-card hover:shadow-xl transition-all duration-300"
//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
      
//       {/* Empty State */}
//       {filteredProducts.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-xl text-muted-foreground">No delicious items found in this category yet.</p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

// Update the Interface to match the new structure
interface ProductType {
  _id: string;
  name: string;
  basePrice: number;
  category: string;
  variants?: { name: string; price: number }[];
  description?: string;
  isBestSeller?: boolean;
}

const categories = ["All", "CAKE", "CHOCOLATE", "JAR", "GIFT_BOX"];

export default function MenuPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 flex-grow">
      {/* Page Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-[#4E342E]">
          Our <span className="text-[#D98292] italic">Menu</span>
        </h1>
        <p className="text-[#8D6E63] text-lg max-w-xl mx-auto leading-relaxed">
          Explore our wide range of handcrafted delights. From Custom Cakes to Kunafa Bars.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-[#D98292] text-white border-[#D98292] shadow-lg scale-105"
                : "bg-white text-[#4E342E] border-[#F2E3DB] hover:border-[#D98292] hover:text-[#D98292]"
            }`}
          >
            {cat === "GIFT_BOX" ? "Dessert Box" : cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D98292] border-t-transparent" />
        </div>
      ) : (
        /* Product Grid */
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* JUST PASS THE PRODUCT OBJECT NOW */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-[#8D6E63]">No delicious items found in this category yet.</p>
        </div>
      )}
    </div>
  );
}