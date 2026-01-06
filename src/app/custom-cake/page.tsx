// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload, ArrowRight, Cake, CheckCircle, Smartphone, Calendar, User, Info } from "lucide-react";
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";

// export default function CustomCakePage() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   // Handle dummy image upload for UI demo
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#FFF8F3]">

//       <div className="pt-12 pb-20 px-4 md:px-8">
//         <div className="mx-auto max-w-7xl">
          
//           {/* Main Grid Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
//             {/* LEFT SIDE: Text & Inspiration */}
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

//               {/* Steps Visual with Hover Effects */}
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

//             {/* RIGHT SIDE: The Form */}
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 border border-[#F2E3DB] relative overflow-hidden"
//             >
//               {/* Decorative top accent */}
//               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D98292] to-[#8D6E63]" />

//               <form className="space-y-5">
                
//                 {/* Personal Details Section */}
//                 <div className="space-y-4">
//                    <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2">
//                      <User size={18} className="text-[#D98292]" /> Your Details
//                    </h3>
                   
//                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-1">
//                         <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Name</label>
//                         <input type="text" placeholder="e.g. Rahul Sharma" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                       </div>
//                       <div className="space-y-1">
//                         <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Phone Number</label>
//                         <input type="tel" placeholder="+91 98765 43210" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                       </div>
//                    </div>
//                 </div>

//                 <div className="h-px w-full bg-[#F2E3DB]" />

//                 {/* Cake Details Section */}
//                 <div className="space-y-4">
//                    <h3 className="text-lg font-playfair font-bold text-[#4E342E] flex items-center gap-2">
//                      <Cake size={18} className="text-[#D98292]" /> Cake Details
//                    </h3>

//                    {/* Occasion Date */}
//                    <div className="space-y-1">
//                       <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex items-center gap-1">
//                         Date Needed <Calendar size={12} />
//                       </label>
//                       <input type="date" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
//                    </div>

//                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Weight (kg)</label>
//                       <select className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50">
//                         <option>0.5 kg</option>
//                         <option>1.0 kg</option>
//                         <option>1.5 kg</option>
//                         <option>2.0 kg+</option>
//                       </select>
//                     </div>

//                     <div className="space-y-1">
//                       <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Flavor</label>
//                       <select className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50">
//                         <option>Chocolate Truffle</option>
//                         <option>Red Velvet</option>
//                         <option>Rasmalai</option>
//                         <option>Fresh Fruit</option>
//                         <option>Other (Specify in notes)</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Image Upload Area */}
//                 <div className="space-y-2">
//                   <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] flex justify-between">
//                     <span>Reference Photo</span>
//                     <span className="text-[#D98292] lowercase italic font-normal">(optional)</span>
//                   </label>
//                   <div className="relative w-full h-40 rounded-xl border-2 border-dashed border-[#D98292]/30 bg-[#FFF8F3] flex flex-col items-center justify-center cursor-pointer hover:border-[#D98292] hover:bg-[#D98292]/5 transition-all group overflow-hidden">
//                     <input 
//                       type="file" 
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                     />
//                     {selectedImage ? (
//                       <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="flex flex-col items-center">
//                         <Upload className="h-8 w-8 text-[#D98292] mb-2 group-hover:scale-110 transition-transform" />
//                         <span className="text-sm text-[#8D6E63]">Tap to upload an image</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Special Instructions</label>
//                   <textarea 
//                     rows={2} 
//                     placeholder="e.g., 'Make it less sweet' or 'Write Happy Birthday Mom'"
//                     className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 resize-none"
//                   ></textarea>
//                   <p className="text-[10px] text-[#8D6E63] flex items-center gap-1">
//                     <Info size={10} /> We try our best to follow all customization requests.
//                   </p>
//                 </div>

//                 {/* Submit Button & Info */}
//                 <div className="pt-2">
//                   <motion.button 
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     className="w-full rounded-xl bg-[#D98292] py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#c96f7f] transition-all flex items-center justify-center gap-2"
//                   >
//                     Send Request via WhatsApp <Smartphone size={20} />
//                   </motion.button>
                  
//                   <div className="text-center mt-3 space-y-1">
//                     <p className="text-xs text-[#8D6E63]">
//                       We will review your request and reply with the price estimate.
//                     </p>
//                     <p className="text-sm font-bold text-[#4E342E]">
//                       Starting from <span className="text-[#D98292]">₹500</span>
//                     </p>
//                   </div>
//                 </div>

//               </form>
//             </motion.div>

//           </div>
//         </div>
//       </div>
   
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, Cake, CheckCircle, Smartphone, Calendar, User, Info } from "lucide-react";

export default function CustomCakePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="w-full pt-12 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: Text & Inspiration */}
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
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Name</label>
                      <input type="text" placeholder="e.g. Rahul Sharma" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
                    </div>
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
                    <input type="date" className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 transition-all" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Weight (kg)</label>
                    <select className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50">
                      <option>0.5 kg</option>
                      <option>1.0 kg</option>
                      <option>1.5 kg</option>
                      <option>2.0 kg+</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">Flavor</label>
                    <select className="w-full rounded-lg border border-[#F2E3DB] bg-white p-3 text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50">
                      <option>Chocolate Truffle</option>
                      <option>Red Velvet</option>
                      <option>Rasmalai</option>
                      <option>Fresh Fruit</option>
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
                  className="w-full rounded-xl bg-[#D98292] py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#c96f7f] transition-all flex items-center justify-center gap-2"
                >
                  Send Request via WhatsApp <Smartphone size={20} />
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