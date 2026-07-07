import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; 
import { ImSpinner2 } from "react-icons/im"; 
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../../supabaseClient'; // Sesuaikan jalur folder ke supabaseClient kamu

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
    
    if (!dataForm.email || !dataForm.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Mencari data karyawan di tabel 'employees' yang email dan password-nya cocok
      const { data: employees, error: supabaseError } = await supabase
        .from('employees')
        .select('name, role')
        .eq('email', dataForm.email)
        .eq('password', dataForm.password);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Jika data tidak ditemukan atau password/email salah
      if (!employees || employees.length === 0) {
        throw new Error("Email atau Password salah. Cek kembali akun Anda.");
      }

      // Ambil data karyawan pertama yang ditemukan
      const currentEmployee = employees[0];

      // Simpan nama & role ke dalam localStorage
      localStorage.setItem("user_name", currentEmployee.name);
      localStorage.setItem("role", currentEmployee.role); 

      // Mengarahkan ke dashboard utama setelah sukses login
      navigate("/dashboard"); 

    } catch (err) {
      console.error("Login Gagal:", err.message);
      setError(err.message || "Login Gagal. Terjadi kesalahan pada sistem.");
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen w-full bg-stone-100/50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-stone-200/60">
        
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

        {loadingInfo}
        {errorInfo}
        
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-[10px] font-black text-stone-400 mb-2 uppercase tracking-widest">
              Email Pengguna
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
                className={`w-full pl-12 pr-4 py-3.5 bg-stone-50 border ${
                  error && !dataForm.email ? 'border-red-400' : 'border-stone-200/80'
                } rounded-xl focus:ring-2 focus:ring-stone-800 outline-none transition-all text-sm font-medium text-stone-900 placeholder-stone-400`}
                placeholder="masukkan_email@patria.com"
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

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-stone-50 font-black py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs border border-stone-900"
          >
            {loading ? "Memverifikasi..." : "Masuk Sistem"}
          </button>
        </form>

        <div className="mt-10 text-center text-[9px] text-stone-400 font-bold uppercase tracking-widest border-t border-stone-100 pt-4">
          © 2026 Patria System V1.0. All rights reserved.
        </div>
      </div>
    </div>
  );
}