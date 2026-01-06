import Link from "next/link";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    // Updated: Background #72514D
    <footer className="w-full bg-[#72514D] text-[#F6E5D6] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="font-playfair text-2xl font-bold text-white">Ciste Blasta</h2>
            <p className="text-sm leading-relaxed opacity-90 text-[#F2E3DB]">
              Premium handcrafted chocolates and customized cakes made with love. 
              Bringing sweetness to your special moments since 2016.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Explore</h3>
            <ul className="space-y-2 text-sm opacity-90 text-[#F2E3DB]">
              <li><Link href="/menu" className="hover:text-white transition-colors">Full Menu</Link></li>
              <li><Link href="/custom-cake" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-90 text-[#F2E3DB]">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+91 88284 75854</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>hello@cisteblasta.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/blastaciste" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[#72514D] transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              {/* Add more social icons here if needed */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-xs opacity-60 text-[#F2E3DB]">
          © {new Date().getFullYear()} Ciste Blasta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}