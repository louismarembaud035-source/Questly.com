'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AvatarPage() {
  const [shirtColor, setShirtColor] = useState('#6366f1');
  const [hairColor, setHairColor] = useState('#1e293b');
  const [style, setStyle] = useState('Moderne');

  // Charger les préférences sauvegardées au démarrage
  useEffect(() => {
    const savedShirt = localStorage.getItem('questly_shirtColor');
    const savedHair = localStorage.getItem('questly_hairColor');
    const savedStyle = localStorage.getItem('questly_style');

    if (savedShirt) setShirtColor(savedShirt);
    if (savedHair) setHairColor(savedHair);
    if (savedStyle) setStyle(savedStyle);
  }, []);

  // Sauvegarder et appliquer les modifications
  const saveAvatar = () => {
    localStorage.setItem('questly_shirtColor', shirtColor);
    localStorage.setItem('questly_hairColor', hairColor);
    localStorage.setItem('questly_style', style);
    alert('Avatar sauvegarde ! Il est desormais mis a jour dans ta chambre.');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <h1 className="font-bold text-base tracking-tight">Studio Avatar</h1>
            <p className="text-xs text-slate-400">Personnalise ton apparence</p>
          </div>
          <Link href="/room" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
            Voir la chambre
          </Link>
        </header>

        {/* APERCU DE L'AVATAR */}
        <section className="bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800/80 mb-6 shadow-2xl flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative shadow-inner mb-4">
            {/* Représentation visuelle de l'avatar en 2D stylisée */}
            <div className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-full border-2 border-slate-700 shadow-md"
                style={{ backgroundColor: hairColor }}
              ></div>
              <div 
                className="w-16 h-14 rounded-xl mt-1 shadow-md border border-slate-700"
                style={{ backgroundColor: shirtColor }}
              ></div>
            </div>
          </div>
          <span className="text-xs font-semibold text-indigo-400">Style : {style}</span>
        </section>

        {/* OPTIONS DE PERSONNALISATION */}
        <section className="bg-slate-900/60 backdrop-blur-md p-5 rounded-3xl border border-slate-800/80 space-y-4 shadow-xl mb-6">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Configuration</h2>

          {/* Couleur du T-shirt */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Couleur du vetement</label>
            <div className="flex gap-3">
              {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                <button
                  key={color}
                  onClick={() => setShirtColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    shirtColor === color ? 'scale-110 border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          {/* Couleur des cheveux */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Couleur des cheveux</label>
            <div className="flex gap-3">
              {['#1e293b', '#b45309', '#eab308', '#94a3b8'].map(color => (
                <button
                  key={color}
                  onClick={() => setHairColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    hairColor === color ? 'scale-110 border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          {/* Style vestimentaire */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Style</label>
            <div className="grid grid-cols-2 gap-2">
              {['Moderne', 'Cyberpunk', 'Casual', 'Aventurier'].map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    style === s 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BOUTON SAUVEGARDER */}
        <button 
          onClick={saveAvatar}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-600/30 mb-6"
        >
          Enregistrer l'avatar
        </button>
      </div>

      {/* NAVIGATION DU BAS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide transition-colors py-1">
          Boutique
        </Link>
      </nav>
    </main>
  );
}
