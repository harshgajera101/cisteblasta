"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F6E5D6]">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E8D5C8] rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#70534b] rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 md:px-6 z-10 grid gap-12 lg:grid-cols-2 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <div className="inline-block rounded-full bg-[#70534b]/10 px-4 py-1.5 text-sm font-semibold text-[#70534b] w-fit">
            Since 2016 • Homemade Goodness
          </div>
          
          <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight text-[#70534b]">
            Baking Life <br/>
            <span className="text-[#8D6E63] italic">Sweeter.</span>
          </h1>
          
          <p className="max-w-[550px] text-lg text-[#8D6E63] leading-relaxed">
            From trending <b>Kunafa Chocolates</b> to <b>Custom Dream Cakes</b>. 
            Experience the taste of premium, preservative-free indulgence made just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/menu" 
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#70534b] px-8 text-base font-bold text-[#F6E5D6] shadow-lg transition-transform hover:scale-105 hover:bg-[#5a423b]"
            >
              Order Now
            </Link>
            <Link 
              href="/custom-cake" 
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-[#70534b] px-8 text-base font-bold text-[#70534b] transition-colors hover:bg-[#70534b] hover:text-[#F6E5D6]"
            >
              Customize Your Cake <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Hero Image / Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[500px]"
        >
          {/* Main Image Holder - Replace with real image later */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-700">
             <div className="w-full h-full bg-[#70534b]/5 flex flex-col items-center justify-center text-[#70534b]">
                <span className="font-playfair text-2xl italic">Ciste Blasta</span>
                <span className="text-sm mt-2 opacity-60">Add a stunning cake photo here</span>
             </div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#E8D5C8]"
          >
             <p className="text-sm font-bold text-[#70534b]">⭐ Best Seller</p>
             <p className="text-xs text-[#8D6E63]">Kunafa Pistachio</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}