'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DailyPage() {
  const [streak, setStreak] = useState(5);
  const [chestOpened, setChestOpened] = useState(false);
  const [reward, setReward] = useState<number | null>(null);

  const openChest = () => {
    if (!chestOpened) {
      const earnedCoins = streak * 10; // Plus la série est longue, plus le coffre rapporte
      setReward(earnedCoins);
      setChestOpened(true);
      alert(`Coffre ouvert ! Tu as gagne ${earnedCoins} pieces.`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      <div>
        {/* HEADER : Titre */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Coffre Quotidien</h1>
            <p className="text-xs text-slate-400">Garde ta serie active</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>Serie : {streak} Jours</span>
          </div>
        </header>

        {/* SECTION DU COFFRE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative mb-6 shadow-inner text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            {chestOpened ? 'Coffre du jour recupere' : 'Recompense disponible'}
          </div>

          <div className="my-8">
            <div className={`w-24 h-24 mx-auto rounded-3xl border flex items-center justify-center font-bold text-xl shadow-lg transition-all ${
              chestOpened 
                ? 'bg-slate-800 border-slate-700 text-slate-500' 
                : 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400 animate-pulse'
            }`}>
              {chestOpened ? 'OUVERT' : 'COFFRE'}
            </div>
          </div>

          {chestOpened ? (
            <div className="text-xs text-emerald-400 font-medium mb-6">
              +{reward} pieces ajoutees a ton solde ! Reviens demain pour continuer ta serie.
            </div>
          ) : (
            <div className="text-xs text-slate-400 mb-6">
              Ouvre ton coffre quotidien pour debloquer des pieces bonus basees sur ta serie de {streak} jours.
            </div>
          )}

          <button 
            onClick={openChest}
            disabled={chestOpened}
            className={`w-full py-3 rounded-2xl text-xs font-medium transition-colors shadow-lg ${
              chestOpened 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {chestOpened ? 'Dejà recupere aujourd hui' : 'Ouvrir le coffre'}
          </button>
        </section>

        {/* RAPPEL DES STREAKS */}
        <section className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
          <h2 className="text-xs font-medium text-slate-400 mb-1">Pourquoi maintenir sa serie ?</h2>
          <p className="text-xs text-slate-300">
            Chaque jour consécutif augmente la valeur de ton coffre quotidien et te rapproche des objets rares du drop hebdomadaire de la boutique.
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
