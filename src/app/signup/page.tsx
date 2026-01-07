"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Phone, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Client-Side Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setToast({ show: true, message: "All fields are required", type: "error" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setToast({ show: true, message: "Password must be at least 6 characters", type: "error" });
      setLoading(false);
      return;
    }

    if (formData.phone.length < 10) {
      setToast({ show: true, message: "Please enter a valid phone number", type: "error" });
      setLoading(false);
      return;
    }

    try {
      // 2. Call API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ show: true, message: "Account created! Redirecting...", type: "success" });
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setToast({ show: true, message: data.message || "Registration failed", type: "error" });
      }
    } catch (error) {
      setToast({ show: true, message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4 py-20">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#F2E3DB] p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8F3] text-[#D98292] mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-[#4E342E] mb-2">Create Account</h1>
          <p className="text-[#8D6E63] text-sm">Join our family for exclusive treats</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Email</label>
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

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
              <input
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/20 text-[#4E342E]"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-[#8D6E63] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-[#D98292]" size={18} />
              <input
                type="password"
                placeholder="Create a strong password"
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
            className="w-full py-4 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-70 mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#8D6E63]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#4E342E] hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}