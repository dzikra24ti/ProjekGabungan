import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineDollar, AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import { supabase } from "../supabaseClient"; // Menggunakan Supabase Client Anda

export default function Dashboard() {
    const [omzet, setOmzet] = useState(0);
    const [totalTransaksi, setTotalTransaksi] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Mengambil nama user yang disimpan saat login dari localStorage.
    // Jika data belum tersimpan di browser, otomatis fallback ke nama "Agus" sebagai default.
    const [namaUser, setNamaUser] = useState(() => {
        return localStorage.getItem("user_name") || "Agus"; 
    });

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            try {
                setLoading(true);

                // Buat rentang waktu hari ini (mulai dari jam 00:00:00 ISO String)
                const hariIni = new Date();
                hariIni.setHours(0, 0, 0, 0);
                const formatISOId = hariIni.toISOString();

                // Mengambil data transaksi yang dibuat hanya hari ini
                const { data: transactions, error } = await supabase
                    .from("transactions")
                    .select("total_price")
                    .gte("created_at", formatISOId);

                if (error) throw error;

                // Hitung agregasi summary dari data array yang kembali
                if (transactions && transactions.length > 0) {
                    const hitungOmzet = transactions.reduce((acc, curr) => acc + Number(curr.total_price || 0), 0);
                    setOmzet(hitungOmzet);
                    setTotalTransaksi(transactions.length);
                } else {
                    setOmzet(0);
                    setTotalTransaksi(0);
                }
            } catch (error) {
                console.error("Gagal memuat data dashboard summary dari Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardSummary();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in text-stone-800 font-sans">
            
            {/* 1. PEMANGGILAN PAGE HEADER MURNI */}
            <PageHeader 
                icon={<AiOutlineDashboard />}
                title="Overview Dashboard" 
                description="Ringkasan data finansial, volume penjualan, dan informasi akun kasir yang bertugas hari ini secara real-time."
            />

            {/* 2. RINGKASAN METRIK FINANSIAL & INFORMASI AKUN */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card 1: Omzet */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Omzet Hari Ini</p>
                        <p className="text-lg font-black tracking-tight text-stone-900">
                            {loading ? "Menghitung..." : `Rp ${omzet.toLocaleString("id-ID")}`}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-stone-200/60 rounded-xl flex items-center justify-center text-stone-600 shadow-inner">
                        <AiOutlineDollar className="text-lg" />
                    </div>
                </div>
                
                {/* Card 2: Volume Penjualan */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Volume Penjualan</p>
                        <p className="text-lg font-black tracking-tight text-stone-900">
                            {loading ? "Memuat..." : `${totalTransaksi} Transaksi`}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-stone-200/60 rounded-xl flex items-center justify-center text-stone-600 shadow-inner">
                        <AiOutlineCheck className="text-lg" />
                    </div>
                </div>

                {/* Card 3: Informasi Akun Pengguna Aktif */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Petugas Aktif</p>
                        <p className="text-lg font-black tracking-tight text-stone-900 capitalize">
                            {namaUser}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-stone-200/60 rounded-xl flex items-center justify-center text-stone-600 shadow-inner">
                        <AiOutlineUser className="text-lg" />
                    </div>
                </div>
            </section>

            {/* 3. INFORMASI PANDUAN SISTEM */}
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200/80 shadow-sm text-center space-y-2">
                <div className="w-12 h-12 bg-stone-200/60 text-stone-700 rounded-xl flex items-center justify-center mx-auto text-lg font-bold border border-stone-300/40">
                    🪵
                </div>
                <h3 className="text-xs font-black text-stone-800 uppercase tracking-widest pt-2">Sistem Manajemen POS Patria Ready</h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                    Silakan gunakan panel navigasi di sebelah kiri untuk menginput data pesanan baru pelanggan (Kasir Cepat) atau melihat log riwayat nota masuk.
                </p>
            </div>

        </div>
    );
}