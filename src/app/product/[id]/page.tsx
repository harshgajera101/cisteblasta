"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Heart, Award, Info, ShoppingCart, ChevronRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Toast } from "@/components/ui/Toast";

interface ProductVariant {
  name: string;
  price: number;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  basePrice: number;
  variants: ProductVariant[];
  averageRating: number;
  reviewsCount: number;
  reviews: Review[];
}

const REVIEWS_PER_PAGE = 5;

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });
  
  // Review Pagination State
  const [reviewPage, setReviewPage] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (e) {
        console.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63] font-playfair animate-pulse">Loading Delight...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63]">Product not found.</div>;

  // Derived State
  const hasVariants = product.variants && product.variants.length > 0;
  const activePrice = hasVariants ? product.variants[selectedVariantIdx].price : product.basePrice;
  
  // Pagination Logic
  const allReviews = product.reviews && product.reviews.length > 0 ? product.reviews : []; 
  const totalReviewPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const currentReviews = allReviews.slice((reviewPage - 1) * REVIEWS_PER_PAGE, reviewPage * REVIEWS_PER_PAGE);

  const handleAddToCart = () => {
    addToCart(product, selectedVariantIdx);
    setToast({ show: true, message: "Added to cart!", type: "success" });
    setTimeout(() => setToast(prev => ({...prev, show: false})), 800);
  };

  const handleOrderNow = () => {
    addToCart(product, selectedVariantIdx);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] pb-24">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          
        {/* LEFT: Image Section */}
        <div className="lg:w-1/2 relative bg-[#FFF8F3] flex items-center justify-center p-6 md:p-12 lg:sticky lg:top-20 lg:h-screen">
          <div className="relative w-full h-full max-h-[600px] flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#D98292]/20 font-playfair text-8xl font-bold bg-white rounded-3xl shadow-inner">
                {product.name[0]}
              </div>
            )}
            
            <div className="absolute top-0 left-0">
              <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#4E342E] shadow-sm uppercase tracking-wider border border-[#F2E3DB]">
                {product.category === "GIFT_BOX" ? "Gift Box" : product.category}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Details Section */}
        <div className="lg:w-1/2 p-6 md:p-12 lg:pt-20 flex flex-col bg-white lg:bg-transparent">
          
          {/* Header & Rating */}
          <div className="mb-4">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#4E342E] mb-3 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#4E342E] text-white px-3 py-1 rounded-full text-xs font-bold gap-1 shadow-sm">
                {product.averageRating || 4.8} <Star size={10} className="fill-[#D98292] text-[#D98292]" />
              </div>
              <span className="text-[#8D6E63] text-sm font-medium border-b border-[#D98292]/30 pb-0.5">
                {product.reviewsCount || 124} verified ratings
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-[#D98292]">₹{activePrice}</span>
            <span className="text-sm text-[#8D6E63] ml-2 font-medium">inclusive of all taxes</span>
          </div>

          {/* Weight Selection */}
          {hasVariants && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider bg-[#FFF8F3] px-2 py-1 rounded-md">Size</span>
                <span className="h-px flex-1 bg-[#F2E3DB]"></span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`
                      relative px-5 py-2.5 rounded-lg text-sm font-bold border transition-all duration-300 overflow-hidden group
                      ${selectedVariantIdx === idx 
                        ? "border-[#D98292] text-[#D98292] shadow-md bg-white" 
                        : "border-[#F2E3DB] text-[#8D6E63] hover:border-[#D98292]/50 bg-white"}
                    `}
                  >
                    <span className="relative z-10">{variant.name}</span>
                    {selectedVariantIdx === idx && (
                      <motion.div layoutId="activeVariant" className="absolute inset-0 bg-[#D98292]/5 -z-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-playfair font-bold text-xl text-[#4E342E] mb-3">Description</h3>
            <p className="text-[#8D6E63] text-sm leading-8 text-justify">
              {product.description || `Indulge in the sweet and creamy delight of our ${product.name}. Crafted with the finest ingredients and a rich, buttery flavor profile.`}
            </p>
          </div>

          {/* Personalize Info */}
          <div className="mb-10 bg-[#FFF8F3] p-5 rounded-2xl border border-[#D98292]/20 flex gap-4 items-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D98292] shadow-sm shrink-0">
               <Info size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[#4E342E] text-sm">Personalize Your Order</h4>
              <p className="text-xs text-[#8D6E63] mt-1 leading-relaxed">
                You can add a personalized message or special instructions on the <strong>Cart Page</strong> before checkout.
              </p>
            </div>
          </div>

          {/* Quality Icons */}
          <div className="grid grid-cols-3 gap-4 mb-12 pb-10 border-b border-[#F2E3DB]">
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
                <Award size={28} />
              </div>
              <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">Premium<br/>Quality</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">100%<br/>Hygienic</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
                <CheckCircle2 size={28} />
              </div>
              <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">Freshly<br/>Baked</span>
            </div>
          </div>

          {/* Reviews Section with Pagination */}
          <div>
            <h3 className="font-playfair font-bold text-2xl text-[#4E342E] mb-6 flex items-center gap-2">
              Reviews <span className="text-sm font-sans font-normal text-[#8D6E63]">({product.reviewsCount || allReviews.length})</span>
            </h3>
            
            {allReviews.length === 0 ? (
              <p className="text-[#8D6E63] italic text-sm">No reviews yet. Be the first to taste!</p>
            ) : (
              <div className="space-y-4">
                {currentReviews.map((review: any, i) => (
                  <div key={i} className="border-b border-[#F2E3DB] pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#4E342E] text-white flex items-center justify-center font-bold text-xs">
                          {review.user ? review.user[0] : "C"}
                        </div>
                        <div>
                          <span className="font-bold text-[#4E342E] text-sm block">{review.user || "Customer"}</span>
                          <div className="flex gap-0.5 mt-0.5">
                             {[1,2,3,4,5].map(star => (
                               <Star key={star} size={8} className={`${star <= (review.rating || 5) ? "fill-[#D98292] text-[#D98292]" : "text-[#F2E3DB]"}`} />
                             ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#8D6E63] bg-[#FFF8F3] px-2 py-1 rounded-full">Verified</span>
                    </div>
                    <p className="text-xs text-[#8D6E63] leading-relaxed mt-2 pl-10">
                      {review.comment || "Delicious!"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalReviewPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-[#F2E3DB] border-dashed">
                <button 
                  onClick={() => setReviewPage(p => Math.max(1, p - 1))}
                  disabled={reviewPage === 1}
                  className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-30 hover:bg-[#FFF8F3]"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-bold text-[#8D6E63]">Page {reviewPage} of {totalReviewPages}</span>
                <button 
                  onClick={() => setReviewPage(p => Math.min(totalReviewPages, p + 1))}
                  disabled={reviewPage === totalReviewPages}
                  className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-30 hover:bg-[#FFF8F3]"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sticky Action Buttons - Simplified & Styled */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-[#F2E3DB] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-7xl mx-auto flex gap-3">
          
          <div className="flex-1">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="h-14 w-full bg-white border-2 border-[#4E342E] text-[#4E342E] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#4E342E] hover:text-white transition-all shadow-sm"
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>
          </div>

          <div className="flex-1">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderNow}
              className="h-14 w-full bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] transition-colors flex items-center justify-center gap-2 border-2 border-[#D98292]"
            >
              Order Now <ChevronRight size={20} />
            </motion.button>
          </div>

        </div>
      </div>

    </div>
  );
}