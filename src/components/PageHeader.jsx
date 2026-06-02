export default function PageHeader({ icon, title, description }) {
    return (
        <div className="mb-6 border-b border-stone-200/60 pb-5">
            <div className="flex items-center gap-3">
                {/* Garis Aksen Vertikal Cokelat Khas */}
                <div className="w-1.5 h-6 bg-stone-700 rounded-full shrink-0"></div>
                
                {/* Tampilkan Ikon jika ada */}
                {icon && (
                    <span className="text-xl text-stone-600 mt-0.5 flex items-center">
                        {icon}
                    </span>
                )}

                {/* Judul Halaman */}
                <h2 className="text-lg font-black tracking-tight text-stone-800 uppercase">
                    {title}
                </h2>
            </div>
            
            {/* Tampilkan deskripsi jika properti dilewatkan */}
            {description && (
                <p className="text-xs font-medium text-stone-400 mt-1.5 pl-4.5 max-w-2xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}