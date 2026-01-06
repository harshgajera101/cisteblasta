"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Upload, Send } from "lucide-react";

export default function CustomCakePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <section className="flex-grow container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-start max-w-6xl mx-auto">
          
          {/* Left: Info */}
          <div className="space-y-8 sticky top-24">
             <div>
               <h1 className="font-playfair text-5xl font-bold mb-4">Design Your <br/><span className="text-primary italic">Dream Cake</span></h1>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 From elegant wedding tiers to fun superhero themes for kids, we make it all. 
                 Fill out the form to get a quote.
               </p>
             </div>

             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-[#E8D5C8] flex items-center justify-center font-bold text-xl text-[#72514D]">1</div>
                   <div>
                      <h3 className="font-bold text-lg">Share Your Vision</h3>
                      <p className="text-sm text-muted-foreground">Tell us the flavor, theme, and occasion.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-[#E8D5C8] flex items-center justify-center font-bold text-xl text-[#72514D]">2</div>
                   <div>
                      <h3 className="font-bold text-lg">Get a Quote</h3>
                      <p className="text-sm text-muted-foreground">We will contact you via WhatsApp with the price.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-full bg-[#E8D5C8] flex items-center justify-center font-bold text-xl text-[#72514D]">3</div>
                   <div>
                      <h3 className="font-bold text-lg">Payment & Delivery</h3>
                      <p className="text-sm text-muted-foreground">Confirm order and get it delivered to your doorstep.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border">
             <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Name</label>
                      <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-foreground">Occasion Date</label>
                   <input type="date" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-foreground">Flavor Preference</label>
                   <select className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none">
                      <option>Choose a flavor...</option>
                      <option>Chocolate Truffle</option>
                      <option>Fresh Fruit</option>
                      <option>Red Velvet</option>
                      <option>Rasmalai Fusion</option>
                      <option>Other</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-foreground">Additional Details</label>
                   <textarea rows={4} placeholder="Describe the design, theme, or any allergies..." className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-foreground">Reference Image (Optional)</label>
                   <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/20 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                   </div>
                </div>

                <button type="button" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                   <Send className="h-4 w-4" /> Send Inquiry
                </button>
             </form>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}