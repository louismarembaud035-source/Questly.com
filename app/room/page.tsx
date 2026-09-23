'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RoomPage() {
  const [coins, setCoins] = useState(120);

  // Meubles installés dans la chambre
  const [placedItems, setPlacedItems] = useState([
    { id: 1, name: 'Bureau Minimaliste', slot: 'Sol' },
    { id: 2, name: 'Plante Verte', slot: 'Coin' },
    { id: 3, name: 'Poster Retro', slot: 'Mur' },
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      <div>
        {/* HEADER : Titre et Solde */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Ma Chambre</h1>
            <p className="text-xs text-slate-400">Ton espace personnel</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>{coins} P</span>
          </div>
        </header>

        {/* VISUEL DE LA CHAMBRE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-72 flex flex-col items-center justify-center relative mb-6 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-slate-900/50 pointer-events-none"></div>
          
          {/* Représentation stylée de l'avatar et de la pièce */}
          <div className="z-10 text-center mb-6">
            <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/40 rounded-full mx-auto flex items-center justify-center text-indigo-400 font-bold mb-2 shadow-lg">
              Avatar
            </div>
            <div className="text-xs text-slate-400">Niveau 4 - Explorateur</div>
          </div>

          {/* Liste des éléments posés dans la pièce */}
          <div className="z-10 grid grid-cols-3 gap-2 w-full">
            {placedItems.map(item => (
              <div key={item.id} className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl text-center">
                <div className="text-[10px] text-indigo-400 font-semibold">{item.slot}</div>
                <div className="text-xs text-slate-200 truncate mt-0.5">{item.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BOUTON DE PARTAGE / FLEX */}
        <section className="mb-6">
          <button 
            onClick={() => alert('Lien de partage copie ! Montre ta chambre a tes amis.')}
            className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium py-3 rounded-2xl text-xs transition-colors shadow-sm"
          >
            Partager ma chambre
          </button>
        </section>
      </div>

      {/* NAVIGATION DU BAS (App Shell) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-3 max-w-md mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-indigo-400 text-xs font-medium">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Boutique
        </Link>
      </nav>

    </main>
  );
}
