"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Check, Truck, ChefHat, Package, Clock } from "lucide-react";

// Define the shape of an Order for TypeScript
type Order = {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  address: string;
  items: { name: string; quantity: number; variant?: string }[];
  createdAt: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("LEADS");

  // 1. Fetch Orders Function
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on page load
  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Update Status Function
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });
      if (res.ok) {
        fetchOrders(); // Refresh the list to show new status
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 3. Filter Logic for Tabs
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "LEADS":
        return orders.filter((o) => o.status === "PENDING");
      case "PENDING":
        return orders.filter((o) => o.status === "CONFIRMED");
      case "ONGOING":
        return orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status));
      case "HISTORY":
        return orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1>
          <p className="text-[#8D6E63] text-sm">Manage your bakery orders</p>
        </div>
        <button onClick={fetchOrders} className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition text-[#D98292]">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 md:gap-4 mb-8 pb-2 scrollbar-hide">
        {[
          { id: "LEADS", label: "New Leads", icon: <Clock size={16} /> },
          { id: "PENDING", label: "To Make", icon: <ChefHat size={16} /> },
          { id: "ONGOING", label: "Ongoing", icon: <Truck size={16} /> },
          { id: "HISTORY", label: "History", icon: <Package size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base ${
              activeTab === tab.id
                ? "bg-[#D98292] text-white shadow-lg"
                : "bg-white text-[#8D6E63] hover:bg-white/80"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p>
        ) : getFilteredOrders().length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed">
            <p className="text-[#8D6E63]">No orders in this section.</p>
          </div>
        ) : (
          getFilteredOrders().map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6">
              
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' :
                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                    'bg-[#FFF8F3] text-[#D98292] border-[#D98292]/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-[#8D6E63] mb-4">{order.address}</p>
                
                <div className="space-y-1 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1">
                      <span>{item.quantity} x {item.name} {item.variant && `(${item.variant})`}</span>
                    </div>
                  ))}
                </div>
                <p className="font-bold text-[#4E342E]">Total Bill: ₹{order.totalAmount}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 justify-center min-w-[160px]">
                
                {/* 1. Leads Tab Actions */}
                {activeTab === "LEADS" && (
                  <>
                    <button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 text-sm">
                      Accept Order
                    </button>
                    <button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 hover:text-red-600 text-xs underline">
                      Reject
                    </button>
                  </>
                )}

                {/* 2. Pending Tab Actions */}
                {activeTab === "PENDING" && (
                  <button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 text-sm flex items-center justify-center gap-2">
                    <ChefHat size={16} /> Start Baking
                  </button>
                )}

                {/* 3. Ongoing Tab Actions (The Chain) */}
                {activeTab === "ONGOING" && (
                  <>
                    {order.status === "PREPARING" && (
                      <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 text-sm">
                        Mark Ready
                      </button>
                    )}
                    {order.status === "READY" && (
                      <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 text-sm">
                        Dispatch
                      </button>
                    )}
                    {order.status === "OUT_FOR_DELIVERY" && (
                      <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 text-sm">
                        Confirm Delivery
                      </button>
                    )}
                  </>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}