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
          // ANIMATION: We handle the centering shift (x: -50%) here
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 0.3 }}
          
          // STYLING FIXES:
          // 1. Removed '-translate-x-1/2' from className (prevents conflict)
          // 2. w-[90vw]: On mobile, take up 90% of screen width (prevents cutting off)
          // 3. md:w-auto: On desktop, size automatically to content
          // 4. z-[100]: Ensures it sits above modals and navbars
          className={`fixed top-5 left-1/2 z-[100] flex w-[90vw] md:w-auto md:min-w-[300px] max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-xl ${colors[type]}`}
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