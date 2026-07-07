import { useState, useEffect } from "react";
import { AiOutlineBarChart, AiOutlineArrowUp, AiOutlineInbox, AiOutlineDollar, AiOutlineShopping } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import { supabase } from "../supabaseClient"; // Menggunakan Supabase Client Anda

export default function Laporan() {
    // 1. STATE PERIODE WAKTU (hari_ini / bulan_ini)
    const [periode, setPeriode] = useState("hari_ini");
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. AMBIL DATA DAN KALKULASI STATISTIK DARI SUPABASE
    useEffect(() => {
        const fetchAndCalculateReport = async () => {
            try {
                setLoading(true);

                // Menentukan pembatas waktu awal (timestamp) berdasarkan state periode
                const rentangWaktu = new Date();
                if (periode === "hari_ini") {
                    rentangWaktu.setHours(0, 0, 0, 0);
                } else if (periode === "bulan_ini") {
                    rentangWaktu.setDate(1); // Set ke tanggal 1 di bulan berjalan
                    rentangWaktu.setHours(0, 0, 0, 0);
                }
                const formatISOId = rentangWaktu.toISOString();

                // Tarik data transactions beserta sub-details dan titles produknya
                const { data: transactions, error } = await supabase
                    .from("transactions")
                    .select(`
                        id,
                        total_price,
                        created_at,
                        transaction_details (
                            quantity,
                            price,
                            products (
                                title
                            )
                        )
                    `)
                    .gte("created_at", formatISOId);

                if (error) throw error;

                // Logika kalkulasi matematika laporan (Agregasi manual via Frontend)
                let totalPendapatan = 0;
                let totalNota = transactions ? transactions.length : 0;
                let totalPorsi = 0;
                
                // Map penampung hitungan frekuensi menu terjual
                const mapMenu = {};

                if (transactions && transactions.length > 0) {
                    transactions.forEach(tx => {
                        totalPendapatan += Number(tx.total_price || 0);

                        if (tx.transaction_details) {
                            tx.transaction_details.forEach(detail => {
                                const qty = Number(detail.quantity || 0);
                                totalPorsi += qty;

                                const namaMenu = detail.products?.title || "Menu Dihapus";
                                const subtotalItem = Number(detail.price || 0) * qty;

                                if (!mapMenu[namaMenu]) {
                                    mapMenu[namaMenu] = {
                                        title: namaMenu,
                                        kuantitas_terjual: 0,
                                        subtotal_omzet: 0
                                    };
                                }
                                mapMenu[namaMenu].kuantitas_terjual += qty;
                                mapMenu[namaMenu].subtotal_omzet += subtotalItem;
                            });
                        }
                    });
                }

                // Mengubah mapMenu menjadi array dan mengkalkulasi persentase kontribusi omzet
                const rincianMenuRaw = Object.values(mapMenu);
                const rincianMenu = rincianMenuRaw.map(item => {
                    const kontribusiPercent = totalPendapatan > 0 
                        ? ((item.subtotal_omzet / totalPendapatan) * 100).toFixed(1) 
                        : 0;
                    return {
                        ...item,
                        kontribusi: Number(kontribusiPercent)
                    };
                }).sort((a, b) => b.kuantitas_terjual - a.kuantitas_terjual); // Urutkan dari porsi paling laku

                // Ambil jawara menu terlaris teratas
                const menuTerlaris = rincianMenu.length > 0 ? rincianMenu[0].title : "Belum Ada";

                setReportData({
                    total_pendapatan: totalPendapatan,
                    total_nota: totalNota,
                    total_porsi: totalPorsi,
                    menu_terlaris: menuTerlaris,
                    rincian_menu: rincianMenu
                });

            } catch (error) {
                console.error("Gagal memproses laporan bisnis dari Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndCalculateReport();
    }, [periode]);

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
                <div className="p-12 text-center text-xs font-black uppercase tracking-widest text-stone-400 bg-white border border-stone-200/60 rounded-2xl shadow-sm animate-pulse">
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
                                    <AiOutlineArrowUp /> Real-time
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
                                                    {/* Bar Progres Kecil Visual */}
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
                                    
                                    {(reportData?.rincian_menu || []).length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center text-stone-400 italic py-8 bg-stone-50/20">
                                                Belum ada data porsi produk terjual pada periode ini.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}