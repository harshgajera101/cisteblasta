// import Link from "next/link";
// import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="w-full bg-[#72514D] text-[#FFF8F3] pt-16 pb-8 border-t border-white/10">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
//           {/* 1. Brand Section */}
//           <div className="space-y-4">
//             <Link href="/" className="font-playfair text-3xl font-bold tracking-tight text-white">
//               Ciste Blasta
//             </Link>
//             <p className="text-sm leading-relaxed opacity-90 max-w-xs">
//               Handcrafted with love and premium ingredients. We bring sweetness to your celebrations with our custom cakes and artisanal chocolates.
//             </p>
//             <div className="flex gap-4 pt-2">
//               <SocialIcon icon={<Instagram className="h-5 w-5" />} href="https://www.instagram.com/blastaciste/" />
//               <SocialIcon icon={<Facebook className="h-5 w-5" />} href="#" />
//               <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
//             </div>
//           </div>

//           {/* 2. Quick Links */}
//           <div>
//             <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
//             <ul className="space-y-3 text-sm opacity-90">
//               <li><Link href="/" className="hover:text-white hover:underline underline-offset-4 transition-all">Home</Link></li>
//               <li><Link href="/about" className="hover:text-white hover:underline underline-offset-4 transition-all">Our Story</Link></li>
//               <li><Link href="/menu" className="hover:text-white hover:underline underline-offset-4 transition-all">Full Menu</Link></li>
//               <li><Link href="/contact" className="hover:text-white hover:underline underline-offset-4 transition-all">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* 3. Categories (Standard Footer Feature) */}
//           <div>
//             <h3 className="font-bold text-white text-lg mb-4">Our Delights</h3>
//             <ul className="space-y-3 text-sm opacity-90">
//               <li><Link href="/menu?cat=cake" className="hover:text-white hover:underline underline-offset-4 transition-all">Custom Cakes</Link></li>
//               <li><Link href="/menu?cat=chocolate" className="hover:text-white hover:underline underline-offset-4 transition-all">Kunafa Chocolates</Link></li>
//               <li><Link href="/menu?cat=jar" className="hover:text-white hover:underline underline-offset-4 transition-all">Cake Jars</Link></li>
//               <li><Link href="/menu?cat=hampers" className="hover:text-white hover:underline underline-offset-4 transition-all">Gift Hampers</Link></li>
//             </ul>
//           </div>

//           {/* 4. Contact Info */}
//           <div>
//             <h3 className="font-bold text-white text-lg mb-4">Get in Touch</h3>
//             <ul className="space-y-4 text-sm opacity-90">
//               <li className="flex items-start gap-3">
//                 <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
//                 <span>Shop No. 4, Ciste Bakery,<br/>Mumbai, India - 400001</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="h-5 w-5 shrink-0" />
//                 <span>+91 88284 75854</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="h-5 w-5 shrink-0" />
//                 <span>hello@cisteblasta.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
//           <p>© {new Date().getFullYear()} Ciste Blasta. All rights reserved.</p>
//           <div className="flex gap-6">
//             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
//             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
//   return (
//     <a 
//       href={href} 
//       className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#72514D] transition-all duration-300"
//     >
//       {icon}
//     </a>
//   );
// }












import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#72514D] text-[#FFF8F3] pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="font-playfair text-3xl font-bold tracking-tight text-white">
              Ciste Blasta
            </Link>
            <p className="text-sm leading-relaxed opacity-90 max-w-xs">
              Handcrafted with love and premium ingredients. We bring sweetness to your celebrations with our custom cakes and artisanal chocolates.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Instagram className="h-5 w-5" />} href="https://www.instagram.com/blastaciste/" />
              <SocialIcon icon={<Facebook className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li><Link href="/" className="hover:text-white hover:underline underline-offset-4 transition-all">Home</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline underline-offset-4 transition-all">Our Story</Link></li>
              <li><Link href="/menu" className="hover:text-white hover:underline underline-offset-4 transition-all">Full Menu</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline underline-offset-4 transition-all">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. Categories (Standard Footer Feature) */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Our Delights</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li><Link href="/menu?cat=CAKE" className="hover:text-white hover:underline underline-offset-4 transition-all">Premium Cakes</Link></li>
              <li><Link href="/menu?cat=CHOCOLATE" className="hover:text-white hover:underline underline-offset-4 transition-all">Artisanal Chocolates</Link></li>
              <li><Link href="/menu?cat=JAR" className="hover:text-white hover:underline underline-offset-4 transition-all">Dessert Jars</Link></li>
              <li><Link href="/menu?cat=HAMPER" className="hover:text-white hover:underline underline-offset-4 transition-all">Gift Hampers</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <span>Shop No. 4, Ciste Bakery,<br/>Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+91 88284 75854</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>hello@cisteblasta.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Ciste Blasta. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#72514D] transition-all duration-300"
    >
      {icon}
    </a>
  );
}