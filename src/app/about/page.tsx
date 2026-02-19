// "use client";

// import { motion } from "framer-motion";

// export default function AboutPage() {
//   return (
//     <section className="flex-grow container mx-auto px-4 py-16 md:py-24">
//       <div className="max-w-4xl mx-auto space-y-16">
        
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="font-playfair text-5xl md:text-6xl font-bold text-foreground"
//           >
//             Our <span className="text-primary italic">Story</span>
//           </motion.h1>
//           <p className="text-xl text-muted-foreground">Baking memories, one slice at a time.</p>
//         </div>

//         {/* Content Block 1 */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//            <div className="order-2 md:order-1 space-y-6 text-lg leading-relaxed text-foreground/80">
//               <p>
//                 Welcome to <b>Ciste Blasta</b>. What started as a small home kitchen experiment in 2016 has now blossomed into a passion-driven bakery.
//               </p>
//               <p>
//                 "Ciste Blasta" means <i>Tasty Cake</i> in Irish. We chose this name because it reflects exactly what we aim for—simple, authentic, and incredibly delicious flavors that feel like a warm hug.
//               </p>
//            </div>
//            <div className="order-1 md:order-2 bg-muted rounded-3xl aspect-square w-full relative overflow-hidden">
//               {/* Placeholder for Baker's photo */}
//               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-50">
//                  Baker's Photo
//               </div>
//            </div>
//         </div>

//         {/* Values Grid */}
//         <div className="bg-primary/5 rounded-3xl p-10 md:p-16">
//            <h2 className="font-playfair text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
//            <div className="grid md:grid-cols-3 gap-8 text-center">
//               <div className="space-y-2">
//                  <div className="text-4xl">🥚</div>
//                  <h3 className="font-bold text-lg">100% Eggless Options</h3>
//                  <p className="text-sm opacity-80">We specialize in eggless baking without compromising on texture.</p>
//               </div>
//               <div className="space-y-2">
//                  <div className="text-4xl">🍫</div>
//                  <h3 className="font-bold text-lg">Pure Couverture</h3>
//                  <p className="text-sm opacity-80">We never use compounds. Only pure, high-grade chocolate.</p>
//               </div>
//               <div className="space-y-2">
//                  <div className="text-4xl">🎨</div>
//                  <h3 className="font-bold text-lg">Artistic Finish</h3>
//                  <p className="text-sm opacity-80">Every cake is a canvas, hand-painted and decorated to perfection.</p>
//               </div>
//            </div>
//         </div>

//       </div>
//     </section>
//   );
// }













"use client";

import { motion, Variants } from "framer-motion"; // <-- Added Variants import
import { Leaf, Palette, HeartHandshake, Sparkles, Target, Eye, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  // Added ": Variants" to tell TypeScript exactly what these objects are
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl space-y-24">
        
        {/* --- 1. HERO SECTION --- */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center space-y-4"
        >
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-[#4E342E]">
            Our <span className="text-[#D98292] italic">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8D6E63] max-w-2xl mx-auto">
            Baking memories, connecting hearts, and bringing joy through every handcrafted bite.
          </p>
        </motion.div>

        {/* --- 2. THE ORIGIN (Image Left, Text Right) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
           <div className="bg-[#F2E3DB] rounded-3xl aspect-[4/5] md:aspect-square w-full relative overflow-hidden border border-[#D98292]/20 shadow-sm flex items-center justify-center">
              {/* IMAGE PLACEHOLDER 1 */}
              <div className="text-center p-6">
                <p className="text-[#8D6E63] font-bold">Image Placeholder</p>
                <p className="text-xs text-[#8D6E63]/70 mt-1">(Baker's Photo or Kitchen Setup)</p>
              </div>
           </div>
           
           <div className="space-y-6 text-lg leading-relaxed text-[#4E342E]/90">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E] mb-6">
                How it all started
              </h2>
              <p>
                Welcome to <b className="text-[#D98292]">Ciste Blasta</b>. What started as a small home kitchen experiment has now blossomed into a passion-driven artisan bakery and chocolaterie.
              </p>
              <p>
                <b>"Ciste Blasta"</b> translates to <i>Tasty Cake</i> in Irish. We chose this name because it reflects exactly what we aim for—simple, authentic, and incredibly delicious flavors that feel like a warm hug. Every creation that leaves our kitchen is a testament to our love for the craft.
              </p>
           </div>
        </motion.div>

        {/* --- 3. VISION & MISSION (Aesthetic Cards) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Vision Card */}
          <motion.div variants={fadeInUp} className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-[#F2E3DB] relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Eye size={120} className="text-[#D98292]" />
            </div>
            <div className="w-12 h-12 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292] mb-6">
              <Eye size={24} />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-4">Our Vision</h3>
            <p className="text-[#8D6E63] leading-relaxed">
              A reliable and forward-thinking chocolate brand, bringing happiness to millions through sustainable, ethically sourced and exquisitely crafted products that foster joy, connection, and indulgence across generations.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={fadeInUp} className="bg-[#72514D] p-10 md:p-12 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all text-[#FFF8F3]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-white">
              <Target size={120} />
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
              <Target size={24} />
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Our Mission</h3>
            <p className="opacity-90 leading-relaxed text-sm md:text-base">
              To craft artisanal, 100% vegetarian baked goods and pure chocolates that bring a touch of luxury and heartfelt warmth to every celebration. We aim to innovate constantly while staying true to the authentic, homemade quality that our customers trust.
            </p>
          </motion.div>
        </motion.div>

        {/* --- 4. INGREDIENTS / WHAT WE USE --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E]">
              The Secret Ingredient is <span className="text-[#D98292] italic">Quality</span>
            </h2>
            <p className="text-[#8D6E63] leading-relaxed pb-4">
              We believe that exceptional taste comes from exceptional ingredients. We never compromise, ensuring that every bite you take is pure, rich, and unforgettable.
            </p>
            
            <div className="space-y-4">
              {[
                "Premium Belgian Couverture Chocolate",
                "Authentic Madagascar Vanilla Extract",
                "Freshly Sourced Seasonal Fruits",
                "High-Grade European Butter",
                "100% Vegetarian & Ethically Sourced"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#D98292] shrink-0" />
                  <span className="font-bold text-[#4E342E]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F2E3DB] rounded-3xl aspect-[4/5] md:aspect-square w-full relative overflow-hidden border border-[#D98292]/20 shadow-sm flex items-center justify-center order-1 md:order-2">
              {/* IMAGE PLACEHOLDER 2 */}
              <div className="text-center p-6">
                <p className="text-[#8D6E63] font-bold">Image Placeholder</p>
                <p className="text-xs text-[#8D6E63]/70 mt-1">(Ingredients, Chocolates, or Close-up of a cake)</p>
              </div>
          </div>
        </motion.div>

        {/* --- 5. VALUES / WHY CHOOSE US --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="bg-white border border-[#F2E3DB] rounded-3xl p-10 md:p-16 shadow-sm"
        >
           <div className="text-center max-w-2xl mx-auto mb-12">
             <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E] mb-4">Why Choose Us?</h2>
             <p className="text-[#8D6E63]">We pour our heart into the details, ensuring your experience is nothing short of magical.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="space-y-4 flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#FFF8F3] text-[#D98292] rounded-full flex items-center justify-center">
                   <Leaf size={28} />
                 </div>
                 <h3 className="font-bold text-xl text-[#4E342E]">100% Eggless Options</h3>
                 <p className="text-sm text-[#8D6E63] leading-relaxed">We specialize in eggless baking, ensuring the perfect moist texture without compromising on taste.</p>
              </div>
              
              <div className="space-y-4 flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#FFF8F3] text-[#D98292] rounded-full flex items-center justify-center">
                   <Sparkles size={28} />
                 </div>
                 <h3 className="font-bold text-xl text-[#4E342E]">Pure Couverture</h3>
                 <p className="text-sm text-[#8D6E63] leading-relaxed">We strictly avoid compound chocolates. You only get the smooth, luxurious melt of pure couverture.</p>
              </div>
              
              <div className="space-y-4 flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#FFF8F3] text-[#D98292] rounded-full flex items-center justify-center">
                   <Palette size={28} />
                 </div>
                 <h3 className="font-bold text-xl text-[#4E342E]">Artistic Finish</h3>
                 <p className="text-sm text-[#8D6E63] leading-relaxed">Every cake is a canvas. Our creations are intricately hand-painted and decorated to absolute perfection.</p>
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}