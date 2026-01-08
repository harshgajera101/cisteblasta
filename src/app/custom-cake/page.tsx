// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Upload, ArrowRight, Cake, CheckCircle, Smartphone, Calendar, User, Info, Mail, Loader2, Check, MapPin, Navigation } from "lucide-react";
// import { Toast } from "@/components/ui/Toast";
// import { calculateDistance, KITCHEN_COORDS, DELIVERY_RATE_PER_KM, MIN_DELIVERY_CHARGE } from "@/lib/utils";

// export default function CustomCakePage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
  
//   // Form State
//   const [form, setForm] = useState({
//     name: "", phone: "", email: "", date: "", 
//     weight: "1.0 kg", flavor: "Chocolate Truffle", instructions: "",
//     address: ""
//   });

//   // Location State
//   const [locationState, setLocationState] = useState({
//     distance: 0,
//     deliveryCharge: 0,
//     lat: 0,
//     lng: 0,
//     isLocating: false,
//     error: ""
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

//   // Auto-fill from session & Fetch Saved Address
//   useEffect(() => {
//     if (session?.user) {
//       setForm(prev => ({
//         ...prev,
//         name: session.user?.name || "",
//         email: session.user?.email || "",
//         phone: (session.user as any).phone || ""
//       }));
//       fetchSavedAddress();
//     }
//   }, [session]);

//   const fetchSavedAddress = async () => {
//     try {
//       const res = await fetch("/api/user/profile");
//       const data = await res.json();
//       if (data.success && data.user.address) {
//         setForm(prev => ({ ...prev, address: data.user.address }));
//       }
//     } catch (e) {
//       console.error("Could not fetch saved address");
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//       setSelectedImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleGetLocation = () => {
//     setLocationState(prev => ({ ...prev, isLocating: true, error: "" }));
//     if (!navigator.geolocation) {
//       setLocationState(prev => ({ ...prev, isLocating: false, error: "Geolocation not supported" }));
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const dist = calculateDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, latitude, longitude);
//         const charge = Math.max(Math.round(dist * DELIVERY_RATE_PER_KM), MIN_DELIVERY_CHARGE);
        
//         setLocationState({
//           distance: dist,
//           deliveryCharge: charge,
//           lat: latitude,
//           lng: longitude,
//           isLocating: false,
//           error: ""
//         });
//       },
//       () => setLocationState(prev => ({ ...prev, isLocating: false, error: "Unable to retrieve location" }))
//     );
//   };

//   const validate = () => {
//     if (!form.name.trim()) return "Name is required";
//     if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) return "Enter a valid 10-digit phone number";
//     if (!form.address.trim()) return "Address is required";
//     if (!form.weight) return "Please select a weight";
//     if (!form.flavor) return "Please select a flavor";
//     if (!form.date) return "Please select a date";
//     return null;
//   };

//   const handleSubmit = async () => {
//     const error = validate();
//     if (error) { setToast({ show: true, message: error, type: "error" }); return; }

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("phone", form.phone);
//       formData.append("email", form.email || "guest@custom.com");
//       formData.append("address", form.address);
//       formData.append("weight", form.weight);
//       formData.append("flavor", form.flavor);
//       formData.append("date", form.date);
//       formData.append("instructions", form.instructions);
//       formData.append("deliveryDistance", locationState.distance.toString());
//       formData.append("deliveryCharge", locationState.deliveryCharge.toString());
//       formData.append("lat", locationState.lat.toString());
//       formData.append("lng", locationState.lng.toString());
//       if (imageFile) formData.append("image", imageFile);

//       const res = await fetch("/api/order/custom", { method: "POST", body: formData });
//       const data = await res.json();

//       if (data.success) {
//         setShowSuccessModal(true);
        
//         // Open WhatsApp with Image URL included
//         const phoneNumber = "919653126427"; 
//         let message = `*👋 Hi! I have a Custom Cake Request.*\n\n`;
//         message += `👤 *Name:* ${form.name}\n`;
//         message += `📞 *Phone:* ${form.phone}\n`;
//         message += `📍 *Address:* ${form.address}\n`;
//         message += `🎂 *Flavor:* ${form.flavor}\n`;
//         message += `⚖️ *Weight:* ${form.weight}\n`;
//         message += `📅 *Date Needed:* ${form.date}\n`;
//         if(locationState.distance > 0) message += `🚚 *Est. Delivery:* ₹${locationState.deliveryCharge} (${locationState.distance.toFixed(1)} km)\n`;
//         if (form.instructions) message += `📝 *Note:* ${form.instructions}\n`;
//         if (data.imageUrl) message += `📷 *Ref Image:* ${data.imageUrl}\n`; 
        
//         window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
//       } else {
//         setToast({ show: true, message: "Submission failed.", type: "error" });
//       }
//     } catch (error) {
//       setToast({ show: true, message: "Server error.", type: "error" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full pt-12 pb-20 px-4 md:px-8 relative">
//       <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />

//       {/* FIXED SUCCESS MODAL */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
//               className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center"
//             >
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Check className="w-10 h-10 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">Request Sent!</h2>
//               <p className="text-[#8D6E63] mb-6 text-sm">
//                 We've opened WhatsApp for you. You can check your request status in your profile.
//               </p>
//               <button 
//                 onClick={() => router.push("/profile")}
//                 className="w-full py-3 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all"
//               >
//                 View Your Order
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
//           {/* LEFT SIDE: Sticky Content */}
//           <div className="lg:sticky lg:top-24 h-fit">
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex flex-col space-y-6 pt-4"
//             >
//               <div className="inline-block rounded-full bg-[#D98292]/10 px-4 py-1.5 text-sm font-semibold text-[#D98292] w-fit">
//                 Custom Creations
//               </div>
//               <h1 className="font-playfair text-4xl md:text-6xl font-bold leading-tight text-[#4E342E]">
//                 Design Your <br />
//                 <span className="text-[#D98292] italic">Dream Cake.</span>
//               </h1>
//               <p className="text-lg text-[#8D6E63] leading-relaxed">
//                 Have a photo from Pinterest? Or a wild idea in your head? 
//                 We bring your vision to life using premium ingredients and unmatched creativity.
//               </p>
              
//               {/* Steps Visual */}
//               <div className="mt-8 space-y-4">
//                 {[
//                   { icon: Upload, title: "1. Upload Reference", desc: "Share a photo of the design you love." },
//                   { icon: Cake, title: "2. Choose Flavors", desc: "Pick from our signature gourmet flavors." },
//                   { icon: CheckCircle, title: "3. Receive Estimate", desc: "We'll review and send you a price via WhatsApp." }
//                 ].map((step, idx) => (
//                   <motion.div 
//                     key={idx}
//                     whileHover={{ scale: 1.02, backgroundColor: "#FFF" }}
//                     className="flex items-center gap-4 p-4 bg-white/60 rounded-xl shadow-sm border border-[#F2E3DB] transition-colors cursor-default"
//                   >
//                     <div className="h-10 w-10 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292]">
//                       <step.icon size={20} />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-[#4E342E]">{step.title}</h3>
//                       <p className="text-sm text-[#8D6E63]">{step.desc}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT SIDE: The Form */}
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 border border-[#F2E3DB] overflow-hidden"
//           >
//             <form className="space-y-5">
//               <div className="space-y-4">
//                  <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2">
//                    <User size={18} className="text-[#D98292]" /> Your Details
//                  </h3>
//                  <div className="space-y-1">
//                     <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Name</label>
//                     <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="e.g. Rahul Sharma" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                  </div>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Phone (10 Digits)</label>
//                       <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} maxLength={10} placeholder="9876543210" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Email</label>
//                       <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="For updates" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                     </div>
//                  </div>
//                  {/* ADDRESS SECTION - Styled exactly like other inputs */}
//                  <div className="space-y-2 pt-2 border-t border-[#F2E3DB]">
//                     <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Address</label>
//                     <textarea rows={2} value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Flat No, Building, Area..." className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"></textarea>
                    
//                     {!locationState.distance ? (
//                       <button type="button" onClick={handleGetLocation} disabled={locationState.isLocating} className="w-full py-2 border-2 border-dashed border-[#D98292] text-[#D98292] font-bold rounded-xl hover:bg-[#D98292]/5 flex items-center justify-center gap-2">{locationState.isLocating ? <Loader2 className="animate-spin" /> : <Navigation size={16} />} Detect Location for Delivery</button>
//                     ) : (
//                       <div className="flex items-center justify-between bg-[#effaf0] border border-green-200 p-3 rounded-xl"><span className="text-green-700 text-sm font-bold flex items-center gap-2"><MapPin size={16} /> {locationState.distance.toFixed(1)} km • ₹{locationState.deliveryCharge} Delivery</span><button type="button" onClick={() => setLocationState({...locationState, distance: 0})} className="text-xs text-green-700 underline">Change</button></div>
//                     )}
//                     {locationState.error && <p className="text-xs text-red-500">{locationState.error}</p>}
//                  </div>
//               </div>
//               <div className="h-px w-full bg-[#F2E3DB]" />
//               <div className="space-y-4">
//                  <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2"><Cake size={18} className="text-[#D98292]" /> Cake Details</h3>
//                  <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1">Date Needed <Calendar size={12} /></label><input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" /></div>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Weight (kg)</label><select value={form.weight} onChange={(e) => setForm({...form, weight: e.target.value})} className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"><option>0.5 kg</option><option>1.0 kg</option><option>1.5 kg</option><option>2.0 kg+</option></select></div>
//                   <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Flavor</label><select value={form.flavor} onChange={(e) => setForm({...form, flavor: e.target.value})} className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"><option>Chocolate Truffle</option><option>Red Velvet</option><option>Rasmalai</option><option>Fresh Fruit</option><option>Other (Specify in notes)</option></select></div>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex justify-between"><span>Reference Photo</span><span className="text-[#D98292] lowercase italic font-normal">(optional)</span></label>
//                 <div className="relative w-full h-40 rounded-xl border-2 border-dashed border-[#D98292]/30 bg-[#FFF8F3] flex flex-col items-center justify-center cursor-pointer hover:border-[#D98292] hover:bg-[#D98292]/5 transition-all group overflow-hidden"><input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />{selectedImage ? <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center"><Upload className="h-8 w-8 text-[#D98292] mb-2 group-hover:scale-110 transition-transform" /><span className="text-sm text-[#8D6E63]">Tap to upload an image</span></div>}</div>
//               </div>
//               <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Special Instructions</label><textarea rows={2} value={form.instructions} onChange={(e) => setForm({...form, instructions: e.target.value})} placeholder="e.g., 'Make it less sweet' or 'Write Happy Birthday Mom'" className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 resize-none"></textarea><p className="text-[10px] text-[#8D6E63] flex items-center gap-1"><Info size={10} /> We try our best to follow all customization requests.</p></div>
//               <div className="pt-2"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full rounded-xl bg-[#D98292] py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#c96f7f] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">{isSubmitting ? <>Sending... <Loader2 className="animate-spin" size={20} /></> : <>Send Request via WhatsApp <Smartphone size={20} /></>}</motion.button><div className="text-center mt-3 space-y-1"><p className="text-xs text-[#8D6E63]">We will review your request and reply with the price estimate.</p><p className="text-sm font-bold text-[#4E342E]">Starting from <span className="text-[#D98292]">₹500</span></p></div></div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Added router for redirect
import { Upload, ArrowRight, Cake, CheckCircle, Smartphone, Calendar, User, Info, Mail, Loader2, Check, MapPin, Navigation } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { calculateDistance, KITCHEN_COORDS, DELIVERY_RATE_PER_KM, MIN_DELIVERY_CHARGE } from "@/lib/utils";

export default function CustomCakePage() {
  const { data: session } = useSession();
  const router = useRouter(); // For View Order redirect
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Form State
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", 
    weight: "1.0 kg", flavor: "Chocolate Truffle", instructions: "",
    address: "" // Added address field to state
  });

  // Location State for Delivery Calc
  const [locationState, setLocationState] = useState({
    distance: 0,
    deliveryCharge: 0,
    lat: 0,
    lng: 0,
    isLocating: false,
    error: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

  // Auto-fill from session & Fetch Saved Address
  useEffect(() => {
    if (session?.user) {
      setForm(prev => ({
        ...prev,
        name: session.user?.name || "",
        email: session.user?.email || "",
        phone: (session.user as any).phone || ""
      }));
      fetchSavedAddress();
    }
  }, [session]);

  const fetchSavedAddress = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success && data.user.address) {
        setForm(prev => ({ ...prev, address: data.user.address }));
      }
    } catch (e) {
      console.error("Could not fetch saved address");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGetLocation = () => {
    setLocationState(prev => ({ ...prev, isLocating: true, error: "" }));
    if (!navigator.geolocation) {
      setLocationState(prev => ({ ...prev, isLocating: false, error: "Geolocation not supported" }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(KITCHEN_COORDS.lat, KITCHEN_COORDS.lng, latitude, longitude);
        const charge = Math.max(Math.round(dist * DELIVERY_RATE_PER_KM), MIN_DELIVERY_CHARGE);
        
        setLocationState({
          distance: dist,
          deliveryCharge: charge,
          lat: latitude,
          lng: longitude,
          isLocating: false,
          error: ""
        });
      },
      () => {
        setLocationState(prev => ({ ...prev, isLocating: false, error: "Unable to retrieve location" }));
      }
    );
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) return "Enter a valid 10-digit phone number";
    if (!form.address.trim()) return "Address is required for delivery";
    if (!form.weight) return "Please select a weight";
    if (!form.flavor) return "Please select a flavor";
    if (!form.date) return "Please select a date";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setToast({ show: true, message: error, type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare Data
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email || "guest@custom.com"); 
      formData.append("address", form.address); // Pass address
      formData.append("weight", form.weight);
      formData.append("flavor", form.flavor);
      formData.append("date", form.date);
      formData.append("instructions", form.instructions);
      
      // Pass Location Data
      formData.append("deliveryDistance", locationState.distance.toString());
      formData.append("deliveryCharge", locationState.deliveryCharge.toString());
      formData.append("lat", locationState.lat.toString());
      formData.append("lng", locationState.lng.toString());

      if (imageFile) formData.append("image", imageFile);

      // 2. Send to API (Saves to DB & Sends Email)
      const res = await fetch("/api/order/custom", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
        
        // 3. Construct WhatsApp Message
        const phoneNumber = "919653126427"; 
        let message = `*👋 Hi! I have a Custom Cake Request.*\n\n`;
        message += `👤 *Name:* ${form.name}\n`;
        message += `📞 *Phone:* ${form.phone}\n`;
        message += `📍 *Address:* ${form.address}\n`;
        message += `🎂 *Flavor:* ${form.flavor}\n`;
        message += `⚖️ *Weight:* ${form.weight}\n`;
        message += `📅 *Date Needed:* ${form.date}\n`;
        if (locationState.distance > 0) message += `🚚 *Delivery:* ₹${locationState.deliveryCharge} (${locationState.distance.toFixed(1)} km)\n`;
        if (form.instructions) message += `📝 *Note:* ${form.instructions}\n`;
        if (data.imageUrl) message += `📷 *Ref Photo:* ${data.imageUrl}\n`;
        
        // 4. Redirect after a short delay
        setTimeout(() => {
          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        }, 1000);
      } else {
        setToast({ show: true, message: "Submission failed. Try again.", type: "error" });
      }

    } catch (error) {
      setToast({ show: true, message: "Something went wrong.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-12 pb-20 px-4 md:px-8 relative">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">Request Sent!</h2>
              <p className="text-[#8D6E63] mb-6 text-sm">
                We've opened WhatsApp for you. You can view your request status in your profile.
              </p>
              <button 
                onClick={() => router.push("/profile")}
                className="w-full py-3 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all"
              >
                View Your Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: Sticky Content */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6 pt-4"
            >
              <div className="inline-block rounded-full bg-[#D98292]/10 px-4 py-1.5 text-sm font-semibold text-[#D98292] w-fit">
                Custom Creations
              </div>
              
              <h1 className="font-playfair text-4xl md:text-6xl font-bold leading-tight text-[#4E342E]">
                Design Your <br />
                <span className="text-[#D98292] italic">Dream Cake.</span>
              </h1>
              
              <p className="text-lg text-[#8D6E63] leading-relaxed">
                Have a photo from Pinterest? Or a wild idea in your head? 
                We bring your vision to life using premium ingredients and unmatched creativity.
              </p>

              {/* Steps Visual */}
              <div className="mt-8 space-y-4">
                {[
                  { icon: Upload, title: "1. Upload Reference", desc: "Share a photo of the design you love." },
                  { icon: Cake, title: "2. Choose Flavors", desc: "Pick from our signature gourmet flavors." },
                  { icon: CheckCircle, title: "3. Receive Estimate", desc: "We'll review and send you a price via WhatsApp." }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02, backgroundColor: "#FFF" }}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-xl shadow-sm border border-[#F2E3DB] transition-colors cursor-default"
                  >
                    <div className="h-10 w-10 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292]">
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4E342E]">{step.title}</h3>
                      <p className="text-sm text-[#8D6E63]">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 border border-[#F2E3DB] overflow-hidden"
          >
            <form className="space-y-5">
              
              {/* Personal Details Section */}
              <div className="space-y-4">
                 <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2">
                   <User size={18} className="text-[#D98292]" /> Your Details
                 </h3>
                 
                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Name</label>
                    <input 
                      type="text" 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" 
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Phone Number</label>
                      <input 
                        type="tel" 
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="10 digit number" 
                        maxLength={10}
                        className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Email</label>
                      <input 
                        type="email" 
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="For order updates" 
                        className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" 
                      />
                    </div>
                 </div>

                 {/* ADDED: Address Section (Matching Design) */}
                 <div className="space-y-2 pt-2 border-t border-[#F2E3DB]">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Address</label>
                    <textarea 
                      rows={2}
                      value={form.address}
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      placeholder="Flat No, Building, Area..."
                      className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"
                    ></textarea>
                    
                    {!locationState.distance ? (
                      <button 
                        type="button" 
                        onClick={handleGetLocation} 
                        disabled={locationState.isLocating}
                        className="w-full py-2 border-2 border-dashed border-[#D98292] text-[#D98292] font-bold rounded-xl hover:bg-[#D98292]/5 flex items-center justify-center gap-2"
                      >
                        {locationState.isLocating ? <Loader2 className="animate-spin" /> : <Navigation size={16} />} 
                        Detect Location for Delivery
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-[#effaf0] border border-green-200 p-3 rounded-xl">
                        <span className="text-green-700 text-sm font-bold flex items-center gap-2">
                          <MapPin size={16} /> {locationState.distance.toFixed(1)} km • ₹{locationState.deliveryCharge} Delivery
                        </span>
                        <button type="button" onClick={() => setLocationState({...locationState, distance: 0})} className="text-xs text-green-700 underline">Change</button>
                      </div>
                    )}
                    {locationState.error && <p className="text-xs text-red-500">{locationState.error}</p>}
                 </div>
              </div>

              <div className="h-px w-full bg-[#F2E3DB]" />

              {/* Cake Details Section */}
              <div className="space-y-4">
                 <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2">
                   <Cake size={18} className="text-[#D98292]" /> Cake Details
                 </h3>

                 {/* Occasion Date */}
                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1">
                      Date Needed <Calendar size={12} />
                    </label>
                    <input 
                      type="date" 
                      value={form.date}
                      onChange={(e) => setForm({...form, date: e.target.value})}
                      className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" 
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Weight (kg)</label>
                    <select 
                      value={form.weight}
                      onChange={(e) => setForm({...form, weight: e.target.value})}
                      className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"
                    >
                      <option>0.5 kg</option>
                      <option>1.0 kg</option>
                      <option>1.5 kg</option>
                      <option>2.0 kg</option>
                      <option>3.0 kg+</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Flavor</label>
                    <select 
                      value={form.flavor}
                      onChange={(e) => setForm({...form, flavor: e.target.value})}
                      className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"
                    >
                      <option>Chocolate Truffle</option>
                      <option>Red Velvet</option>
                      <option>Rasmalai</option>
                      <option>Fresh Fruit</option>
                      <option>Pineapple</option>
                      <option>Butterscotch</option>
                      <option>Other (Specify in notes)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex justify-between">
                  <span>Reference Photo</span>
                  <span className="text-[#D98292] lowercase italic font-normal">(optional)</span>
                </label>
                <div className="relative w-full h-40 rounded-xl border-2 border-dashed border-[#D98292]/30 bg-[#FFF8F3] flex flex-col items-center justify-center cursor-pointer hover:border-[#D98292] hover:bg-[#D98292]/5 transition-all group overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {selectedImage ? (
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-[#D98292] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-[#8D6E63]">Tap to upload an image</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Special Instructions</label>
                <textarea 
                  rows={2}
                  value={form.instructions}
                  onChange={(e) => setForm({...form, instructions: e.target.value})}
                  placeholder="e.g., 'Make it less sweet' or 'Write Happy Birthday Mom'"
                  className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 resize-none"
                ></textarea>
                <p className="text-[10px] text-[#8D6E63] flex items-center gap-1">
                  <Info size={10} /> We try our best to follow all customization requests.
                </p>
              </div>

              {/* Submit Button & Info */}
              <div className="pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#D98292] py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#c96f7f] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending Request... <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Send Request via WhatsApp <Smartphone size={20} /></>
                  )}
                </motion.button>
                
                <div className="text-center mt-3 space-y-1">
                  <p className="text-xs text-[#8D6E63]">
                    We will review your request and reply with the price estimate.
                  </p>
                  <p className="text-sm font-bold text-[#4E342E]">
                    Starting from <span className="text-[#D98292]">₹500</span>
                  </p>
                </div>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}