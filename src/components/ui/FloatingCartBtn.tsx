// "use client";

// import { useCart } from "@/context/CartContext";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, ArrowRight } from "lucide-react";

// export default function FloatingCartBtn() {
//   const { cartCount } = useCart(); 
//   const pathname = usePathname();
//   const router = useRouter();

//   // Hide on Cart page, Admin Dashboard, and Login/Signup
//   if (pathname === "/cart" || pathname.startsWith("/admin") || pathname.startsWith("/login")) {
//     return null;
//   }

//   return (
//     <AnimatePresence>
//       {cartCount > 0 && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 100, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             // Updated Shadow Animation to match the Brown (#72514D is approx 114, 81, 77)
//             animate={{ 
//               boxShadow: ["0px 0px 0px rgba(114, 81, 77, 0)", "0px 0px 20px rgba(114, 81, 77, 0.5)", "0px 0px 0px rgba(114, 81, 77, 0)"]
//             }}
//             transition={{ 
//               boxShadow: { duration: 2, repeat: Infinity } 
//             }}
//             onClick={() => router.push("/cart")}
//             // CHANGED: bg-[#D98292] -> bg-[#72514D] (Navbar Brown)
//             // ADDED: hover:bg-[#5e403b] (Darker brown for interaction)
//             className="pointer-events-auto bg-[#72514D] hover:bg-[#5e403b] text-white px-6 py-3 rounded-full shadow-xl flex items-center justify-between gap-6 min-w-[300px] md:min-w-[350px] cursor-pointer border border-white/20 backdrop-blur-sm transition-colors duration-300"
//           >
//             {/* Left: Count & Icon */}
//             <div className="flex items-center gap-2 font-bold">
//               <div className="bg-white/20 p-1.5 rounded-full">
//                 <ShoppingCart size={16} className="text-white" />
//               </div>
//               <span className="text-sm">{cartCount} ITEM{cartCount > 1 ? "S" : ""}</span>
//             </div>

//             {/* Center: Text */}
//             <span className="text-sm font-bold uppercase tracking-wider">View Cart</span>

//             {/* Right: Arrow (Icon color changed to match theme) */}
//             <div className="flex items-center gap-2">
//                <div className="bg-white text-[#72514D] p-1 rounded-full">
//                  <ArrowRight size={14} strokeWidth={3} />
//                </div>
//             </div>
//           </motion.button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }








"use client";

import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function FloatingCartBtn() {
  const { cartCount } = useCart(); 
  const pathname = usePathname();
  const router = useRouter();

  // Hide on Cart page, Admin Dashboard, and Login/Signup
  if (pathname === "/cart" || pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  // Check if we are on a Product Detail Page
  const isProductPage = pathname.startsWith("/product/");

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          // DYNAMIC POSITIONING:
          // If on Product Page -> bottom-28 (Higher to clear buttons)
          // Else -> bottom-6 (Standard position)
          className={`fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${
            isProductPage ? "bottom-24" : "bottom-6"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(114, 81, 77, 0)", "0px 0px 20px rgba(114, 81, 77, 0.5)", "0px 0px 0px rgba(114, 81, 77, 0)"]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity } 
            }}
            onClick={() => router.push("/cart")}
            className="pointer-events-auto bg-[#72514D] hover:bg-[#5e403b] text-white px-6 py-3 rounded-full shadow-xl flex items-center justify-between gap-6 min-w-[300px] md:min-w-[350px] cursor-pointer border border-white/20 backdrop-blur-sm transition-colors duration-300"
          >
            {/* Left: Count & Icon */}
            <div className="flex items-center gap-2 font-bold">
              <div className="bg-white/20 p-1.5 rounded-full">
                <ShoppingCart size={16} className="text-white" />
              </div>
              <span className="text-sm">{cartCount} ITEM{cartCount > 1 ? "S" : ""}</span>
            </div>

            {/* Center: Text */}
            <span className="text-sm font-bold uppercase tracking-wider">View Cart</span>

            {/* Right: Arrow */}
            <div className="flex items-center gap-2">
               <div className="bg-white text-[#72514D] p-1 rounded-full">
                 <ArrowRight size={14} strokeWidth={3} />
               </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}