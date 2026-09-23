'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShopPage() {
  const [coins, setCoins] = useState(120);
  const [activeTab, setActiveTab] = useState('avatar');

  // Articles de la boutique
  const [items, setItems] = useState([
    { id: 1, name: 'Casquette Stylee', category: 'avatar', price: 50, type: 'Permanent' },
    { id: 2, name: 'Veste Cyberpunk', category: 'avatar', price: 150, type: 'Permanent' },
    { id: 3, name: 'Plante Verte Bureau', category: 'chambre', price: 80, type: 'Permanent' },
    { id: 4, name: 'Setup Gaming RGB', category: 'chambre', price: 300, type: 'Permanent' },
    { id: 5, name: 'Episode de Serie (1h)', category: 'recompense', price: 100, type: 'Recompense' },
    { id: 6, name: 'Neon Rare Edition Limitee', category: 'drop', price: 200, type: 'Hebdomadaire' },
  ]);

  const buyItem = (price: number) => {
    if (coins >= price) {
      setCoins(prev => prev - price);
      alert('Achat reussi !');
    } else {
      alert('Pas assez de pieces !');
    }
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'avatar') return item.category === 'avatar';
    if (activeTab === 'chambre') return item.category === 'chambre' || item.category === 'drop';
    if (activeTab === 'recompense') return item.category === 'recompense';
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      <div>
        {/* HEADER : Titre et Solde */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Boutique</h1>
            <p className="text-xs text-slate-400">Depense tes pieces gagnees</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>{coins} P</span>
          </div>
        </header>

        {/* ONGLETS DE LA BOUTIQUE */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          <button 
            onClick={() => setActiveTab('avatar')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'avatar' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Avatar
          </button>
          <button 
            onClick={() => setActiveTab('chambre')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'chambre' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Chambre & Drop
          </button>
          <button 
            onClick={() => setActiveTab('recompense')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'recompense' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Recompenses
          </button>
        </div>

        {/* GRILLE DES ARTICLES */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">{item.type}</span>
                <div className="font-medium text-sm text-slate-200 mt-1 mb-3">{item.name}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-amber-400">{item.price} P</span>
                <button 
                  onClick={() => buyItem(item.price)}
                  className="bg-slate-800 hover:bg-indigo-600 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION DU BAS (App Shell) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-3 max-w-md mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-indigo-400 text-xs font-medium">
          Boutique
        </Link>
      </nav>

    </main>
  );
}
