// "use client";

// import { useState, useEffect, useRef } from "react";
// import { 
//   RefreshCw, ChefHat, Truck, Package, Clock, Plus, Trash2, Edit2, 
//   Image as ImageIcon, RotateCcw, X, AlertTriangle, MapPin, Phone, Mail,
//   ChevronLeft, ChevronRight, Filter, Calendar, Info
// } from "lucide-react";
// import { Toast } from "@/components/ui/Toast";

// // --- TYPES ---
// type OrderItem = {
//   name: string;
//   quantity: number;
//   variant?: string;
//   price?: number;
// };

// type Order = {
//   _id: string;
//   customerName: string;
//   phone?: string;
//   email?: string;
//   totalAmount: number;
//   deliveryCharge?: number;
//   status: string;
//   address: string;
//   items: OrderItem[];
//   createdAt: string;
//   notes?: string; 
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

// const ITEMS_PER_PAGE = 7;

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("LEADS");
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [menuFilter, setMenuFilter] = useState("ALL");
//   const [historyDateFilter, setHistoryDateFilter] = useState("ALL"); 
//   const [historyStatusFilter, setHistoryStatusFilter] = useState("ALL");
//   const [currentPage, setCurrentPage] = useState(1);
//   const dashboardTopRef = useRef<HTMLDivElement>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error"|"warning" });
//   const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean, id: string | null }>({ show: false, id: null });
//   const [formData, setFormData] = useState({
//     name: "", category: "CAKE", description: "", image: null as File | null,
//     hasVariants: false, basePrice: "", variants: [] as { name: string; price: string }[]
//   });

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/get-orders");
//       const data = await res.json();
//       if (data.success) setOrders(data.orders);
//     } catch (error) { console.error(error); } finally { setLoading(false); }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/admin/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) { console.error(error); }
//   };

//   useEffect(() => { fetchOrders(); fetchProducts(); }, []);
//   useEffect(() => { setCurrentPage(1); }, [activeTab, historyDateFilter, historyStatusFilter]);

//   const showToast = (message: string, type: "success"|"error"|"warning") => { setToast({ show: true, message, type }); };

//   const updateStatus = async (orderId: string, newStatus: string) => {
//     try {
//       const res = await fetch("/api/admin/update-status", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId, newStatus }),
//       });
//       if (res.ok) { fetchOrders(); showToast(`Order updated: ${newStatus}`, "success"); }
//     } catch (error) { showToast("Failed to update", "error"); }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
//   };

//   const changePage = (newPage: number) => {
//     setCurrentPage(newPage);
//     setTimeout(() => { dashboardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
//   };

//   const addVariant = () => setFormData({ ...formData, variants: [...formData.variants, { name: "", price: "" }] });
//   const removeVariant = (index: number) => { const v = [...formData.variants]; v.splice(index, 1); setFormData({...formData, variants: v}); };
//   const updateVariant = (index: number, f: "name"|"price", v: string) => { const va = [...formData.variants]; va[index][f] = v; setFormData({...formData, variants: va}); };

//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name) { showToast("Name required", "error"); return; }
//     setIsUploading(true);
//     const data = new FormData();
//     data.append("name", formData.name); data.append("category", formData.category); data.append("description", formData.description);
//     if(formData.image) data.append("image", formData.image);
    
//     if (formData.hasVariants) {
//       const valid = formData.variants.filter(v => v.name && v.price).map(v => ({ name: v.name, price: parseFloat(v.price) }));
//       if(!valid.length) { showToast("Add a size", "error"); setIsUploading(false); return; }
//       data.append("variants", JSON.stringify(valid)); data.append("price", "0");
//     } else {
//       if(!formData.basePrice) { showToast("Price required", "error"); setIsUploading(false); return; }
//       data.append("price", formData.basePrice); data.append("variants", "[]");
//     }

//     const method = editingId ? "PUT" : "POST";
//     if (editingId) data.append("id", editingId);

//     try {
//       const res = await fetch("/api/admin/products", { method, body: data });
//       if(res.ok) { showToast(editingId ? "Updated!" : "Added!", "success"); setFormData({name:"", category:"CAKE", description:"", image:null, hasVariants:false, basePrice:"", variants:[]}); setEditingId(null); fetchProducts(); }
//       else showToast("Failed", "error");
//     } catch(e) { showToast("Error", "error"); } finally { setIsUploading(false); }
//   };

//   const confirmDelete = async () => {
//     if(!deleteConfirm.id) return;
//     await fetch(`/api/admin/products?id=${deleteConfirm.id}`, { method: "DELETE" });
//     showToast("Deleted", "warning"); fetchProducts(); setDeleteConfirm({show:false, id:null});
//   };

//   const handleEditClick = (p: Product) => {
//     setEditingId(p._id);
//     setFormData({ name: p.name, category: p.category, description: p.description||"", image: null, hasVariants: !!(p.variants?.length), basePrice: p.basePrice?.toString()||"", variants: p.variants ? p.variants.map(v => ({name: v.name, price: v.price.toString()})) : [] });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const getFilteredOrders = () => {
//     let filtered = orders;
//     switch (activeTab) {
//       case "LEADS": filtered = orders.filter((o) => o.status === "PENDING"); break;
//       case "PENDING": filtered = orders.filter((o) => o.status === "CONFIRMED"); break;
//       case "ONGOING": filtered = orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status)); break;
//       case "HISTORY": filtered = orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status)); break;
//       default: filtered = [];
//     }
//     if (activeTab === "HISTORY") {
//       if (historyDateFilter !== "ALL") {
//         const days = parseInt(historyDateFilter);
//         const cutoff = new Date();
//         cutoff.setDate(cutoff.getDate() - days);
//         filtered = filtered.filter(o => new Date(o.createdAt) >= cutoff);
//       }
//       if (historyStatusFilter !== "ALL") {
//         filtered = filtered.filter(o => o.status === historyStatusFilter);
//       }
//     }
//     return filtered;
//   };

//   const allFilteredOrders = getFilteredOrders();
//   const totalPages = Math.ceil(allFilteredOrders.length / ITEMS_PER_PAGE);
//   const paginatedOrders = allFilteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
//   const getFilteredProducts = () => { if (menuFilter === "ALL") return products; return products.filter(p => p.category === menuFilter); };

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
//       <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
//       {deleteConfirm.show && (<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><div className="text-center"><div className="mb-4 inline-block rounded-full bg-red-100 p-3"><AlertTriangle className="h-8 w-8 text-red-600"/></div><h3 className="mb-2 text-xl font-bold text-[#4E342E]">Delete Item?</h3><div className="grid grid-cols-2 gap-3 mt-6"><button onClick={()=>setDeleteConfirm({show:false,id:null})} className="rounded-xl border border-[#F2E3DB] py-3 font-bold text-[#8D6E63]">Cancel</button><button onClick={confirmDelete} className="rounded-xl bg-red-500 py-3 font-bold text-white">Delete</button></div></div></div></div>)}
//       <div className="flex justify-between items-center mb-6"><h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1><button onClick={() => { fetchOrders(); fetchProducts(); }} className="p-2 bg-white rounded-full shadow text-[#D98292] hover:rotate-180 transition duration-500"><RefreshCw size={20} /></button></div>
//       <div ref={dashboardTopRef} className="grid grid-cols-2 md:flex gap-3 mb-8 scroll-mt-24">{[{ id: "LEADS", label: "Leads", icon: <Clock size={18} /> }, { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> }, { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> }, { id: "HISTORY", label: "History", icon: <Package size={18} /> }, { id: "PRODUCTS", label: "Menu Editor", icon: <Plus size={18} /> }].map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-5 rounded-xl font-bold transition-all text-sm ${tab.id === "PRODUCTS" ? "col-span-2" : ""} ${activeTab === tab.id ? "bg-[#D98292] text-white shadow-lg" : "bg-white text-[#8D6E63]"}`}>{tab.icon} <span>{tab.label}</span></button>))}</div>
//       {activeTab === "PRODUCTS" ? (
//         <div className="grid md:grid-cols-3 gap-8">
//            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] md:col-span-1 h-fit md:sticky md:top-4"><h3 className="font-bold text-lg mb-4 text-[#4E342E]">{editingId ? "Edit Item" : "Add New Item"}</h3><form onSubmit={handleProductSubmit} className="space-y-4"><div className="border-2 border-dashed border-[#F2E3DB] rounded-lg p-4 text-center hover:bg-[#FFF8F3] relative cursor-pointer"><input type="file" accept="image/*" onChange={(e)=>setFormData({...formData, image:e.target.files?.[0]||null})} className="absolute inset-0 opacity-0 cursor-pointer"/><ImageIcon className="mx-auto text-[#D98292] mb-2"/><p className="text-xs text-[#8D6E63] truncate">{formData.image ? formData.image.name : "Tap to upload"}</p></div><input type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm"/><select value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm bg-white"><option value="CAKE">Cake</option><option value="CHOCOLATE">Chocolate</option><option value="JAR">Jar</option><option value="GIFT_BOX">Gift Box</option><option value="CUSTOM">Custom</option></select><div className="bg-[#FFF8F3] p-3 rounded-lg border border-[#F2E3DB]"><div className="flex items-center gap-2 mb-3"><input type="checkbox" checked={formData.hasVariants} onChange={(e)=>setFormData({...formData, hasVariants:e.target.checked})} className="w-4 h-4 text-[#D98292] rounded"/><label className="text-sm font-bold text-[#4E342E]">Variants?</label></div>{!formData.hasVariants ? <input type="number" placeholder="Price (₹)" value={formData.basePrice} onChange={(e)=>setFormData({...formData, basePrice:e.target.value})} className="w-full p-2 rounded border border-[#F2E3DB] text-sm"/> : <div className="space-y-2">{formData.variants.map((v,i)=>(<div key={i} className="flex gap-2"><input type="text" placeholder="Size" value={v.name} onChange={(e)=>updateVariant(i,"name",e.target.value)} className="w-1/2 p-2 rounded border border-[#F2E3DB] text-xs"/><input type="number" placeholder="₹" value={v.price} onChange={(e)=>updateVariant(i,"price",e.target.value)} className="w-1/3 p-2 rounded border border-[#F2E3DB] text-xs"/><button type="button" onClick={()=>removeVariant(i)} className="text-red-400"><X size={16}/></button></div>))}<button type="button" onClick={addVariant} className="text-xs font-bold text-[#D98292] mt-2 flex items-center gap-1"><Plus size={14}/> Add Size</button></div>}</div><textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm h-20"></textarea><div className="flex gap-2"><button type="submit" disabled={isUploading} className="flex-1 py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] disabled:opacity-50">{isUploading?"Saving...":editingId?"Update":"Add"}</button>{editingId && <button type="button" onClick={()=>{setEditingId(null); setFormData({name:"",category:"CAKE",description:"",image:null,hasVariants:false,basePrice:"",variants:[]})}} className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl">Cancel</button>}</div></form></div>
//            <div className="md:col-span-2 space-y-4"><div className="flex justify-between items-center"><h3 className="font-bold text-lg text-[#4E342E]">Menu ({getFilteredProducts().length})</h3><div className="flex gap-1 bg-white p-1 rounded-lg border border-[#F2E3DB]">{["ALL","CAKE","CHOCOLATE","JAR"].map(c=><button key={c} onClick={()=>setMenuFilter(c)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${menuFilter===c?"bg-[#D98292] text-white":"text-[#8D6E63]"}`}>{c}</button>)}</div></div>{getFilteredProducts().map(p=>(<div key={p._id} className="bg-white p-4 rounded-xl border border-[#F2E3DB] flex items-center justify-between shadow-sm"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-[#F2E3DB]">{p.images[0]?<img src={p.images[0]} className="w-full h-full object-cover"/>:<div className="w-full h-full flex items-center justify-center text-[#D98292]/30 font-bold">{p.name[0]}</div>}</div><div><h4 className="font-bold text-[#4E342E]">{p.name}</h4><p className="text-xs text-[#8D6E63]">{p.category} • {p.variants?.length ? `${p.variants.length} Sizes` : `₹${p.basePrice}`}</p></div></div><div className="flex gap-2"><button onClick={()=>handleEditClick(p)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"><Edit2 size={18}/></button><button onClick={()=>setDeleteConfirm({show:true,id:p._id})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button></div></div>))}</div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//            {activeTab === "HISTORY" && (<div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-[#F2E3DB]"><div className="flex items-center gap-2 text-sm font-bold text-[#8D6E63] w-full md:w-auto"><Filter size={16} /> Filters:</div><select value={historyDateFilter} onChange={(e) => setHistoryDateFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none"><option value="ALL">All Dates</option><option value="7">Last 7 Days</option><option value="15">Last 15 Days</option><option value="30">Last 30 Days</option></select><select value={historyStatusFilter} onChange={(e) => setHistoryStatusFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none"><option value="ALL">All Status</option><option value="DELIVERED">Delivered</option><option value="CANCELLED">Rejected</option></select></div>)}
//            {loading ? <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p> : 
//            paginatedOrders.length === 0 ? <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed"><p className="text-[#8D6E63]">No orders found.</p></div> : 
//            paginatedOrders.map((order) => (
//               <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 bg-[#FFF8F3] px-4 py-1.5 rounded-bl-xl border-b border-l border-[#F2E3DB] text-xs text-[#8D6E63] font-medium flex items-center gap-1.5 opacity-80"><Clock size={10} /> {formatDate(order.createdAt)}</div>
//                 <div className="absolute bottom-0 right-0 bg-[#FFF8F3] px-4 py-1.5 rounded-tl-xl border-t border-l border-[#F2E3DB] text-xs text-[#8D6E63] font-bold">ID: #{order._id.slice(-6).toUpperCase()}</div>
//                 <div className="flex-1 mt-6 md:mt-0">
//                   <div className="flex items-center gap-3 mb-2"><h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3><span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' : order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-[#FFF8F3] text-[#D98292] border-[#D98292]/20'}`}>{order.status}</span></div>
//                   <div className="flex flex-col gap-2 mb-4 text-sm text-[#8D6E63]"><div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Address:</span><span className="flex-1">{order.address}</span></div><div className="flex items-center gap-2"><Mail size={16} className="text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Email:</span><span>{order.email || "N/A"}</span></div><div className="flex items-center gap-2"><Phone size={16} className="text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Phone:</span><span>{order.phone || "N/A"}</span></div>
                  
//                   {/* NOTE SECTION: Constrained Width to 45% on Desktop */}
//                   {order.notes && (
//                     <div className="mt-2 flex items-start gap-2 bg-[#FFF8F3] p-2 rounded-lg border border-[#F2E3DB]/50 w-full md:max-w-[45%]">
//                       <Info size={16} className="mt-0.5 text-[#D98292] shrink-0" />
//                       <div className="min-w-0 flex-1">
//                         <span className="block text-xs font-bold text-[#4E342E] uppercase tracking-wider">Note from User:</span>
//                         <span className="text-xs text-[#8D6E63] italic break-words whitespace-pre-wrap">{order.notes}</span>
//                       </div>
//                     </div>
//                   )}
//                   </div>
//                   <div className="space-y-1 mb-4">{order.items.map((item, idx) => (<div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1"><span><span className="font-bold">{item.quantity} x</span> {item.name} {item.variant && <span className="text-[#8D6E63] text-xs"> ({item.variant})</span>}</span><span className="font-bold text-[#4E342E]">{item.price ? `₹${item.price * item.quantity}` : ''}</span></div>))}<div className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1"><span className="font-bold">Delivery Fee</span><span className="font-bold">₹{order.deliveryCharge || 0}</span></div></div><p className="font-bold text-[#4E342E] text-lg">Bill: ₹{order.totalAmount}</p>
//                 </div>
//                 <div className="flex flex-col gap-2 justify-center min-w-[180px] pt-4 md:pt-0 pb-8">{activeTab === "LEADS" && (<><button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Accept</button><button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 text-xs underline">Reject</button></>)}{activeTab === "PENDING" && (<><button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold text-sm flex justify-center gap-2"><ChefHat size={16}/> Bake</button><button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}{activeTab === "ONGOING" && (<>{order.status === "PREPARING" && <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">Mark Ready</button>}{order.status === "READY" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">Dispatch</button>}{order.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Delivered</button>}<button onClick={() => {if(order.status === "PREPARING") updateStatus(order._id, "CONFIRMED");if(order.status === "READY") updateStatus(order._id, "PREPARING");if(order.status === "OUT_FOR_DELIVERY") updateStatus(order._id, "READY");}} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}{activeTab === "HISTORY" && (<>{order.status === "DELIVERED" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 py-1"><RotateCcw size={12}/> Not Delivered</button>}{order.status === "CANCELLED" && <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Re-open</button>}</>)}</div>
//               </div>
//            ))}
//            {totalPages > 1 && (<div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#F2E3DB] border-dashed"><button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronLeft size={20} /></button><span className="text-sm font-bold text-[#8D6E63]">Page {currentPage} of {totalPages}</span><button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronRight size={20} /></button></div>)}
//         </div>
//       )}
//     </div>
//   );
// }







"use client";

import { useState, useEffect, useRef } from "react";
import { 
  RefreshCw, ChefHat, Truck, Package, Clock, Plus, Trash2, Edit2, 
  Image as ImageIcon, RotateCcw, X, AlertTriangle, MapPin, Phone, Mail,
  ChevronLeft, ChevronRight, Filter, Calendar, Info, Check
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";

// --- TYPES ---
type OrderItem = {
  name: string;
  quantity: number;
  variant?: string;
  price?: number;
};

type Order = {
  _id: string;
  customerName: string;
  phone?: string;
  email?: string;
  totalAmount: number;
  deliveryCharge?: number;
  status: string;
  address: string;
  items: OrderItem[];
  createdAt: string;
  notes?: string; 
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

const ITEMS_PER_PAGE = 7;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("LEADS");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuFilter, setMenuFilter] = useState("ALL");
  const [historyDateFilter, setHistoryDateFilter] = useState("ALL"); 
  const [historyStatusFilter, setHistoryStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const dashboardTopRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error"|"warning" });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean, id: string | null }>({ show: false, id: null });
  const [formData, setFormData] = useState({
    name: "", category: "CAKE", description: "", image: null as File | null,
    hasVariants: false, basePrice: "", variants: [] as { name: string; price: string }[]
  });

  // Price Editing State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPriceValue, setNewPriceValue] = useState("");

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
  useEffect(() => { setCurrentPage(1); }, [activeTab, historyDateFilter, historyStatusFilter]);

  const showToast = (message: string, type: "success"|"error"|"warning") => { setToast({ show: true, message, type }); };

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

  // NEW: Update Price Function
  const updatePrice = async (orderId: string) => {
    if (!newPriceValue) return;
    try {
      const res = await fetch("/api/admin/update-price", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newPrice: newPriceValue }),
      });
      if (res.ok) { 
        fetchOrders(); 
        showToast("Price updated!", "success"); 
        setEditingPriceId(null);
      } else {
        showToast("Failed to update price", "error");
      }
    } catch (error) { showToast("Server error", "error"); }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => { dashboardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
  };

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
    setFormData({ name: p.name, category: p.category, description: p.description||"", image: null, hasVariants: !!(p.variants?.length), basePrice: p.basePrice?.toString()||"", variants: p.variants ? p.variants.map(v => ({name: v.name, price: v.price.toString()})) : [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    switch (activeTab) {
      case "LEADS": filtered = orders.filter((o) => o.status === "PENDING"); break;
      case "PENDING": filtered = orders.filter((o) => o.status === "CONFIRMED"); break;
      case "ONGOING": filtered = orders.filter((o) => ["PREPARING", "READY", "OUT_FOR_DELIVERY"].includes(o.status)); break;
      case "HISTORY": filtered = orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status)); break;
      default: filtered = [];
    }
    if (activeTab === "HISTORY") {
      if (historyDateFilter !== "ALL") {
        const days = parseInt(historyDateFilter);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        filtered = filtered.filter(o => new Date(o.createdAt) >= cutoff);
      }
      if (historyStatusFilter !== "ALL") {
        filtered = filtered.filter(o => o.status === historyStatusFilter);
      }
    }
    return filtered;
  };

  const allFilteredOrders = getFilteredOrders();
  const totalPages = Math.ceil(allFilteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = allFilteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const getFilteredProducts = () => { if (menuFilter === "ALL") return products; return products.filter(p => p.category === menuFilter); };

  return (
    <div className="min-h-screen bg-[#FFF8F3] p-4 md:p-8">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      {deleteConfirm.show && (<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><div className="text-center"><div className="mb-4 inline-block rounded-full bg-red-100 p-3"><AlertTriangle className="h-8 w-8 text-red-600"/></div><h3 className="mb-2 text-xl font-bold text-[#4E342E]">Delete Item?</h3><div className="grid grid-cols-2 gap-3 mt-6"><button onClick={()=>setDeleteConfirm({show:false,id:null})} className="rounded-xl border border-[#F2E3DB] py-3 font-bold text-[#8D6E63]">Cancel</button><button onClick={confirmDelete} className="rounded-xl bg-red-500 py-3 font-bold text-white">Delete</button></div></div></div></div>)}
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#4E342E]">Admin Dashboard</h1><button onClick={() => { fetchOrders(); fetchProducts(); }} className="p-2 bg-white rounded-full shadow text-[#D98292] hover:rotate-180 transition duration-500"><RefreshCw size={20} /></button></div>
      <div ref={dashboardTopRef} className="grid grid-cols-2 md:flex gap-3 mb-8 scroll-mt-24">{[{ id: "LEADS", label: "Leads", icon: <Clock size={18} /> }, { id: "PENDING", label: "To Make", icon: <ChefHat size={18} /> }, { id: "ONGOING", label: "Ongoing", icon: <Truck size={18} /> }, { id: "HISTORY", label: "History", icon: <Package size={18} /> }, { id: "PRODUCTS", label: "Menu Editor", icon: <Plus size={18} /> }].map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col md:flex-row items-center justify-center gap-2 p-3 md:px-5 rounded-xl font-bold transition-all text-sm ${tab.id === "PRODUCTS" ? "col-span-2" : ""} ${activeTab === tab.id ? "bg-[#D98292] text-white shadow-lg" : "bg-white text-[#8D6E63]"}`}>{tab.icon} <span>{tab.label}</span></button>))}</div>
      {activeTab === "PRODUCTS" ? (
        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] md:col-span-1 h-fit md:sticky md:top-4"><h3 className="font-bold text-lg mb-4 text-[#4E342E]">{editingId ? "Edit Item" : "Add New Item"}</h3><form onSubmit={handleProductSubmit} className="space-y-4"><div className="border-2 border-dashed border-[#F2E3DB] rounded-lg p-4 text-center hover:bg-[#FFF8F3] relative cursor-pointer"><input type="file" accept="image/*" onChange={(e)=>setFormData({...formData, image:e.target.files?.[0]||null})} className="absolute inset-0 opacity-0 cursor-pointer"/><ImageIcon className="mx-auto text-[#D98292] mb-2"/><p className="text-xs text-[#8D6E63] truncate">{formData.image ? formData.image.name : "Tap to upload"}</p></div><input type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm"/><select value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm bg-white"><option value="CAKE">Cake</option><option value="CHOCOLATE">Chocolate</option><option value="JAR">Jar</option><option value="GIFT_BOX">Gift Box</option><option value="CUSTOM">Custom</option></select><div className="bg-[#FFF8F3] p-3 rounded-lg border border-[#F2E3DB]"><div className="flex items-center gap-2 mb-3"><input type="checkbox" checked={formData.hasVariants} onChange={(e)=>setFormData({...formData, hasVariants:e.target.checked})} className="w-4 h-4 text-[#D98292] rounded"/><label className="text-sm font-bold text-[#4E342E]">Variants?</label></div>{!formData.hasVariants ? <input type="number" placeholder="Price (₹)" value={formData.basePrice} onChange={(e)=>setFormData({...formData, basePrice:e.target.value})} className="w-full p-2 rounded border border-[#F2E3DB] text-sm"/> : <div className="space-y-2">{formData.variants.map((v,i)=>(<div key={i} className="flex gap-2"><input type="text" placeholder="Size" value={v.name} onChange={(e)=>updateVariant(i,"name",e.target.value)} className="w-1/2 p-2 rounded border border-[#F2E3DB] text-xs"/><input type="number" placeholder="₹" value={v.price} onChange={(e)=>updateVariant(i,"price",e.target.value)} className="w-1/3 p-2 rounded border border-[#F2E3DB] text-xs"/><button type="button" onClick={()=>removeVariant(i)} className="text-red-400"><X size={16}/></button></div>))}<button type="button" onClick={addVariant} className="text-xs font-bold text-[#D98292] mt-2 flex items-center gap-1"><Plus size={14}/> Add Size</button></div>}</div><textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="w-full p-3 rounded-lg border border-[#F2E3DB] text-sm h-20"></textarea><div className="flex gap-2"><button type="submit" disabled={isUploading} className="flex-1 py-3 bg-[#4E342E] text-white font-bold rounded-xl hover:bg-[#3d2924] disabled:opacity-50">{isUploading?"Saving...":editingId?"Update":"Add"}</button>{editingId && <button type="button" onClick={()=>{setEditingId(null); setFormData({name:"",category:"CAKE",description:"",image:null,hasVariants:false,basePrice:"",variants:[]})}} className="px-4 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl">Cancel</button>}</div></form></div>
           <div className="md:col-span-2 space-y-4"><div className="flex justify-between items-center"><h3 className="font-bold text-lg text-[#4E342E]">Menu ({getFilteredProducts().length})</h3><div className="flex gap-1 bg-white p-1 rounded-lg border border-[#F2E3DB]">{["ALL","CAKE","CHOCOLATE","JAR"].map(c=><button key={c} onClick={()=>setMenuFilter(c)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition ${menuFilter===c?"bg-[#D98292] text-white":"text-[#8D6E63]"}`}>{c}</button>)}</div></div>{getFilteredProducts().map(p=>(<div key={p._id} className="bg-white p-4 rounded-xl border border-[#F2E3DB] flex items-center justify-between shadow-sm"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-[#F2E3DB]">{p.images[0]?<img src={p.images[0]} className="w-full h-full object-cover"/>:<div className="w-full h-full flex items-center justify-center text-[#D98292]/30 font-bold">{p.name[0]}</div>}</div><div><h4 className="font-bold text-[#4E342E]">{p.name}</h4><p className="text-xs text-[#8D6E63]">{p.category} • {p.variants?.length ? `${p.variants.length} Sizes` : `₹${p.basePrice}`}</p></div></div><div className="flex gap-2"><button onClick={()=>handleEditClick(p)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"><Edit2 size={18}/></button><button onClick={()=>setDeleteConfirm({show:true,id:p._id})} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button></div></div>))}</div>
        </div>
      ) : (
        <div className="space-y-4">
           {activeTab === "HISTORY" && (<div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-[#F2E3DB]"><div className="flex items-center gap-2 text-sm font-bold text-[#8D6E63] w-full md:w-auto"><Filter size={16} /> Filters:</div><select value={historyDateFilter} onChange={(e) => setHistoryDateFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none"><option value="ALL">All Dates</option><option value="7">Last 7 Days</option><option value="15">Last 15 Days</option><option value="30">Last 30 Days</option></select><select value={historyStatusFilter} onChange={(e) => setHistoryStatusFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 rounded-lg border border-[#F2E3DB] text-sm text-[#4E342E] bg-[#FFF8F3] focus:outline-none"><option value="ALL">All Status</option><option value="DELIVERED">Delivered</option><option value="CANCELLED">Rejected</option></select></div>)}
           {loading ? <p className="text-center text-[#8D6E63] animate-pulse">Loading orders...</p> : 
           paginatedOrders.length === 0 ? <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#F2E3DB] border-dashed"><p className="text-[#8D6E63]">No orders found.</p></div> : 
           paginatedOrders.map((order) => (
              <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#F2E3DB] flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#FFF8F3] px-4 py-1.5 rounded-bl-xl border-b border-l border-[#F2E3DB] text-xs text-[#8D6E63] font-medium flex items-center gap-1.5 opacity-80"><Clock size={10} /> {formatDate(order.createdAt)}</div>
                <div className="absolute bottom-0 right-0 bg-[#FFF8F3] px-4 py-1.5 rounded-tl-xl border-t border-l border-[#F2E3DB] text-xs text-[#8D6E63] font-bold">ID: #{order._id.slice(-6).toUpperCase()}</div>
                <div className="flex-1 mt-6 md:mt-0">
                  <div className="flex items-center gap-3 mb-2"><h3 className="font-bold text-[#4E342E] text-lg">{order.customerName}</h3><span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' : order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-[#FFF8F3] text-[#D98292] border-[#D98292]/20'}`}>{order.status}</span></div>
                  <div className="flex flex-col gap-2 mb-4 text-sm text-[#8D6E63]"><div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Address:</span><span className="flex-1">{order.address}</span></div><div className="flex items-center gap-2"><Mail size={16} className="text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Email:</span><span>{order.email || "N/A"}</span></div><div className="flex items-center gap-2"><Phone size={16} className="text-[#D98292] shrink-0" /><span className="font-bold text-[#4E342E]">Phone:</span><span>{order.phone || "N/A"}</span></div>
                  {order.notes && (<div className="mt-2 flex items-start gap-2 bg-[#FFF8F3] p-2 rounded-lg border border-[#F2E3DB]/50 w-full md:max-w-[45%]"><Info size={16} className="mt-0.5 text-[#D98292] shrink-0" /><div className="min-w-0 flex-1"><span className="block text-xs font-bold text-[#4E342E] uppercase tracking-wider">Note from User:</span><span className="text-xs text-[#8D6E63] italic break-words whitespace-pre-wrap">{order.notes}</span></div></div>)}
                  </div>
                  <div className="space-y-1 mb-4">{order.items.map((item, idx) => (<div key={idx} className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1"><span><span className="font-bold">{item.quantity} x</span> {item.name} {item.variant && <span className="text-[#8D6E63] text-xs"> ({item.variant})</span>}</span><span className="font-bold text-[#4E342E]">{item.price ? `₹${item.price * item.quantity}` : ''}</span></div>))}<div className="flex justify-between text-sm text-[#4E342E] max-w-md border-b border-dashed border-[#F2E3DB] pb-1 mb-1"><span className="font-bold">Delivery Fee</span><span className="font-bold">₹{order.deliveryCharge || 0}</span></div></div>
                  
                  {/* EDITABLE BILL AMOUNT: Shows Cake Price in input, displays Total Bill when saved */}
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[#4E342E] text-lg">Bill: 
                      {editingPriceId === order._id ? (
                        <span className="inline-flex items-center gap-1 ml-2">
                          <input 
                            type="number" 
                            value={newPriceValue} 
                            onChange={(e) => setNewPriceValue(e.target.value)} 
                            className="w-24 p-1 text-sm border border-[#D98292] rounded focus:outline-none"
                            autoFocus
                            placeholder="Cake Price"
                          />
                          <button onClick={() => updatePrice(order._id)} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"><Check size={16} /></button>
                          <button onClick={() => setEditingPriceId(null)} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"><X size={16} /></button>
                          <span className="text-xs text-[#8D6E63] ml-1 whitespace-nowrap">(+ ₹{order.deliveryCharge || 0} delivery)</span>
                        </span>
                      ) : (
                        <span> ₹{order.totalAmount}</span>
                      )}
                    </p>
                    {activeTab !== "HISTORY" && editingPriceId !== order._id && (
                      <button 
                        onClick={() => { 
                          setEditingPriceId(order._id); 
                          // PRE-FILL with CAKE PRICE (Total - Delivery) so admin edits item cost
                          setNewPriceValue((order.totalAmount - (order.deliveryCharge || 0)).toString()); 
                        }} 
                        className="text-[#D98292] hover:text-[#b0606f] p-1 rounded-full hover:bg-[#FFF8F3]" 
                        title="Edit Cake Price"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>

                </div>
                <div className="flex flex-col gap-2 justify-center min-w-[180px] pt-4 md:pt-0 pb-8">{activeTab === "LEADS" && (<><button onClick={() => updateStatus(order._id, "CONFIRMED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Accept</button><button onClick={() => updateStatus(order._id, "CANCELLED")} className="w-full py-2 text-red-400 text-xs underline">Reject</button></>)}{activeTab === "PENDING" && (<><button onClick={() => updateStatus(order._id, "PREPARING")} className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-bold text-sm flex justify-center gap-2"><ChefHat size={16}/> Bake</button><button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}{activeTab === "ONGOING" && (<>{order.status === "PREPARING" && <button onClick={() => updateStatus(order._id, "READY")} className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">Mark Ready</button>}{order.status === "READY" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">Dispatch</button>}{order.status === "OUT_FOR_DELIVERY" && <button onClick={() => updateStatus(order._id, "DELIVERED")} className="w-full py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm">Delivered</button>}<button onClick={() => {if(order.status === "PREPARING") updateStatus(order._id, "CONFIRMED");if(order.status === "READY") updateStatus(order._id, "PREPARING");if(order.status === "OUT_FOR_DELIVERY") updateStatus(order._id, "READY");}} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Undo</button></>)}{activeTab === "HISTORY" && (<>{order.status === "DELIVERED" && <button onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")} className="flex items-center justify-center gap-1 text-xs text-red-400 py-1"><RotateCcw size={12}/> Not Delivered</button>}{order.status === "CANCELLED" && <button onClick={() => updateStatus(order._id, "PENDING")} className="flex items-center justify-center gap-1 text-xs text-[#8D6E63] py-1"><RotateCcw size={12}/> Re-open</button>}</>)}</div>
              </div>
           ))}
           {totalPages > 1 && (<div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#F2E3DB] border-dashed"><button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronLeft size={20} /></button><span className="text-sm font-bold text-[#8D6E63]">Page {currentPage} of {totalPages}</span><button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronRight size={20} /></button></div>)}
        </div>
      )}
    </div>
  );
}