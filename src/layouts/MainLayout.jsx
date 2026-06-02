import "../assets/tailwind.css"; 
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { Outlet } from "react-router-dom"; // Pastikan baris ini ADA

function MainLayout() {
return (
        <div className="flex h-screen w-screen bg-stone-50 font-sans text-stone-800 overflow-hidden">
            
            {/* SISI KIRI FIXED: Panel Menu */}
            <Sidebar />

            {/* SISI KANAN SCROLLABLE: Seluruh Layout Konten */}
            <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
                
                {/* 1. Bar Putih Atas Aplikasi */}
                <Header />
                
                {/* 2. Area Konten Utama */}
                <main className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto space-y-6">
                    
                    {/* Judul Statis Aplikasi */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-5 gap-4">
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-stone-900 uppercase">Warung Bandrek Teh Telor Patria</h1>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-0.5">Digital Order POS & Management System</p>
                        </div>
                    </div>

                    {/* 3. SLOT RENDER HALAMAN FITUR DINAMIS (Dashboard, Kasir, Riwayat, dll) */}
                    <div className="animate-in fade-in duration-200">
                        <Outlet />
                    </div>

                </main>
            </div>

        </div>
    );
}

export default MainLayout;