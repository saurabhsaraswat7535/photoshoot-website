import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import ImageUpload from "../components/ImageUpload";

function Admin() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [packages, setPackages] = useState([]);

    const [pkgForm, setPkgForm] = useState({
        id: null,
        name: "",
        price: "",
        features: "",
        popular: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) navigate("/login");
            else setUser(u);
        });
        return () => unsub();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;

        const unsubBookings = onSnapshot(collection(db, "bookings"), (snap) => {
            const sorted = snap.docs.map((d) => {
                const data = d.data();
                const ts = data.timestamp || data.createdAt;
                return { id: d.id, ...data, _sortTime: ts?.toDate ? ts.toDate() : new Date(0) };
            }).sort((a, b) => b._sortTime - a._sortTime);
            setBookings(sorted);
        });

        const unsubContacts = onSnapshot(collection(db, "contacts"), (snap) => {
            const sorted = snap.docs.map((d) => {
                const data = d.data();
                const ts = data.timestamp || data.createdAt;
                return { id: d.id, ...data, _sortTime: ts?.toDate ? ts.toDate() : new Date(0) };
            }).sort((a, b) => b._sortTime - a._sortTime);
            setContacts(sorted);
        });

        const unsubPackages = onSnapshot(collection(db, "packages"), (snap) => {
            setPackages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });

        return () => {
            unsubBookings();
            unsubContacts();
            unsubPackages();
        };
    }, [user]);

    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handlePkgSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: pkgForm.name,
            price: pkgForm.price,
            features: pkgForm.features.split(",").map(f => f.trim()).filter(Boolean),
            popular: pkgForm.popular
        };
        if (isEditing) {
            await updateDoc(doc(db, "packages", pkgForm.id), data);
        } else {
            await addDoc(collection(db, "packages"), data);
        }
        setPkgForm({ id: null, name: "", price: "", features: "", popular: false });
        setIsEditing(false);
        alert("Success");
    };

    if (!user) return <div className="h-screen flex items-center justify-center bg-[#151b2e] text-white">Loading...</div>;

    return (
        <div className="flex min-h-screen pluto-main-bg pt-20">

            {/* SIDEBAR - CLEAN & ALIGNED */}
            <aside className="w-64 pluto-sidebar fixed h-[calc(100vh-5rem)] top-20 flex flex-col z-30 shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-[#1a2236]">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Admin Panel</h2>
                </div>

                <div className="p-6 border-b border-white/5">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest">{user.email?.split('@')[0]}</h3>
                    <div className="flex items-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#0acf97] mr-2"></span>
                        <span className="text-[#0acf97] text-[10px] font-bold uppercase tracking-widest">Online Status</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {[
                        { id: "overview", label: "Dashboard", icon: "📊" },
                        { id: "bookings", label: "Bookings", icon: "📧" },
                        { id: "contacts", label: "Inquiries", icon: "💬" },
                        { id: "images", label: "Gallery", icon: "📷" },
                        { id: "packages", label: "Packages", icon: "💎" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === tab.id
                                ? "bg-white/5 text-white"
                                : "text-[#8391a2] hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span className="text-sm">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <button onClick={logout} className="w-full py-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg text-[10px] font-black uppercase transition-all border border-red-500/20">
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen">

                {/* Simplified Header */}
                <header className="pluto-header h-20 px-10 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100">
                    <h2 className="text-[#313a46] font-black uppercase text-sm tracking-[3px]">{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Management System</span>
                    </div>
                </header>

                <div className="p-10 animate-fade-in-up">

                    {/* OVERVIEW SECTION - PERFECT ALIGNMENT */}
                    {activeTab === "overview" && (
                        <div className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { label: "Bookings", val: bookings.length, icon: "👤", color: "#727cf5" },
                                    { label: "Inquiries", val: contacts.length, icon: "✉️", color: "#0acf97" },
                                    { label: "Gallery", val: "Active", icon: "📷", color: "#39afd1" },
                                    { label: "Packages", val: packages.length, icon: "💎", color: "#ffbc00" },
                                ].map((item, i) => (
                                    <div key={i} className="pluto-card p-8 bg-white border border-gray-100 h-full flex flex-col justify-center">
                                        <span className="pluto-stats-label block mb-4">{item.label}</span>
                                        <div className="flex items-center justify-between">
                                            <span className="pluto-stats-value text-3xl">{item.val}</span>
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl" style={{ backgroundColor: item.color }}>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pluto-card p-10 bg-white">
                                <h3 className="font-black text-gray-700 mb-8 uppercase text-xs tracking-[2px] border-b border-gray-50 pb-6">System Status</h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                                    Welcome to the photography management dashboard. Here you can monitor all your client bookings, messages, and gallery assets in one unified interface. Use the sidebar to navigate between sections.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* BOOKINGS VIEW */}
                    {activeTab === "bookings" && (
                        <div className="pluto-card bg-white overflow-hidden shadow-sm">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <h2 className="text-lg font-black text-gray-700 uppercase tracking-tighter">Client Bookings</h2>
                                <span className="text-blue-600 font-bold text-xs uppercase px-4 py-1 bg-blue-50 rounded-full border border-blue-100">{bookings.length} Total</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-[11px] uppercase tracking-[1.5px] text-gray-400 font-black border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-5">Client</th>
                                            <th className="px-8 py-5">Event Type</th>
                                            <th className="px-8 py-5">Date</th>
                                            <th className="px-8 py-5">Budget</th>
                                            <th className="px-8 py-5 text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {bookings.map(book => (
                                            <tr key={book.id} className="hover:bg-gray-50/40 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-gray-800 uppercase tracking-tight text-sm">{book.name}</span>
                                                        <span className="text-[11px] text-gray-400 mt-0.5">{book.phone}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-xs text-gray-500 font-bold uppercase">{Array.isArray(book.type) ? book.type.join(", ") : book.type}</td>
                                                <td className="px-8 py-6 text-sm text-blue-600 font-black">{book.date}</td>
                                                <td className="px-8 py-6 text-sm text-gray-900 font-black">₹{book.budget}</td>
                                                <td className="px-8 py-6 text-center">
                                                    <button onClick={async () => { if (window.confirm("Archive?")) await deleteDoc(doc(db, 'bookings', book.id)) }} className="p-2 text-gray-300 hover:text-red-500 transition-all font-bold">🗑</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* CONTACTS VIEW */}
                    {activeTab === "contacts" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {contacts.map(contact => (
                                <div key={contact.id} className="pluto-card p-10 bg-white border-t-4 border-blue-500 flex flex-col h-full shadow-lg">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl">{contact.name[0]?.toUpperCase()}</div>
                                            <div>
                                                <h4 className="font-black text-gray-800 uppercase tracking-tight text-lg">{contact.name}</h4>
                                                <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{contact.phone}</span>
                                            </div>
                                        </div>
                                        <button onClick={async () => { if (window.confirm("Delete?")) await deleteDoc(doc(db, 'contacts', contact.id)) }} className="text-gray-300 hover:text-red-500 transition-all font-bold">✕</button>
                                    </div>
                                    <div className="flex-1 bg-gray-50/50 p-6 rounded-2xl text-sm text-gray-600 font-medium italic leading-relaxed border border-gray-100">
                                        "{contact.message}"
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                                        <span>{contact.email}</span>
                                        <span className="text-blue-500 cursor-pointer hover:underline">Reply Now</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* GALLERY VIEW */}
                    {activeTab === "images" && (
                        <div className="max-w-2xl mx-auto pluto-card p-16 bg-white shadow-xl mt-6 border border-gray-100">
                            <div className="text-center mb-12">
                                <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tighter">Upload Gallery Media</h3>
                                <p className="text-sm text-gray-400 font-medium italic">All uploads are automatically optimized for your portfolio.</p>
                            </div>
                            <ImageUpload
                                onUploadSuccess={async (url) => {
                                    try {
                                        await addDoc(collection(db, "gallery_images"), { url, timestamp: serverTimestamp() });
                                        alert("Gallery Updated Successfully!");
                                    } catch (e) { alert("Failed to save asset."); }
                                }}
                            />
                        </div>
                    )}

                    {/* PACKAGES VIEW */}
                    {activeTab === "packages" && (
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-5 pluto-card p-10 bg-white shadow-md">
                                <h3 className="font-black text-gray-800 mb-8 uppercase text-xs tracking-widest border-b border-gray-50 pb-6 italic">Tier Configuration</h3>
                                <form onSubmit={handlePkgSubmit} className="space-y-6">
                                    <input placeholder="Service Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-all shadow-inner" value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} />
                                    <input placeholder="Price Label (e.g. ₹50k)" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-black text-blue-600 focus:border-blue-500 outline-none transition-all shadow-inner" value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })} />
                                    <textarea placeholder="Feature List (comma separated)" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-medium focus:border-blue-500 outline-none h-40 resize-none transition-all shadow-inner" value={pkgForm.features} onChange={(e) => setPkgForm({ ...pkgForm, features: e.target.value })} />
                                    <label className="flex items-center cursor-pointer gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100/50 transition-colors">
                                        <input type="checkbox" checked={pkgForm.popular} onChange={(e) => setPkgForm({ ...pkgForm, popular: e.target.checked })} className="w-4 h-4 rounded text-blue-600 border-gray-300 transition-all cursor-pointer" />
                                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest select-none">Mark as Popular Choice</span>
                                    </label>
                                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase text-xs tracking-[2px] transition-all shadow-lg shadow-blue-500/20">
                                        {isEditing ? "Update Selection" : "Launch Configuration"}
                                    </button>
                                </form>
                            </div>
                            <div className="lg:col-span-7 space-y-6">
                                {packages.map(p => (
                                    <div key={p.id} className="pluto-card p-8 bg-white flex justify-between items-center group shadow-sm hover:shadow-md transition-all">
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <h4 className="font-black text-gray-800 uppercase tracking-tight text-lg italic">{p.name}</h4>
                                                {p.popular && <span className="bg-yellow-400 text-black text-[9px] px-2 py-1 rounded-md font-black uppercase shadow-sm">Popular</span>}
                                            </div>
                                            <span className="text-blue-600 font-black tracking-tight">{p.price}</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <button onClick={() => { setPkgForm({ id: p.id, name: p.name, price: p.price, features: p.features.join(", "), popular: p.popular }); setIsEditing(true); }} className="text-[11px] font-black text-blue-500 uppercase hover:underline">Config</button>
                                            <button onClick={async () => { if (window.confirm("Archive?")) await deleteDoc(doc(db, 'packages', p.id)) }} className="text-[11px] font-black text-red-400 uppercase hover:underline">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Admin;
