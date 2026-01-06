import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    // Updated: Background is #72514D, Text is White/Cream for high contrast
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#72514D] text-white shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="font-playfair text-3xl font-bold tracking-tight hover:text-[#F6E5D6] transition-colors">
          Ciste Blasta
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Home</Link>
          <Link href="/menu" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Menu</Link>
          <Link href="/custom-cake" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Custom Cakes</Link>
          <Link href="/about" className="hover:text-[#F6E5D6] transition-colors opacity-90 hover:opacity-100">Our Story</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <Search className="h-5 w-5" />
          </button>

          <button className="relative group p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F6E5D6] text-[10px] font-bold text-[#72514D] flex items-center justify-center shadow-sm">
              0
            </span>
          </button>
          
          <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-md">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}