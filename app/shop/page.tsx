'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlayer } from '../context/PlayerContext';

export default function ShopPage() {
  const { coins, spendCoins } = usePlayer();
  const [purchased, setPurchased] = useState<number[]>([]);

  const shopItems = [
    { id: 1, name: 'Bureau Minimaliste', price: 50, type: 'Sol' },
    { id: 2, name: 'Plante Verte', price: 30, type: 'Déco' },
    { id: 3, name: 'Poster Retro', price: 40, type: 'Mur' },
    { id: 4, name: 'Skin Cyberpunk', price: 100, type: 'Avatar' },
  ];

  const buyItem = (id: number, price: number) => {
    if (purchased.includes(id)) {
      alert('Tu possèdes déjà cet objet !');
      return;
    }

    const success = spendCoins(price);
    if (success) {
      setPurchased([...purchased, id]);
      alert("Achat réussi ! L'objet a été ajouté à ton inventaire.");
    } else {
      alert('Pas assez de pièces ! Va accomplir des quêtes pour en gagner.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <h1 className="font-bold text-base tracking-tight">Boutique</h1>
            <p className="text-xs text-slate-400">Dépense tes pièces gagnées</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-amber-400 font-bold text-sm tracking-wide shadow-inner">
            {coins} P
          </div>
        </header>

        {/* LISTE DES ARTICLES */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Articles disponibles</h2>
          
          {shopItems.map(item => {
            const isOwned = purchased.includes(item.id);
            return (
              <div 
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-lg"
              >
                <div>
                  <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{item.type}</div>
                  <div className="font-semibold text-sm text-slate-200 mt-0.5">{item.name}</div>
                  <div className="text-amber-400 text-xs font-bold mt-1">{item.price} P</div>
                </div>
                <button
                  onClick={() => buyItem(item.id, item.price)}
                  disabled={isOwned}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md ${
                    isOwned 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 shadow-indigo-600/30'
                  }`}
                >
                  {isOwned ? 'Possédé' : 'Acheter'}
                </button>
              </div>
            );
          })}
        </section>
      </div>

      {/* NAVIGATION DU BAS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Quêtes
        </Link>
        <Link href="/avatar" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Avatar
        </Link>
        <Link href="/room" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-indigo-400 text-xs font-semibold tracking-wide py-1">
          Boutique
        </Link>
      </nav>
    </main>
  );
}
