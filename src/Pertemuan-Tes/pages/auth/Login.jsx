import React, { useState } from "react";
import axios from "axios";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; 
import { ImSpinner2 } from "react-icons/im"; 
import { Link, useNavigate } from "react-router-dom";

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
    
    // Validasi manual agar box merah muncul jika input kosong
    if (!dataForm.email || !dataForm.password) {
      setError("Username and password required");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email, 
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // Mengarahkan ke dashboard utama
          navigate("/dashboard"); 
        }
      })
      .catch((err) => {
        // Menampilkan error jika kredensial salah
        setError(err.response?.data?.message || "Login Gagal. Cek data Anda.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const errorInfo = error ? (
    <div className="bg-red-50 border border-red-200 mb-5 p-4 text-sm font-bold text-red-600 rounded-2xl flex items-center shadow-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-red-600 text-white p-1 rounded-lg me-3">
        <BsFillExclamationDiamondFill size={16} />
      </div>
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-yellow-50 border border-yellow-200 mb-5 p-4 text-sm font-medium text-yellow-700 rounded-2xl flex items-center">
      <ImSpinner2 className="me-3 animate-spin text-lg text-yellow-600" />
      Sedang memproses...
    </div>
  ) : null;

  return (
    /* Wrapper Utama: Menjaga posisi di tengah layar dan mencegah tampilan melebar */
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      
      {/* Container Putih: Membatasi lebar form agar tetap rapi */}
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-[#F59E0B] font-black text-3xl tracking-tighter italic">
            JAGO AYAM.
          </h2>
          <p className="text-gray-500 font-bold mt-1 text-sm">Welcome Back 👋</p>
        </div>

        {/* Info Status */}
        {loadingInfo}
        {errorInfo}
        
        {/* noValidate agar pesan error custom muncul tanpa gangguan balon browser */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">
              Email / Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <AiOutlineMail size={20} />
              </span>
              <input
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                type="text"
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${error && !dataForm.email ? 'border-red-400' : 'border-yellow-100'} rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm font-medium`}
                placeholder="kminchelle"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot" className="text-xs font-bold text-yellow-600 hover:underline">
                Lupa Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <AiFillLock size={20} />
              </span>
              <input
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                type="password"
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${error && !dataForm.password ? 'border-red-400' : 'border-yellow-100'} rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm font-medium`}
                placeholder="********"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#F59E0B] hover:bg-yellow-600 disabled:bg-gray-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-yellow-200 active:scale-95 uppercase tracking-widest text-sm"
          >
            {loading ? "Sabar ya..." : "Masuk Sekarang"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Belum punya akun?{" "}
          <Link to="/register" className="text-yellow-600 font-black hover:underline">
            Daftar Disini
          </Link>
        </p>

        <div className="mt-10 text-center text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          © 2025 Jago Ayam Dashboard. All rights reserved.
        </div>
      </div>
    </div>
  );
}