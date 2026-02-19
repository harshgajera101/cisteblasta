"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquareHeart, Send } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ExitFeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { data: session } = useSession();

  useEffect(() => {
    // Check if the user has already seen the popup in this session/browser
    const hasSeenPopup = localStorage.getItem("hasSeenExitFeedback");
    if (hasSeenPopup) return;

    // Trigger for Desktop: When mouse leaves the top of the viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        localStorage.setItem("hasSeenExitFeedback", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Trigger for Mobile: Fallback to showing after 45 seconds of browsing
    // (Since mobile doesn't have a 'mouseleave' event)
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768 && !localStorage.getItem("hasSeenExitFeedback")) {
        setIsOpen(true);
        localStorage.setItem("hasSeenExitFeedback", "true");
      }
    }, 45000); 

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback,
          userName: session?.user?.name || "Anonymous",
          userEmail: session?.user?.email || "Not provided",
          pageUrl: window.location.href,
        }),
      });
      
      setIsSubmitted(true);
      // Close the modal automatically after 2 seconds showing success message
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error) {
      console.error("Failed to submit feedback", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenExitFeedback", "true"); // Ensure it doesn't pop up again
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden border border-[#F2E3DB]"
          >
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 text-[#8D6E63] hover:text-[#D98292] hover:bg-[#FFF8F3] rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <div className="w-14 h-14 bg-[#FFF8F3] rounded-full flex items-center justify-center mb-6 text-[#D98292]">
                    <MessageSquareHeart size={28} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-2">Leaving so soon?</h3>
                  <p className="text-sm text-[#8D6E63] mb-6 leading-relaxed">
                    We are always looking to improve. How was your experience today, and what could we do better?
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts or suggestions here..."
                      rows={4}
                      required
                      className="w-full rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 p-4 text-[#4E342E] text-sm focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 resize-none transition-all"
                    ></textarea>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting || !feedback.trim()}
                      className="w-full py-3.5 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>Submit Feedback <Send size={16} /></>
                      )}
                    </button>
                  </form>
                  <button 
                    onClick={closePopup}
                    className="w-full mt-4 py-2 text-xs font-bold text-[#8D6E63] hover:text-[#4E342E] transition-colors"
                  >
                    No thanks, just browsing
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-2">Thank You!</h3>
                  <p className="text-[#8D6E63]">Your feedback helps us bake a better experience for you.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}