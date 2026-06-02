import PageHeader from "../components/PageHeader";

const Riwayat = () => {
  const dataRiwayat = [
    { id: "#TRX001", jam: "10:20", menu: "2x Paha Atas, 1x Nasi", total: "Rp 29.000", status: "Tunai" },
    { id: "#TRX002", jam: "11:05", menu: "1x Paket Puas", total: "Rp 18.000", status: "QRIS" },
    { id: "#TRX003", jam: "11:45", menu: "3x Sayap Sayang", total: "Rp 45.000", status: "Tunai" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">Riwayat Transaksi</h1>
        <p className="text-gray-400 text-sm">Daftar penjualan terbaru hari ini.</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-yellow-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F59E0B] ">
              <th className="p-6 text-xs font-bold uppercase text-white tracking-widest">ID</th>
              <th className="p-6 text-xs font-bold uppercase text-white tracking-widest">Waktu</th>
              <th className="p-6 text-xs font-bold uppercase text-white tracking-widest">Pesanan</th>
              <th className="p-6 text-xs font-bold uppercase text-white tracking-widest">Total</th>
              <th className="p-6 text-xs font-bold uppercase text-white tracking-widest">Metode</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {dataRiwayat.map((item, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-6 font-bold text-gray-800">{item.id}</td>
                <td className="p-6 text-sm">{item.jam}</td>
                <td className="p-6 text-sm font-medium">{item.menu}</td>
                <td className="p-6 font-black text-gray-800">{item.total}</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Riwayat;