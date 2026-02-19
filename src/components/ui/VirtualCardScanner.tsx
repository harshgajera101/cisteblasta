"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X, ScanFace } from "lucide-react";

export default function VirtualCardScanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FLOATING BUTTON (Bottom Left) */}
      <div className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          // Removed the gap-2 and padding-x so the pill shrinks completely around the icon
          className="group flex items-center bg-white p-3 rounded-full shadow-xl border border-[#F2E3DB] text-[#4E342E] hover:text-[#D98292] hover:border-[#D98292] transition-all duration-300 cursor-pointer"
        >
          <div className="bg-[#FFF8F3] p-1.5 rounded-full text-[#D98292] group-hover:scale-110 transition-transform">
            <QrCode size={20} />
          </div>
          
          {/* DESKTOP TEXT: Hidden by default (max-w-0, opacity-0), expands on hover */}
          <div className="hidden sm:block overflow-hidden max-w-0 opacity-0 group-hover:max-w-[250px] group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap">
            <span className="text-sm font-bold tracking-wide pl-2 pr-2">
              Virtual Card of Ciste Blasta
            </span>
          </div>

          {/* MOBILE TEXT: Remains exactly the same (Always visible) */}
          <span className="text-xs font-bold tracking-wide pl-2 pr-1 sm:hidden">
            Scan
          </span>
        </button>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden border border-[#F2E3DB]"
            >
              {/* Close Button with explicit cursor-pointer */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#D98292] bg-[#FFF8F3] rounded-full transition-colors z-10 shadow-sm cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-[#FFF8F3] rounded-full flex items-center justify-center mb-4 text-[#D98292]">
                  <ScanFace size={28} />
                </div>
                
                <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-2">
                  Ciste Blasta Virtual Card
                </h3>
                <p className="text-sm text-[#8D6E63] mb-6">
                  Scan this code to know more about us or place a direct order instantly!
                </p>

                {/* IMAGE CONTAINER */}
                <div className="w-full aspect-square bg-[#F2E3DB]/30 rounded-2xl border-2 border-dashed border-[#F2E3DB] flex items-center justify-center p-2 relative overflow-hidden">
                  
                  {/* Your actual scanner image */}
                  <img 
                    src="/images/scanner.jpg" 
                    alt="Ciste Blasta Scanner" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                  
                </div>

                <p className="text-xs font-bold text-[#D98292] mt-6 uppercase tracking-widest">
                  Baked with Love
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}