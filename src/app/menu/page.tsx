"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/shared/Footer"; // Don't forget to import Footer!
import { products } from "@/lib/placeholder-data";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Cake", "Chocolate", "Jar"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-16 flex-grow">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground">
            Our <span className="text-primary italic">Menu</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Explore our wide range of handcrafted delights. Whether you crave the crunch of Kunafa or the softness of Truffle, we have it all.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                  : "bg-white text-foreground border-muted hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard 
                  title={product.name} 
                  price={`₹${product.price}/-`} 
                  category={product.category}
                  className="h-full bg-card hover:shadow-xl transition-all duration-300"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No delicious items found in this category yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}