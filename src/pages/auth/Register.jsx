import React, { useState } from "react";
import { AiFillLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "kasir", // Default pilihan role baru
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
    setError("");
    setSuccess("");

    // Validasi Sederhana Frontend
    if (!dataForm.name || !dataForm.email || !dataForm.password) {
      setError("Semua kolom input wajib diisi");
      return;
    }

    if (dataForm.password !== dataForm.password_confirmation) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);

    try {
      // Mengirim langsung ke tabel 'employees' di Supabase
      const { data, error: supabaseError } = await supabase
        .from('employees') 
        .insert([
          { 
            name: dataForm.name, 
            email: dataForm.email, 
            role: dataForm.role,
            password: dataForm.password // Memasukkan password ke database
          },
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setSuccess("Akun karyawan berhasil didaftarkan ke Supabase!");
      
      // Reset form setelah sukses mendaftar
      setDataForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "kasir",
      });

    } catch (err) {
      console.error("Gagal mendaftar:", err.message);
      setError(err.message || "Gagal mendaftarkan akun. Periksa kembali data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-100/50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-stone-200/60">
        
        {/* Identitas Logo Atas Sesuai Tema Warung Patria */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-900 rounded-xl text-stone-100 text-sm font-black uppercase tracking-wider mb-3">
            🪵 Patria System
          </div>
          <h2 className="text-stone-900 font-black text-xl tracking-tight uppercase">
            Registrasi Karyawan
          </h2>
          <p className="text-stone-400 font-bold mt-1 text-[11px] uppercase tracking-widest">
            Tambah Hak Akses Pengguna Baru
          </p>
        </div>

        {/* Info Loading / Error / Success */}
        {loading && (
          <div className="bg-stone-50 border border-stone-200 mb-5 p-4 text-sm font-medium text-stone-700 rounded-2xl flex items-center">
            <ImSpinner2 className="me-3 animate-spin text-lg text-stone-600" />
            Sedang mendaftarkan data...
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 mb-5 p-4 text-sm font-bold text-red-600 rounded-2xl flex items-center shadow-sm">
            <div className="bg-red-600 text-white p-1 rounded-lg me-3">
              <BsFillExclamationDiamondFill size={16} />
            </div>
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 mb-5 p-4 text-sm font-bold text-emerald-700 rounded-2xl flex items-center shadow-sm">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg me-3 text-xs">✓</div>
            {success}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* INPUT NAMA */}
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Nama Lengkap Karyawan
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiOutlineUser size={18} />
              </span>
              <input
                name="name"
                value={dataForm.name}
                onChange={handleChange}
                type="text"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400"
                placeholder="Nama Karyawan"
              />
            </div>
          </div>

          {/* INPUT EMAIL */}
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Email Karyawan
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiOutlineMail size={18} />
              </span>
              <input
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                type="email"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400"
                placeholder="karyawan@patria.com"
              />
            </div>
          </div>

          {/* PILIHAN HAK AKSES (ROLE DROPDOWN) */}
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Hak Akses Kedai (Role)
            </label>
            <select
              name="role"
              value={dataForm.role}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-bold text-stone-800 cursor-pointer"
            >
              <option value="kasir">KASIR / POS OPERATOR</option>
              <option value="dapur">STAFF DAPUR / KITCHEN</option>
              <option value="owner">OWNER / KEPALA WARUNG</option>
            </select>
          </div>

          {/* INPUT PASSWORD */}
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Password Sementara
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiFillLock size={18} />
              </span>
              <input
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                type="password"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400"
                placeholder="********"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Konfirmasi Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                <AiFillLock size={18} />
              </span>
              <input
                name="password_confirmation"
                value={dataForm.password_confirmation}
                onChange={handleChange}
                type="password"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400"
                placeholder="********"
              />
            </div>
          </div>

          {/* TOMBOL UTAMA HITAM STONE */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-stone-50 font-black py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs border border-stone-900 mt-2"
          >
            {loading ? "Menyimpan Karyawan..." : "Daftarkan Karyawan"}
          </button>

          {/* 🌟 TOMBOL KEMBALI KE DASHBOARD */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-stone-50 font-black py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs border border-stone-900 mt-2"
          >
            Kembali ke Dashboard
          </button>
        </form>

        <div className="mt-8 text-center text-[9px] text-stone-400 font-bold uppercase tracking-widest border-t border-stone-100 pt-4">
          © 2026 Patria System V1.0. Manajemen Internal Kedai.
        </div>
      </div>
    </div>
  );
}