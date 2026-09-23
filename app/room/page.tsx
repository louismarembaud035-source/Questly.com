'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RoomPage() {
  const [coins, setCoins] = useState(120);

  const [placedItems] = useState([
    { id: 1, name: 'Bureau Minimaliste', slot: 'Sol' },
    { id: 2, name: 'Plante Verte', slot: 'Coin' },
    { id: 3, name: 'Poster Retro', slot: 'Mur' },
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <h1 className="font-bold text-base tracking-tight">Ma Chambre</h1>
            <p className="text-xs text-slate-400">Ton espace personnel en 3D</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-amber-400 font-bold text-sm tracking-wide shadow-inner">
            {coins} P
          </div>
        </header>

        {/* SECTION VISUEL 3D */}
        <section className="bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 mb-6 shadow-2xl flex flex-col items-center">
          <div className="w-full text-center mb-4">
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Scène Isométrique 3D</span>
          </div>

          {/* Conteneur 3D avec perspective */}
          <div className="w-full h-64 bg-slate-950/90 rounded-2xl border border-slate-800/80 relative overflow-hidden flex items-center justify-center perspective-[1000px] shadow-inner">
            
            {/* Espace de la pièce en relief (Rotation 3D) */}
            <div className="w-48 h-48 relative transform-gpu rotate-x-[20deg] rotate-y-[-25deg] transition-transform duration-500 preserve-3d border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 rounded-2xl shadow-2xl flex items-center justify-center">
              
              {/* Effet quadrillage sol */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-25 rounded-2xl pointer-events-none"></div>

              {/* Avatar au centre de la pièce */}
              <div className="z-20 flex flex-col items-center">
                <div className="w-14 h-14 bg-indigo-600 border border-indigo-400 rounded-full shadow-lg shadow-indigo-600/50 flex items-center justify-center text-white font-bold text-xs">
                  3D
                </div>
                <span className="text-[10px] bg-slate-900/90 border border-slate-700 px-2.5 py-0.5 rounded-md text-slate-300 mt-1 font-semibold tracking-wide">Avatar</span>
              </div>

              {/* Éléments positionnés dans la pièce 3D */}
              <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700/80 px-2 py-1 rounded-lg text-[9px] text-indigo-300 font-bold shadow-md">
                Poster Mur
              </div>
              <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700/80 px-2 py-1 rounded-lg text-[9px] text-blue-300 font-bold shadow-md">
                Bureau Sol
              </div>
              <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700/80 px-2 py-1 rounded-lg text-[9px] text-emerald-300 font-bold shadow-md">
                Plante Coin
              </div>
            </div>
          </div>

          {/* Liste des meubles installés */}
          <div className="w-full mt-4 grid grid-cols-3 gap-2">
            {placedItems.map(item => (
              <div key={item.id} className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center shadow-md">
                <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{item.slot}</div>
                <div className="text-xs text-slate-200 truncate mt-0.5 font-medium">{item.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BOUTON PARTAGER */}
        <section className="mb-6">
          <button 
            onClick={() => alert('Lien de partage copie ! Montre ta chambre a tes amis.')}
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] border border-slate-800 text-slate-200 font-semibold py-3 rounded-2xl text-xs transition-all shadow-lg"
          >
            Partager ma chambre
          </button>
        </section>
      </div>

      {/* NAVIGATION DU BAS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-indigo-400 text-xs font-semibold tracking-wide py-1">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide transition-colors py-1">
          Boutique
        </Link>
      </nav>
    </main>
  );
}
