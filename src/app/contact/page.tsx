"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#4E342E]">
            Get in <span className="text-[#D98292] italic">Touch</span>
          </h1>
          <p className="text-[#8D6E63] max-w-xl mx-auto">
            Have a question about an order, want to discuss a bulk requirement, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="md:col-span-2 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-[#F2E3DB]">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4E342E]">Visit Us</h4>
                    <p className="text-sm text-[#8D6E63] mt-1 leading-relaxed">
                      Shop No. 4, Ciste Bakery,<br />
                      Mumbai, India - 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4E342E]">Call Us</h4>
                    <p className="text-sm text-[#8D6E63] mt-1">+91 88284 75854</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D98292] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4E342E]">Email Us</h4>
                    <p className="text-sm text-[#8D6E63] mt-1">hello@cisteblasta.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#F2E3DB] border-dashed">
              <h4 className="font-bold text-[#4E342E] mb-2">Operating Hours</h4>
              <p className="text-sm text-[#8D6E63]">Monday - Sunday: 10:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-[#F2E3DB]">
            <h3 className="font-playfair text-2xl font-bold text-[#4E342E] mb-6">Send us a Message</h3>
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4E342E] mb-2">Message Sent!</h3>
                  <p className="text-[#8D6E63]">Thank you for reaching out. We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4E342E]">Full Name <span className="text-red-400">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className="w-full p-3 rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4E342E]">Email Address <span className="text-red-400">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        className="w-full p-3 rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4E342E]">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full p-3 rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4E342E]">Subject</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all text-sm cursor-pointer"
                      >
                        <option value="">Select a topic</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Bulk Order">Bulk Order Request</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4E342E]">Your Message <span className="text-red-400">*</span></label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today?"
                      rows={5}
                      className="w-full p-4 rounded-xl border border-[#F2E3DB] bg-[#FFF8F3]/50 focus:outline-none focus:border-[#D98292] focus:ring-2 focus:ring-[#D98292]/20 transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again later.</p>
                  )}

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full md:w-auto px-8 py-3.5 bg-[#4E342E] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d2924] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse">Sending Message...</span>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}