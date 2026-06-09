import { MdNoFood } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PageHeader from "../components/PageHeader"
import { Link } from "react-router-dom";
// import products from "../assets/product.json"

export default function Products() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [query, setQuery] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
        axios
            .get(`https://dummyjson.com/products/search?q=${query}`) // menerapkan search dan query param
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message)
                    return
                }
                setProducts(response.data.products)
            })
            .catch((err) => {
                setError(err.message || "An unknown error occurred")
        });
    }, 500);

    return () => clearTimeout(timeout); 
    }, [query])

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null
    return (
        <div>
            {/* Menggunakan format prop breadcrumb bawaan Anda */}
            <PageHeader
                icon={<MdNoFood />}
                title="Products"
                description="Menu Anti Lapar"
            />

            {errorInfo}

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg"
            />

            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        {/* Header disesuaikan dengan warna Hitam/Gelap pekat sesuai tema */}
                        <tr className="bg-neutral-900 text-white text-left text-sm font-semibold tracking-wide">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Info</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                        {products.map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-neutral-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-500">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                                        {item.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 font-semibold text-neutral-900">Rp {item.price}</td>
                                <td className="px-6 py-4 text-gray-500">{item.brand}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}