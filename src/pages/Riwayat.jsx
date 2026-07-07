import { useState, useEffect } from "react";
import { AiOutlineHistory, AiOutlineSearch, AiOutlineCalendar } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import { supabase } from "../supabaseClient"; // Menggunakan Supabase Client Anda

export default function Riwayat() {
    // 1. STATE UTAMA
    const [listTransaksi, setListTransaksi] = useState([]);
    const [pencarian, setPencarian] = useState("");
    const [loading, setLoading] = useState(true);

    // 2. AMBIL DATA DARI SUPABASE DENGAN RELATION JOIN
    useEffect(() => {
        const fetchRiwayatTransaksi = async () => {
            try {
                setLoading(true);
                
                // Melakukan Eager Loading / Join tabel transaksi -> detail -> produk bawaan Supabase
                const { data, error } = await supabase
                    .from("transactions")
                    .select(`
                        id,
                        customer_name,
                        total_quantity,
                        total_price,
                        created_at,
                        transaction_details (
                            id,
                            quantity,
                            price,
                            products (
                                title
                            )
                        )
                    `)
                    .order("created_at", { ascending: false }); // Mengurutkan dari transaksi terbaru

                if (error) throw error;

                setListTransaksi(data || []);
            } catch (err) {
                console.error("Gagal memuat riwayat transaksi dari Supabase:", err);
                alert("Gagal mengambil data nota. Pastikan koneksi internet & Supabase aktif.");
            } finally {
                setLoading(false);
            }
        };

        fetchRiwayatTransaksi();
    }, []);

    // 3. LOGIKA UNTUK MENYUSUN TEKS RINCIAN PESANAN DARI STRUKTUR JOIN SUPABASE
    const susunTeksPesanan = (details) => {
        if (!details || details.length === 0) return "Tidak ada item";
        
        // Menggabungkan item menjadi teks tunggal seperti "2x Teh Telor Bebek, 1x Indomie"
        return details.map(item => {
            // Menyesuaikan pembacaan objek produk hasil join relational database Supabase
            const namaMenu = item.products?.title || "Menu Dihapus";
            return `${item.quantity}x ${namaMenu}`;
        }).join(", ");
    };

    // 4. LOGIKA FORMAT JAM (Mengubah timestamp ISO menjadi format lokal jam '19:00')
    const formatJam = (timestamp) => {
        if (!timestamp) return "--:--";
        const date = new Date(timestamp);
        return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    };

    // 5. FITUR PENCARIAN LIVE (Berdasarkan ID Nota atau Nama Pelanggan)
    const riwayatDisaring = listTransaksi.filter((item) => {
        const kataKunci = pencarian.toLowerCase();
        const cocokNama = (item.customer_name || "").toLowerCase().includes(kataKunci);
        const cocokID = item.id.toString().includes(kataKunci);
        return cocokNama || cocokID;
    });

    if (loading) {
        return <div className="p-8 text-center font-bold text-stone-500 animate-pulse">Memuat riwayat nota Warung Patria...</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in bg-stone-50 text-stone-800 font-sans">
            
            {/* 1. HEADER HALAMAN */}
            <PageHeader 
                icon={<AiOutlineHistory />}
                title="Riwayat Transaksi & Pesanan" 
                description="Daftar seluruh rekaman nota penjualan dan pemesanan pelanggan yang berhasil disimpan." 
            />

            {/* 2. BAR FILTER & PENCARIAN */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm">
                <div className="relative w-full sm:w-72">
                    <AiOutlineSearch className="absolute left-3.5 top-3 text-stone-400 text-base" />
                    <input 
                        type="text" 
                        placeholder="Cari ID nota atau pelanggan..." 
                        value={pencarian}
                        onChange={(e) => setPencarian(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-400 shadow-inner"
                    />
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-sm">
                    <AiOutlineCalendar className="text-sm" /> Hari Ini
                </button>
            </div>

            {/* 3. TABEL DATA RIWAYAT */}
            <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/70 border-b border-stone-200/60 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                <th className="py-4 px-6">ID Nota</th>
                                <th className="py-4 px-6">Waktu</th>
                                <th className="py-4 px-6">Pelanggan / Meja</th>
                                <th className="py-4 px-6">Pesanan</th>
                                <th className="py-4 px-6 text-right">Total Bayar</th>
                                <th className="py-4 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-xs font-bold text-stone-700">
                            {riwayatDisaring.map((row) => (
                                <tr key={row.id} className="hover:bg-stone-50/40 transition-colors">
                                    <td className="py-4 px-6 font-black text-stone-900">#{row.id}</td>
                                    <td className="py-4 px-6 text-stone-400 font-medium">{formatJam(row.created_at)} WIB</td>
                                    <td className="py-4 px-6">{row.customer_name}</td>
                                    <td className="py-4 px-6 font-medium text-stone-600">
                                        {/* Memasukkan array child transaction_details hasil query join */}
                                        {susunTeksPesanan(row.transaction_details)}
                                    </td>
                                    <td className="py-4 px-6 text-right font-black text-stone-900">
                                        Rp {Number(row.total_price || 0).toLocaleString("id-ID")}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/40 uppercase tracking-wider">
                                            ● Selesai
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {riwayatDisaring.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center text-stone-400 italic py-8 bg-stone-50/20">
                                        Tidak ada riwayat transaksi yang cocok dengan pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}