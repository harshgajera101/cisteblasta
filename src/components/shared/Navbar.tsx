// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ShoppingCart, Menu, Search, X, User, LayoutDashboard, Heart } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/context/CartContext";
// import { useSession } from "next-auth/react";

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cartCount } = useCart();
//   const { data: session } = useSession();
//   const pathname = usePathname();

//   const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   const getLoginLink = () => {
//     if (pathname.startsWith("/login") || pathname.startsWith("/signup")) return "/login";
//     return `/login?callbackUrl=${encodeURIComponent(pathname)}`;
//   };

//   const isAdmin = (session?.user as any)?.role === "admin";

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#72514D] text-white shadow-md">
//       <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
//         {/* Logo - Updated Font */}
//         <Link href="/" className="font-gistesy text-4xl tracking-wide hover:text-[#F6E5D6] transition-colors" title="Home">
//           Ciste Blasta
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
//           <Link href="/" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Go to Home">Home</Link>
//           <Link href="/menu" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="View Full Menu">Menu</Link>
//           <Link href="/custom-cake" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Order Custom Cake">Custom Cakes</Link>
//           <Link href="/about" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Read Our Story">Our Story</Link>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-3 md:gap-5">
          
//           {isAdmin && (
//             <Link 
//               href="/admin/dashboard" 
//               className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:text-[#F6E5D6]"
//               title="Admin Dashboard"
//             >
//               <LayoutDashboard className="h-5 w-5" />
//             </Link>
//           )}

//           {/* NEW: Wishlist Icon */}
//           <Link 
//             href={session ? "/wishlist" : getLoginLink()} 
//             className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
//             title="My Wishlist"
//           >
//             <Heart className="h-5 w-5" />
//           </Link>

//           {/* User Profile / Login Icon */}
//           <Link 
//             href={session ? "/profile" : getLoginLink()} 
//             className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
//             title={session ? "My Account" : "Login / Sign Up"}
//           >
//             <User className="h-5 w-5" />
//           </Link>

//           {/* Cart Icon */}
//           <Link href="/cart" className="relative group p-2 hover:bg-white/10 rounded-full transition-colors text-white" title="View Cart">
//             <ShoppingCart className="h-5 w-5" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F6E5D6] text-[10px] font-bold text-[#72514D] flex items-center justify-center shadow-sm">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
          
//           {/* Mobile Toggle */}
//           <button 
//             onClick={toggleMenu}
//             className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
//             title="Open Menu"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>
      
//       {/* Mobile Menu */}
//        <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="md:hidden overflow-hidden bg-[#654642] border-t border-white/10"
//           >
//             <div className="flex flex-col p-6 space-y-4 text-center">
//               <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Home</Link>
//               <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Menu</Link>
//               <Link href="/custom-cake" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Custom Cakes</Link>
//               <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">My Wishlist</Link>
//               <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Our Story</Link>
              
//               {isAdmin && (
//                 <Link 
//                   href="/admin/dashboard" 
//                   onClick={() => setIsMobileMenuOpen(false)} 
//                   className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
//                 >
//                   Admin Dashboard
//                 </Link>
//               )}

//               <Link 
//                 href={session ? "/profile" : getLoginLink()} 
//                 onClick={() => setIsMobileMenuOpen(false)} 
//                 className="text-lg font-bold text-[#F6E5D6] mt-4 border-t border-white/10 pt-4"
//               >
//                 {session ? "My Account" : "Login / Signup"}
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

















"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, X, User, LayoutDashboard, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getLoginLink = () => {
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) return "/login";
    return `/login?callbackUrl=${encodeURIComponent(pathname)}`;
  };

  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#72514D] text-white shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo - Updated Font */}
        <Link href="/" className="font-gistesy text-4xl tracking-wide hover:text-[#F6E5D6] transition-colors" title="Home">
          Ciste Blasta
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Go to Home">Home</Link>
          <Link href="/menu" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="View Full Menu">Menu</Link>
          <Link href="/custom-cake" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Order Custom Cake">Custom Cakes</Link>
          <Link href="/about" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Read Our Story">Our Story</Link>
          <Link href="/contact" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100" title="Contact Us">Contact Us</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {isAdmin && (
            <Link 
              href="/admin/dashboard" 
              className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:text-[#F6E5D6]"
              title="Admin Dashboard"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}

          {/* NEW: Wishlist Icon */}
          <Link 
            href={session ? "/wishlist" : getLoginLink()} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            title="My Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* User Profile / Login Icon */}
          <Link 
            href={session ? "/profile" : getLoginLink()} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            title={session ? "My Account" : "Login / Sign Up"}
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative group p-2 hover:bg-white/10 rounded-full transition-colors text-white" title="View Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F6E5D6] text-[10px] font-bold text-[#72514D] flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            title="Open Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
       <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#654642] border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Home</Link>
              <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Menu</Link>
              <Link href="/custom-cake" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Custom Cakes</Link>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">My Wishlist</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Our Story</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#F6E5D6] transition-colors">Contact Us</Link>
              
              {isAdmin && (
                <Link 
                  href="/admin/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}

              <Link 
                href={session ? "/profile" : getLoginLink()} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-lg font-bold text-[#F6E5D6] mt-4 border-t border-white/10 pt-4"
              >
                {session ? "My Account" : "Login / Signup"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}