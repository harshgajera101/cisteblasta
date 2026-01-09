// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";
// import { CartProvider } from "@/context/CartContext"; // <--- Import this
// import AuthProvider from "@/components/providers/AuthProvider";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
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
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF8F3] text-[#4E342E]`}>
//       <AuthProvider>
//         <CartProvider>  {/* <--- Wrap everything inside this */}
//           <Navbar />
//           <main className="min-h-screen flex flex-col">
//             {children}
//           </main>
//           <Footer />
//         </CartProvider>
//       </AuthProvider>
//       </body>
//     </html>
//   );
// }







import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext"; 
import AuthProvider from "@/components/providers/AuthProvider";
import FloatingCartBtn from "@/components/ui/FloatingCartBtn"; // <--- Import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF8F3] text-[#4E342E]`}>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          {/* Persistent Floating Cart Button */}
          <FloatingCartBtn /> 
          <Footer />
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  );
}