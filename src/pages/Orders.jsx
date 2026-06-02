import PageHeader from "../components/PageHeader";

export default function Orders() {
  const orders = [
    {
      order_id: "ORD001",
      customer_name: "Andi Pratama",
      status: "Completed",
      total_price: 150000,
      order_date: "2024-03-01",
    },
    {
      order_id: "ORD002",
      customer_name: "Budi Santoso",
      status: "Pending",
      total_price: 75000,
      order_date: "2024-03-02",
    },
    {
      order_id: "ORD003",
      customer_name: "Citra Lestari",
      status: "Cancelled",
      total_price: 200000,
      order_date: "2024-03-02",
    },
    {
      order_id: "ORD004",
      customer_name: "Dedi Wijaya",
      status: "Completed",
      total_price: 320000,
      order_date: "2024-03-03",
    },
    {
      order_id: "ORD005",
      customer_name: "Eka Putri",
      status: "Completed",
      total_price: 125000,
      order_date: "2024-03-04",
    },
    {
      order_id: "ORD006",
      customer_name: "Fajar Sidik",
      status: "Pending",
      total_price: 50000,
      order_date: "2024-03-05",
    },
    {
      order_id: "ORD007",
      customer_name: "Gita Permata",
      status: "Completed",
      total_price: 450000,
      order_date: "2024-03-05",
    },
    {
      order_id: "ORD008",
      customer_name: "Hadi Suwarno",
      status: "Cancelled",
      total_price: 90000,
      order_date: "2024-03-06",
    },
    {
      order_id: "ORD009",
      customer_name: "Indah Sari",
      status: "Completed",
      total_price: 110000,
      order_date: "2024-03-07",
    },
    {
      order_id: "ORD010",
      customer_name: "Joko Susilo",
      status: "Pending",
      total_price: 275000,
      order_date: "2024-03-08",
    },
    {
      order_id: "ORD011",
      customer_name: "Kartika Dewi",
      status: "Completed",
      total_price: 135000,
      order_date: "2024-03-08",
    },
    {
      order_id: "ORD012",
      customer_name: "Lutfi Hakim",
      status: "Completed",
      total_price: 85000,
      order_date: "2024-03-09",
    },
    {
      order_id: "ORD013",
      customer_name: "Maya Sofia",
      status: "Cancelled",
      total_price: 500000,
      order_date: "2024-03-10",
    },
    {
      order_id: "ORD014",
      customer_name: "Nugroho",
      status: "Pending",
      total_price: 60000,
      order_date: "2024-03-11",
    },
    {
      order_id: "ORD015",
      customer_name: "Olivia",
      status: "Completed",
      total_price: 190000,
      order_date: "2024-03-11",
    },
  ];
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Daftar Pesanan (Orders)
        </h1>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Total: {orders.length} Data
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Order ID</th>
              <th className="px-6 py-4 font-medium text-gray-900">Customer</th>
              <th className="px-6 py-4 font-medium text-gray-900">Status</th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Total Price
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-indigo-600">
                  {order.order_id}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {order.customer_name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold 
                    ${
                      order.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : order.status === "Pending"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  Rp {order.total_price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">{order.order_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
