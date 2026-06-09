import { MdNoFood } from "react-icons/md"; 
import { 
    AiOutlineDashboard, 
    AiOutlineCalculator, 
    AiOutlineHistory, 
    AiOutlineBarChart 
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    // Logika penataan class dinamis dari modul (menggunakan warna tema stone Anda)
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
                    
                    {/* Daftar Menu List ditulis manual tanpa array map */}
                    <ul className="space-y-1.5">
                        {/* Menu 1: Overview Dashboard */}
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

                        {/* Menu 2: Products */}
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

                        {/* Menu 3: Kasir Cepat (POS) */}
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

                        {/* Menu 4: Riwayat Transaksi */}
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

                        {/* Menu 5: Laporan Omzet */}
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
            </div>
        </aside>
    );
}