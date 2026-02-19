// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local"; // Import localFont
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";
// import { CartProvider } from "@/context/CartContext"; 
// import AuthProvider from "@/components/providers/AuthProvider";
// import FloatingCartBtn from "@/components/ui/FloatingCartBtn"; 
// import "./globals.css";

// import { Analytics } from "@vercel/analytics/next"
// import { SpeedInsights } from "@vercel/speed-insights/next"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // Configure Custom Font (Gistesy)
// const gistesy = localFont({
//   src: "../fonts/Gistesy.ttf", // Make sure this path is correct relative to src/app/layout.tsx
//   variable: "--font-gistesy",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Ciste Blasta | Premium Homemade Cakes",
//   description: "Homemade cakes and chocolates, baked with love.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       {/* Add the font variable to the body class */}
//       <body className={`${geistSans.variable} ${geistMono.variable} ${gistesy.variable} antialiased bg-[#FFF8F3] text-[#4E342E]`}>
//       <AuthProvider>
//         <CartProvider>
//           <Navbar />
//           <main className="min-h-screen flex flex-col">
//             {children}
//             <Analytics />
//             <SpeedInsights />
//           </main>
//           <FloatingCartBtn /> 
//           <Footer />
//         </CartProvider>
//       </AuthProvider>
//       </body>
//     </html>
//   );
// }













import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"; // Import localFont
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext"; 
import AuthProvider from "@/components/providers/AuthProvider";
import FloatingCartBtn from "@/components/ui/FloatingCartBtn"; 
import ExitFeedbackPopup from "@/components/ui/ExitFeedbackPopup"; // NEW IMPORT
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Custom Font (Gistesy)
const gistesy = localFont({
  src: "../fonts/Gistesy.ttf", // Make sure this path is correct relative to src/app/layout.tsx
  variable: "--font-gistesy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ciste Blasta | Premium Homemade Cakes",
  description: "Homemade cakes and chocolates, baked with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Add the font variable to the body class */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${gistesy.variable} antialiased bg-[#FFF8F3] text-[#4E342E]`}>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <FloatingCartBtn /> 
          <ExitFeedbackPopup /> {/* NEW: Added the popup globally */}
          <Footer />
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  );
}