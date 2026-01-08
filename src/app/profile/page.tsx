// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { 
//   User, Phone, Mail, LogOut, Package, Clock, MapPin, 
//   Edit2, AlertCircle, Truck, ChevronLeft, ChevronRight, Info 
// } from "lucide-react";
// import { Toast } from "@/components/ui/Toast";
// import Link from "next/link";

// const ITEMS_PER_PAGE = 5;

// export default function ProfilePage() {
//   const { data: session, status, update } = useSession();
//   const router = useRouter();
//   const ordersTopRef = useRef<HTMLHeadingElement>(null);
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loadingOrders, setLoadingOrders] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({ name: "", phone: "" });
//   const [isSaving, setIsSaving] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/login");
//     if (session?.user) {
//       setEditForm({ name: session.user.name || "", phone: (session.user as any).phone || "" });
//       fetchOrders();
//     }
//   }, [session, status, router]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("/api/user/orders");
//       const data = await res.json();
//       if (data.success) setOrders(data.orders);
//     } catch (error) { console.error("Failed to load orders"); } finally { setLoadingOrders(false); }
//   };

//   const handleUpdateProfile = async () => {
//     setIsSaving(true);
//     try {
//       const res = await fetch("/api/user/profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
//       if (res.ok) { await update(); setIsEditing(false); setToast({ show: true, message: "Profile updated successfully!", type: "success" }); } 
//       else { setToast({ show: true, message: "Update failed", type: "error" }); }
//     } catch (error) { setToast({ show: true, message: "Server error", type: "error" }); } finally { setIsSaving(false); }
//   };

//   const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
//   const paginatedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   const changePage = (newPage: number) => {
//     setCurrentPage(newPage);
//     setTimeout(() => { ordersTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
//   };

//   if (status === "loading") return <div className="min-h-screen flex items-center justify-center text-[#8D6E63] font-playfair">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-[#FFF8F3] px-4 py-12 md:px-8">
//       <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
//       {showLogoutConfirm && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"><div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95"><div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><LogOut className="w-8 h-8 text-red-500" /></div><h3 className="text-xl font-bold text-[#4E342E] mb-2">Log Out?</h3><p className="text-[#8D6E63] text-sm mb-6">Are you sure you want to sign out of your account?</p><div className="flex gap-3"><button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 border border-[#F2E3DB] text-[#8D6E63] font-bold rounded-xl hover:bg-[#FFF8F3]">Cancel</button><button onClick={() => signOut({ callbackUrl: "/login" })} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md">Yes, Log Out</button></div></div></div>)}
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-1 space-y-6">
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E3DB] relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-24 bg-[#72514D]/10"></div><div className="relative flex flex-col items-center text-center mt-8"><div className="w-24 h-24 bg-[#72514D] rounded-full flex items-center justify-center text-white text-4xl font-playfair font-bold border-4 border-white shadow-md">{session?.user?.name?.charAt(0).toUpperCase() || "U"}</div>{!isEditing ? (<><h2 className="mt-4 text-2xl font-bold text-[#4E342E]">{session?.user?.name}</h2><p className="text-sm text-[#8D6E63] font-medium">{session?.user?.email}</p><div className="mt-6 w-full space-y-3"><div className="flex items-center gap-3 p-3 bg-[#FFF8F3] rounded-xl text-sm text-[#4E342E]"><Phone size={18} className="text-[#D98292]" /><span>{(session?.user as any).phone || "No phone added"}</span></div><div className="flex items-center gap-3 p-3 bg-[#FFF8F3] rounded-xl text-sm text-[#4E342E]"><Mail size={18} className="text-[#D98292]" /><span className="truncate">{session?.user?.email}</span></div></div><button onClick={() => setIsEditing(true)} className="mt-6 w-full py-3 border border-[#F2E3DB] text-[#8D6E63] font-bold rounded-xl hover:bg-[#FFF8F3] transition-colors flex items-center justify-center gap-2"><Edit2 size={16} /> Edit Profile</button></>) : (<div className="w-full mt-4 space-y-4"><div><label className="text-xs font-bold text-[#8D6E63] ml-1 uppercase">Full Name</label><input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 rounded-xl border border-[#D98292] text-sm text-[#4E342E] focus:outline-none bg-[#FFF8F3]" /></div><div><label className="text-xs font-bold text-[#8D6E63] ml-1 uppercase">Phone Number</label><input type="tel" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full p-3 rounded-xl border border-[#D98292] text-sm text-[#4E342E] focus:outline-none bg-[#FFF8F3]" /></div><div className="flex gap-2 pt-2"><button onClick={() => setIsEditing(false)} className="flex-1 py-3 border border-[#F2E3DB] text-[#8D6E63] rounded-xl font-bold hover:bg-gray-50">Cancel</button><button onClick={handleUpdateProfile} disabled={isSaving} className="flex-1 py-3 bg-[#D98292] text-white rounded-xl font-bold hover:bg-[#c46b7d] disabled:opacity-50">{isSaving ? "Saving..." : "Save"}</button></div></div>)}</div></div><button onClick={() => setShowLogoutConfirm(true)} className="w-full py-4 bg-white border border-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm"><LogOut size={18} /> Logout</button></div>
//         <div className="md:col-span-2 space-y-6">
//           <h2 ref={ordersTopRef} className="text-2xl font-playfair font-bold text-[#4E342E] flex items-center gap-2 scroll-mt-24"><Package className="text-[#D98292]" /> Order History</h2>
//           {loadingOrders ? (<div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white/50 rounded-2xl animate-pulse"></div>)}</div>) : orders.length === 0 ? (<div className="bg-white p-10 rounded-3xl border border-[#F2E3DB] border-dashed text-center"><div className="w-16 h-16 bg-[#FFF8F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D98292]"><Package size={32} /></div><h3 className="font-bold text-[#4E342E] text-lg">No orders yet</h3><p className="text-[#8D6E63] text-sm mb-6">Looks like you haven't indulged in any sweets yet!</p><Link href="/menu"><button className="px-8 py-3 bg-[#4E342E] text-white rounded-xl font-bold hover:bg-[#3d2924] shadow-lg">Browse Menu</button></Link></div>) : (<><div className="space-y-4">{paginatedOrders.map((order) => (<div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] hover:shadow-md transition-shadow">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-[#F2E3DB] border-dashed gap-4"><div><div className="flex items-center gap-3"><span className="font-bold text-[#4E342E] text-lg">#{order._id.slice(-6).toUpperCase()}</span><span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' : order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>{order.status}</span></div><div className="flex items-center gap-2 text-xs text-[#8D6E63] mt-1"><Clock size={12} /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div></div><div className="text-right"><span className="block text-xs text-[#8D6E63]">Total Amount</span><span className="font-bold text-xl text-[#4E342E]">₹{order.totalAmount}</span></div></div>
//                     {/* NEW: Note Display */}
//                     {order.notes && (<div className="flex items-start gap-2 mb-3 p-2 bg-[#FFF8F3] rounded-lg border border-[#F2E3DB]/50 text-sm"><Info size={16} className="mt-0.5 text-[#D98292] shrink-0" /><div><span className="font-bold text-[#4E342E] uppercase text-xs block">Note from You:</span><span className="text-[#8D6E63] italic">{order.notes}</span></div></div>)}
//                     <div className="space-y-2 mb-4">{order.items.map((item: any, idx: number) => (<div key={idx} className="flex justify-between text-sm text-[#4E342E]"><span><span className="font-bold text-[#D98292]">{item.quantity}x</span> {item.name} {item.variant && <span className="text-[#8D6E63] text-xs"> ({item.variant})</span>}</span><span className="font-medium">₹{item.price * item.quantity}</span></div>))}<div className="flex justify-between text-sm text-[#4E342E]"><span className="font-bold text-[#D98292] flex items-center gap-1"><Truck size={14} /> Delivery Fee</span><span className="font-medium">₹{order.deliveryCharge || 0}</span></div></div><div className="flex items-start gap-2 text-xs text-[#8D6E63] bg-[#FFF8F3] p-3 rounded-lg"><MapPin size={14} className="mt-0.5 text-[#D98292] shrink-0" /><p>{order.address}</p></div></div>))}</div>{totalPages > 1 && (<div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#F2E3DB] border-dashed"><button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronLeft size={20} /></button><span className="text-sm font-bold text-[#8D6E63]">Page {currentPage} of {totalPages}</span><button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"><ChevronRight size={20} /></button></div>)}</>)}
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, Phone, Mail, LogOut, Package, Clock, MapPin, 
  Edit2, AlertCircle, Truck, ChevronLeft, ChevronRight, Info 
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  // Ref for scrolling
  const ordersTopRef = useRef<HTMLHeadingElement>(null);

  // Data States
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", address: "" }); // ADDED ADDRESS
  const [isSaving, setIsSaving] = useState(false);
  
  // Logout Modal State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success"|"error" });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    
    if (session?.user) {
      // Initialize form with session data (address might need fetching if not in session)
      setEditForm({ 
        name: session.user.name || "", 
        phone: (session.user as any).phone || "",
        address: "" // Will be populated by fetchProfile
      });
      fetchProfile(); // Fetch full profile to get address
      fetchOrders();
    }
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success && data.user) {
        setEditForm(prev => ({
          ...prev,
          name: data.user.name || prev.name,
          phone: data.user.phone || prev.phone,
          address: data.user.address || "" 
        }));
      }
    } catch (e) { console.error("Profile fetch error"); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/user/orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      
      if (res.ok) {
        await update(); // Update session
        setIsEditing(false);
        setToast({ show: true, message: "Profile updated successfully!", type: "success" });
      } else {
        setToast({ show: true, message: "Update failed", type: "error" });
      }
    } catch (error) {
      setToast({ show: true, message: "Server error", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Scroll Handler
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      ordersTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center text-[#8D6E63] font-playfair">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-12 md:px-8">
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-[#4E342E] mb-2">Log Out?</h3>
            <p className="text-[#8D6E63] text-sm mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 border border-[#F2E3DB] text-[#8D6E63] font-bold rounded-xl hover:bg-[#FFF8F3]"
              >
                Cancel
              </button>
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- LEFT: User Profile Card --- */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E3DB] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-[#72514D]/10"></div>
            
            <div className="relative flex flex-col items-center text-center mt-8">
              <div className="w-24 h-24 bg-[#72514D] rounded-full flex items-center justify-center text-white text-4xl font-playfair font-bold border-4 border-white shadow-md">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              
              {!isEditing ? (
                <>
                  <h2 className="mt-4 text-2xl font-bold text-[#4E342E]">{editForm.name}</h2>
                  <p className="text-sm text-[#8D6E63] font-medium">{session?.user?.email}</p>
                  
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#FFF8F3] rounded-xl text-sm text-[#4E342E]">
                      <Phone size={18} className="text-[#D98292]" />
                      <span>{editForm.phone || "No phone added"}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#FFF8F3] rounded-xl text-sm text-[#4E342E]">
                      <Mail size={18} className="text-[#D98292]" />
                      <span className="truncate">{session?.user?.email}</span>
                    </div>
                    {/* ADDED: Address Display */}
                    <div className="flex items-start gap-3 p-3 bg-[#FFF8F3] rounded-xl text-sm text-[#4E342E] text-left">
                      <MapPin size={18} className="text-[#D98292] shrink-0 mt-0.5" />
                      <span className="break-words">{editForm.address || "No address saved"}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full py-3 border border-[#F2E3DB] text-[#8D6E63] font-bold rounded-xl hover:bg-[#FFF8F3] transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                </>
              ) : (
                <div className="w-full mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#8D6E63] ml-1 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full p-3 rounded-xl border border-[#D98292] text-sm text-[#4E342E] focus:outline-none bg-[#FFF8F3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#8D6E63] ml-1 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      value={editForm.phone} 
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full p-3 rounded-xl border border-[#D98292] text-sm text-[#4E342E] focus:outline-none bg-[#FFF8F3]"
                    />
                  </div>
                  {/* ADDED: Address Edit Field */}
                  <div>
                    <label className="text-xs font-bold text-[#8D6E63] ml-1 uppercase">Address</label>
                    <textarea 
                      rows={3}
                      value={editForm.address} 
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      className="w-full p-3 rounded-xl border border-[#D98292] text-sm text-[#4E342E] focus:outline-none bg-[#FFF8F3] resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setIsEditing(false)} className="flex-1 py-3 border border-[#F2E3DB] text-[#8D6E63] rounded-xl font-bold hover:bg-gray-50">Cancel</button>
                    <button onClick={handleUpdateProfile} disabled={isSaving} className="flex-1 py-3 bg-[#D98292] text-white rounded-xl font-bold hover:bg-[#c46b7d] disabled:opacity-50">
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-4 bg-white border border-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* --- RIGHT: Order History --- */}
        <div className="md:col-span-2 space-y-6">
          <h2 
            ref={ordersTopRef} 
            className="text-2xl font-playfair font-bold text-[#4E342E] flex items-center gap-2 scroll-mt-24"
          >
            <Package className="text-[#D98292]" /> Order History
          </h2>

          {loadingOrders ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-white/50 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-[#F2E3DB] border-dashed text-center">
              <div className="w-16 h-16 bg-[#FFF8F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D98292]">
                <Package size={32} />
              </div>
              <h3 className="font-bold text-[#4E342E] text-lg">No orders yet</h3>
              <p className="text-[#8D6E63] text-sm mb-6">Looks like you haven't indulged in any sweets yet!</p>
              <Link href="/menu">
                <button className="px-8 py-3 bg-[#4E342E] text-white rounded-xl font-bold hover:bg-[#3d2924] shadow-lg">
                  Browse Menu
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedOrders.map((order) => (
                  <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2E3DB] hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-[#F2E3DB] border-dashed gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#4E342E] text-lg">#{order._id.slice(-6).toUpperCase()}</span>
                          <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${
                            order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                            order.status === 'CANCELLED' ? 'bg-red-50 text-red-500 border-red-100' :
                            'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#8D6E63] mt-1">
                          <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-[#8D6E63]">Total Amount</span>
                        <span className="font-bold text-xl text-[#4E342E]">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Custom Note */}
                    {order.notes && (
                      <div className="flex items-start gap-2 mb-3 p-2 bg-[#FFF8F3] rounded-lg border border-[#F2E3DB]/50 text-sm w-full">
                        <Info size={16} className="mt-0.5 text-[#D98292] shrink-0" />
                        <div className="w-full min-w-0">
                          <span className="font-bold text-[#4E342E] uppercase text-xs block">Note from You:</span>
                          <span className="text-[#8D6E63] italic break-words whitespace-pre-wrap block">{order.notes}</span>
                        </div>
                      </div>
                    )}

                    {/* Items List + Delivery Fee */}
                    <div className="space-y-2 mb-4">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm text-[#4E342E]">
                          <span>
                            <span className="font-bold text-[#D98292]">{item.quantity}x</span> {item.name} 
                            {item.variant && <span className="text-[#8D6E63] text-xs"> ({item.variant})</span>}
                          </span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      
                      <div className="flex justify-between text-sm text-[#4E342E]">
                        <span className="font-bold text-[#D98292] flex items-center gap-1">
                          <Truck size={14} /> Delivery Fee
                        </span>
                        <span className="font-medium">₹{order.deliveryCharge || 0}</span>
                      </div>
                    </div>

                    {/* Address Snippet */}
                    <div className="flex items-start gap-2 text-xs text-[#8D6E63] bg-[#FFF8F3] p-3 rounded-lg">
                      <MapPin size={14} className="mt-0.5 text-[#D98292] shrink-0" />
                      <p>{order.address}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#F2E3DB] border-dashed">
                  <button 
                    onClick={() => changePage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-bold text-[#8D6E63]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-[#F2E3DB] text-[#4E342E] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}