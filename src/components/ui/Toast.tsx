// "use client";
// import { useEffect } from "react";
// import { CheckCircle2, AlertCircle, X, Trash2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type ToastType = "success" | "error" | "warning";

// interface ToastProps {
//   message: string;
//   type: ToastType;
//   isVisible: boolean;
//   onClose: () => void;
// }

// export function Toast({ message, type, isVisible, onClose }: ToastProps) {
//   useEffect(() => {
//     if (isVisible) {
//       const timer = setTimeout(onClose, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, onClose]);

//   const colors = {
//     success: "bg-green-100 text-green-800 border-green-200",
//     error: "bg-red-100 text-red-800 border-red-200",
//     warning: "bg-orange-100 text-orange-800 border-orange-200",
//   };

//   const icons = {
//     success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
//     error: <AlertCircle className="w-5 h-5 text-red-600" />,
//     warning: <Trash2 className="w-5 h-5 text-orange-600" />,
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, y: 50, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 20, scale: 0.9 }}
//           className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors[type]}`}
//         >
//           {icons[type]}
//           <span className="font-bold text-sm">{message}</span>
//           <button onClick={onClose} className="opacity-50 hover:opacity-100 ml-2">
//             <X size={16} />
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }






"use client";
import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const colors = {
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    warning: <Trash2 className="w-5 h-5 text-orange-600 flex-shrink-0" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // ANIMATION FIX: Only animate Opacity and Y (Vertical). 
          // We let CSS handle the X centering to prevent mobile glitches.
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          
          // STYLING FIX: 
          // 1. 'left-1/2 -translate-x-1/2': Standard CSS absolute centering.
          // 2. 'w-[90vw]': Forces 90% width on mobile.
          // 3. 'max-w-md': Prevents it from getting too wide on desktop.
          className={`fixed top-5 left-1/2 z-[100] flex w-[90vw] md:w-auto md:min-w-[300px] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border px-4 py-3 shadow-xl ${colors[type]}`}
        >
          {icons[type]}
          <span className="font-bold text-sm flex-1 break-words">{message}</span>
          <button onClick={onClose} className="ml-auto opacity-50 hover:opacity-100 p-1">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}