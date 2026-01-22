// "use client";

// import { useState, useEffect } from "react";
// import Hero from "@/components/shared/Hero";
// import ProductCard from "@/components/ui/ProductCard";
// import Link from "next/link";
// import { Star, ArrowRight } from "lucide-react";

// interface ProductType {
//   _id: string;
//   name: string;
//   basePrice: number;
//   category: string;
//   variants?: { name: string; price: number }[];
//   isBestSeller?: boolean;
//   averageRating?: number;
//   reviewsCount?: number; 
//   soldCount?: number; 
//   createdAt?: string;    
// }

// export default function Home() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Failed to load products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // --- FILTER LOGIC (Removed Trending) ---
  
//   // 1. Top Rated Products
//   const topRatedProducts = [...products]
//     .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
//     .slice(0, 4);

//   // 2. Most Ordered (Highest Sold Count)
//   const mostOrderedProducts = [...products]
//     .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
//     .slice(0, 4);

//   return (
//     <>
//       <Hero />
      
//       {/* --- SECTION 1: TOP RATED PRODUCTS --- */}
//       <section className="container mx-auto px-4 py-16 md:py-20">
//         <div className="text-center mb-12 space-y-2">
//           <span className="text-[#8D6E63] font-bold uppercase tracking-widest text-sm">Five Star Delights</span>
//           <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E]">Top Rated Products</h2>
//         </div>
        
//         {loading ? (
//            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D98292]"></div></div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//              {topRatedProducts.map((product) => (
//                <Link href={`/product/${product._id}`} key={product._id} className="block h-full group">
//                  <ProductCard product={product} />
//                </Link>
//              ))}
//           </div>
//         )}
//       </section>

//       {/* --- SECTION 2: MOST ORDERED PRODUCTS --- */}
//       <section className="container mx-auto px-4 py-8 md:py-12">
//         <div className="text-center mb-12 space-y-2">
//           <span className="text-[#8D6E63] font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
//           <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E]">Most Ordered Products</h2>
//         </div>
        
//         {loading ? (
//            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D98292]"></div></div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//              {mostOrderedProducts.map((product) => (
//                <Link href={`/product/${product._id}`} key={product._id} className="block h-full group">
//                  <ProductCard product={product} />
//                </Link>
//              ))}
//           </div>
//         )}
        
//         {/* VIEW ALL BUTTON */}
//         <div className="mt-16 text-center">
//           <Link href="/menu" className="inline-flex items-center gap-2 border-b-2 border-[#D98292] text-[#D98292] font-bold hover:text-[#D98292]/80 transition-colors pb-1 text-lg">
//             View All Products <ArrowRight size={20} />
//           </Link>
//         </div>
//       </section>

//       {/* --- USP / TRUST SECTION --- */}
//       <section className="bg-[#D98292] py-16 text-white">
//         <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
//             <div className="p-6">
//                 <h3 className="font-playfair text-2xl font-bold mb-3">100% Homemade</h3>
//                 <p className="opacity-90">No preservatives, no chemicals. Just pure, home-baked love in every bite.</p>
//             </div>
//             <div className="p-6 border-y md:border-y-0 md:border-x border-white/20">
//                 <h3 className="font-playfair text-2xl font-bold mb-3">Premium Ingredients</h3>
//                 <p className="opacity-90">We use high-quality chocolates, fresh fruits, and authentic pistachios.</p>
//             </div>
//             <div className="p-6">
//                 <h3 className="font-playfair text-2xl font-bold mb-3">Custom Designs</h3>
//                 <p className="opacity-90">From realistic designs to luxury wedding cakes, we bake your imagination.</p>
//             </div>
//         </div>
//       </section>

//       {/* --- CUSTOM CAKE BANNER --- */}
//       <section className="py-20 bg-[#FFF8F3]">
//         <div className="container mx-auto px-4">
//           <div className="relative overflow-hidden rounded-3xl bg-[#72514D] text-[#FFF8F3] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
//              <div className="md:w-1/2 space-y-6 z-10">
//                 <h2 className="font-playfair text-4xl md:text-5xl font-bold">Dreaming of a Unique Cake?</h2>
//                 <p className="text-lg opacity-90 max-w-md">
//                    Weddings, birthdays, or just because—we bring your vision to life. 
//                    Send us your reference photos and let's bake magic.
//                 </p>
//                 <Link 
//                   href="/custom-cake"
//                   className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FFF8F3] text-[#72514D] px-8 text-base font-bold shadow-lg hover:bg-white transition-all"
//                 >
//                   Start Your Design
//                 </Link>
//              </div>
//              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//           </div>
//         </div>
//       </section>

//       {/* --- TESTIMONIALS --- */}
//       <section className="bg-[#F2E3DB]/30 py-20">
//         <div className="container mx-auto px-4">
//            <div className="text-center mb-12">
//               <h2 className="font-playfair text-4xl font-bold text-[#4E342E]">Sweet Words</h2>
//               <p className="text-[#8D6E63] mt-2">What our customers are saying</p>
//            </div>
           
//            <div className="grid md:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#F2E3DB]">
//                    <div className="flex gap-1 mb-4 text-[#D98292]">
//                       {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
//                    </div>
//                    <p className="text-[#4E342E]/80 italic mb-6">
//                      "Absolutely loved the Kunafa chocolate! It was crunchy, creamy, and not too sweet. Best I've had in Mumbai."
//                    </p>
//                    <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-[#F2E3DB] flex items-center justify-center font-bold text-[#8D6E63]">
//                         SJ
//                       </div>
//                       <div>
//                         <p className="font-bold text-sm text-[#4E342E]">Sneha J.</p>
//                         <p className="text-xs text-[#8D6E63]">Ordered Kunafa Bar</p>
//                       </div>
//                    </div>
//                 </div>
//               ))}
//            </div>
//         </div>
//       </section>
//     </>
//   );
// }















"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/shared/Hero";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA TYPES ---
interface ProductType {
  _id: string;
  name: string;
  basePrice: number;
  category: string;
  variants?: { name: string; price: number }[];
  isBestSeller?: boolean;
  averageRating?: number;
  reviewsCount?: number; 
  soldCount?: number; 
  createdAt?: string;    
}

// --- MOCK REVIEWS DATA ---
const REVIEWS = [
  {
    id: 1,
    name: "Sneha J.",
    item: "Kunafa Bar",
    text: "Absolutely loved the Kunafa chocolate! It was crunchy, creamy, and not too sweet. Best I've had in Mumbai.",
    initials: "SJ"
  },
  {
    id: 2,
    name: "Rahul M.",
    item: "Truffle Cake",
    text: "Ordered this for my mom's birthday. The texture was so rich and moist. Everyone asked where I got it from!",
    initials: "RM"
  },
  {
    id: 3,
    name: "Priya S.",
    item: "Gift Hamper",
    text: "The packaging was exquisite. A perfect gift for Diwali. The assorted chocolates were fresh and delicious.",
    initials: "PS"
  },
  {
    id: 4,
    name: "Amit K.",
    item: "Red Velvet",
    text: "I am usually critical about Red Velvet, but this one nailed the cream cheese frosting. Highly recommended!",
    initials: "AK"
  },
  {
    id: 5,
    name: "Anjali R.",
    item: "Jar Cakes",
    text: "These jars are pure happiness! Perfect portion size and easy to carry. My kids loved the chocolate fudge.",
    initials: "AR"
  }
];

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // --- CAROUSEL STATE ---
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Fetch Products
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

  // 2. Handle Screen Resize for 3D Logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Auto Rotate Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  // --- FILTER LOGIC ---
  const topRatedProducts = [...products]
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 4);

  const mostOrderedProducts = [...products]
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  // --- 3D CAROUSEL HELPER ---
  const getCardStyle = (index: number) => {
    const total = REVIEWS.length;
    let diff = (index - currentReviewIndex + total) % total;
    
    if (diff === total - 1) diff = -1;
    if (diff === total - 2) diff = -2; 
    if (diff === 2) diff = 2; 

    // --- CONFIGURATION ---
    // Mobile: 85% (Peeking nicely)
    // Desktop: 80% (Reduced from 125% to bring them closer and fit screen)
    const X_OFFSET = isMobile ? "85%" : "80%"; 
    
    // CENTER CARD
    if (diff === 0) {
      return {
        zIndex: 30,
        opacity: 1,
        scale: isMobile ? 1.05 : 1.15, 
        x: "0%",
        blur: "0px",
        rotateY: 0,
        cursor: "default"
      };
    }
    
    // RIGHT CARD
    if (diff === 1) {
      return {
        zIndex: 20,
        opacity: 0.7,
        scale: isMobile ? 0.85 : 0.9,
        x: X_OFFSET, 
        blur: "3px",
        rotateY: -10,
        cursor: "pointer"
      };
    }
    
    // LEFT CARD
    if (diff === -1) {
      return {
        zIndex: 20,
        opacity: 0.7,
        scale: isMobile ? 0.85 : 0.9,
        x: `-${X_OFFSET}`, 
        blur: "3px",
        rotateY: 10,
        cursor: "pointer"
      };
    }

    // BACK/HIDDEN CARDS
    return {
      zIndex: 10,
      opacity: 0,
      scale: 0.5,
      x: "0%",
      blur: "20px",
      rotateY: 0,
      cursor: "default"
    };
  };

  return (
    <>
      <Hero />
      
      {/* --- SECTION 1: TOP RATED PRODUCTS --- */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[#8D6E63] font-bold uppercase tracking-widest text-sm">Five Star Delights</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E]">Top Rated Products</h2>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D98292]"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {topRatedProducts.map((product) => (
               <Link href={`/product/${product._id}`} key={product._id} className="block h-full group">
                 <ProductCard product={product} />
               </Link>
             ))}
          </div>
        )}
      </section>

      {/* --- SECTION 2: MOST ORDERED PRODUCTS --- */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[#8D6E63] font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#4E342E]">Most Ordered Products</h2>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D98292]"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {mostOrderedProducts.map((product) => (
               <Link href={`/product/${product._id}`} key={product._id} className="block h-full group">
                 <ProductCard product={product} />
               </Link>
             ))}
          </div>
        )}
        
        {/* VIEW ALL BUTTON */}
        <div className="mt-16 text-center">
          <Link href="/menu" className="inline-flex items-center gap-2 border-b-2 border-[#D98292] text-[#D98292] font-bold hover:text-[#D98292]/80 transition-colors pb-1 text-lg">
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* --- USP / TRUST SECTION --- */}
      <section className="bg-[#D98292] py-16 text-white">
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
      <section className="py-20 bg-[#FFF8F3]">
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
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FFF8F3] text-[#72514D] px-8 text-base font-bold shadow-lg hover:bg-white transition-all"
                >
                  Start Your Design
                </Link>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* --- NEW: WIDE 3D REVIEW CAROUSEL --- */}
      <section className="bg-[#F2E3DB]/30 py-24 overflow-hidden">
        
        {/* Container for Desktop */}
        <div className="w-full max-w-[95%] md:max-w-6xl mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl font-bold text-[#4E342E]">Sweet Words</h2>
              <p className="text-[#8D6E63] mt-2">What our customers are saying</p>
           </div>
           
           {/* Carousel Container */}
           <div className="relative h-[320px] md:h-[400px] w-full flex justify-center items-center perspective-1000">
              <AnimatePresence initial={false}>
                {REVIEWS.map((review, index) => {
                  const style = getCardStyle(index);
                  
                  return (
                    <motion.div
                      key={review.id}
                      initial={style}
                      animate={{
                        ...style,
                        filter: `blur(${style.blur})`, 
                      }}
                      transition={{ duration: 0.7, ease: "anticipate" }} // Smooth "pop" animation
                      onClick={() => setCurrentReviewIndex(index)}
                      className="absolute bg-white p-8 rounded-3xl shadow-2xl border border-[#F2E3DB] flex flex-col justify-between select-none"
                      style={{
                        // Responsive Widths
                        width: isMobile ? "260px" : "500px", 
                        height: isMobile ? "280px" : "320px",
                        zIndex: style.zIndex,
                        transformOrigin: "center center",
                        cursor: style.cursor
                      }}
                    >
                       <div>
                         <div className="flex gap-1 mb-4 text-[#D98292]">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                         </div>
                         <p className="text-[#4E342E]/90 italic mb-6 leading-relaxed text-sm md:text-lg font-medium">
                           "{review.text}"
                         </p>
                       </div>
                       <div className="flex items-center gap-4 mt-auto">
                          <div className="w-12 h-12 rounded-full bg-[#F2E3DB] flex items-center justify-center font-bold text-[#8D6E63] shrink-0 text-lg">
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-bold text-base md:text-lg text-[#4E342E]">{review.name}</p>
                            <p className="text-xs md:text-sm text-[#8D6E63]">{review.item}</p>
                          </div>
                       </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
           </div>
           
           {/* Carousel Indicators */}
           <div className="flex justify-center gap-2 mt-10">
             {REVIEWS.map((_, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setCurrentReviewIndex(idx)}
                 className={`h-2 rounded-full transition-all duration-300 ${idx === currentReviewIndex ? "w-8 bg-[#D98292]" : "w-2 bg-[#D98292]/30"}`}
               />
             ))}
           </div>

        </div>
      </section>
    </>
  );
}