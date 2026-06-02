// Tambahkan titik dua (..) untuk "keluar" dari folder pages dulu baru masuk ke components
import PageHeader from "../components/PageHeader";

const Laporan = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">Laporan Penjualan</h1>
        <p className="text-gray-400 text-sm">Pantau performa tokomu di sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Statistik */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-yellow-50">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Pesanan</p>
          <h3 className="text-2xl font-black text-gray-800">1.284</h3>
          <span className="text-green-500 text-xs font-bold">+12% dari bulan lalu</span>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-yellow-50">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Menu Terlaris</p>
          <h3 className="text-2xl font-black text-gray-800">Paha Atas</h3>
          <span className="text-amber-500 text-xs font-bold">Terjual 450+ porsi</span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-yellow-50">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Kepuasan</p>
          <h3 className="text-2xl font-black text-gray-800">4.8/5.0</h3>
          <span className="text-blue-500 text-xs font-bold">Dari 200 ulasan</span>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-[40px] shadow-sm border border-yellow-50 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-300 italic font-medium">Grafik penjualan akan tampil di sini...</p>
      </div>
    </div>
  );
};

export default Laporan;