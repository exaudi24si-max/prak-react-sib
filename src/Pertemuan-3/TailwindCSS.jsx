// export default function TailwindCSS() {
//     return(
//         <div>
//             <FlexboxGrid/>
//             <h1 class="border m-4"> Belajar Tilwind CSS 4 </h1>
//             <button className="bg-blue-500 text-white
//                                px-4 py-2 mx-4 rounded-b-full
//                                shadow-lg">Click Me</button>
//             <Spacing title="judul card" content="ini Merupakan contoh penggunaan spacing"/>
//             <Typography/>
//             <BorderRadius/>
//             <BackgroundColors/>
//             <ShadowEffects/>
//         </div>
//     )
// }

// function Spacing(props){
//     return (
//         <div className="bg-gray-500 shadow-lg p-6 m-4 rounded-lg">
//             <h2 className="text-lg font-extrabold">{props.title}</h2>
//             <p className="mt-2 text-white">{props.content}</p>
//         </div>
//     )
// }

// function Typography(){
//     return (
//         <div className="ml-4">
//             <h1 className="text-3xl font-bold text-blue-900 underline">Tailwind Typography</h1>
//             <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
//         </div>
//     )
// }

// function BorderRadius(){
//     return (
//         <div>
//         <button className="ml-4 border-4 border-blue-500 text-blue-500 px-4 py-2 rounded-l-full"> Klik Saya </button>
//         <button className="ml-4 border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-r-full"> Klik Saya </button>
//         </div>
//     )
// }

// function BackgroundColors(){
//     return(
//         <div className="m-4 bg-green-600 text-white p-6 rounded-lg hover:shadow-lg">
//             <h3 className="text-xl font-bold">Tailwind Colors</h3>
//             <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
//         </div>
//     )
// }

// function FlexboxGrid(){
//     return (
//         <nav className="flex justify-between bg-gray-800 p-4 text-white">
//             <h1 className="text-lg font-bold">MyWebsite</h1>
//             <ul className="flex space-x-4">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">About</a></li>
//                 <li><a href="#">Contact</a></li>
//             </ul>
//              <h1 className="text-lg font-bold">Login</h1>
//         </nav>
//     )
// }

// function ShadowEffects(){
//     return (
//         <div className="m-4 bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
//             <h3 className="text-xl font-semibold">Hover me!</h3>
//             <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
//         </div>
//     )
// }


import React from 'react';

export default function TailwindPremium() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* 1. Floating Navbar dengan Glass Effect */}
      <nav className="fixed top-4 inset-x-0 z-50 max-w-5xl mx-auto px-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg px-6 py-3 rounded-2xl flex justify-between items-center">
          <div className="text-xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            MODERN.LAB
          </div>
          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <li className="hover:text-indigo-600 cursor-pointer transition">Dashboard</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Projects</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Settings</li>
          </ul>
          <button className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6">
        {/* 2. Hero Section dengan Gradient Text */}
        <header className="mb-16">
          <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
            Tailwind CSS v3.4+
          </span>
          <h1 className="mt-6 text-6xl font-black tracking-tight leading-[1.1]">
            Bangun UI Lebih <br />
            <span className="text-indigo-600">Elegan & Cepat.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            Eksplorasi utilitas baru untuk membuat antarmuka yang tidak hanya fungsional, tetapi juga memanjakan mata.
          </p>
        </header>

        {/* 3. Grid Section dengan Custom Card */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureCard 
            title="Sistem Grid" 
            desc="Kelola tata letak kompleks hanya dengan satu baris class."
            icon="⚡"
            color="indigo"
          />
          <FeatureCard 
            title="Interaksi Mikro" 
            desc="Tambahkan animasi hover dan transisi halus pada setiap elemen."
            icon="✨"
            color="emerald"
          />
        </section>

        {/* 4. Glass Playground */}
        <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl">
          {/* Efek Cahaya di Background */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Siap untuk mencoba?</h2>
              <p className="text-slate-400 max-w-md">Uji coba semua komponen ini langsung di editor favorit Anda dan rasakan kemudahannya.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95">
                Download Script
              </button>
              <button className="bg-slate-800 border border-slate-700 px-8 py-3 rounded-2xl font-bold hover:bg-slate-700 transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FeatureCard({ title, desc, icon, color }) {
  const themes = {
    indigo: "from-indigo-50 to-white border-indigo-100 text-indigo-600",
    emerald: "from-emerald-50 to-white border-emerald-100 text-emerald-600"
  };

  return (
    <div className={`group p-8 rounded-[2rem] border bg-gradient-to-b ${themes[color]} shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500`}>
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:rotate-12 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center gap-2 font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <span>→</span>
      </div>
    </div>
  );
}