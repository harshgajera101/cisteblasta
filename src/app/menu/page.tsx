// "use client";

// import { useState, useEffect } from "react";
// import ProductCard from "@/components/ui/ProductCard";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { Filter, ArrowDownUp, X, RefreshCw, Search } from "lucide-react"; 

// interface ProductType {
//   _id: string;
//   name: string;
//   basePrice: number;
//   category: string;
//   variants?: { name: string; price: number }[];
//   description?: string;
//   tags?: string[]; // Added tags to interface
//   isBestSeller?: boolean;
//   averageRating?: number; 
//   createdAt?: string;     
// }

// const categories = ["All", "CAKE", "CHOCOLATE", "JAR", "GIFT_BOX"];

// export default function MenuPage() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // --- SEARCH & FILTER STATES ---
//   const [searchQuery, setSearchQuery] = useState(""); // NEW: Search State
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [priceFilter, setPriceFilter] = useState("ALL");
//   const [weightFilter, setWeightFilter] = useState("ALL");
//   const [flavorFilter, setFlavorFilter] = useState("ALL");
//   const [sortOption, setSortOption] = useState("NEWEST");

//   // --- UI FEEDBACK STATE ---
//   const [isFiltering, setIsFiltering] = useState(false);

//   // 1. Initial Data Fetch
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch("/api/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Failed to load menu", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   // 2. Visual Feedback Effect (Simulate Loading on Filter/Search Change)
//   useEffect(() => {
//     if (!loading) {
//       setIsFiltering(true);
//       const timer = setTimeout(() => {
//         setIsFiltering(false);
//       }, 300); // Increased slightly to 300ms for better "search" feel
//       return () => clearTimeout(timer);
//     }
//   }, [searchQuery, activeCategory, priceFilter, weightFilter, flavorFilter, sortOption]);

//   // --- HELPER: Check if any filter is active ---
//   const isAnyFilterActive = 
//     searchQuery !== "" ||
//     activeCategory !== "All" || 
//     priceFilter !== "ALL" || 
//     weightFilter !== "ALL" || 
//     flavorFilter !== "ALL";

//   // --- HELPER: Reset Filters ---
//   const clearFilters = () => {
//     setSearchQuery("");
//     setActiveCategory("All");
//     setPriceFilter("ALL");
//     setWeightFilter("ALL");
//     setFlavorFilter("ALL");
//     setSortOption("NEWEST");
//   };

//   // --- FILTERING LOGIC ---
//   const filteredProducts = products
//     .filter((product) => {
//       // 0. SEARCH BAR LOGIC (The "Smart" Search)
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase();
        
//         const matchesName = product.name.toLowerCase().includes(query);
//         const matchesDesc = product.description?.toLowerCase().includes(query);
//         const matchesCategory = product.category.toLowerCase().includes(query);
        
//         // Search inside Variants (e.g. User types "1kg")
//         const matchesVariant = product.variants?.some(v => 
//           v.name.toLowerCase().includes(query) || v.price.toString().includes(query)
//         );

//         // Search inside Tags (Occasion) - Safely checks if tags exist
//         const matchesTag = product.tags?.some(tag => tag.toLowerCase().includes(query));

//         // Search by Price (e.g. User types "500")
//         const matchesPrice = product.basePrice.toString().includes(query);

//         if (!matchesName && !matchesDesc && !matchesCategory && !matchesVariant && !matchesPrice && !matchesTag) {
//           return false;
//         }
//       }

//       // 1. Category Filter
//       if (activeCategory !== "All" && product.category !== activeCategory) return false;

//       // 2. Price Filter
//       if (priceFilter === "UNDER_500" && product.basePrice >= 500) return false;
//       if (priceFilter === "500_1000" && (product.basePrice < 500 || product.basePrice > 1000)) return false;
//       if (priceFilter === "ABOVE_1000" && product.basePrice <= 1000) return false;

//       // 3. Weight Filter (Checks Variants)
//       if (weightFilter !== "ALL") {
//         const hasVariant = product.variants?.some((v) => 
//           v.name.toLowerCase().includes(weightFilter.toLowerCase())
//         );
//         if (!hasVariant) return false;
//       }

//       // 4. Flavor Filter (Checks Name)
//       if (flavorFilter !== "ALL") {
//         if (!product.name.toLowerCase().includes(flavorFilter.toLowerCase())) return false;
//       }

//       return true;
//     })
//     .sort((a, b) => {
//       // --- SORTING LOGIC ---
//       switch (sortOption) {
//         case "PRICE_LOW":
//           return a.basePrice - b.basePrice;
//         case "PRICE_HIGH":
//           return b.basePrice - a.basePrice;
//         case "RATING":
//           return (b.averageRating || 0) - (a.averageRating || 0);
//         case "NEWEST":
//         default:
//           return (b.createdAt || b._id) > (a.createdAt || a._id) ? 1 : -1;
//       }
//     });

//   return (
//     <div className="container mx-auto px-4 py-16 flex-grow">
//       {/* Page Header */}
//       <div className="text-center mb-10 space-y-4">
//         <h1 className="font-playfair text-4xl md:text-6xl font-bold text-[#4E342E]">
//           Our <span className="text-[#D98292] italic">Menu</span>
//         </h1>
//         <p className="text-[#8D6E63] text-lg max-w-xl mx-auto leading-relaxed">
//           Explore our wide range of handcrafted delights. From Custom Cakes to Kunafa Bars.
//         </p>
//       </div>

//       {/* --- NEW SEARCH BAR --- */}
//       <div className="max-w-md mx-auto mb-8 relative">
//         <div className="relative group">
//           <input 
//             type="text" 
//             placeholder="Search cakes, flavors, occasions..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-full border border-[#F2E3DB] bg-white text-[#4E342E] shadow-sm focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all placeholder:text-[#8D6E63]/60"
//           />
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#D98292] transition-colors" size={20} />
//           {searchQuery && (
//             <button 
//               onClick={() => setSearchQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#D98292] p-1 rounded-full hover:bg-[#FFF8F3] transition-colors"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Category Pills */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
//               activeCategory === cat
//                 ? "bg-[#D98292] text-white border-[#D98292] shadow-lg scale-105"
//                 : "bg-white text-[#4E342E] border-[#F2E3DB] hover:border-[#D98292] hover:text-[#D98292]"
//             }`}
//           >
//             {cat === "GIFT_BOX" ? "Dessert Box" : cat}
//           </button>
//         ))}
//       </div>

//       {/* --- ADVANCED FILTER BAR --- */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col lg:flex-row justify-between items-center gap-4 mb-10 mx-auto max-w-6xl">
        
//         {/* Left: Filters */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-wrap justify-center lg:justify-start">
//           <div className="flex items-center gap-2 text-sm font-bold text-[#8D6E63] shrink-0">
//             <Filter size={16} /> Filters:
//           </div>
          
//           <select 
//             value={priceFilter} 
//             onChange={(e) => setPriceFilter(e.target.value)} 
//             className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
//           >
//             <option value="ALL">Price: All</option>
//             <option value="UNDER_500">Under ₹500</option>
//             <option value="500_1000">₹500 - ₹1000</option>
//             <option value="ABOVE_1000">Above ₹1000</option>
//           </select>

//           <select 
//             value={weightFilter} 
//             onChange={(e) => setWeightFilter(e.target.value)} 
//             className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
//           >
//             <option value="ALL">Weight: All</option>
//             <option value="0.5">0.5 kg</option>
//             <option value="1">1 kg</option>
//             <option value="2">2 kg</option>
//           </select>

//           <select 
//             value={flavorFilter} 
//             onChange={(e) => setFlavorFilter(e.target.value)} 
//             className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
//           >
//             <option value="ALL">Flavor: All</option>
//             <option value="Chocolate">Chocolate</option>
//             <option value="Vanilla">Vanilla</option>
//             <option value="Strawberry">Strawberry</option>
//             <option value="Red Velvet">Red Velvet</option>
//             <option value="Pineapple">Pineapple</option>
//             <option value="Truffle">Truffle</option>
//           </select>

//           {/* CLEAR FILTER BUTTON (Conditionally Rendered) */}
//           <AnimatePresence>
//             {isAnyFilterActive && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 onClick={clearFilters}
//                 className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-500 text-xs font-bold border border-red-100 hover:bg-red-100 transition-colors"
//               >
//                 <X size={14} /> Clear
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Right: Sorting */}
//         <div className="flex items-center gap-2 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-[#F2E3DB] pt-4 lg:pt-0 lg:pl-4 justify-center lg:justify-start">
//           <ArrowDownUp size={16} className="text-[#8D6E63] shrink-0" />
//           <select 
//             value={sortOption} 
//             onChange={(e) => setSortOption(e.target.value)} 
//             className="w-full lg:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm font-bold text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
//           >
//             <option value="NEWEST">Newest First</option>
//             <option value="PRICE_LOW">Price: Low to High</option>
//             <option value="PRICE_HIGH">Price: High to Low</option>
//             <option value="RATING">Top Rated</option>
//           </select>
//         </div>

//       </div>

//       {/* Product Display Area */}
//       {loading || isFiltering ? (
//         // LOADING STATE (Also shown during filter interaction)
//         <div className="flex flex-col justify-center items-center py-20 min-h-[400px]">
//           <motion.div 
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             className="mb-4"
//           >
//             <RefreshCw className="text-[#D98292]" size={40} />
//           </motion.div>
//           <p className="text-[#8D6E63] font-bold animate-pulse">Curating your delights...</p>
//         </div>
//       ) : (
//         /* Product Grid */
//         <motion.div 
//           layout
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
//         >
//           <AnimatePresence mode="popLayout">
//             {filteredProducts.map((product) => (
//               <motion.div
//                 key={product._id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Link href={`/product/${product._id}`} className="block h-full">
//                   <ProductCard product={product} />
//                 </Link>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}
      
//       {!loading && !isFiltering && filteredProducts.length === 0 && (
//         <div className="text-center py-20 bg-white rounded-3xl border border-[#F2E3DB] border-dashed">
//           <p className="text-xl text-[#8D6E63]">No items match your filters.</p>
//           <button 
//             onClick={clearFilters}
//             className="mt-4 text-sm font-bold text-[#D98292] hover:underline"
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
















"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Filter, ArrowDownUp, X, RefreshCw, Search } from "lucide-react"; 

// Updated Interface to match Schema
interface ProductType {
  _id: string;
  name: string;
  basePrice: number;
  category: string;
  variants?: { name: string; price: number }[];
  description?: string;
  tags?: string[]; // Using the existing tags field
  isBestSeller?: boolean; // Using the existing bestSeller field
  averageRating?: number; 
  createdAt?: string;     
}

const categories = ["All", "CAKE", "CHOCOLATE", "JAR", "GIFT_BOX"];

export default function MenuPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- FILTER & SEARCH STATES ---
  const [searchQuery, setSearchQuery] = useState(""); // Search State
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [weightFilter, setWeightFilter] = useState("ALL");
  const [flavorFilter, setFlavorFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");

  // --- UI FEEDBACK STATE ---
  const [isFiltering, setIsFiltering] = useState(false);

  // 1. Initial Data Fetch
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. Visual Feedback Effect
  useEffect(() => {
    if (!loading) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300); // 300ms delay for visual feedback
      return () => clearTimeout(timer);
    }
  }, [searchQuery, activeCategory, priceFilter, weightFilter, flavorFilter, sortOption]);

  // --- HELPER: Check if any filter/search is active ---
  const isAnyFilterActive = 
    searchQuery !== "" ||
    activeCategory !== "All" || 
    priceFilter !== "ALL" || 
    weightFilter !== "ALL" || 
    flavorFilter !== "ALL";

  // --- HELPER: Reset Filters ---
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setPriceFilter("ALL");
    setWeightFilter("ALL");
    setFlavorFilter("ALL");
    setSortOption("NEWEST");
  };

  // --- FILTERING LOGIC ---
  const filteredProducts = products
    .filter((product) => {
      // 0. SMART SEARCH LOGIC
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        
        // A. Keyword Search: "Best" or "Trending"
        if ((query === "best" || query === "best seller" || query === "trending") && product.isBestSeller) {
           return true; 
        }

        // B. Standard Fields Search
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        
        // C. Variants Search (e.g. "1kg")
        const matchesVariant = product.variants?.some(v => 
          v.name.toLowerCase().includes(query) || v.price.toString().includes(query)
        );

        // D. Tags Search (Occasion) - Checks database tags
        const matchesTag = product.tags?.some(tag => tag.toLowerCase().includes(query));

        // E. Price Search (e.g. "500")
        const matchesPrice = product.basePrice.toString().includes(query);

        // If NONE match, exclude product
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesVariant && !matchesPrice && !matchesTag) {
          return false;
        }
      }

      // 1. Category Filter
      if (activeCategory !== "All" && product.category !== activeCategory) return false;

      // 2. Price Filter
      if (priceFilter === "UNDER_500" && product.basePrice >= 500) return false;
      if (priceFilter === "500_1000" && (product.basePrice < 500 || product.basePrice > 1000)) return false;
      if (priceFilter === "ABOVE_1000" && product.basePrice <= 1000) return false;

      // 3. Weight Filter
      if (weightFilter !== "ALL") {
        const hasVariant = product.variants?.some((v) => 
          v.name.toLowerCase().includes(weightFilter.toLowerCase())
        );
        if (!hasVariant) return false;
      }

      // 4. Flavor Filter
      if (flavorFilter !== "ALL") {
        if (!product.name.toLowerCase().includes(flavorFilter.toLowerCase())) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // --- SORTING LOGIC ---
      switch (sortOption) {
        case "PRICE_LOW":
          return a.basePrice - b.basePrice;
        case "PRICE_HIGH":
          return b.basePrice - a.basePrice;
        case "RATING":
          return (b.averageRating || 0) - (a.averageRating || 0);
        case "NEWEST":
        default:
          return (b.createdAt || b._id) > (a.createdAt || a._id) ? 1 : -1;
      }
    });

  return (
    <div className="container mx-auto px-4 py-16 flex-grow">
      {/* Page Header */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-[#4E342E]">
          Our <span className="text-[#D98292] italic">Menu</span>
        </h1>
        <p className="text-[#8D6E63] text-lg max-w-xl mx-auto leading-relaxed">
          Explore our wide range of handcrafted delights. From Custom Cakes to Kunafa Bars.
        </p>
      </div>

      {/* --- SMART SEARCH BAR (Added Here) --- */}
      <div className="max-w-md mx-auto mb-8 relative z-20">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search 'Birthday', 'Truffle', '1kg'..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full border border-[#F2E3DB] bg-white text-[#4E342E] shadow-sm focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all placeholder:text-[#8D6E63]/60 font-medium"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#D98292] transition-colors" size={20} />
          
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#D98292] p-1.5 rounded-full hover:bg-[#FFF8F3] transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-[#D98292] text-white border-[#D98292] shadow-lg scale-105"
                : "bg-white text-[#4E342E] border-[#F2E3DB] hover:border-[#D98292] hover:text-[#D98292]"
            }`}
          >
            {cat === "GIFT_BOX" ? "Dessert Box" : cat}
          </button>
        ))}
      </div>

      {/* --- ADVANCED FILTER BAR --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col lg:flex-row justify-between items-center gap-4 mb-10 mx-auto max-w-6xl">
        
        {/* Left: Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-wrap justify-center lg:justify-start">
          <div className="flex items-center gap-2 text-sm font-bold text-[#8D6E63] shrink-0">
            <Filter size={16} /> Filters:
          </div>
          
          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)} 
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
          >
            <option value="ALL">Price: All</option>
            <option value="UNDER_500">Under ₹500</option>
            <option value="500_1000">₹500 - ₹1000</option>
            <option value="ABOVE_1000">Above ₹1000</option>
          </select>

          <select 
            value={weightFilter} 
            onChange={(e) => setWeightFilter(e.target.value)} 
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
          >
            <option value="ALL">Weight: All</option>
            <option value="0.5">0.5 kg</option>
            <option value="1">1 kg</option>
            <option value="2">2 kg</option>
          </select>

          <select 
            value={flavorFilter} 
            onChange={(e) => setFlavorFilter(e.target.value)} 
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
          >
            <option value="ALL">Flavor: All</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Strawberry">Strawberry</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Pineapple">Pineapple</option>
            <option value="Truffle">Truffle</option>
          </select>

          {/* CLEAR FILTER BUTTON */}
          <AnimatePresence>
            {isAnyFilterActive && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-500 text-xs font-bold border border-red-100 hover:bg-red-100 transition-colors"
              >
                <X size={14} /> Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Sorting */}
        <div className="flex items-center gap-2 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-[#F2E3DB] pt-4 lg:pt-0 lg:pl-4 justify-center lg:justify-start">
          <ArrowDownUp size={16} className="text-[#8D6E63] shrink-0" />
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)} 
            className="w-full lg:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm font-bold text-[#4E342E] bg-[#FFF8F3] focus:outline-none focus:border-[#D98292] cursor-pointer"
          >
            <option value="NEWEST">Newest First</option>
            <option value="PRICE_LOW">Price: Low to High</option>
            <option value="PRICE_HIGH">Price: High to Low</option>
            <option value="RATING">Top Rated</option>
          </select>
        </div>

      </div>

      {/* Product Display Area */}
      {loading || isFiltering ? (
        // LOADING STATE
        <div className="flex flex-col justify-center items-center py-20 min-h-[400px]">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="mb-4"
          >
            <RefreshCw className="text-[#D98292]" size={40} />
          </motion.div>
          <p className="text-[#8D6E63] font-bold animate-pulse">Curating your delights...</p>
        </div>
      ) : (
        /* Product Grid */
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/product/${product._id}`} className="block h-full">
                  <ProductCard product={product} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      
      {!loading && !isFiltering && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#F2E3DB] border-dashed">
          <p className="text-xl text-[#8D6E63]">No items match your search.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-sm font-bold text-[#D98292] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}