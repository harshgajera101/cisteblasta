// "use client";

// import { useState, useEffect } from "react";
// import { ShoppingCart, Heart, Check } from "lucide-react"; 
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { useCart } from "@/context/CartContext"; 
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Toast } from "@/components/ui/Toast";

// interface Variant {
//   name: string;
//   price: number;
// }

// interface Product {
//   _id: string;
//   name: string;
//   basePrice: number;
//   category: string;
//   variants?: Variant[];
//   images?: string[];
// }

// interface ProductCardProps {
//   product: Product;
//   className?: string;
//   isWishlistedInitially?: boolean;
// }

// export default function ProductCard({ product, className, isWishlistedInitially = false }: ProductCardProps) {
//   const { addToCart } = useCart(); 
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
//   const [isAdded, setIsAdded] = useState(false); 
//   const [isLiked, setIsLiked] = useState(isWishlistedInitially);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

//   const hasVariants = product.variants && product.variants.length > 0;
  
//   const activePrice = hasVariants 
//     ? product.variants![selectedVariantIdx].price 
//     : product.basePrice;

//   const displayImage = product.images && product.images.length > 0 ? product.images[0] : null;

//   useEffect(() => {
//     setIsLiked(isWishlistedInitially);
//   }, [isWishlistedInitially]);

//   const handleAddToCart = () => {
//     addToCart(product, selectedVariantIdx);
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 800);
//   };

//   const toggleWishlist = async () => {
//     // 1. Auth Guard
//     if (!session) {
//       setToast({ show: true, message: "Please login to save favorites!", type: "error" });
//       setTimeout(() => router.push(`/login?callbackUrl=/menu`), 1500);
//       return;
//     }

//     // 2. Optimistic UI Update
//     const newState = !isLiked;
//     setIsLiked(newState);

//     // 3. Feedback Logic (The 0.8s Alert)
//     if (newState) {
//       setToast({ show: true, message: "Successfully Wishlisted!", type: "success" });
//       setTimeout(() => setToast(prev => ({ ...prev, show: false })), 800);
//     } else {
//       setToast({ show: true, message: "Removed from Wishlist", type: "success" });
//       setTimeout(() => setToast(prev => ({ ...prev, show: false })), 800);
//     }

//     // 4. API Call
//     try {
//       const res = await fetch("/api/user/wishlist", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId: product._id }),
//       });
      
//       const data = await res.json();
//       if (!data.success) {
//         setIsLiked(!newState); // Revert on error
//         setToast({ show: true, message: "Failed to update wishlist", type: "error" });
//       }
//     } catch (error) {
//       setIsLiked(!newState);
//       setToast({ show: true, message: "Something went wrong", type: "error" });
//     }
//   };

//   return (
//     <>
//     <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
    
//     <div className={cn("group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-[#F2E3DB] transition-all duration-500 hover:shadow-xl hover:-translate-y-1", className)}>
      
//       {/* 1. Image Section */}
//       <div className="relative aspect-square w-full overflow-hidden bg-[#FFF8F3]">
//          {displayImage ? (
//            <img 
//              src={displayImage} 
//              alt={product.name} 
//              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//            />
//          ) : (
//            <div className="absolute inset-0 flex items-center justify-center text-[#D98292]/30 font-playfair text-4xl font-bold opacity-20">
//               {product.name.charAt(0)}
//            </div>
//          )}
         
//          <div className="absolute top-3 left-3 flex gap-2">
//             <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4E342E] shadow-sm backdrop-blur-sm">
//               {product.category === "GIFT_BOX" ? "Box" : product.category}
//             </span>
//          </div>

//          {/* Wishlist Button */}
//          <button 
//            onClick={toggleWishlist}
//            className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-[#D98292] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
//            title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
//          >
//            <Heart size={16} className={cn("transition-all duration-300", isLiked ? "fill-[#D98292]" : "fill-transparent")} />
//          </button>
//       </div>

//       {/* 2. Content Section */}
//       <div className="flex flex-1 flex-col p-5">
//         <h3 className="mb-1 font-playfair text-lg font-bold text-[#4E342E] group-hover:text-[#D98292] transition-colors duration-300 line-clamp-1">
//           {product.name}
//         </h3>
        
//         <div className="mt-4 flex items-center justify-between gap-3">
//           <div className="flex flex-col">
//             <span className="text-xs text-[#8D6E63] font-medium">Price</span>
//             <span className="font-bold text-xl text-[#4E342E]">
//               ₹{activePrice}
//             </span>
//           </div>

//           {hasVariants ? (
//             <div className="flex flex-col items-end">
//               <span className="text-xs text-[#8D6E63] font-medium mb-1">Size / Weight</span>
//               <select 
//                 value={selectedVariantIdx}
//                 onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
//                 className="h-9 w-28 rounded-lg border border-[#F2E3DB] bg-[#FFF8F3] px-2 text-xs font-bold text-[#4E342E] focus:border-[#D98292] focus:outline-none cursor-pointer hover:border-[#D98292] transition-colors"
//               >
//                 {product.variants!.map((variant, idx) => (
//                   <option key={idx} value={idx}>
//                     {variant.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div className="flex flex-col items-end">
//                <span className="text-xs text-[#8D6E63] font-medium">Unit</span>
//                <span className="text-sm font-bold text-[#4E342E] h-9 flex items-center">
//                  Standard
//                </span>
//             </div>
//           )}
//         </div>

//         <motion.button 
//           whileTap={{ scale: 0.95 }}
//           onClick={handleAddToCart}
//           disabled={isAdded}
//           className={cn(
//             "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all duration-300 ease-in-out",
//             isAdded ? "bg-[#4E342E]" : "bg-[#D98292] hover:bg-[#c46b7d] hover:shadow-lg"
//           )}
//         >
//           {isAdded ? (
//             <> <Check size={18} /> Added </>
//           ) : (
//             <> <ShoppingCart size={18} /> Add to Cart </>
//           )}
//         </motion.button>
//       </div>
//     </div>
//     </>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Check } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast";

interface Variant {
  name: string;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  basePrice: number;
  category: string;
  variants?: Variant[];
  images?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
  isWishlistedInitially?: boolean;
}

export default function ProductCard({ product, className, isWishlistedInitially = false }: ProductCardProps) {
  const { addToCart } = useCart(); 
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false); 
  const [isLiked, setIsLiked] = useState(isWishlistedInitially);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

  const hasVariants = product.variants && product.variants.length > 0;
  
  const activePrice = hasVariants 
    ? product.variants![selectedVariantIdx].price 
    : product.basePrice;

  const displayImage = product.images && product.images.length > 0 ? product.images[0] : null;

  useEffect(() => {
    setIsLiked(isWishlistedInitially);
  }, [isWishlistedInitially]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link Navigation
    e.stopPropagation(); // Stop bubble up

    addToCart(product, selectedVariantIdx);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link Navigation
    e.stopPropagation();

    if (!session) {
      setToast({ show: true, message: "Please login to save favorites!", type: "error" });
      setTimeout(() => router.push(`/login?callbackUrl=/menu`), 1500);
      return;
    }

    const newState = !isLiked;
    setIsLiked(newState);

    if (newState) {
      setToast({ show: true, message: "Successfully Wishlisted!", type: "success" });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 1000);
    } else {
      setToast({ show: true, message: "Removed from Wishlist", type: "success" });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 1000);
    }

    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      
      const data = await res.json();
      if (!data.success) {
        setIsLiked(!newState);
        setToast({ show: true, message: "Failed to update wishlist", type: "error" });
      }
    } catch (error) {
      setIsLiked(!newState);
      setToast({ show: true, message: "Something went wrong", type: "error" });
    }
  };

  return (
    <>
    <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
    
    <div className={cn("group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-[#F2E3DB] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full", className)}>
      
      {/* 1. Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF8F3]">
         {displayImage ? (
           <img 
             src={displayImage} 
             alt={product.name} 
             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
           />
         ) : (
           <div className="absolute inset-0 flex items-center justify-center text-[#D98292]/30 font-playfair text-4xl font-bold opacity-20">
              {product.name.charAt(0)}
           </div>
         )}
         
         <div className="absolute top-3 left-3 flex gap-2">
            <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4E342E] shadow-sm backdrop-blur-sm">
              {product.category === "GIFT_BOX" ? "Box" : product.category}
            </span>
         </div>

         {/* Wishlist Button (Stop Propagation) */}
         <button 
           onClick={toggleWishlist}
           className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-[#D98292] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 z-20"
           title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
         >
           <Heart size={16} className={cn("transition-all duration-300", isLiked ? "fill-[#D98292]" : "fill-transparent")} />
         </button>
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-playfair text-lg font-bold text-[#4E342E] group-hover:text-[#D98292] transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-[#8D6E63] font-medium">Price</span>
            <span className="font-bold text-xl text-[#4E342E]">
              ₹{activePrice}
            </span>
          </div>

          {hasVariants ? (
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#8D6E63] font-medium mb-1">Size / Weight</span>
              <select 
                value={selectedVariantIdx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} // Stop Prop on Click
                onChange={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedVariantIdx(Number(e.target.value)); }} // Stop Prop on Change
                className="h-9 w-28 rounded-lg border border-[#F2E3DB] bg-[#FFF8F3] px-2 text-xs font-bold text-[#4E342E] focus:border-[#D98292] focus:outline-none cursor-pointer hover:border-[#D98292] transition-colors z-20 relative"
              >
                {product.variants!.map((variant, idx) => (
                  <option key={idx} value={idx}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col items-end">
               <span className="text-xs text-[#8D6E63] font-medium">Unit</span>
               <span className="text-sm font-bold text-[#4E342E] h-9 flex items-center">
                 Standard
               </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button (Stop Propagation) */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isAdded}
          className={cn(
            "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all duration-300 ease-in-out z-20 relative",
            isAdded ? "bg-[#4E342E]" : "bg-[#D98292] hover:bg-[#c46b7d] hover:shadow-lg"
          )}
        >
          {isAdded ? (
            <> <Check size={18} /> Added </>
          ) : (
            <> <ShoppingCart size={18} /> Add to Cart </>
          )}
        </motion.button>
      </div>
    </div>
    </>
  );
}