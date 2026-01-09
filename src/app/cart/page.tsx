// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSession } from "next-auth/react"; 
// import {
//   Trash2, Plus, Minus, MapPin, Navigation, ArrowRight,
//   Phone, Mail, Edit2, Check, LogIn, AlertCircle
// } from "lucide-react";
// import Link from "next/link";
// import {
//   calculateDistance,
//   KITCHEN_COORDS,
//   DELIVERY_RATE_PER_KM,
//   MIN_DELIVERY_CHARGE,
// } from "@/lib/utils";

// export default function CartPage() {
//   const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
//   const { data: session } = useSession(); 
//   const router = useRouter();

//   // States
//   const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
//   const [isLocating, setIsLocating] = useState(false);
//   const [address, setAddress] = useState("");
//   const [locError, setLocError] = useState("");
//   const [isOrdering, setIsOrdering] = useState(false);
//   const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
//   const [contactErrors, setContactErrors] = useState({ phone: "", email: "" }); 
//   const [isEditingContact, setIsEditingContact] = useState(false);
  
//   // NEW: Modal State for Order Success
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Auto-fill Contact & Address
//   useEffect(() => {
//     if (session?.user) {
//       setContactInfo({
//         phone: (session.user as any).phone || "",
//         email: session.user.email || ""
//       });
//       fetchSavedAddress();
//     }
//   }, [session]);

//   const fetchSavedAddress = async () => {
//     try {
//       const res = await fetch("/api/user/profile");
//       const data = await res.json();
//       if (data.success && data.user.address) {
//         setAddress(data.user.address);
//       }
//     } catch (e) { console.error("Address fetch failed"); }
//   };

//   const deliveryCharge = deliveryDistance
//     ? Math.max(Math.round(deliveryDistance * DELIVERY_RATE_PER_KM), MIN_DELIVERY_CHARGE)
//     : 0;

//   const grandTotal = cartTotal + deliveryCharge;

//   const handleGetLocation = () => {
//     setIsLocating(true);
//     setLocError("");
//     if (!navigator.geolocation) {
//       setLocError("Geolocation not supported.");
//       setIsLocating(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const dist = calculateDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, latitude, longitude);
//         setDeliveryDistance(dist);
//         setIsLocating(false);
//       },
//       () => {
//         setLocError("Unable to retrieve location.");
//         setIsLocating(false);
//       }
//     );
//   };

//   const validateContact = () => {
//     let isValid = true;
//     const errors = { phone: "", email: "" };
//     const phoneRegex = /^\d{10}$/;
//     if (!contactInfo.phone || !phoneRegex.test(contactInfo.phone)) {
//       errors.phone = "Phone number must be exactly 10 digits";
//       isValid = false;
//     }
//     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     if (!contactInfo.email || !gmailRegex.test(contactInfo.email)) {
//       errors.email = "Please enter a valid @gmail.com address";
//       isValid = false;
//     }
//     setContactErrors(errors);
//     return isValid;
//   };

//   const handleOrder = async () => {
//     if (!session) {
//       router.push("/login?callbackUrl=/cart");
//       return;
//     }
//     if (!validateContact()) {
//       setIsEditingContact(true); 
//       return;
//     }
//     if (!deliveryDistance || !address) return;
    
//     setIsOrdering(true);

//     const customerName = session.user?.name || "Valued Customer";

//     try {
//       const res = await fetch("/api/order/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customerDetails: { 
//             address, 
//             phone: contactInfo.phone, 
//             email: contactInfo.email,
//             name: customerName 
//           },
//           items,
//           bill: {
//             itemTotal: cartTotal,
//             deliveryCharge,
//             distance: deliveryDistance,
//             grandTotal,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         const phoneNumber = "919653126427"; 
//         let message = `*Hi Ciste Blasta! I want to place an order.*\n\n`;
//         message += `👤 *Customer:* ${customerName}\n`;
//         message += `📞 *Phone:* ${contactInfo.phone}\n`;
//         message += `📍 *Delivery Location:* ${address}\n`;
//         message += `----------------------------\n`;
//         items.forEach((item) => {
//           message += `▫️ ${item.quantity} x ${item.name} (${item.variant || "Std"}) - ₹${item.price * item.quantity}\n`;
//         });
//         message += `----------------------------\n`;
//         message += `🚚 Delivery (${deliveryDistance.toFixed(1)} km): ₹${deliveryCharge}\n`;
//         message += `💰 *Total Amount: ₹${grandTotal}*\n\n`;
//         message += `Order ID: ${data.orderId.slice(-6)}`; 

//         window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

//         clearCart();
//         setShowSuccessModal(true);
//       }
//     } catch (error) {
//       console.error("Order failed", error);
//       alert("Something went wrong.");
//     } finally {
//       setIsOrdering(false);
//     }
//   };

//   if (items.length === 0 && !showSuccessModal) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
//         <div className="w-24 h-24 bg-[#FFF8F3] rounded-full flex items-center justify-center mb-6">
//           <MapPin size={40} className="text-[#D98292] opacity-50" />
//         </div>
//         <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">Your cart is empty</h2>
//         <p className="text-[#8D6E63] mb-8">Looks like you haven't made your choice yet.</p>
//         <Link href="/menu" className="bg-[#D98292] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c46b7d] transition-colors shadow-lg">Browse Menu</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl relative">
//       <AnimatePresence>
//         {showSuccessModal && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
//               className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center"
//             >
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Check className="w-10 h-10 text-green-600" />
//               </div>
//               <h2 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Order Placed!</h2>
//               <p className="text-[#8D6E63] mb-8">
//                 Your order details have been sent to WhatsApp. Please complete the conversation there to finalize payment.
//               </p>
//               <Link href="/menu">
//                 <button className="w-full py-4 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all">
//                   Continue Shopping
//                 </button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E] mb-8 flex items-center gap-3">
//         Your Cart <span className="text-lg text-[#8D6E63] font-sans font-normal">({items.length} items)</span>
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
//         <div className="lg:col-span-2 space-y-6">
//           <AnimatePresence>
//             {items.map((item) => (
//               <motion.div
//                 key={`${item.productId}-${item.variant}`}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 className="flex gap-4 md:gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[#F2E3DB]"
//               >
//                 <div className="h-24 w-24 shrink-0 rounded-xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292]/30 font-playfair font-bold text-2xl relative overflow-hidden">
//                    {item.name.charAt(0)}
//                 </div>
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="font-bold text-[#4E342E] text-lg leading-tight">{item.name}</h3>
//                     <p className="text-sm text-[#8D6E63] mt-1">
//                       {item.variant ? item.variant : "Standard"}
//                       {item.category === "GIFT_BOX" && " • Box"}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between mt-3">
//                     <div className="font-bold text-[#4E342E]">₹{item.price * item.quantity}</div>
//                     <div className="flex items-center gap-3 bg-[#FFF8F3] rounded-lg p-1">
//                       <button onClick={() => item.quantity === 1 ? removeFromCart(item.productId, item.variant) : updateQuantity(item.productId, item.variant, -1)} className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]">
//                         {item.quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} />}
//                       </button>
//                       <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.productId, item.variant, 1)} className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]">
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         <div className="space-y-6">
//           {session ? (
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] space-y-4">
//               <h3 className="font-playfair font-bold text-xl text-[#4E342E]">Delivery Details</h3>
//               <div className="space-y-3 pb-4 border-b border-[#F2E3DB]">
//                 <div className="flex justify-between items-center"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Contact Info</label><button onClick={() => setIsEditingContact(!isEditingContact)} className="text-xs font-bold text-[#D98292] flex items-center gap-1 hover:underline">{isEditingContact ? <><Check size={12}/> Done</> : <><Edit2 size={12}/> Change</>}</button></div>
//                 <div className="space-y-1"><div className="relative"><Phone className="absolute left-3 top-3 text-[#D98292]" size={16} /><input type="tel" placeholder="Phone Number" value={contactInfo.phone} onChange={(e) => { setContactInfo({...contactInfo, phone: e.target.value}); setContactErrors({...contactErrors, phone: ""}); }} disabled={!isEditingContact} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${contactErrors.phone ? "border-red-500 bg-red-50" : isEditingContact ? "bg-white border-[#D98292] text-[#4E342E]" : "bg-[#FFF8F3] border-[#F2E3DB] text-[#8D6E63] cursor-not-allowed"}`} /></div>{contactErrors.phone && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {contactErrors.phone}</p>}</div>
//                 <div className="space-y-1"><div className="relative"><Mail className="absolute left-3 top-3 text-[#D98292]" size={16} /><input type="email" placeholder="Email Address" value={contactInfo.email} onChange={(e) => { setContactInfo({...contactInfo, email: e.target.value}); setContactErrors({...contactErrors, email: ""}); }} disabled={!isEditingContact} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${contactErrors.email ? "border-red-500 bg-red-50" : isEditingContact ? "bg-white border-[#D98292] text-[#4E342E]" : "bg-[#FFF8F3] border-[#F2E3DB] text-[#8D6E63] cursor-not-allowed"}`} /></div>{contactErrors.email && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {contactErrors.email}</p>}</div>
//               </div>
//               <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Location</label>{!deliveryDistance ? (<button onClick={handleGetLocation} disabled={isLocating} className="w-full py-3 border-2 border-dashed border-[#D98292] text-[#D98292] font-bold rounded-xl hover:bg-[#D98292]/5 transition-colors flex items-center justify-center gap-2">{isLocating ? <span className="animate-pulse">Locating...</span> : <> <Navigation size={18} /> Detect My Location </>}</button>) : (<div className="flex items-center justify-between bg-[#effaf0] border border-green-200 p-3 rounded-xl"><span className="text-green-700 text-sm font-bold flex items-center gap-2"><MapPin size={16} /> {deliveryDistance.toFixed(1)} km away</span><button onClick={() => setDeliveryDistance(null)} className="text-xs text-green-700 underline">Change</button></div>)}{locError && <p className="text-xs text-red-500">{locError}</p>}</div>
//               <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Full Address</label><textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat No, Building Name, Landmark..." rows={2} className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"></textarea></div>
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F2E3DB] text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8F3] text-[#D98292] mb-4"><LogIn size={24} /></div><h3 className="font-playfair font-bold text-xl text-[#4E342E] mb-2">Login to Checkout</h3><p className="text-sm text-[#8D6E63] mb-6">Please sign in to place your order. This helps us track your delivery.</p><Link href="/login?callbackUrl=/cart" className="block w-full py-3 bg-[#4E342E] text-white font-bold rounded-xl shadow hover:bg-[#3d2924] transition-all">Login / Signup</Link></div>
//           )}
//           <div className="bg-[#FFF8F3] p-6 rounded-2xl border border-[#F2E3DB] space-y-4"><h3 className="font-playfair font-bold text-xl text-[#4E342E]">Order Summary</h3><div className="space-y-2 text-sm text-[#4E342E]/80"><div className="flex justify-between"><span>Item Total</span><span className="font-bold">₹{cartTotal}</span></div><div className="flex justify-between"><span>Delivery Charges</span><span className={deliveryDistance ? "font-bold" : "text-[#8D6E63] italic"}>{deliveryDistance ? `₹${deliveryCharge}` : "Calculated at checkout"}</span></div></div><div className="h-px bg-[#F2E3DB] w-full" /><div className="flex justify-between text-lg font-bold text-[#4E342E]"><span>Grand Total</span><span>₹{grandTotal}</span></div>{session ? (<button onClick={handleOrder} disabled={!deliveryDistance || !address || !contactInfo.phone || !contactInfo.email || isOrdering} className="w-full py-4 mt-2 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">{isOrdering ? <span className="animate-pulse">Processing...</span> : <> Order Now <ArrowRight size={18} /> </>}</button>) : (<Link href="/login?callbackUrl=/cart" className="block w-full py-4 mt-2 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] text-center">Login to Order</Link>)}</div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react"; 
import {
  Trash2, Plus, Minus, MapPin, Navigation, ArrowRight,
  Phone, Mail, Edit2, Check, LogIn, AlertCircle, Info
} from "lucide-react";
import { Toast } from "@/components/ui/Toast"; // Imported Toast
import Link from "next/link";
import {
  calculateDistance,
  KITCHEN_COORDS,
  DELIVERY_RATE_PER_KM,
  MIN_DELIVERY_CHARGE,
} from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { data: session } = useSession(); 
  const router = useRouter();

  // States
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [address, setAddress] = useState("");
  const [locError, setLocError] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [contactErrors, setContactErrors] = useState({ phone: "", email: "" }); 
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [instructions, setInstructions] = useState(""); 
  
  // UI States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" }); // Toast State

  // Auto-fill Contact & Address
  useEffect(() => {
    if (session?.user) {
      setContactInfo({
        phone: (session.user as any).phone || "",
        email: session.user.email || ""
      });
      fetchSavedAddress();
    }
  }, [session]);

  const fetchSavedAddress = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success && data.user.address) {
        setAddress(data.user.address);
      }
    } catch (e) { console.error("Address fetch failed"); }
  };

  const deliveryCharge = deliveryDistance
    ? Math.max(Math.round(deliveryDistance * DELIVERY_RATE_PER_KM), MIN_DELIVERY_CHARGE)
    : 0;

  const grandTotal = cartTotal + deliveryCharge;

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported.");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, latitude, longitude);
        setDeliveryDistance(dist);
        setIsLocating(false);
      },
      () => {
        setLocError("Unable to retrieve location.");
        setIsLocating(false);
      }
    );
  };

  const validateContact = () => {
    let isValid = true;
    const errors = { phone: "", email: "" };
    const phoneRegex = /^\d{10}$/;
    if (!contactInfo.phone || !phoneRegex.test(contactInfo.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!contactInfo.email || !gmailRegex.test(contactInfo.email)) {
      errors.email = "Please enter a valid @gmail.com address";
      isValid = false;
    }
    setContactErrors(errors);
    return isValid;
  };

  const handleOrder = async () => {
    if (!session) {
      router.push("/login?callbackUrl=/cart");
      return;
    }

    // --- VALIDATION START ---
    
    // 1. Check Contact Info
    if (!validateContact()) {
      setIsEditingContact(true);
      setToast({ show: true, message: "Please fix contact info errors.", type: "error" });
      return;
    }

    // 2. Check Location (Compulsory)
    if (!deliveryDistance) {
      setToast({ show: true, message: "Please detect your location for delivery.", type: "error" });
      return;
    }

    // 3. Check Address (Compulsory)
    if (!address.trim()) {
      setToast({ show: true, message: "Full address is required.", type: "error" });
      return;
    }

    // --- VALIDATION END ---
    
    setIsOrdering(true);

    const customerName = session.user?.name || "Valued Customer";

    try {
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: { 
            address, 
            phone: contactInfo.phone, 
            email: contactInfo.email,
            name: customerName 
          },
          items,
          instructions,
          bill: {
            itemTotal: cartTotal,
            deliveryCharge,
            distance: deliveryDistance,
            grandTotal,
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        const phoneNumber = "919653126427"; 
        let message = `*Hi Ciste Blasta! I want to place an order.*\n\n`;
        message += `👤 *Customer:* ${customerName}\n`;
        message += `📞 *Phone:* ${contactInfo.phone}\n`;
        message += `📍 *Delivery Location:* ${address}\n`;
        message += `----------------------------\n`;
        items.forEach((item) => {
          message += `▫️ ${item.quantity} x ${item.name} (${item.variant || "Std"}) - ₹${item.price * item.quantity}\n`;
        });
        message += `----------------------------\n`;
        if (instructions) message += `📝 *Note:* ${instructions}\n`;
        message += `🚚 Delivery (${deliveryDistance.toFixed(1)} km): ₹${deliveryCharge}\n`;
        message += `💰 *Total Amount: ₹${grandTotal}*\n\n`;
        message += `Order ID: ${data.orderId.slice(-6)}`; 

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

        clearCart();
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Order failed", error);
      setToast({ show: true, message: "Something went wrong.", type: "error" });
    } finally {
      setIsOrdering(false);
    }
  };

  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-[#FFF8F3] rounded-full flex items-center justify-center mb-6">
          <MapPin size={40} className="text-[#D98292] opacity-50" />
        </div>
        <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">Your cart is empty</h2>
        <p className="text-[#8D6E63] mb-8">Looks like you haven't made your choice yet.</p>
        <Link href="/menu" className="bg-[#D98292] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c46b7d] transition-colors shadow-lg">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl relative">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Order Placed!</h2>
              <p className="text-[#8D6E63] mb-8">
                Your order details have been sent to WhatsApp. Please complete the conversation there to finalize payment.
              </p>
              <Link href="/menu">
                <button className="w-full py-4 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E] mb-8 flex items-center gap-3">
        Your Cart <span className="text-lg text-[#8D6E63] font-sans font-normal">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {/* List of Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.variant}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 md:gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[#F2E3DB]"
                >
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292]/30 font-playfair font-bold text-2xl relative overflow-hidden">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#4E342E] text-lg leading-tight">{item.name}</h3>
                      <p className="text-sm text-[#8D6E63] mt-1">
                        {item.variant ? item.variant : "Standard"}
                        {item.category === "GIFT_BOX" && " • Box"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="font-bold text-[#4E342E]">₹{item.price * item.quantity}</div>
                      <div className="flex items-center gap-3 bg-[#FFF8F3] rounded-lg p-1">
                        <button onClick={() => item.quantity === 1 ? removeFromCart(item.productId, item.variant) : updateQuantity(item.productId, item.variant, -1)} className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]">
                          {item.quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} />}
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.variant, 1)} className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Special Instructions Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-2">
               <Info size={14} /> Special Instructions <span className="text-[#D98292] lowercase italic font-normal">(optional)</span>
             </label>
             <textarea 
               rows={2}
               value={instructions}
               onChange={(e) => setInstructions(e.target.value)}
               placeholder="e.g. Write 'Happy Birthday' or 'Less Sugar'..."
               className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 resize-none"
             ></textarea>
             <p className="text-[10px] text-[#8D6E63]">Any message or customization request for this order.</p>
          </div>
        </div>

        <div className="space-y-6">
          {session ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] space-y-4">
              <h3 className="font-playfair font-bold text-xl text-[#4E342E]">Delivery Details</h3>
              <div className="space-y-3 pb-4 border-b border-[#F2E3DB]">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                    Contact Info <span className="text-red-500">*</span>
                  </label>
                  <button onClick={() => setIsEditingContact(!isEditingContact)} className="text-xs font-bold text-[#D98292] flex items-center gap-1 hover:underline">{isEditingContact ? <><Check size={12}/> Done</> : <><Edit2 size={12}/> Change</>}</button>
                </div>
                
                <div className="space-y-1">
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-[#D98292]" size={16} />
                    <input type="tel" placeholder="Phone Number" value={contactInfo.phone} onChange={(e) => { setContactInfo({...contactInfo, phone: e.target.value}); setContactErrors({...contactErrors, phone: ""}); }} disabled={!isEditingContact} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${contactErrors.phone ? "border-red-500 bg-red-50" : isEditingContact ? "bg-white border-[#D98292] text-[#4E342E]" : "bg-[#FFF8F3] border-[#F2E3DB] text-[#8D6E63] cursor-not-allowed"}`} />
                  </div>
                  {contactErrors.phone && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {contactErrors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-[#D98292]" size={16} />
                    <input type="email" placeholder="Email Address" value={contactInfo.email} onChange={(e) => { setContactInfo({...contactInfo, email: e.target.value}); setContactErrors({...contactErrors, email: ""}); }} disabled={!isEditingContact} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${contactErrors.email ? "border-red-500 bg-red-50" : isEditingContact ? "bg-white border-[#D98292] text-[#4E342E]" : "bg-[#FFF8F3] border-[#F2E3DB] text-[#8D6E63] cursor-not-allowed"}`} />
                  </div>
                  {contactErrors.email && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {contactErrors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                  Location <span className="text-red-500">*</span>
                </label>
                {!deliveryDistance ? (
                  <button onClick={handleGetLocation} disabled={isLocating} className="w-full py-3 border-2 border-dashed border-[#D98292] text-[#D98292] font-bold rounded-xl hover:bg-[#D98292]/5 transition-colors flex items-center justify-center gap-2">{isLocating ? <span className="animate-pulse">Locating...</span> : <> <Navigation size={18} /> Detect My Location </>}</button>
                ) : (
                  <div className="flex items-center justify-between bg-[#effaf0] border border-green-200 p-3 rounded-xl">
                    <span className="text-green-700 text-sm font-bold flex items-center gap-2"><MapPin size={16} /> {deliveryDistance.toFixed(1)} km away</span>
                    <button onClick={() => setDeliveryDistance(null)} className="text-xs text-green-700 underline">Change</button>
                  </div>
                )}
                {locError && <p className="text-xs text-red-500">{locError}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat No, Building Name, Landmark..." rows={2} className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"></textarea>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F2E3DB] text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8F3] text-[#D98292] mb-4"><LogIn size={24} /></div><h3 className="font-playfair font-bold text-xl text-[#4E342E] mb-2">Login to Checkout</h3><p className="text-sm text-[#8D6E63] mb-6">Please sign in to place your order. This helps us track your delivery.</p><Link href="/login?callbackUrl=/cart" className="block w-full py-3 bg-[#4E342E] text-white font-bold rounded-xl shadow hover:bg-[#3d2924] transition-all">Login / Signup</Link></div>
          )}
          <div className="bg-[#FFF8F3] p-6 rounded-2xl border border-[#F2E3DB] space-y-4"><h3 className="font-playfair font-bold text-xl text-[#4E342E]">Order Summary</h3><div className="space-y-2 text-sm text-[#4E342E]/80"><div className="flex justify-between"><span>Item Total</span><span className="font-bold">₹{cartTotal}</span></div><div className="flex justify-between"><span>Delivery Charges</span><span className={deliveryDistance ? "font-bold" : "text-[#8D6E63] italic"}>{deliveryDistance ? `₹${deliveryCharge}` : "Calculated at checkout"}</span></div></div><div className="h-px bg-[#F2E3DB] w-full" /><div className="flex justify-between text-lg font-bold text-[#4E342E]"><span>Grand Total</span><span>₹{grandTotal}</span></div>{session ? (
            
            // MODIFIED: Button is enabled to allow validation check
            <button 
              onClick={handleOrder} 
              disabled={isOrdering} 
              className="w-full py-4 mt-2 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isOrdering ? <span className="animate-pulse">Processing...</span> : <> Order Now <ArrowRight size={18} /> </>}
            </button>

          ) : (<Link href="/login?callbackUrl=/cart" className="block w-full py-4 mt-2 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] text-center">Login to Order</Link>)}</div>
        </div>
      </div>
    </div>
  );
}