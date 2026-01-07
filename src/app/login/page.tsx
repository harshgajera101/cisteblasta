// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Toast } from "@/components/ui/Toast";
// import { motion } from "framer-motion";
// import { LogIn, Mail, Lock } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Basic Validation
//     if (!formData.email || !formData.password) {
//       setToast({ show: true, message: "Please fill in all fields", type: "error" });
//       setLoading(false);
//       return;
//     }

//     try {
//       // NextAuth Login
//       const res = await signIn("credentials", {
//         redirect: false,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (res?.error) {
//         setToast({ show: true, message: "Invalid email or password", type: "error" });
//       } else {
//         setToast({ show: true, message: "Welcome back!", type: "success" });
//         // Redirect to Home or Menu after login
//         setTimeout(() => router.push("/menu"), 1000);
//       }
//     } catch (error) {
//       setToast({ show: true, message: "Something went wrong", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4 py-20">
//       <Toast 
//         message={toast.message} 
//         type={toast.type} 
//         isVisible={toast.show} 
//         onClose={() => setToast({ ...toast, show: false })} 
//       />

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#F2E3DB] p-8 md:p-10"
//       >
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8F3] text-[#D98292] mb-4">
//             <LogIn size={24} />
//           </div>
//           <h1 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Welcome Back</h1>
//           <p className="text-[#8D6E63] text-sm">Login to continue your sweet journey</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           {/* Email Input */}
//           <div className="space-y-1">
//             <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="space-y-1">
//             <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
//           >
//             {loading ? "Verifying..." : "Login Now"}
//           </button>
//         </form>

//         <div className="mt-8 text-center text-sm text-[#8D6E63]">
//           Don't have an account?{" "}
//           <Link href="/signup" className="font-bold text-[#D98292] hover:underline">
//             Sign Up
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }








"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";

// Separate component to safely use useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/menu"; // Default to menu if no previous page

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
  
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setToast({ show: true, message: "Please fill in all fields", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setToast({ show: true, message: "Invalid email or password", type: "error" });
      } else {
        setToast({ show: true, message: "Welcome back!", type: "success" });
        // Redirect to the page they came from
        setTimeout(() => router.push(callbackUrl), 1000);
      }
    } catch (error) {
      setToast({ show: true, message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#F2E3DB] p-8 md:p-10">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8F3] text-[#D98292] mb-4">
          <LogIn size={24} />
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Welcome Back</h1>
        <p className="text-[#8D6E63] text-sm">Login to continue your sweet journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? "Verifying..." : "Login Now"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#8D6E63]">
        Don't have an account?{" "}
        {/* Pass the callback URL to signup too, so they don't lose their place */}
        <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-[#D98292] hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4 py-20">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}