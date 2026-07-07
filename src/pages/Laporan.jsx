import { useState, useEffect } from "react";
import { AiOutlineBarChart, AiOutlineArrowUp, AiOutlineInbox, AiOutlineDollar, AiOutlineShopping } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import axios from "axios";

export default function Laporan() {
    // 1. STATE UNTUK FILTER PERIODE WAKTU (hari_ini / bulan_ini)
    const [periode, setPeriode] = useState("hari_ini");
    
    // State untuk menampung data riil dari database Laravel
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. AMBIL DATA DARI BACKEND TIAP PERIODE BERUBAH
    useEffect(() => {
        setLoading(true);
        
        // Menembak endpoint API dengan membawa parameter range (hari_ini / bulan_ini)
        axios.get(`http://127.0.0.1:8000/api/reports/omzet?range=${periode}`)
            .then((response) => {
                setReportData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Gagal memuat laporan bisnis:", error);
                setLoading(false);
            });
    }, [periode]); // [] diisi `periode` agar ketika tombol diklik, useEffect otomatis nge-fetch ulang data baru

    return (
        <div className="space-y-6 animate-in fade-in duration-200 bg-stone-50 text-stone-800 font-sans">
            
            {/* Navigasi Header Halaman */}
            <PageHeader 
                icon={<AiOutlineBarChart />}
                title="Laporan Bisnis Kedai" 
                description="Pantau statistik omzet harian, jumlah produk terjual, serta tren menu paling diminati pelanggan." 
            />

            {/* BAR FILTER PERIODE */}
            <div className="flex bg-white p-2 rounded-xl border border-stone-200/60 shadow-sm max-w-xs">
                <button 
                    onClick={() => setPeriode("hari_ini")}
                    className={`flex-1 py-1.5 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all ${periode === "hari_ini" ? "bg-stone-800 text-stone-50 shadow-sm" : "text-stone-500 hover:text-stone-800"}`}
                >
                    Hari Ini
                </button>
                <button 
                    onClick={() => setPeriode("bulan_ini")}
                    className={`flex-1 py-1.5 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all ${periode === "bulan_ini" ? "bg-stone-800 text-stone-50 shadow-sm" : "text-stone-500 hover:text-stone-800"}`}
                >
                    Bulan Ini
                </button>
            </div>

            {/* LOGIKA LOADING / TAMPILAN JIKA DATA SEDANG DIPROSES */}
            {loading ? (
                <div className="p-12 text-center text-xs font-black uppercase tracking-widest text-stone-400 bg-white border border-stone-200/60 rounded-2xl shadow-sm">
                    🔄 Menghitung Statistik Warung Patria...
                </div>
            ) : (
                <>
                    {/* DASHBOARD CARDS (GRID METRIK UTAMA RIIL) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* CARD 1: OMZET KOTOR */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Total Pendapatan</p>
                                <h3 className="text-xl font-black text-stone-900 tracking-tight">
                                    Rp {Number(reportData?.total_pendapatan || 0).toLocaleString("id-ID")}
                                </h3>
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    <AiOutlineArrowUp /> +12.4%
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 text-lg border border-stone-100">
                                <AiOutlineDollar />
                            </div>
                        </div>

                        {/* CARD 2: JUMLAH NOTA / TRANSAKSI */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nota Tersimpan</p>
                                <h3 className="text-xl font-black text-stone-900 tracking-tight">{reportData?.total_nota || 0} Nota</h3>
                                <p className="text-[10px] text-stone-400 font-medium">Transaksi sukses diselesaikan</p>
                            </div>
                            <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 text-lg border border-stone-100">
                                <AiOutlineShopping />
                            </div>
                        </div>

                        {/* CARD 3: TOTAL PRODUK KELUAR */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Porsi Terjual</p>
                                <h3 className="text-xl font-black text-stone-900 tracking-tight">{reportData?.total_porsi || 0} Porsi</h3>
                                <p className="text-[10px] text-stone-400 font-medium">Makanan & minuman terbuat</p>
                            </div>
                            <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 text-lg border border-stone-100">
                                <AiOutlineInbox />
                            </div>
                        </div>

                        {/* CARD 4: JUARA PRODUK TERTINGGI */}
                        <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Menu Terlaris</p>
                                <h3 className="text-sm font-black text-stone-900 tracking-tight truncate max-w-[150px]">
                                    {reportData?.menu_terlaris || "Belum Ada"}
                                </h3>
                                <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-0.5 rounded-full">
                                    ⭐ Pilihan Utama
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 text-base select-none">
                                🔥
                            </div>
                        </div>

                    </div>

                    {/* DETAIL DAFTAR MENU TERJUAL */}
                    <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-stone-100">
                            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest">
                                Rincian Penjualan Per Menu
                            </h3>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-stone-50/70 border-b border-stone-200/60 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        <th className="py-4 px-6">Nama Menu Kedai</th>
                                        <th className="py-4 px-6 text-center">Kuantitas Terjual</th>
                                        <th className="py-4 px-6 text-right">Subtotal Omzet</th>
                                        <th className="py-4 px-6 text-right">Kontribusi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100 text-xs font-bold text-stone-700">
                                    {(reportData?.rincian_menu || []).map((item, index) => (
                                        <tr key={index} className="hover:bg-stone-50/40 transition-colors">
                                            <td className="py-4 px-6 font-black text-stone-900">{item.title}</td>
                                            <td className="py-4 px-6 text-center text-stone-800 font-mono text-sm">{item.kuantitas_terjual}x</td>
                                            <td className="py-4 px-6 text-right font-black text-stone-900">
                                                Rp {(item.subtotal_omzet || 0).toLocaleString("id-ID")}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-stone-400 font-medium">{item.kontribusi}%</span>
                                                    {/* Bar Progres Kecil Miniatur Visual */}
                                                    <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                                                        <div 
                                                            className="bg-stone-700 h-full rounded-full" 
                                                            style={{ width: `${item.kontribusi}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}