// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Toast } from "@/components/ui/Toast";
// import { motion } from "framer-motion";
// import { UserPlus, User, Mail, Phone, Lock } from "lucide-react";

// export default function SignupPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // 1. Client-Side Validation
//     if (!formData.name || !formData.email || !formData.phone || !formData.password) {
//       setToast({ show: true, message: "All fields are required", type: "error" });
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setToast({ show: true, message: "Password must be at least 6 characters", type: "error" });
//       setLoading(false);
//       return;
//     }

//     if (formData.phone.length < 10) {
//       setToast({ show: true, message: "Please enter a valid phone number", type: "error" });
//       setLoading(false);
//       return;
//     }

//     try {
//       // 2. Call API
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setToast({ show: true, message: "Account created! Redirecting...", type: "success" });
//         setTimeout(() => router.push("/login"), 1500);
//       } else {
//         setToast({ show: true, message: data.message || "Registration failed", type: "error" });
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
//             <UserPlus size={24} />
//           </div>
//           <h1 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Create Account</h1>
//           <p className="text-[#8D6E63] text-sm">Join our family for exclusive treats</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Name Input */}
//           <div className="space-y-1">
//             <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Full Name</label>
//             <div className="relative">
//               <User className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Input */}
//           <div className="space-y-1">
//             <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Email</label>
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

//           {/* Phone Input */}
//           <div className="space-y-1">
//             <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Phone Number</label>
//             <div className="relative">
//               <Phone className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
//               <input
//                 type="tel"
//                 placeholder="9876543210"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
//                 placeholder="Create a strong password"
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
//             className="w-full py-4 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-70 mt-2"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <div className="mt-8 text-center text-sm text-[#8D6E63]">
//           Already have an account?{" "}
//           <Link href="/login" className="font-bold text-[#4E342E] hover:underline">
//             Login
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }







"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Phone, Lock, AlertCircle } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/menu";

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // 1. Name Check
    if (!formData.name.trim()) newErrors.name = "Full Name is required";

    // 2. Email Regex (Basic format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // 3. Phone Regex (Exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // 4. Password Strength
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // 5. Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setToast({ show: true, message: "Please fix the errors below", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ show: true, message: "Account created! Redirecting...", type: "success" });
        setTimeout(() => router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`), 1500);
      } else {
        setToast({ show: true, message: data.message || "Registration failed", type: "error" });
      }
    } catch (error) {
      setToast({ show: true, message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Helper for Input Fields
  const renderInput = (label: string, name: keyof typeof formData, type: string, placeholder: string, Icon: any) => (
    <div className="space-y-1">
      <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
        <input
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) => {
            setFormData({ ...formData, [name]: e.target.value });
            if (errors[name]) setErrors({ ...errors, [name]: "" }); // Clear error on typing
          }}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E] ${
            errors[name] ? "border-red-400 bg-red-50" : "border-[#F2E3DB]"
          }`}
        />
      </div>
      {/* Inline Error Message */}
      {errors[name] && (
        <div className="flex items-center gap-1 text-xs text-red-500 ml-1">
          <AlertCircle size={12} /> {errors[name]}
        </div>
      )}
    </div>
  );

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
          <UserPlus size={24} />
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Create Account</h1>
        <p className="text-[#8D6E63] text-sm">Join our family for exclusive treats</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderInput("Full Name", "name", "text", "John Doe", User)}
        {renderInput("Email", "email", "email", "you@example.com", Mail)}
        {renderInput("Phone Number", "phone", "tel", "9876543210", Phone)}
        {renderInput("Password", "password", "password", "Create a password", Lock)}
        {renderInput("Confirm Password", "confirmPassword", "password", "Repeat password", Lock)}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-70 mt-4"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#8D6E63]">
        Already have an account?{" "}
        <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-[#4E342E] hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4 py-20">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}