import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan sudah install: npm install axios
import Loading from "../../components/Loading";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // Pastikan sudah install: npm install react-icons
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error setiap submit

        axios
            .post("https://dummyjson.com/user/login", {
                // DummyJSON menggunakan field 'username', pastikan input email diisi username yang valid
                username: dataForm.email, 
                password: dataForm.password,
            })
            .then((response) => {
                // Redirect ke dashboard jika login sukses (status 200)
                navigate("/dashboard");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "Login Gagal!");
                } else {
                    setError(err.message || "Terjadi kesalahan koneksi");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Tampilkan loading screen jika sedang memproses (Opsional, pilih salah satu dengan loadingInfo)
    // Jika ingin loading screen full:
    // if (loading) return <Loading />;

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Welcome Back 👋
            </h2>

            {/* Menampilkan Pesan Error */}
            {error && (
                <div className="bg-red-200 mb-5 p-4 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {/* Menampilkan Status Loading Kecil */}
            {loading && (
                <div className="bg-gray-200 mb-5 p-4 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Mohon Tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username / Email
                    </label>
                    <input
                        type="text"
                        name="email" // Harus sama dengan key di dataForm
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="emilys"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password" // Harus sama dengan key di dataForm
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="emilyspass"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}