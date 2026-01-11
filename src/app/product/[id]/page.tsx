// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, ShieldCheck, Heart, Award, Info, ShoppingCart, ChevronRight, CheckCircle2, ChevronLeft, PenLine, ArrowLeft } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Toast } from "@/components/ui/Toast";
// import { useSession } from "next-auth/react";
// import Link from "next/link"; // Import Link

// interface ProductVariant {
//   name: string;
//   price: number;
// }

// interface Review {
//   user: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   category: string;
//   images: string[];
//   basePrice: number;
//   variants: ProductVariant[];
//   averageRating: number;
//   reviewsCount: number;
//   reviews: Review[];
// }

// const REVIEWS_PER_PAGE = 5;

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { data: session } = useSession();
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });
  
//   // Review System States
//   const [reviewPage, setReviewPage] = useState(1);
//   const [canReview, setCanReview] = useState(false);
//   const [isWritingReview, setIsWritingReview] = useState(false);
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
//   const [submittingReview, setSubmittingReview] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const productRes = await fetch(`/api/products/${id}`);
//         const productData = await productRes.json();
//         if (productData.success) setProduct(productData.product);

//         if (session) {
//           const eligibilityRes = await fetch(`/api/products/${id}/review`);
//           const eligibilityData = await eligibilityRes.json();
//           if (eligibilityData.canReview) setCanReview(true);
//         }
//       } catch (e) {
//         console.error("Error loading page data");
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchData();
//   }, [id, session]);

//   const handleReviewSubmit = async () => {
//     if (!reviewForm.comment.trim()) {
//       setToast({ show: true, message: "Please write a comment", type: "error" });
//       return;
//     }
//     setSubmittingReview(true);
//     try {
//       const res = await fetch(`/api/products/${id}/review`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reviewForm),
//       });
//       const data = await res.json();
      
//       if (data.success) {
//         setToast({ show: true, message: "Review Submitted!", type: "success" });
//         setProduct(prev => prev ? { ...prev, reviews: [data.newReview, ...prev.reviews], reviewsCount: prev.reviewsCount + 1 } : null);
//         setIsWritingReview(false);
//         setCanReview(false); 
//       } else {
//         setToast({ show: true, message: data.error || "Failed to submit review", type: "error" });
//       }
//     } catch (e) {
//       setToast({ show: true, message: "Server Error", type: "error" });
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63] font-playfair animate-pulse">Loading Delight...</div>;
//   if (!product) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63]">Product not found.</div>;

//   const hasVariants = product.variants && product.variants.length > 0;
//   const activePrice = hasVariants ? product.variants[selectedVariantIdx].price : product.basePrice;
  
//   const allReviews = product.reviews && product.reviews.length > 0 ? product.reviews : []; 
//   const totalReviewPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
//   const currentReviews = allReviews.slice((reviewPage - 1) * REVIEWS_PER_PAGE, reviewPage * REVIEWS_PER_PAGE);

//   const handleAddToCart = () => {
//     addToCart(product, selectedVariantIdx);
//     setToast({ show: true, message: "Added to cart!", type: "success" });
//     setTimeout(() => setToast(prev => ({...prev, show: false})), 800);
//   };

//   const handleOrderNow = () => {
//     addToCart(product, selectedVariantIdx);
//     router.push("/cart");
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] pb-32">
//       <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
//       {/* --- NEW: Back to Menu Button (Fixed Top Left) --- */}
//       <motion.div 
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="fixed top-24 left-4 z-50 md:left-8" // Positioned below navbar (approx 80px)
//       >
//         <Link href="/menu">
//           <button className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#F2E3DB] px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#D98292]/50">
//             <ArrowLeft size={16} className="text-[#8D6E63] group-hover:text-[#D98292] transition-colors" />
//             <span className="text-sm font-bold text-[#4E342E] group-hover:text-[#D98292] transition-colors">
//               Back to Menu
//             </span>
//           </button>
//         </Link>
//       </motion.div>

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)] pt-12 lg:pt-0"> {/* Added padding top for mobile button clearance */}
          
//         {/* LEFT: Image Section */}
//         <div className="lg:w-1/2 relative bg-[#FFF8F3] flex items-center justify-center p-6 md:p-12 lg:sticky lg:top-20 lg:h-screen">
//           <div className="relative w-full h-full max-h-[600px] flex items-center justify-center">
//             {product.images && product.images.length > 0 ? (
//               <img 
//                 src={product.images[0]} 
//                 alt={product.name} 
//                 className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#D98292]/20 font-playfair text-8xl font-bold bg-white rounded-3xl shadow-inner">
//                 {product.name[0]}
//               </div>
//             )}
            
//             <div className="absolute top-0 left-0">
//               <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#4E342E] shadow-sm uppercase tracking-wider border border-[#F2E3DB]">
//                 {product.category === "GIFT_BOX" ? "Gift Box" : product.category}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: Details Section */}
//         <div className="lg:w-1/2 p-6 md:p-12 lg:pt-20 flex flex-col bg-white lg:bg-transparent">
          
//           {/* Header & Rating */}
//           <div className="mb-4">
//             <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#4E342E] mb-3 leading-tight">
//               {product.name}
//             </h1>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center bg-[#4E342E] text-white px-3 py-1 rounded-full text-xs font-bold gap-1 shadow-sm">
//                 {product.reviewsCount > 0 ? product.averageRating : "0.0"} <Star size={10} className="fill-[#D98292] text-[#D98292]" />
//               </div>
//               <span className="text-[#8D6E63] text-sm font-medium border-b border-[#D98292]/30 pb-0.5">
//                 {product.reviewsCount || 0} verified ratings
//               </span>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="mb-6">
//             <span className="text-4xl font-bold text-[#D98292]">₹{activePrice}</span>
//             <span className="text-sm text-[#8D6E63] ml-2 font-medium">inclusive of all taxes</span>
//           </div>

//           {/* Weight Selection */}
//           {hasVariants && (
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider bg-[#FFF8F3] px-2 py-1 rounded-md">Size</span>
//                 <span className="h-px flex-1 bg-[#F2E3DB]"></span>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {product.variants.map((variant, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedVariantIdx(idx)}
//                     className={`
//                       relative px-5 py-2.5 rounded-lg text-sm font-bold border transition-all duration-300 overflow-hidden group
//                       ${selectedVariantIdx === idx 
//                         ? "border-[#D98292] text-[#D98292] shadow-md bg-white" 
//                         : "border-[#F2E3DB] text-[#8D6E63] hover:border-[#D98292]/50 bg-white"}
//                     `}
//                   >
//                     <span className="relative z-10">{variant.name}</span>
//                     {selectedVariantIdx === idx && (
//                       <motion.div layoutId="activeVariant" className="absolute inset-0 bg-[#D98292]/5 -z-0" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           <div className="mb-8">
//             <h3 className="font-playfair font-bold text-xl text-[#4E342E] mb-3">Description</h3>
//             <p className="text-[#8D6E63] text-sm leading-8 text-justify">
//               {product.description || `Indulge in the sweet and creamy delight of our ${product.name}. Crafted with the finest ingredients and a rich, buttery flavor profile.`}
//             </p>
//           </div>

//           {/* Personalize Info */}
//           <div className="mb-10 bg-[#FFF8F3] p-5 rounded-2xl border border-[#D98292]/20 flex gap-4 items-center shadow-sm">
//             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D98292] shadow-sm shrink-0">
//                <Info size={20} />
//             </div>
//             <div>
//               <h4 className="font-bold text-[#4E342E] text-sm">Personalize Your Order</h4>
//               <p className="text-xs text-[#8D6E63] mt-1 leading-relaxed">
//                 You can add a personalized message or special instructions on the <strong>Cart Page</strong> before checkout.
//               </p>
//             </div>
//           </div>

//           {/* Quality Icons */}
//           <div className="grid grid-cols-3 gap-4 mb-12 pb-10 border-b border-[#F2E3DB]">
//             <div className="flex flex-col items-center text-center gap-2 group">
//               <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
//                 <Award size={28} />
//               </div>
//               <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">Premium<br/>Quality</span>
//             </div>
//             <div className="flex flex-col items-center text-center gap-2 group">
//               <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
//                 <ShieldCheck size={28} />
//               </div>
//               <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">100%<br/>Hygienic</span>
//             </div>
//             <div className="flex flex-col items-center text-center gap-2 group">
//               <div className="w-14 h-14 rounded-2xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292] group-hover:scale-110 transition-transform shadow-sm">
//                 <CheckCircle2 size={28} />
//               </div>
//               <span className="text-[10px] font-bold text-[#4E342E] uppercase tracking-wide">Freshly<br/>Baked</span>
//             </div>
//           </div>

//           {/* Reviews Section */}
//           <div id="reviews">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="font-playfair font-bold text-2xl text-[#4E342E] flex items-center gap-2">
//                 Reviews <span className="text-sm font-sans font-normal text-[#8D6E63]">({product.reviewsCount || 0})</span>
//               </h3>
              
//               {canReview && !isWritingReview && (
//                 <button 
//                   onClick={() => setIsWritingReview(true)} 
//                   className="text-xs font-bold text-[#D98292] border border-[#D98292] px-4 py-2 rounded-full hover:bg-[#D98292] hover:text-white transition-all flex items-center gap-2"
//                 >
//                   <PenLine size={14} /> Write a Review
//                 </button>
//               )}
//             </div>

//             <AnimatePresence>
//               {isWritingReview && (
//                 <motion.div 
//                   initial={{ height: 0, opacity: 0 }} 
//                   animate={{ height: "auto", opacity: 1 }} 
//                   exit={{ height: 0, opacity: 0 }} 
//                   className="overflow-hidden mb-8 bg-[#FFF8F3] rounded-2xl border border-[#F2E3DB] p-6"
//                 >
//                   <h4 className="font-bold text-[#4E342E] mb-4">Rate this Delight</h4>
//                   <div className="flex gap-2 mb-4">
//                     {[1,2,3,4,5].map(star => (
//                       <button key={star} onClick={() => setReviewForm({...reviewForm, rating: star})}>
//                         <Star size={24} className={`${star <= reviewForm.rating ? "fill-[#D98292] text-[#D98292]" : "text-[#D98292]/30"}`} />
//                       </button>
//                     ))}
//                   </div>
//                   <textarea 
//                     placeholder="What did you like about it?" 
//                     value={reviewForm.comment}
//                     onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
//                     className="w-full p-3 rounded-xl border border-[#F2E3DB] text-sm focus:outline-none focus:border-[#D98292] mb-4 h-24"
//                   ></textarea>
//                   <div className="flex gap-3 justify-end">
//                     <button onClick={() => setIsWritingReview(false)} className="text-sm text-[#8D6E63] font-bold px-4 py-2">Cancel</button>
//                     <button onClick={handleReviewSubmit} disabled={submittingReview} className="bg-[#D98292] text-white text-sm font-bold px-6 py-2 rounded-xl shadow-lg hover:bg-[#c46b7d] disabled:opacity-50">
//                       {submittingReview ? "Submitting..." : "Submit Review"}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
            
//             {allReviews.length === 0 ? (
//               <p className="text-[#8D6E63] italic text-sm">No reviews yet. Be the first to taste!</p>
//             ) : (
//               <div className="space-y-4">
//                 {currentReviews.map((review: any, i) => (
//                   <div key={i} className="border-b border-[#F2E3DB] pb-4 last:border-0">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-[#4E342E] text-white flex items-center justify-center font-bold text-xs">
//                           {review.user ? review.user[0] : "C"}
//                         </div>
//                         <div>
//                           <span className="font-bold text-[#4E342E] text-sm block">{review.user || "Customer"}</span>
//                           <div className="flex gap-0.5 mt-0.5">
//                              {[1,2,3,4,5].map(star => (
//                                <Star key={star} size={8} className={`${star <= (review.rating || 5) ? "fill-[#D98292] text-[#D98292]" : "text-[#F2E3DB]"}`} />
//                              ))}
//                           </div>
//                         </div>
//                       </div>
//                       <span className="text-[10px] text-[#8D6E63] bg-[#FFF8F3] px-2 py-1 rounded-full">
//                         {new Date(review.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <p className="text-xs text-[#8D6E63] leading-relaxed mt-2 pl-10">
//                       {review.comment}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {totalReviewPages > 1 && (
//               <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-[#F2E3DB] border-dashed">
//                 <button 
//                   onClick={() => setReviewPage(p => Math.max(1, p - 1))}
//                   disabled={reviewPage === 1}
//                   className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-30 hover:bg-[#FFF8F3]"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <span className="text-sm font-bold text-[#8D6E63]">Page {reviewPage} of {totalReviewPages}</span>
//                 <button 
//                   onClick={() => setReviewPage(p => Math.min(totalReviewPages, p + 1))}
//                   disabled={reviewPage === totalReviewPages}
//                   className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-30 hover:bg-[#FFF8F3]"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* FLOATING ACTION BUTTONS CONTAINER */}
//       <div className="fixed bottom-6 left-0 w-full z-40 px-4 pointer-events-none">
//         <div className="max-w-7xl mx-auto flex gap-4">
          
//           {/* Add to Cart */}
//           <div className="flex-1 pointer-events-auto">
//             <motion.button 
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleAddToCart}
//               className="h-14 w-full bg-white border-2 border-[#4E342E] text-[#4E342E] font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
//             >
//               <ShoppingCart size={20} /> Add to Cart
//             </motion.button>
//           </div>

//           {/* Order Now */}
//           <div className="flex-1 pointer-events-auto">
//             <motion.button 
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleOrderNow}
//               className="h-14 w-full bg-[#D98292] border-2 border-[#D98292] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-[#c46b7d] hover:border-[#c46b7d] hover:shadow-2xl transition-all duration-300"
//             >
//               Order Now <ChevronRight size={20} />
//             </motion.button>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }













"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Heart, Award, Info, ShoppingCart, ChevronRight, CheckCircle2, ChevronLeft, PenLine, ArrowLeft, Trash2, Edit2, X, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Toast } from "@/components/ui/Toast";
import { useSession } from "next-auth/react";
import Link from "next/link"; 

interface ProductVariant {
  name: string;
  price: number;
}

interface Review {
  _id: string;
  user: string;
  userEmail?: string;
  rating: number;
  comment: string;
  date: string;
  isEdited?: boolean;
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
  const { data: session } = useSession();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });
  
  // Review System States
  const [reviewPage, setReviewPage] = useState(1);
  const [canReview, setCanReview] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Edit State
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");

  const isAdmin = (session?.user as any)?.role === "admin";

  useEffect(() => {
    async function fetchData() {
      try {
        const productRes = await fetch(`/api/products/${id}`);
        const productData = await productRes.json();
        if (productData.success) setProduct(productData.product);

        if (session) {
          const eligibilityRes = await fetch(`/api/products/${id}/review`);
          const eligibilityData = await eligibilityRes.json();
          if (eligibilityData.canReview) setCanReview(true);
        }
      } catch (e) {
        console.error("Error loading page data");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id, session]);

  const handleReviewSubmit = async () => {
    if (!reviewForm.comment.trim()) {
      setToast({ show: true, message: "Please write a comment", type: "error" });
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/products/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      
      if (data.success) {
        setToast({ show: true, message: "Review Submitted!", type: "success" });
        setProduct(prev => prev ? { ...prev, reviews: [data.newReview, ...prev.reviews], reviewsCount: prev.reviewsCount + 1 } : null);
        setIsWritingReview(false);
        setCanReview(false); 
      } else {
        setToast({ show: true, message: data.error || "Failed to submit review", type: "error" });
      }
    } catch (e) {
      setToast({ show: true, message: "Server Error", type: "error" });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`/api/products/${id}/review`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: "Review Deleted", type: "success" });
        setProduct(prev => prev ? {
          ...prev,
          reviews: prev.reviews.filter(r => r._id !== reviewId),
          reviewsCount: Math.max(0, prev.reviewsCount - 1)
        } : null);
      } else {
        setToast({ show: true, message: "Failed to delete", type: "error" });
      }
    } catch (e) {
      setToast({ show: true, message: "Error deleting review", type: "error" });
    }
  };

  const startEditing = (review: Review) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
  };

  const saveEdit = async () => {
    if (!window.confirm("Are you sure you want to save changes to your review?")) return;
    
    try {
      const res = await fetch(`/api/products/${id}/review`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editComment }), // Add rating here if you want to allow rating edit
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: "Review Updated", type: "success" });
        setProduct(prev => prev ? {
          ...prev,
          reviews: prev.reviews.map(r => r._id === editingReviewId ? { ...r, comment: editComment, isEdited: true } : r)
        } : null);
        setEditingReviewId(null);
      } else {
        setToast({ show: true, message: "Failed to update", type: "error" });
      }
    } catch (e) {
      setToast({ show: true, message: "Error updating", type: "error" });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63] font-playfair animate-pulse">Loading Delight...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-[#8D6E63]">Product not found.</div>;

  const hasVariants = product.variants && product.variants.length > 0;
  const activePrice = hasVariants ? product.variants[selectedVariantIdx].price : product.basePrice;
  
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
    <div className="min-h-screen bg-[#FFF8F3] pb-32">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
      {/* Back to Menu Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 left-4 z-50 md:left-8"
      >
        <Link href="/menu">
          <button className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#F2E3DB] px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#D98292]/50">
            <ArrowLeft size={16} className="text-[#8D6E63] group-hover:text-[#D98292] transition-colors" />
            <span className="text-sm font-bold text-[#4E342E] group-hover:text-[#D98292] transition-colors">
              Back to Menu
            </span>
          </button>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)] pt-12 lg:pt-0">
          
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
                {product.reviewsCount > 0 ? product.averageRating : "0.0"} <Star size={10} className="fill-[#D98292] text-[#D98292]" />
              </div>
              <span className="text-[#8D6E63] text-sm font-medium border-b border-[#D98292]/30 pb-0.5">
                {product.reviewsCount || 0} verified ratings
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

          {/* Reviews Section */}
          <div id="reviews">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair font-bold text-2xl text-[#4E342E] flex items-center gap-2">
                Reviews <span className="text-sm font-sans font-normal text-[#8D6E63]">({product.reviewsCount || 0})</span>
              </h3>
              
              {canReview && !isWritingReview && (
                <button 
                  onClick={() => setIsWritingReview(true)} 
                  className="text-xs font-bold text-[#D98292] border border-[#D98292] px-4 py-2 rounded-full hover:bg-[#D98292] hover:text-white transition-all flex items-center gap-2"
                >
                  <PenLine size={14} /> Write a Review
                </button>
              )}
            </div>

            {/* WRITE REVIEW FORM */}
            <AnimatePresence>
              {isWritingReview && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: "auto", opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  className="overflow-hidden mb-8 bg-[#FFF8F3] rounded-2xl border border-[#F2E3DB] p-6"
                >
                  <h4 className="font-bold text-[#4E342E] mb-4">Rate this Delight</h4>
                  <div className="flex gap-2 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} onClick={() => setReviewForm({...reviewForm, rating: star})}>
                        <Star size={24} className={`${star <= reviewForm.rating ? "fill-[#D98292] text-[#D98292]" : "text-[#D98292]/30"}`} />
                      </button>
                    ))}
                  </div>
                  <textarea 
                    placeholder="What did you like about it?" 
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    className="w-full p-3 rounded-xl border border-[#F2E3DB] text-sm focus:outline-none focus:border-[#D98292] mb-4 h-24"
                  ></textarea>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setIsWritingReview(false)} className="text-sm text-[#8D6E63] font-bold px-4 py-2">Cancel</button>
                    <button onClick={handleReviewSubmit} disabled={submittingReview} className="bg-[#D98292] text-white text-sm font-bold px-6 py-2 rounded-xl shadow-lg hover:bg-[#c46b7d] disabled:opacity-50">
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* REVIEWS LIST */}
            {allReviews.length === 0 ? (
              <p className="text-[#8D6E63] italic text-sm">No reviews yet. Be the first to taste!</p>
            ) : (
              <div className="space-y-4">
                {currentReviews.map((review: any, i) => (
                  <div key={i} className="border-b border-[#F2E3DB] pb-4 last:border-0 relative group/review">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#4E342E] text-white flex items-center justify-center font-bold text-xs">
                          {review.user ? review.user[0] : "C"}
                        </div>
                        <div>
                          <span className="font-bold text-[#4E342E] text-sm block">{review.user || "Customer"}</span>
                          <div className="flex gap-0.5 mt-0.5 items-center">
                             {[1,2,3,4,5].map(star => (
                               <Star key={star} size={8} className={`${star <= (review.rating || 5) ? "fill-[#D98292] text-[#D98292]" : "text-[#F2E3DB]"}`} />
                             ))}
                             {review.isEdited && <span className="text-[9px] text-[#8D6E63] ml-1 opacity-70">(edited)</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#8D6E63] bg-[#FFF8F3] px-2 py-1 rounded-full">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                        
                        {/* Actions for User (Edit) & Admin (Delete) */}
                        <div className="flex gap-1">
                          {session?.user?.email === review.userEmail && editingReviewId !== review._id && (
                            <button 
                              onClick={() => startEditing(review)}
                              className="p-1.5 text-[#8D6E63] hover:text-[#D98292] hover:bg-[#FFF8F3] rounded-full transition-colors"
                              title="Edit Review"
                            >
                              <Edit2 size={12} />
                            </button>
                          )}
                          {isAdmin && (
                            <button 
                              onClick={() => handleDeleteReview(review._id)}
                              className="p-1.5 text-[#8D6E63] hover:text-red-500 hover:bg-[#FFF8F3] rounded-full transition-colors"
                              title="Delete Review"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* EDIT MODE vs DISPLAY MODE */}
                    {editingReviewId === review._id ? (
                      <div className="mt-2 animate-in fade-in zoom-in-95">
                        <textarea 
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full p-2 rounded-lg border border-[#D98292] text-xs focus:outline-none bg-[#FFF8F3] text-[#4E342E]"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2 justify-end">
                          <button onClick={() => setEditingReviewId(null)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                            <X size={14} className="text-gray-500" />
                          </button>
                          <button onClick={saveEdit} className="p-1 bg-[#D98292] rounded hover:bg-[#c46b7d]">
                            <Check size={14} className="text-white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8D6E63] leading-relaxed mt-2 pl-10 break-words">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

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

      {/* FLOATING ACTION BUTTONS CONTAINER */}
      <div className="fixed bottom-6 left-0 w-full z-40 px-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex gap-4">
          
          {/* Add to Cart */}
          <div className="flex-1 pointer-events-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="h-14 w-full bg-white border-2 border-[#4E342E] text-[#4E342E] font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>
          </div>

          {/* Order Now */}
          <div className="flex-1 pointer-events-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderNow}
              className="h-14 w-full bg-[#D98292] border-2 border-[#D98292] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-[#c46b7d] hover:border-[#c46b7d] hover:shadow-2xl transition-all duration-300"
            >
              Order Now <ChevronRight size={20} />
            </motion.button>
          </div>

        </div>
      </div>

    </div>
  );
}