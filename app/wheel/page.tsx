'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function WheelPage() {
  const [spun, setSpun] = useState(false);
  const [wonCoins, setWonCoins] = useState(0);

  const spinWheel = () => {
    if (!spun) {
      const rewards = [20, 50, 100, 15, 30, 200];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setWonCoins(randomReward);
      setSpun(true);
      alert(`Roue tournee ! Tu as gagne ${randomReward} pieces.`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      <div>
        {/* HEADER : Titre */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Roue de la Fortune</h1>
            <p className="text-xs text-slate-400">Tente ta chance chaque jour</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>Bonus Quotidien</span>
          </div>
        </header>

        {/* MINI-JEU DE LA ROUE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative mb-6 shadow-inner text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            {spun ? 'Tentative effectuee' : 'Pret a tourner ?'}
          </div>

          <div className="my-8">
            <div className={`w-32 h-32 mx-auto rounded-full border flex items-center justify-center font-bold text-lg shadow-lg transition-all ${
              spun 
                ? 'bg-slate-800 border-slate-700 text-slate-400' 
                : 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400'
            }`}>
              {spun ? `${wonCoins} P` : 'ROUE'}
            </div>
          </div>

          {spun ? (
            <div className="text-xs text-emerald-400 font-medium mb-6">
              Bravo ! Tu as remporte {wonCoins} pieces ajoutees a ton solde.
            </div>
          ) : (
            <div className="text-xs text-slate-400 mb-6">
              Fais tourner la roue pour obtenir un bonus aleatoire de pieces pour ta boutique.
            </div>
          )}

          <button 
            onClick={spinWheel}
            disabled={spun}
            className={`w-full py-3 rounded-2xl text-xs font-medium transition-colors shadow-lg ${
              spun 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {spun ? 'Dejà tourne aujourd hui' : 'Tourner la roue'}
          </button>
        </section>

        {/* REGLES DU JEU */}
        <section className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
          <h2 className="text-xs font-medium text-slate-400 mb-1">Fonctionnement</h2>
          <p className="text-xs text-slate-300">
            Une tentative gratuite est offerte toutes les 24 heures. Un moyen simple et rapide de booster ses économies pour l'achat de décos rares.
          </p>
        </section>
      </div>

      {/* NAVIGATION DU BAS (App Shell) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-3 max-w-md mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Boutique
        </Link>
      </nav>

    </main>
  );
}
