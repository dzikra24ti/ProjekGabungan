import { MdNoFood } from "react-icons/md"; 
import { 
    AiOutlineDashboard, 
    AiOutlineCalculator, 
    AiOutlineHistory, 
    AiOutlineBarChart 
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
// 1. Ambil data role dari localStorage, jika kosong default ke 'owner'
const rawRole = localStorage.getItem("role") || "owner";

// 2. Ubah semua huruf menjadi kecil dan bersihkan teks agar seragam
let userRole = rawRole.toLowerCase().trim();

// 3. Normalisasi: Jika di database tertulis "staff dapur" atau "staff_dapur", ubah menjadi "dapur"
if (userRole.includes("dapur") || userRole.includes("staff")) {
    userRole = "dapur";
}

    // Logika penataan class dinamis untuk menu aktif/tidak aktif
    const menuClass = ({ isActive }) =>
        `w-full flex items-start gap-3.5 px-3 py-3 rounded-xl transition-all text-left group ${
            isActive 
                ? "bg-stone-800 text-stone-50 shadow-sm" 
                : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
        }`;

    return (
        <aside className="w-72 bg-white h-screen border-r border-stone-200/80 flex flex-col justify-between p-6 shrink-0">
            <div className="space-y-8">
                {/* LOGO APLIKASI */}
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                    <div className="w-9 h-9 bg-stone-800 rounded-xl flex items-center justify-center text-stone-100 text-lg">🪵</div>
                    <div>
                        <h2 className="font-black text-sm tracking-tight text-stone-900 uppercase">Patria System</h2>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Digital Order POS</p>
                    </div>
                </div>

                {/* NAVIGASI MENU UTAMA */}
                <nav className="space-y-1.5">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest pl-3 mb-3">Menu Utama</p>
                    
                    <ul className="space-y-1.5">
                        
                        {/* 1. Overview Dashboard (Akses: Owner, Kasir, Staff Dapur) */}
                        {(userRole === "owner" || userRole === "kasir" || userRole === "dapur") && (
                            <li>
                                <NavLink to="/dashboard" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <AiOutlineDashboard />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">Overview Dashboard</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Ringkasan data hari ini</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}

                        {/* 2. Products (Akses: Owner, Kasir, Staff Dapur) */}
                        {(userRole === "owner" || userRole === "kasir" || userRole === "dapur") && (
                            <li>
                                <NavLink to="/products" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <MdNoFood />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">Products</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Menu Anti Lapar</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}

                        {/* 3. Kasir Cepat (POS) (Akses: HANYA Kasir) */}
                        {userRole === "kasir" && (
                            <li>
                                <NavLink to="/kasir" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <AiOutlineCalculator />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">Kasir Cepat (POS)</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Solusi anti pesanan tertukar</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}

                        {/* 4. Riwayat Transaksi (Akses: Owner, Kasir, Staff Dapur) */}
                        {(userRole === "owner" || userRole === "kasir" || userRole === "dapur") && (
                            <li>
                                <NavLink to="/riwayat" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <AiOutlineHistory />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">Riwayat Transaksi</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Penyimpanan data otomatis</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}

                        {/* 5. Laporan Omzet (Akses: HANYA Owner) */}
                        {userRole === "owner" && (
                            <li>
                                <NavLink to="/laporan" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <AiOutlineBarChart />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">Laporan Omzet</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Analisis penjualan berkala</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}

                        {/* 6. User (Akses: HANYA Owner) */}
                        {userRole === "owner" && (
                            <li>
                                <NavLink to="/register" className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                                <AiOutlineBarChart />
                                            </span>
                                            <div>
                                                <p className="text-xs font-black tracking-tight">User</p>
                                                <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>Hak Akses Owner</p>
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* STATUS DATABASE */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/40 text-[10px] text-stone-400 font-medium">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-stone-500 animate-pulse"></div>
                    <span className="font-black uppercase tracking-wider text-stone-600">Status Database</span>
                </div>
                Integritas data lokal terjaga terikat nomor antrean meja.
                <div className="mt-2 text-[9px] font-black uppercase text-stone-500 tracking-wider">
                    Role Aktif: {userRole}
                </div>
            </div>
        </aside>
    );
}