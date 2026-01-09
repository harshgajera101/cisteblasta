// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import ProductCard from "@/components/ui/ProductCard";
// import { Heart, Loader2, ArrowRight } from "lucide-react";
// import Link from "next/link";

// export default function WishlistPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [wishlist, setWishlist] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login?callbackUrl=/wishlist");
//     } else if (status === "authenticated") {
//       fetchWishlist();
//     }
//   }, [status, router]);

//   const fetchWishlist = async () => {
//     try {
//       const res = await fetch("/api/user/wishlist");
//       const data = await res.json();
//       if (data.success) {
//         setWishlist(data.wishlist);
//       }
//     } catch (e) {
//       console.error("Failed to load wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#8D6E63] gap-2">
//         <Loader2 className="animate-spin" size={32} />
//         <p className="text-sm font-playfair">Loading your favorites...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] px-4 py-12 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
//           <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#4E342E] flex items-center gap-3">
//            Your Wishlist
//           </h1>
//           <span className="text-[#8D6E63] font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-[#F2E3DB]">
//             {wishlist.length} Items Saved
//           </span>
//         </div>

//         {wishlist.length === 0 ? (
//           <div className="bg-white p-12 rounded-3xl border border-[#F2E3DB] border-dashed text-center max-w-2xl mx-auto mt-10">
//             <div className="w-20 h-20 bg-[#FFF8F3] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D98292]">
//               <Heart size={40} />
//             </div>
//             <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">It's empty here!</h2>
//             <p className="text-[#8D6E63] mb-8">
//               You haven't saved any sweets yet. Go explore our menu and heart your favorites!
//             </p>
//             <Link href="/menu">
//               <button className="px-8 py-3 bg-[#4E342E] text-white rounded-xl font-bold hover:bg-[#3d2924] shadow-lg flex items-center gap-2 mx-auto transition-all hover:scale-105">
//                 Browse Menu <ArrowRight size={18} />
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {wishlist.map((product) => (
//               <ProductCard 
//                 key={product._id} 
//                 product={product} 
//                 isWishlistedInitially={true} // Since we are on wishlist page, it's true
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Heart, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  { id: "ALL", label: "All Favorites" },
  { id: "CAKE", label: "Cakes" },
  { id: "CHOCOLATE", label: "Chocolates" },
  { id: "JAR", label: "Jar Cakes" },
  { id: "GIFT_BOX", label: "Gift Boxes" },
];

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/wishlist");
    } else if (status === "authenticated") {
      fetchWishlist();
    }
  }, [status, router]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/user/wishlist");
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (e) {
      console.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredItems = activeCategory === "ALL" 
    ? wishlist 
    : wishlist.filter(item => item.category === activeCategory);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#8D6E63] gap-2">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-sm font-playfair">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between mb-10 gap-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#4E342E] flex items-center gap-3">
            Your Wishlist
          </h1>
          
          {/* Category Filter Pills (FIXED: Wrapping & No Clipping) */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm
                  ${activeCategory === cat.id 
                    ? "bg-[#D98292] text-white border-[#D98292] shadow-md" 
                    : "bg-white text-[#8D6E63] border-[#F2E3DB] hover:bg-[#FFF8F3] hover:border-[#D98292]/30"}
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#F2E3DB] border-dashed text-center max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-[#FFF8F3] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D98292]">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">It's empty here!</h2>
            <p className="text-[#8D6E63] mb-8">
              You haven't saved any sweets yet. Go explore our menu and heart your favorites!
            </p>
            <Link href="/menu">
              <button className="px-8 py-3 bg-[#4E342E] text-white rounded-xl font-bold hover:bg-[#3d2924] shadow-lg flex items-center gap-2 mx-auto transition-all hover:scale-105">
                Browse Menu <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        ) : (
          /* Products Grid with Animation */
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard 
                      product={product} 
                      isWishlistedInitially={true} 
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-20 text-center text-[#8D6E63]"
                >
                  <p>No favorites found in this category.</p>
                  <button 
                    onClick={() => setActiveCategory("ALL")}
                    className="text-[#D98292] font-bold text-sm mt-2 hover:underline"
                  >
                    View all favorites
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}