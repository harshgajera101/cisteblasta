"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <section className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-5xl md:text-6xl font-bold text-foreground"
            >
              Our <span className="text-primary italic">Story</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground">Baking memories, one slice at a time.</p>
          </div>

          {/* Content Block 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1 space-y-6 text-lg leading-relaxed text-foreground/80">
                <p>
                  Welcome to <b>Ciste Blasta</b>. What started as a small home kitchen experiment in 2016 has now blossomed into a passion-driven bakery.
                </p>
                <p>
                  "Ciste Blasta" means <i>Tasty Cake</i> in Irish. We chose this name because it reflects exactly what we aim for—simple, authentic, and incredibly delicious flavors that feel like a warm hug.
                </p>
             </div>
             <div className="order-1 md:order-2 bg-muted rounded-3xl aspect-square w-full relative overflow-hidden">
                {/* Placeholder for Baker's photo */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-50">
                   Baker's Photo
                </div>
             </div>
          </div>

          {/* Values Grid */}
          <div className="bg-primary/5 rounded-3xl p-10 md:p-16">
             <h2 className="font-playfair text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
             <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                   <div className="text-4xl">🥚</div>
                   <h3 className="font-bold text-lg">100% Eggless Options</h3>
                   <p className="text-sm opacity-80">We specialize in eggless baking without compromising on texture.</p>
                </div>
                <div className="space-y-2">
                   <div className="text-4xl">🍫</div>
                   <h3 className="font-bold text-lg">Pure Couverture</h3>
                   <p className="text-sm opacity-80">We never use compounds. Only pure, high-grade chocolate.</p>
                </div>
                <div className="space-y-2">
                   <div className="text-4xl">🎨</div>
                   <h3 className="font-bold text-lg">Artistic Finish</h3>
                   <p className="text-sm opacity-80">Every cake is a canvas, hand-painted and decorated to perfection.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}