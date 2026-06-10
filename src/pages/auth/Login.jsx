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
    <div className="bg-stone-50 border border-stone-200 mb-5 p-4 text-sm font-medium text-stone-700 rounded-2xl flex items-center">
      <ImSpinner2 className="me-3 animate-spin text-lg text-stone-600" />
      Sedang memproses verifikasi...
    </div>
  ) : null;

  return (
    /* Wrapper Utama: Menggunakan latar belakang abu-abu terang minimalis khas Patria */
    <div className="min-h-screen w-full bg-stone-100/50 flex items-center justify-center p-4 font-sans">
      
      {/* Container Putih Bertekstur Lembut */}
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-stone-200/60">
        
        {/* Identitas Logo Atas Menyesuaikan dengan Tema Warung Patria */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-900 rounded-xl text-stone-100 text-sm font-black uppercase tracking-wider mb-3">
            🪵 Patria System
          </div>
          <h2 className="text-stone-900 font-black text-xl tracking-tight uppercase">
            WARUNG PATRIA
          </h2>
          <p className="text-stone-400 font-bold mt-1 text-[11px] uppercase tracking-widest">
            Digital Order POS & Management
          </p>
        </div>

        {/* Info Status */}
        {loadingInfo}
        {errorInfo}
        
        {/* Form Input dengan Aksen Warna Stone Global */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Email / Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiOutlineMail size={18} />
              </span>
              <input
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                type="text"
                className={`w-full pl-12 pr-4 py-3.5 bg-stone-50 border ${
                  error && !dataForm.email ? 'border-red-400' : 'border-stone-200/80'
                } rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400`}
                placeholder="Masukkan username anda"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                Password
              </label>
              <Link to="/forgot" className="text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors">
                Lupa Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiFillLock size={18} />
              </span>
              <input
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                type="password"
                className={`w-full pl-12 pr-4 py-3.5 bg-stone-50 border ${
                  error && !dataForm.password ? 'border-red-400' : 'border-stone-200/80'
                } rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400`}
                placeholder="********"
              />
            </div>
          </div>

          {/* Tombol Utama Hitam Pekat Sesuai Tombol Navbar/Sidebar Patria */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-stone-50 font-black py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs border border-stone-900"
          >
            {loading ? "Memverifikasi..." : "Masuk Sistem"}
          </button>
        </form>

        {/* Teks Navigasi Bawah */}
        <p className="mt-8 text-center text-xs text-stone-400 font-medium">
          Belum terdaftar di sistem?{" "}
          <Link to="/register" className="text-stone-900 font-black hover:underline">
            Daftar Disini
          </Link>
        </p>

        {/* Footer Hak Cipta */}
        <div className="mt-10 text-center text-[9px] text-stone-400 font-bold uppercase tracking-widest border-t border-stone-100 pt-4">
          © 2026 Patria System V1.0. All rights reserved.
        </div>
      </div>
    </div>
  );
}