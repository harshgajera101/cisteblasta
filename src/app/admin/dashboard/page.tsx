// "use client";

// import { useState, useEffect } from "react";
// import { RefreshCw, Check, Truck, ChefHat, Package, Clock, RotateCcw } from "lucide-react";

// // Define the shape of an Order for TypeScript
// type Order = {
//   _id: string;
//   customerName: string;
//   totalAmount: number;
//   status: string;
//   address: string;
//   items: { name: string; quantity: number; variant?: string }[];
//   createdAt: string;
// };

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("LEADS");

//   // 1. Fetch Orders Function
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/get-orders");
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run fetch on page load
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 2. Update Status Function
//   const updateStatus = async (orderId: string, newStatus: string) => {
//     try {
//       const res = await fetch("/api/admin/update-status", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId, newStatus }),
//       });
//       if (res.ok) {
//         fetchOrders(); // Refresh the list to show new status
//       }
//     } catch (error) {
//       alert("Failed to update status");
//     }
//   };

//   // 3. Filter Logic for Tabs
//   const getFilteredOrders = () => {
//     switch (activeTab) {
//       case "LEADS":
//         return orders.filter((o) => o.status === "PENDING");
//       case "PENDING":
//         return orders.filter((o) => o.status === "CONFIRMED");
//       case "ONGOING":
//         return orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status));
//       case "HISTORY":
//         return orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));
//       default:
//         return [];
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 md:mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1>
//           <p className="text-[#8D6E63] text-sm">Manage your bakery orders</p>
//         </div>
//         <button onClick={fetchOrders} className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition text-[#D98292]">
//           <RefreshCw size={20} />
//         </button>
//       </div>

//       {/* --- UPDATED TABS SECTION (Grid on Mobile, Row on Desktop) --- */}
//       <div className="grid grid-cols-2 gap-3 mb-8 md:flex md:gap-4">
//         {[
//           { id: "LEADS", label: "New Leads", icon: <Clock size={18} /> },
//           { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> },
//           { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> },
//           { id: "HISTORY", label: "History", icon: <Package size={18} /> },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-6 md:py-3 rounded-xl font-bold transition-all text-sm md:text-base ${
//               activeTab === tab.id
//                 ? "bg-[#D98292] text-white shadow-lg scale-[1.02]"
//                 : "bg-white text-[#8D6E63] hover:bg-white/80 border border-transparent hover:border-[#D98292]/20"
//             }`}
//           >
//             {tab.icon} 
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Order List */}
//       <div className="space-y-4">
//         {loading ? (
//           <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p>
//         ) : getFilteredOrders().length === 0 ? (
//           <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed">
//             <p className="text-[#8D6E63]">No orders in this section.</p>
//           </div>
//         ) : (
//           getFilteredOrders().map((order) => (
//             <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6">
              
//               {/* Order Info */}
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3>
//                   <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
//                     order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' :
//                     order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
//                     'bg-[#FFF8F3] text-[#D98292] border-[#D98292]/20'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-[#8D6E63] mb-4 break-words">{order.address}</p>
                
//                 <div className="space-y-1 mb-4">
//                   {order.items.map((item, idx) => (
//                     <div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1">
//                       <span>{item.quantity} x {item.name} {item.variant && `(${item.variant})`}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="font-bold text-[#4E342E]">Total Bill: ₹{order.totalAmount}</p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col gap-2 justify-center min-w-[180px]">
                
//                 {/* 1. Leads Tab Actions */}
//                 {activeTab === "LEADS" && (
//                   <>
//                     <button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-3 md:py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 text-sm">
//                       Accept Order
//                     </button>
//                     <button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 hover:text-red-600 text-xs underline">
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {/* 2. Pending (To Make) Tab Actions */}
//                 {activeTab === "PENDING" && (
//                   <>
//                     <button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-3 md:py-2 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 text-sm flex items-center justify-center gap-2">
//                       <ChefHat size={16} /> Start Baking
//                     </button>
//                     <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] hover:text-[#4E342E] py-1">
//                       <RotateCcw size={12} /> Undo (Back to Leads)
//                     </button>
//                   </>
//                 )}

//                 {/* 3. Ongoing Tab Actions (Bi-Directional) */}
//                 {activeTab === "ONGOING" && (
//                   <>
//                     {order.status === "PREPARING" && (
//                       <>
//                         <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-3 md:py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 text-sm">
//                           Mark Ready
//                         </button>
//                         <button onClick={() => updateStatus(order._id, "CONFIRMED")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] hover:text-[#4E342E] py-1">
//                           <RotateCcw size={12} /> Undo (Stop Baking)
//                         </button>
//                       </>
//                     )}

//                     {order.status === "READY" && (
//                       <>
//                         <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-3 md:py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 text-sm">
//                           Dispatch
//                         </button>
//                         <button onClick={() => updateStatus(order._id, "PREPARING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] hover:text-[#4E342E] py-1">
//                           <RotateCcw size={12} /> Undo (Not Ready)
//                         </button>
//                       </>
//                     )}

//                     {order.status === "OUT_FOR_DELIVERY" && (
//                       <>
//                         <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-3 md:py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 text-sm">
//                           Confirm Delivery
//                         </button>
//                         <button onClick={() => updateStatus(order._id, "READY")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] hover:text-[#4E342E] py-1">
//                           <RotateCcw size={12} /> Undo (Cancel Dispatch)
//                         </button>
//                       </>
//                     )}
//                   </>
//                 )}

//                 {/* 4. History Tab Actions */}
//                 {activeTab === "HISTORY" && (
//                   <>
//                     <div className="text-center text-xs text-gray-400 mb-2">
//                        {order.status === "DELIVERED" ? "Completed" : "Rejected"}
//                     </div>
                    
//                     {order.status === "DELIVERED" && (
//                       <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 hover:text-red-600 border border-red-100 rounded px-2 py-2">
//                         <RotateCcw size={12} /> Mark Not Delivered
//                       </button>
//                     )}

//                     {order.status === "CANCELLED" && (
//                       <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] hover:text-[#4E342E] border border-[#F2E3DB] rounded px-2 py-2">
//                         <RotateCcw size={12} /> Re-open Order
//                       </button>
//                     )}
//                   </>
//                 )}

//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }













"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Check, Truck, ChefHat, Package, Clock, RotateCcw, Plus, Trash2, Edit2, Image as ImageIcon } from "lucide-react";

// Types matched to your NEW Schema
type Order = {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  address: string;
  items: { name: string; quantity: number; variant?: string }[];
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  basePrice: number;    // Changed from price to basePrice
  category: string;
  images: string[];     // Changed from image to images array
  description?: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("LEADS");
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Form States
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // To track which item we are editing
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "CAKE", 
    description: "",
    image: null as File | null,
  });

  // --- FETCHERS ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) { console.error("Fetch Error", error); }
    finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) { console.error("Fetch Products Error", error); }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // --- HANDLERS ---
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });
      if (res.ok) fetchOrders();
    } catch (error) { alert("Failed to update"); }
  };

  // --- PRODUCT SUBMIT (CREATE & EDIT) ---
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Name and Price are required");
      return;
    }

    setIsUploading(true);
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    // Decide whether to CREATE (POST) or UPDATE (PUT)
    const method = editingId ? "PUT" : "POST";
    if (editingId) data.append("id", editingId);

    try {
      const res = await fetch("/api/admin/products", {
        method: method,
        body: data,
      });
      
      if (res.ok) {
        alert(editingId ? "Product Updated!" : "Product Added!");
        // Reset Form
        setFormData({ name: "", price: "", category: "CAKE", description: "", image: null }); 
        setEditingId(null); // Exit edit mode
        fetchProducts(); 
      } else {
        alert("Operation Failed");
      }
    } catch (error) {
      alert("Error submitting product");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if(!confirm("Delete this item?")) return;
    try {
        await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
        fetchProducts();
    } catch (error) { alert("Delete failed"); }
  };

  // NEW: Handle clicking the Edit button
  const handleEditClick = (product: Product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.basePrice.toString(),
      category: product.category,
      description: product.description || "",
      image: null, // We don't preload the file object, but user can upload new one
    });
    // Scroll to form (optional, for mobile convenience)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", category: "CAKE", description: "", image: null });
  };

  // --- FILTER LOGIC ---
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "LEADS": return orders.filter((o) => o.status === "PENDING");
      case "PENDING": return orders.filter((o) => o.status === "CONFIRMED");
      case "ONGOING": return orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status));
      case "HISTORY": return orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1>
        </div>
        <button onClick={() => { fetchOrders(); fetchProducts(); }} className="p-2 bg-white rounded-full shadow text-[#D98292]">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* TABS */}
      <div className="grid grid-cols-2 md:flex gap-3 mb-8">
        {[
          { id: "LEADS", label: "Leads", icon: <Clock size={18} /> },
          { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> },
          { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> },
          { id: "HISTORY", label: "History", icon: <Package size={18} /> },
          { id: "PRODUCTS", label: "Menu Editor", icon: <Plus size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-5 rounded-xl font-bold transition-all text-sm ${
              activeTab === tab.id ? "bg-[#D98292] text-white shadow-lg" : "bg-white text-[#8D6E63]"
            }`}
          >
            {tab.icon} <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* --- CONTENT --- */}
      
      {activeTab === "PRODUCTS" ? (
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Add/Edit Product Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] md:col-span-1 h-fit sticky top-4">
            <h3 className="font-bold text-lg mb-4 text-[#4E342E]">
              {editingId ? "Edit Item" : "Add New Item"}
            </h3>
            
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#8D6E63] uppercase mb-1">Image</label>
                <div className="border-2 border-dashed border-[#F2E3DB] rounded-lg p-4 text-center hover:bg-[#FFF8F3] transition cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <ImageIcon className="mx-auto text-[#D98292] mb-2" />
                  <p className="text-xs text-[#8D6E63]">{formData.image ? formData.image.name : "Tap to upload new photo"}</p>
                </div>
              </div>

              <input 
                type="text" placeholder="Item Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm"
              />
              
              <div className="flex gap-2">
                <input 
                  type="number" placeholder="Price (₹)" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-1/2 p-3 rounded-lg border border-[#F2E3DB] text-sm"
                />
                
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-1/2 p-3 rounded-lg border border-[#F2E3DB] text-sm bg-white"
                >
                  <option value="CAKE">Cake</option>
                  <option value="CHOCOLATE">Chocolate</option>
                  <option value="JAR">Jar Cake</option>
                  <option value="GIFT_BOX">Gift Box</option>
                  <option value="CUSTOM">Custom</option>
                </select>
              </div>

              <textarea 
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm h-20"
              ></textarea>

              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="flex-1 py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] disabled:opacity-50"
                >
                  {isUploading ? "Saving..." : (editingId ? "Update Item" : "Add Item")}
                </button>
                
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-lg text-[#4E342E]">Current Menu ({products.length})</h3>
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-xl border border-[#F2E3DB] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">
                    {/* Updated to check images array */}
                    {product.images && product.images.length > 0 && (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4E342E]">{product.name}</h4>
                    {/* Fixed Price Display */}
                    <p className="text-sm text-[#8D6E63]">
                      {product.category} • ₹{product.basePrice}
                    </p>
                  </div>
                </div>
                
                {/* Edit and Delete Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditClick(product)}
                    className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      ) : (
        // ORDER TABS LOGIC
        <div className="space-y-4">
           {loading ? <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p> : 
           getFilteredOrders().length === 0 ? (
            <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed">
              <p className="text-[#8D6E63]">No orders here.</p>
            </div>
          ) : (
            getFilteredOrders().map((order) => (
              <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3>
                    <span className="px-3 py-1 bg-[#FFF8F3] text-[#D98292] text-xs font-bold rounded-full border border-[#D98292]/20">{order.status}</span>
                  </div>
                  <p className="text-sm text-[#8D6E63] mb-4">{order.address}</p>
                  <div className="space-y-1 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1">
                        <span>{item.quantity} x {item.name} {item.variant && `(${item.variant})`}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-bold text-[#4E342E]">Total: ₹{order.totalAmount}</p>
                </div>
                
                <div className="flex flex-col gap-2 justify-center min-w-[180px]">
                  {activeTab === "LEADS" && (
                    <>
                      <button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Accept</button>
                      <button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 text-xs underline">Reject</button>
                    </>
                  )}
                  {activeTab === "PENDING" && (
                     <>
                      <button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold text-sm flex justify-center gap-2"><ChefHat size={16}/> Bake</button>
                      <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button>
                     </>
                  )}
                  {activeTab === "ONGOING" && (
                    <>
                      {order.status === "PREPARING" && <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">Mark Ready</button>}
                      {order.status === "READY" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">Dispatch</button>}
                      {order.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Delivered</button>}
                      
                      <button onClick={() => {
                        if(order.status === "PREPARING") updateStatus(order._id, "CONFIRMED");
                        if(order.status === "READY") updateStatus(order._id, "PREPARING");
                        if(order.status === "OUT_FOR_DELIVERY") updateStatus(order._id, "READY");
                      }} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button>
                    </>
                  )}
                  {activeTab === "HISTORY" && (
                     <>
                       {order.status === "DELIVERED" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 py-1"><RotateCcw size={12}/> Not Delivered</button>}
                       {order.status === "CANCELLED" && <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Re-open</button>}
                     </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}