"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  MapPin,
  Navigation,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  calculateDistance,
  KITCHEN_COORDS,
  DELIVERY_RATE_PER_KM,
  MIN_DELIVERY_CHARGE,
} from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();
  const router = useRouter(); // Hook for redirection

  // Delivery State
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [address, setAddress] = useState("");
  const [locError, setLocError] = useState("");
  const [isOrdering, setIsOrdering] = useState(false); // New Loading State

  // Logic: Calculate Delivery Cost
  const deliveryCharge = deliveryDistance
    ? Math.max(
        Math.round(deliveryDistance * DELIVERY_RATE_PER_KM),
        MIN_DELIVERY_CHARGE
      )
    : 0;

  const grandTotal = cartTotal + deliveryCharge;

  // Handler: Get User Location
  const handleGetLocation = () => {
    setIsLocating(true);
    setLocError("");

    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(
          KITCHEN_COORDS.lat,
          KITCHEN_COORDS.lng,
          latitude,
          longitude
        );
        setDeliveryDistance(dist);
        setIsLocating(false);
      },
      () => {
        setLocError("Unable to retrieve your location. Please enable GPS.");
        setIsLocating(false);
      }
    );
  };

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-[#FFF8F3] rounded-full flex items-center justify-center mb-6">
          <MapPin size={40} className="text-[#D98292] opacity-50" />
        </div>
        <h2 className="text-2xl font-playfair font-bold text-[#4E342E] mb-2">
          Your cart is empty
        </h2>
        <p className="text-[#8D6E63] mb-8">
          Looks like you haven't made your choice yet.
        </p>
        <Link
          href="/menu"
          className="bg-[#D98292] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c46b7d] transition-colors shadow-lg"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // --- NEW: Handle Order ---
  const handleOrder = async () => {
    if (!deliveryDistance || !address) return;
    setIsOrdering(true);

    try {
      // 1. Call API to Save Order & Send Email
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: { address },
          items,
          bill: {
            itemTotal: cartTotal,
            deliveryCharge,
            distance: deliveryDistance,
            grandTotal,
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        // 2. Construct WhatsApp Message
        const phoneNumber = "919653126427"; // Sister's Number (Replace if needed)

        let message = `*Hi Ciste Blasta! I want to place an order.*\n\n`;
        message += `📍 *Delivery Location:* ${address}\n`;
        message += `----------------------------\n`;

        items.forEach((item) => {
          message += `▫️ ${item.quantity} x ${item.name} (${
            item.variant || "Std"
          }) - ₹${item.price * item.quantity}\n`;
        });

        message += `----------------------------\n`;
        message += `🚚 Delivery (${deliveryDistance.toFixed(
          1
        )} km): ₹${deliveryCharge}\n`;
        message += `💰 *Total Amount: ₹${grandTotal}*\n\n`;
        message += `Order ID: ${data.orderId.slice(-6)}`; // Short ID reference

        // 3. Clear Cart & Redirect
        clearCart();
        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.location.href = waLink;
      }
    } catch (error) {
      console.error("Order failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#4E342E] mb-8 flex items-center gap-3">
        Your Cart{" "}
        <span className="text-lg text-[#8D6E63] font-sans font-normal">
          ({items.length} items)
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* --- LEFT: Cart Items List --- */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variant}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 md:gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[#F2E3DB]"
              >
                {/* Image Placeholder */}
                <div className="h-24 w-24 shrink-0 rounded-xl bg-[#FFF8F3] flex items-center justify-center text-[#D98292]/30 font-playfair font-bold text-2xl">
                  {item.name.charAt(0)}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#4E342E] text-lg leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#8D6E63] mt-1">
                      {item.variant ? item.variant : "Standard"}
                      {item.category === "GIFT_BOX" && " • Box"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="font-bold text-[#4E342E]">
                      ₹{item.price * item.quantity}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-[#FFF8F3] rounded-lg p-1">
                      <button
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item.productId, item.variant); // <--- Explicitly remove if qty is 1
                          } else {
                            updateQuantity(item.productId, item.variant, -1);
                          }
                        }}
                        className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 size={14} className="text-red-500" />
                        ) : (
                          <Minus size={14} />
                        )}
                      </button>

                      <span className="text-sm font-bold w-4 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variant, 1)
                        }
                        className="p-1 hover:bg-white rounded-md transition-colors text-[#4E342E]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- RIGHT: Checkout & Delivery --- */}
        <div className="space-y-6">
          {/* Delivery Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] space-y-4">
            <h3 className="font-playfair font-bold text-xl text-[#4E342E]">
              Delivery Details
            </h3>

            {/* 1. Distance Calculator */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                Location
              </label>

              {!deliveryDistance ? (
                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="w-full py-3 border-2 border-dashed border-[#D98292] text-[#D98292] font-bold rounded-xl hover:bg-[#D98292]/5 transition-colors flex items-center justify-center gap-2"
                >
                  {isLocating ? (
                    <span className="animate-pulse">Locating...</span>
                  ) : (
                    <>
                      {" "}
                      <Navigation size={18} /> Detect My Location{" "}
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center justify-between bg-[#effaf0] border border-green-200 p-3 rounded-xl">
                  <span className="text-green-700 text-sm font-bold flex items-center gap-2">
                    <MapPin size={16} /> {deliveryDistance.toFixed(1)} km away
                  </span>
                  <button
                    onClick={() => setDeliveryDistance(null)}
                    className="text-xs text-green-700 underline"
                  >
                    Change
                  </button>
                </div>
              )}
              {locError && <p className="text-xs text-red-500">{locError}</p>}
            </div>

            {/* 2. Full Address Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                Full Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat No, Building Name, Landmark..."
                rows={2}
                className="w-full rounded-lg border border-[#F2E3DB] bg-[#FFF8F3]/50 p-3 text-[#4E342E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D98292]/50"
              ></textarea>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-[#FFF8F3] p-6 rounded-2xl border border-[#F2E3DB] space-y-4">
            <h3 className="font-playfair font-bold text-xl text-[#4E342E]">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm text-[#4E342E]/80">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span
                  className={
                    deliveryDistance ? "font-bold" : "text-[#8D6E63] italic"
                  }
                >
                  {deliveryDistance
                    ? `₹${deliveryCharge}`
                    : "Calculated at checkout"}
                </span>
              </div>
            </div>

            <div className="h-px bg-[#F2E3DB] w-full" />

            <div className="flex justify-between text-lg font-bold text-[#4E342E]">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={!deliveryDistance || !address || isOrdering}
              className="w-full py-4 mt-2 bg-[#D98292] text-white font-bold rounded-xl shadow-lg hover:bg-[#c46b7d] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isOrdering ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  Order Now <ArrowRight size={18} />
                </>
              )}
            </button>

            {(!deliveryDistance || !address) && (
              <p className="text-xs text-center text-[#8D6E63]">
                Please detect location and enter address to proceed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
