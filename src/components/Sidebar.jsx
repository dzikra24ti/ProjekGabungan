import { 
    AiOutlineDashboard, 
    AiOutlineCalculator, 
    AiOutlineHistory, 
    AiOutlineBarChart 
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuItems = [
        { name: "Overview Dashboard", icon: <AiOutlineDashboard />, desc: "Ringkasan data hari ini", path: "/dashboard" },
        { name: "Kasir Cepat (POS)", icon: <AiOutlineCalculator />, desc: "Solusi anti pesanan tertukar", path: "/kasir" },
        { name: "Riwayat Transaksi", icon: <AiOutlineHistory />, desc: "Penyimpanan data otomatis", path: "/riwayat" },
        { name: "Laporan Omzet", icon: <AiOutlineBarChart />, desc: "Analisis penjualan berkala", path: "/laporan" },
    ];

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
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => `w-full flex items-start gap-3.5 px-3 py-3 rounded-xl transition-all text-left group ${
                                isActive ? "bg-stone-800 text-stone-50 shadow-sm" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                            }`}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`text-lg mt-0.5 ${isActive ? "text-stone-50" : "text-stone-400 group-hover:text-stone-700"}`}>
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="text-xs font-black tracking-tight">{item.name}</p>
                                        <p className={`text-[10px] mt-0.5 ${isActive ? "text-stone-300/80" : "text-stone-400"}`}>{item.desc}</p>
                                    </div>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* STATUS DATABASE */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/40 text-[10px] text-stone-400 font-medium">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-stone-500 animate-pulse"></div>
                    <span className="font-black uppercase tracking-wider text-stone-600">Status Database</span>
                </div>
                Integritas data lokal terjaga terikat nomor antrean meja.
            </div>
        </aside>
    );
}