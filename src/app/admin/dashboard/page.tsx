// "use client";

// import { useState, useEffect } from "react";
// import { RefreshCw, ChefHat, Truck, Package, Clock, Plus, Trash2, Edit2, Image as ImageIcon, RotateCcw, X, AlertTriangle } from "lucide-react";
// import { Toast } from "@/components/ui/Toast";

// // --- TYPES ---
// type Order = {
//   _id: string;
//   customerName: string;
//   totalAmount: number;
//   status: string;
//   address: string;
//   items: { name: string; quantity: number; variant?: string }[];
//   createdAt: string;
// };

// type Variant = { name: string; price: number };

// type Product = {
//   _id: string;
//   name: string;
//   basePrice: number;
//   category: string;
//   images: string[];
//   description?: string;
//   variants?: Variant[];
// };

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("LEADS");
  
//   // Data States
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [menuFilter, setMenuFilter] = useState("ALL");

//   // Form States
//   const [isUploading, setIsUploading] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
  
//   // UI States
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error"|"warning" });
//   const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean, id: string | null }>({ show: false, id: null });

//   // Form Data
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "CAKE", 
//     description: "",
//     image: null as File | null,
//     hasVariants: false,
//     basePrice: "", 
//     variants: [] as { name: string; price: string }[]
//   });

//   // --- FETCHERS ---
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/get-orders");
//       const data = await res.json();
//       if (data.success) setOrders(data.orders);
//     } catch (error) { console.error("Fetch Error", error); }
//     finally { setLoading(false); }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/admin/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) { console.error("Fetch Products Error", error); }
//   };

//   useEffect(() => { fetchOrders(); fetchProducts(); }, []);

//   // --- HELPER: SHOW TOAST ---
//   const showToast = (message: string, type: "success"|"error"|"warning") => {
//     setToast({ show: true, message, type });
//   };

//   // --- ORDER HANDLERS ---
//   const updateStatus = async (orderId: string, newStatus: string) => {
//     try {
//       const res = await fetch("/api/admin/update-status", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId, newStatus }),
//       });
//       if (res.ok) {
//         fetchOrders();
//         showToast(`Order status updated to ${newStatus}`, "success");
//       }
//     } catch (error) { showToast("Failed to update status", "error"); }
//   };

//   // --- VARIANT HANDLERS ---
//   const addVariant = () => {
//     setFormData({ ...formData, variants: [...formData.variants, { name: "", price: "" }] });
//   };
//   const removeVariant = (index: number) => {
//     const newVariants = [...formData.variants];
//     newVariants.splice(index, 1);
//     setFormData({ ...formData, variants: newVariants });
//   };
//   const updateVariant = (index: number, field: "name"|"price", value: string) => {
//     const newVariants = [...formData.variants];
//     newVariants[index][field] = value;
//     setFormData({ ...formData, variants: newVariants });
//   };

//   // --- PRODUCT SUBMIT ---
//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name) { showToast("Please enter a product name", "error"); return; }

//     setIsUploading(true);
    
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("category", formData.category);
//     data.append("description", formData.description);
//     if (formData.image) data.append("image", formData.image);

//     if (formData.hasVariants) {
//       const validVariants = formData.variants.filter(v => v.name && v.price).map(v => ({ name: v.name, price: parseFloat(v.price) }));
//       if(validVariants.length === 0) { showToast("Please add at least one size option", "error"); setIsUploading(false); return; }
//       data.append("variants", JSON.stringify(validVariants));
//       data.append("price", "0");
//     } else {
//       if(!formData.basePrice) { showToast("Please enter a price", "error"); setIsUploading(false); return; }
//       data.append("price", formData.basePrice);
//       data.append("variants", "[]");
//     }

//     const method = editingId ? "PUT" : "POST";
//     if (editingId) data.append("id", editingId);

//     try {
//       const res = await fetch("/api/admin/products", { method, body: data });
//       if (res.ok) {
//         showToast(editingId ? "Item updated successfully!" : "New item added!", "success");
//         setFormData({ name: "", category: "CAKE", description: "", image: null, hasVariants: false, basePrice: "", variants: [] }); 
//         setEditingId(null);
//         fetchProducts(); 
//       } else { showToast("Operation failed", "error"); }
//     } catch (error) { showToast("Error connecting to server", "error"); }
//     finally { setIsUploading(false); }
//   };

//   // --- DELETE HANDLER (CUSTOM MODAL) ---
//   const confirmDelete = async () => {
//     if (!deleteConfirm.id) return;
//     try {
//         await fetch(`/api/admin/products?id=${deleteConfirm.id}`, { method: "DELETE" });
//         showToast("Item deleted from menu", "warning");
//         fetchProducts();
//     } catch (error) { showToast("Delete failed", "error"); }
//     finally { setDeleteConfirm({ show: false, id: null }); }
//   };

//   const handleEditClick = (product: Product) => {
//     setEditingId(product._id);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       description: product.description || "",
//       image: null,
//       hasVariants: !!(product.variants && product.variants.length > 0),
//       basePrice: product.basePrice ? product.basePrice.toString() : "",
//       variants: product.variants ? product.variants.map(v => ({ name: v.name, price: v.price.toString() })) : []
//     });
//     // Fix: Ensure we only scroll on client
//     if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // --- FILTERS ---
//   const getFilteredOrders = () => {
//     switch (activeTab) {
//       case "LEADS": return orders.filter((o) => o.status === "PENDING");
//       case "PENDING": return orders.filter((o) => o.status === "CONFIRMED");
//       case "ONGOING": return orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status));
//       case "HISTORY": return orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));
//       default: return [];
//     }
//   };

//   const getFilteredProducts = () => {
//     if (menuFilter === "ALL") return products;
//     return products.filter(p => p.category === menuFilter);
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
//       {/* Toast Notification */}
//       <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />

//       {/* --- CUSTOM DELETE MODAL --- */}
//       {deleteConfirm.show && (
//         <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
//             <div className="flex flex-col items-center text-center">
//               <div className="mb-4 rounded-full bg-red-100 p-3">
//                 <AlertTriangle className="h-8 w-8 text-red-600" />
//               </div>
//               <h3 className="mb-2 text-xl font-bold text-[#4E342E]">Delete this item?</h3>
//               <p className="mb-6 text-sm text-[#8D6E63]">
//                 Are you sure you want to remove this product from your menu? This action cannot be undone.
//               </p>
//               <div className="grid w-full grid-cols-2 gap-3">
//                 <button 
//                   onClick={() => setDeleteConfirm({ show: false, id: null })}
//                   className="rounded-xl border border-[#F2E3DB] py-3 font-bold text-[#8D6E63] hover:bg-[#FFF8F3]"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={confirmDelete}
//                   className="rounded-xl bg-red-500 py-3 font-bold text-white shadow-md hover:bg-red-600"
//                 >
//                   Yes, Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1>
//         <button onClick={() => { fetchOrders(); fetchProducts(); }} className="p-2 bg-white rounded-full shadow text-[#D98292] hover:rotate-180 transition duration-500">
//           <RefreshCw size={20} />
//         </button>
//       </div>

//       {/* MAIN TABS */}
//       <div className="grid grid-cols-2 md:flex gap-3 mb-8">
//         {[
//           { id: "LEADS", label: "Leads", icon: <Clock size={18} /> },
//           { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> },
//           { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> },
//           { id: "HISTORY", label: "History", icon: <Package size={18} /> },
//           { id: "PRODUCTS", label: "Menu Editor", icon: <Plus size={18} /> },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-5 rounded-xl font-bold transition-all text-sm ${
//               activeTab === tab.id ? "bg-[#D98292] text-white shadow-lg" : "bg-white text-[#8D6E63]"
//             }`}
//           >
//             {tab.icon} <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* --- MENU EDITOR TAB --- */}
//       {activeTab === "PRODUCTS" ? (
//         <div className="grid md:grid-cols-3 gap-8">
          
//           {/* 1. Editor Form */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] md:col-span-1 h-fit md:sticky md:top-4">
//             <h3 className="font-bold text-lg mb-4 text-[#4E342E]">
//               {editingId ? "Edit Item" : "Add New Item"}
//             </h3>
            
//             <form onSubmit={handleProductSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-[#8D6E63] uppercase mb-1">Image</label>
//                 <div className="border-2 border-dashed border-[#F2E3DB] rounded-lg p-4 text-center hover:bg-[#FFF8F3] transition cursor-pointer relative">
//                   <input type="file" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer"/>
//                   <ImageIcon className="mx-auto text-[#D98292] mb-2" />
//                   <p className="text-xs text-[#8D6E63] truncate">{formData.image ? formData.image.name : "Tap to upload photo"}</p>
//                 </div>
//               </div>

//               <input type="text" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm"/>
              
//               <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm bg-white">
//                 <option value="CAKE">Cake</option>
//                 <option value="CHOCOLATE">Chocolate</option>
//                 <option value="JAR">Jar Cake</option>
//                 <option value="GIFT_BOX">Gift Box</option>
//                 <option value="CUSTOM">Custom</option>
//               </select>

//               <div className="bg-[#FFF8F3] p-3 rounded-lg border border-[#F2E3DB]">
//                 <div className="flex items-center gap-2 mb-3">
//                    <input type="checkbox" id="hasVariants" checked={formData.hasVariants} onChange={(e) => setFormData({...formData, hasVariants: e.target.checked})} className="w-4 h-4 text-[#D98292] focus:ring-[#D98292] rounded border-gray-300"/>
//                    <label htmlFor="hasVariants" className="text-sm font-bold text-[#4E342E]">Has multiple sizes/weights?</label>
//                 </div>
//                 {!formData.hasVariants ? (
//                    <input type="number" placeholder="Price (₹)" value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: e.target.value})} className="w-full p-2 rounded border border-[#F2E3DB] text-sm"/>
//                 ) : (
//                   <div className="space-y-2">
//                     {formData.variants.map((v, idx) => (
//                       <div key={idx} className="flex gap-2">
//                          <input type="text" placeholder="Size (0.5kg)" value={v.name} onChange={(e) => updateVariant(idx, "name", e.target.value)} className="w-1/2 p-2 rounded border border-[#F2E3DB] text-xs"/>
//                          <input type="number" placeholder="₹" value={v.price} onChange={(e) => updateVariant(idx, "price", e.target.value)} className="w-1/3 p-2 rounded border border-[#F2E3DB] text-xs"/>
//                          <button type="button" onClick={() => removeVariant(idx)} className="text-red-400 hover:text-red-600"><X size={16}/></button>
//                       </div>
//                     ))}
//                     <button type="button" onClick={addVariant} className="text-xs font-bold text-[#D98292] flex items-center gap-1 mt-2 hover:underline"><Plus size={14}/> Add Size Option</button>
//                   </div>
//                 )}
//               </div>

//               <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm h-20"></textarea>

//               <div className="flex gap-2">
//                 <button type="submit" disabled={isUploading} className="flex-1 py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] disabled:opacity-50">
//                   {isUploading ? "Saving..." : (editingId ? "Update Item" : "Add Item")}
//                 </button>
//                 {editingId && (
//                   <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", category: "CAKE", description: "", image: null, hasVariants: false, basePrice: "", variants: [] }); }} className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* 2. Product List & Filters */}
//           <div className="md:col-span-2 space-y-4">
//             <div className="flex justify-between items-center">
//                <h3 className="font-bold text-lg text-[#4E342E]">Current Menu ({getFilteredProducts().length})</h3>
//                <div className="flex gap-1 bg-white p-1 rounded-lg border border-[#F2E3DB]">
//                  {["ALL", "CAKE", "CHOCOLATE", "JAR"].map(cat => (
//                    <button key={cat} onClick={() => setMenuFilter(cat)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${menuFilter === cat ? "bg-[#D98292] text-white" : "text-[#8D6E63] hover:bg-[#FFF8F3]"}`}>{cat}</button>
//                  ))}
//                </div>
//             </div>

//             {getFilteredProducts().map((product) => (
//               <div key={product._id} className="bg-white p-4 rounded-xl border border-[#F2E3DB] flex items-center justify-between shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative border border-[#F2E3DB]">
//                     {product.images && product.images.length > 0 ? (
//                       <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-[#D98292]/30 font-bold text-xl">{product.name.charAt(0)}</div>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-[#4E342E]">{product.name}</h4>
//                     <p className="text-xs text-[#8D6E63] flex gap-2 items-center">
//                       <span className="bg-[#FFF8F3] px-2 py-0.5 rounded border border-[#F2E3DB]">{product.category}</span>
//                       {product.variants && product.variants.length > 0 
//                         ? <span className="text-[#D98292] font-bold">{product.variants.length} Sizes</span>
//                         : <span className="text-[#4E342E] font-bold">₹{product.basePrice}</span>
//                       }
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex gap-2">
//                   <button onClick={() => handleEditClick(product)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
//                   {/* Trigger Custom Modal */}
//                   <button onClick={() => setDeleteConfirm({ show: true, id: product._id })} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       ) : (
//         // --- ORDER LIST TABS (UNCHANGED) ---
//         <div className="space-y-4">
//            {loading ? <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p> : 
//            getFilteredOrders().length === 0 ? (
//             <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed">
//               <p className="text-[#8D6E63]">No orders here.</p>
//             </div>
//           ) : (
//             getFilteredOrders().map((order) => (
//               <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3>
//                     <span className="px-3 py-1 bg-[#FFF8F3] text-[#D98292] text-xs font-bold rounded-full border border-[#D98292]/20">{order.status}</span>
//                   </div>
//                   <p className="text-sm text-[#8D6E63] mb-4">{order.address}</p>
//                   <div className="space-y-1 mb-4">
//                     {order.items.map((item, idx) => (
//                       <div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1">
//                         <span>{item.quantity} x {item.name} {item.variant && `(${item.variant})`}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <p className="font-bold text-[#4E342E]">Total: ₹{order.totalAmount}</p>
//                 </div>
//                 <div className="flex flex-col gap-2 justify-center min-w-[180px]">
//                   {activeTab === "LEADS" && (<><button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Accept</button><button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 text-xs underline">Reject</button></>)}
//                   {activeTab === "PENDING" && (<><button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold text-sm flex justify-center gap-2"><ChefHat size={16}/> Bake</button><button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}
//                   {activeTab === "ONGOING" && (<>{order.status === "PREPARING" && <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">Mark Ready</button>}{order.status === "READY" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">Dispatch</button>}{order.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Delivered</button>}<button onClick={() => {if(order.status === "PREPARING") updateStatus(order._id, "CONFIRMED");if(order.status === "READY") updateStatus(order._id, "PREPARING");if(order.status === "OUT_FOR_DELIVERY") updateStatus(order._id, "READY");}} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}
//                   {activeTab === "HISTORY" && (<>{order.status === "DELIVERED" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 py-1"><RotateCcw size={12}/> Not Delivered</button>}{order.status === "CANCELLED" && <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Re-open</button>}</>)}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }











"use client";

import { useState, useEffect } from "react";
import { RefreshCw, ChefHat, Truck, Package, Clock, Plus, Trash2, Edit2, Image as ImageIcon, RotateCcw, X, AlertTriangle, MapPin } from "lucide-react";
import { Toast } from "@/components/ui/Toast";

// --- TYPES ---
type OrderItem = {
  name: string;
  quantity: number;
  variant?: string;
  price?: number; // Price per unit
};

type Order = {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  address: string;
  items: OrderItem[];
  createdAt: string; // MongoDB timestamp
};

type Variant = { name: string; price: number };

type Product = {
  _id: string;
  name: string;
  basePrice: number;
  category: string;
  images: string[];
  description?: string;
  variants?: Variant[];
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("LEADS");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuFilter, setMenuFilter] = useState("ALL");
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error"|"warning" });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean, id: string | null }>({ show: false, id: null });

  const [formData, setFormData] = useState({
    name: "", category: "CAKE", description: "", image: null as File | null,
    hasVariants: false, basePrice: "", variants: [] as { name: string; price: string }[]
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/get-orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchOrders(); fetchProducts(); }, []);

  const showToast = (message: string, type: "success"|"error"|"warning") => {
    setToast({ show: true, message, type });
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });
      if (res.ok) { fetchOrders(); showToast(`Order updated: ${newStatus}`, "success"); }
    } catch (error) { showToast("Failed to update", "error"); }
  };

  // --- Date Formatter ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  // --- PRODUCT HANDLERS ---
  const addVariant = () => setFormData({ ...formData, variants: [...formData.variants, { name: "", price: "" }] });
  const removeVariant = (index: number) => { const v = [...formData.variants]; v.splice(index, 1); setFormData({...formData, variants: v}); };
  const updateVariant = (index: number, f: "name"|"price", v: string) => { const va = [...formData.variants]; va[index][f] = v; setFormData({...formData, variants: va}); };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) { showToast("Name required", "error"); return; }
    setIsUploading(true);
    const data = new FormData();
    data.append("name", formData.name); data.append("category", formData.category); data.append("description", formData.description);
    if(formData.image) data.append("image", formData.image);
    
    if (formData.hasVariants) {
      const valid = formData.variants.filter(v => v.name && v.price).map(v => ({ name: v.name, price: parseFloat(v.price) }));
      if(!valid.length) { showToast("Add a size", "error"); setIsUploading(false); return; }
      data.append("variants", JSON.stringify(valid)); data.append("price", "0");
    } else {
      if(!formData.basePrice) { showToast("Price required", "error"); setIsUploading(false); return; }
      data.append("price", formData.basePrice); data.append("variants", "[]");
    }

    const method = editingId ? "PUT" : "POST";
    if (editingId) data.append("id", editingId);

    try {
      const res = await fetch("/api/admin/products", { method, body: data });
      if(res.ok) { showToast(editingId ? "Updated!" : "Added!", "success"); setFormData({name:"", category:"CAKE", description:"", image:null, hasVariants:false, basePrice:"", variants:[]}); setEditingId(null); fetchProducts(); }
      else showToast("Failed", "error");
    } catch(e) { showToast("Error", "error"); } finally { setIsUploading(false); }
  };

  const confirmDelete = async () => {
    if(!deleteConfirm.id) return;
    await fetch(`/api/admin/products?id=${deleteConfirm.id}`, { method: "DELETE" });
    showToast("Deleted", "warning"); fetchProducts(); setDeleteConfirm({show:false, id:null});
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p._id);
    setFormData({
       name: p.name, category: p.category, description: p.description||"", image: null,
       hasVariants: !!(p.variants?.length), basePrice: p.basePrice?.toString()||"",
       variants: p.variants ? p.variants.map(v => ({name: v.name, price: v.price.toString()})) : []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FILTERS ---
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "LEADS": return orders.filter((o) => o.status === "PENDING");
      case "PENDING": return orders.filter((o) => o.status === "CONFIRMED");
      case "ONGOING": return orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status));
      case "HISTORY": return orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));
      default: return [];
    }
  };

  const getFilteredProducts = () => {
    if (menuFilter === "ALL") return products;
    return products.filter(p => p.category === menuFilter);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
      {/* Delete Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
             <div className="text-center">
               <div className="mb-4 inline-block rounded-full bg-red-100 p-3"><AlertTriangle className="h-8 w-8 text-red-600"/></div>
               <h3 className="mb-2 text-xl font-bold text-[#4E342E]">Delete Item?</h3>
               <div className="grid grid-cols-2 gap-3 mt-6"><button onClick={()=>setDeleteConfirm({show:false,id:null})} className="rounded-xl border border-[#F2E3DB] py-3 font-bold text-[#8D6E63]">Cancel</button><button onClick={confirmDelete} className="rounded-xl bg-red-500 py-3 font-bold text-white">Delete</button></div>
             </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1>
        <button onClick={() => { fetchOrders(); fetchProducts(); }} className="p-2 bg-white rounded-full shadow text-[#D98292] hover:rotate-180 transition duration-500"><RefreshCw size={20} /></button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:flex gap-3 mb-8">
        {[{ id: "LEADS", label: "Leads", icon: <Clock size={18} /> }, { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> }, { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> }, { id: "HISTORY", label: "History", icon: <Package size={18} /> }, { id: "PRODUCTS", label: "Menu Editor", icon: <Plus size={18} /> }]
        .map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-5 rounded-xl font-bold transition-all text-sm ${activeTab === tab.id ? "bg-[#D98292] text-white shadow-lg" : "bg-white text-[#8D6E63]"}`}>{tab.icon} <span>{tab.label}</span></button>
        ))}
      </div>

      {/* --- CONTENT --- */}
      {activeTab === "PRODUCTS" ? (
        <div className="grid md:grid-cols-3 gap-8">
           {/* EDITOR FORM */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] md:col-span-1 h-fit md:sticky md:top-4">
             <h3 className="font-bold text-lg mb-4 text-[#4E342E]">{editingId ? "Edit Item" : "Add New Item"}</h3>
             <form onSubmit={handleProductSubmit} className="space-y-4">
               {/* Image */}
               <div className="border-2 border-dashed border-[#F2E3DB] rounded-lg p-4 text-center hover:bg-[#FFF8F3] relative cursor-pointer"><input type="file" accept="image/*" onChange={(e)=>setFormData({...formData, image:e.target.files?.[0]||null})} className="absolute inset-0 opacity-0 cursor-pointer"/><ImageIcon className="mx-auto text-[#D98292] mb-2"/><p className="text-xs text-[#8D6E63] truncate">{formData.image ? formData.image.name : "Tap to upload"}</p></div>
               <input type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm"/>
               <select value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm bg-white"><option value="CAKE">Cake</option><option value="CHOCOLATE">Chocolate</option><option value="JAR">Jar</option><option value="GIFT_BOX">Gift Box</option><option value="CUSTOM">Custom</option></select>
               
               <div className="bg-[#FFF8F3] p-3 rounded-lg border border-[#F2E3DB]">
                 <div className="flex items-center gap-2 mb-3"><input type="checkbox" checked={formData.hasVariants} onChange={(e)=>setFormData({...formData, hasVariants:e.target.checked})} className="w-4 h-4 text-[#D98292] rounded"/><label className="text-sm font-bold text-[#4E342E]">Variants?</label></div>
                 {!formData.hasVariants ? <input type="number" placeholder="Price (₹)" value={formData.basePrice} onChange={(e)=>setFormData({...formData, basePrice:e.target.value})} className="w-full p-2 rounded border border-[#F2E3DB] text-sm"/> : 
                   <div className="space-y-2">{formData.variants.map((v,i)=>(<div key={i} className="flex gap-2"><input type="text" placeholder="Size" value={v.name} onChange={(e)=>updateVariant(i,"name",e.target.value)} className="w-1/2 p-2 rounded border border-[#F2E3DB] text-xs"/><input type="number" placeholder="₹" value={v.price} onChange={(e)=>updateVariant(i,"price",e.target.value)} className="w-1/3 p-2 rounded border border-[#F2E3DB] text-xs"/><button type="button" onClick={()=>removeVariant(i)} className="text-red-400"><X size={16}/></button></div>))}<button type="button" onClick={addVariant} className="text-xs font-bold text-[#D98292] mt-2 flex items-center gap-1"><Plus size={14}/> Add Size</button></div>}
               </div>
               <textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm h-20"></textarea>
               <div className="flex gap-2"><button type="submit" disabled={isUploading} className="flex-1 py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] disabled:opacity-50">{isUploading?"Saving...":editingId?"Update":"Add"}</button>{editingId && <button type="button" onClick={()=>{setEditingId(null); setFormData({name:"",category:"CAKE",description:"",image:null,hasVariants:false,basePrice:"",variants:[]})}} className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl">Cancel</button>}</div>
             </form>
           </div>
           {/* LIST */}
           <div className="md:col-span-2 space-y-4">
             <div className="flex justify-between items-center"><h3 className="font-bold text-lg text-[#4E342E]">Menu ({getFilteredProducts().length})</h3><div className="flex gap-1 bg-white p-1 rounded-lg border border-[#F2E3DB]">{["ALL","CAKE","CHOCOLATE","JAR"].map(c=><button key={c} onClick={()=>setMenuFilter(c)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${menuFilter===c?"bg-[#D98292] text-white":"text-[#8D6E63]"}`}>{c}</button>)}</div></div>
             {getFilteredProducts().map(p=>(<div key={p._id} className="bg-white p-4 rounded-xl border border-[#F2E3DB] flex items-center justify-between shadow-sm"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-[#F2E3DB]">{p.images[0]?<img src={p.images[0]} className="w-full h-full object-cover"/>:<div className="w-full h-full flex items-center justify-center text-[#D98292]/30 font-bold">{p.name[0]}</div>}</div><div><h4 className="font-bold text-[#4E342E]">{p.name}</h4><p className="text-xs text-[#8D6E63]">{p.category} • {p.variants?.length ? `${p.variants.length} Sizes` : `₹${p.basePrice}`}</p></div></div><div className="flex gap-2"><button onClick={()=>handleEditClick(p)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"><Edit2 size={18}/></button><button onClick={()=>setDeleteConfirm({show:true,id:p._id})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button></div></div>))}
           </div>
        </div>
      ) : (
        /* --- ORDER LIST --- */
        <div className="space-y-4">
           {loading ? <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p> : 
           getFilteredOrders().length === 0 ? <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed"><p className="text-[#8D6E63]">No orders here.</p></div> : 
           getFilteredOrders().map((order) => (
              <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                {/* 1. Date & Time (Top Right) */}
                <div className="absolute top-0 right-0 bg-[#FFF8F3] px-4 py-1 rounded-bl-xl border-b border-l border-[#F2E3DB] text-xs font-bold text-[#8D6E63] flex items-center gap-2">
                   <Clock size={12} /> {formatDate(order.createdAt)}
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  {/* 2. Customer Name */}
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
                  
                  {/* 3. Address Label */}
                  <div className="flex items-start gap-2 mb-4 text-sm text-[#8D6E63]">
                     <MapPin size={16} className="mt-0.5 text-[#D98292]" />
                     <p><span className="font-bold text-[#4E342E]">Address:</span> {order.address}</p>
                  </div>
                  
                  {/* 4. Items with Price */}
                  <div className="space-y-1 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1">
                        <span>
                           <span className="font-bold">{item.quantity} x</span> {item.name} 
                           {item.variant && <span className="text-[#8D6E63] text-xs"> ({item.variant})</span>}
                        </span>
                        {/* Price Display */}
                        <span className="font-bold text-[#4E342E]">
                           {item.price ? `₹${item.price * item.quantity}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="font-bold text-[#4E342E] text-lg">Bill: ₹{order.totalAmount}</p>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center min-w-[180px]">
                  {activeTab === "LEADS" && (<><button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Accept</button><button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 text-xs underline">Reject</button></>)}
                  {activeTab === "PENDING" && (<><button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold text-sm flex justify-center gap-2"><ChefHat size={16}/> Bake</button><button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}
                  {activeTab === "ONGOING" && (<>{order.status === "PREPARING" && <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">Mark Ready</button>}{order.status === "READY" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">Dispatch</button>}{order.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Delivered</button>}<button onClick={() => {if(order.status === "PREPARING") updateStatus(order._id, "CONFIRMED");if(order.status === "READY") updateStatus(order._id, "PREPARING");if(order.status === "OUT_FOR_DELIVERY") updateStatus(order._id, "READY");}} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}
                  {activeTab === "HISTORY" && (<>{order.status === "DELIVERED" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 py-1"><RotateCcw size={12}/> Not Delivered</button>}{order.status === "CANCELLED" && <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Re-open</button>}</>)}
                </div>
              </div>
           ))}
        </div>
      )}
    </div>
  );
}