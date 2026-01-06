"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      // Success! Redirect to Dashboard
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F3] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#F2E3DB]">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-[#D98292]/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-[#D98292]" />
          </div>
          <h1 className="text-2xl font-playfair font-bold text-[#4E342E]">
            Admin Access
          </h1>
          <p className="text-[#8D6E63] text-sm">Please verify your identity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#8D6E63] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 text-[#4E342E]"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#8D6E63] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#F2E3DB] focus:outline-none focus:ring-2 focus:ring-[#D98292]/50 text-[#4E342E]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}