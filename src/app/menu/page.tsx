"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/placeholder-data";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Cake", "Chocolate", "Jar"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F6E5D6]">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#70534b] mb-4">Our Menu</h1>
          <p className="text-[#8D6E63] max-w-xl mx-auto">
            Explore our wide range of handcrafted delights. Whether you crave the crunch of Kunafa or the softness of Truffle, we have it all.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#70534b] text-[#F6E5D6] shadow-lg scale-105"
                  : "bg-white text-[#70534b] hover:bg-[#E8D5C8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence>
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
                  className="h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#8D6E63]">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}