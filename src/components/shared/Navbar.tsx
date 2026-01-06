// import Link from "next/link";
// import { ShoppingCart, Menu, Search } from "lucide-react";

// export default function Navbar() {
//   return (
//     // Updated: Background is #72514D, Text is White/Cream for high contrast
//     <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#72514D] text-white shadow-md">
//       <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
//         {/* Logo */}
//         <Link href="/" className="font-playfair text-3xl font-bold tracking-tight hover:text-[#F6E5D6] transition-colors">
//           Ciste Blasta
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
//           <Link href="/" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Home</Link>
//           <Link href="/menu" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Menu</Link>
//           <Link href="/custom-cake" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Custom Cakes</Link>
//           <Link href="/about" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Our Story</Link>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-5">
//           <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white">
//             <Search className="h-5 w-5" />
//           </button>

//           <button className="relative group p-2 hover:bg-white/10 rounded-full transition-colors text-white">
//             <ShoppingCart className="h-5 w-5" />
//             <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F6E5D6] text-[10px] font-bold text-[#72514D] flex items-center justify-center shadow-sm">
//               0
//             </span>
//           </button>
          
//           <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-md">
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }







"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#72514D] text-white shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="font-playfair text-3xl font-bold tracking-tight hover:text-[#F6E5D6] transition-colors">
          Ciste Blasta
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">
            Home
          </Link>
          <Link href="/menu" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">
            Menu
          </Link>
          <Link href="/custom-cake" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">
            Custom Cakes
          </Link>
          <Link href="/about" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">
            Our Story
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <Search className="h-5 w-5" />
          </button>

          <Link href="/cart" className="relative group p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F6E5D6] text-[10px] font-bold text-[#72514D] flex items-center justify-center shadow-sm">
              0
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (AnimatePresence for smooth exit) */}
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
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
              >
                Menu
              </Link>
              <Link 
                href="/custom-cake" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
              >
                Custom Cakes
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-[#F6E5D6] transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}