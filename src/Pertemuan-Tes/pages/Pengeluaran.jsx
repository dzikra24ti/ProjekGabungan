import PageHeader from "../components/PageHeader";

const Pengeluaran = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Pengeluaran Kas</h1>
          <p className="text-gray-400 text-sm">Catat belanja bahan baku dan operasional.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-amber-200 transition-all">
          + Catat Pengeluaran
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* List Belanja */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 font-bold">B</div>
              <div>
                <h4 className="font-bold text-gray-800">Beli Minyak Goreng</h4>
                <p className="text-[10px] text-gray-400 uppercase font-bold">2 Jam Lalu</p>
              </div>
            </div>
            <p className="font-black text-red-500">- Rp 150.000</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 font-bold">A</div>
              <div>
                <h4 className="font-bold text-gray-800">Ayam Segar 20kg</h4>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Tadi Pagi</p>
              </div>
            </div>
            <p className="font-black text-red-500">- Rp 640.000</p>
          </div>
        </div>

        {/* Ringkasan Biaya */}
        <div className="bg-amber-500 p-8 rounded-[40px] text-white shadow-xl shadow-amber-100 flex flex-col justify-between">
          <div>
            <p className="opacity-80 text-xs font-bold uppercase tracking-widest mb-2">Total Pengeluaran Hari Ini</p>
            <h2 className="text-4xl font-black">Rp 790.000</h2>
          </div>
          <div className="mt-10 p-4 bg-amber-400/50 rounded-2xl border border-amber-300">
            <p className="text-sm font-medium italic">"Jangan lupa minta struk belanja untuk audit setiap akhir minggu!"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengeluaran;