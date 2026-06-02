import PageHeader from "../components/PageHeader";

export default function Customers() {
  const customers = [
      {
        customer_id: "C001",
        customer_name: "Andi Pratama",
        email: "andi@example.com",
        phone: "081234567890",
        loyalty: "Gold",
      },
      {
        customer_id: "C002",
        customer_name: "Budi Santoso",
        email: "budi@example.com",
        phone: "081234567891",
        loyalty: "Silver",
      },
      {
        customer_id: "C003",
        customer_name: "Citra Lestari",
        email: "citra@example.com",
        phone: "081234567892",
        loyalty: "Bronze",
      },
      {
        customer_id: "C004",
        customer_name: "Dedi Wijaya",
        email: "dedi@example.com",
        phone: "081234567893",
        loyalty: "Gold",
      },
      {
        customer_id: "C005",
        customer_name: "Eka Putri",
        email: "eka@example.com",
        phone: "081234567894",
        loyalty: "Silver",
      },
      {
        customer_id: "C006",
        customer_name: "Fajar Sidik",
        email: "fajar@example.com",
        phone: "081234567895",
        loyalty: "Bronze",
      },
      {
        customer_id: "C007",
        customer_name: "Gita Permata",
        email: "gita@example.com",
        phone: "081234567896",
        loyalty: "Gold",
      },
      {
        customer_id: "C008",
        customer_name: "Hadi Suwarno",
        email: "hadi@example.com",
        phone: "081234567897",
        loyalty: "Silver",
      },
      {
        customer_id: "C009",
        customer_name: "Indah Sari",
        email: "indah@example.com",
        phone: "081234567898",
        loyalty: "Bronze",
      },
      {
        customer_id: "C010",
        customer_name: "Joko Susilo",
        email: "joko@example.com",
        phone: "081234567899",
        loyalty: "Gold",
      },
      {
        customer_id: "C011",
        customer_name: "Kartika Dewi",
        email: "kartika@example.com",
        phone: "081234567810",
        loyalty: "Silver",
      },
      {
        customer_id: "C012",
        customer_name: "Lutfi Hakim",
        email: "lutfi@example.com",
        phone: "081234567811",
        loyalty: "Bronze",
      },
      {
        customer_id: "C013",
        customer_name: "Maya Sofia",
        email: "maya@example.com",
        phone: "081234567812",
        loyalty: "Gold",
      },
      {
        customer_id: "C014",
        customer_name: "Nugroho",
        email: "nugroho@example.com",
        phone: "081234567813",
        loyalty: "Silver",
      },
      {
        customer_id: "C015",
        customer_name: "Olivia",
        email: "olivia@example.com",
        phone: "081234567814",
        loyalty: "Bronze",
      }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Daftar Pelanggan (Customers)
        </h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {customers.length} Orang
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">ID</th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Nama Lengkap
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Email</th>
              <th className="px-6 py-4 font-medium text-gray-900">
                No. Telepon
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Loyalty Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {customers.map((customer) => (
              <tr
                key={customer.customer_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-indigo-600">
                  {customer.customer_id}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {customer.customer_name}
                </td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold
                    ${
                      customer.loyalty === "Gold"
                        ? "bg-yellow-100 text-yellow-700"
                        : customer.loyalty === "Silver"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {customer.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
