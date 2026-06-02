export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      {/* Container Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Efek Ring Luar */}
        <div className="absolute animate-pulse h-28 w-28 rounded-full bg-orange-100 opacity-60"></div>
        
        {/* KUSTOM SPINNER */}
        <div className="relative">
          <div className="w-16 h-16 animate-spin">
            <svg viewBox="0 0 100 100" className="fill-orange-500">
              <path 
                d="M50,15 A35,35 0 0,1 85,50 A35,35 0 0,1 50,85 A35,35 0 0,1 15,50 A35,35 0 0,1 50,15" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                opacity="0.1"
              />
              <path d="M70,55 C70,65 60,75 50,75 C40,75 30,65 30,55 C30,45 35,35 45,30 C50,28 55,25 60,30 C65,35 70,45 70,55 Z" />
              <circle cx="50" cy="85" r="5" className="fill-orange-500" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bagian Teks */}
      <div className="mt-10 text-center px-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Menyiapkan <span className="text-orange-500">Meja</span> Kasir...
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Pesananmu sedang diproses, mohon tunggu sebentar.
        </p>
        
        {/* Progress Bar Bawah - Menggunakan Animate Pulse agar tidak perlu CSS tambahan */}
        <div className="mt-6 w-56 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-green-500 animate-pulse w-full"></div>
        </div>
      </div>

      {/* Progress Bar Atas - Menggunakan animasi slide murni CSS Inline */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/10 overflow-hidden">
        <div 
          className="h-full bg-orange-500 w-1/3"
          style={{
            animation: 'loading-slide 2s infinite linear'
          }}
        ></div>
      </div>

      {/* Keyframe murni dalam tag style standar (tanpa atribut jsx) */}
      <style>
        {`
          @keyframes loading-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}
      </style>
    </div>
  );
}