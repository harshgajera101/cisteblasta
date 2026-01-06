// "use client";

// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
//       {/* Background Decorative Blobs */}
//       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-30" />

//       <div className="container mx-auto px-4 md:px-6 z-10 grid gap-12 lg:grid-cols-2 items-center">
        
//         {/* Text Content */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="flex flex-col space-y-6"
//         >
//           <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary w-fit">
//             Since 2016 • Homemade Goodness
//           </div>
          
//           <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight text-foreground">
//             Baking Life <br/>
//             <span className="text-primary italic">Sweeter.</span>
//           </h1>
          
//           <p className="max-w-[550px] text-lg text-muted-foreground leading-relaxed">
//             From trending <b>Kunafa Chocolates</b> to <b>Custom Dream Cakes</b>. 
//             Experience the taste of premium, preservative-free indulgence made just for you.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <Link 
//               href="/menu" 
//               className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
//             >
//               Order Now
//             </Link>
//             <Link 
//               href="/custom-cake" 
//               className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-primary px-8 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white"
//             >
//               Customize Your Cake <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </div>
//         </motion.div>

//         {/* Hero Image / Graphic */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="relative mx-auto aspect-square w-full max-w-[500px]"
//         >
//           {/* Main Image Holder */}
//           <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-700">
//              <div className="w-full h-full bg-primary/5 flex flex-col items-center justify-center text-primary/80">
//                 <span className="font-playfair text-2xl italic">Ciste Blasta</span>
//                 <span className="text-sm mt-2 opacity-60">Add a stunning cake photo here</span>
//              </div>
//           </div>

//           {/* Floating Badge */}
//           <motion.div 
//             animate={{ y: [0, -10, 0] }}
//             transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
//             className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-muted"
//           >
//              <p className="text-sm font-bold text-foreground">⭐ Best Seller</p>
//              <p className="text-xs text-muted-foreground">Kunafa Pistachio</p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }









"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-12 md:py-0">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 md:px-6 z-10 grid gap-12 lg:grid-cols-2 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary w-fit">
            Since 2016 • Homemade Goodness
          </div>
          
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-foreground">
            Baking Life <br/>
            <span className="text-primary italic">Sweeter.</span>
          </h1>
          
          <p className="max-w-[550px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            From trending <b>Kunafa Chocolates</b> to <b>Custom Dream Cakes</b>. 
            Experience the taste of premium, preservative-free indulgence made just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link 
              href="/menu" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
            >
              Order Now
            </Link>
            <Link 
              href="/custom-cake" 
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border-2 border-primary px-8 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white"
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
          className="relative mx-auto aspect-square w-full max-w-[400px] md:max-w-[500px]"
        >
          {/* Main Image Holder */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-700">
             {/* Note: Replace this div with an actual <Image /> component later */}
             <div className="w-full h-full bg-primary/5 flex flex-col items-center justify-center text-primary/80 p-4 text-center">
                <span className="font-playfair text-2xl italic">Ciste Blasta</span>
                <span className="text-sm mt-2 opacity-60">Add a stunning cake photo here</span>
             </div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-muted"
          >
             <p className="text-sm font-bold text-foreground">⭐ Best Seller</p>
             <p className="text-xs text-muted-foreground">Kunafa Pistachio</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}