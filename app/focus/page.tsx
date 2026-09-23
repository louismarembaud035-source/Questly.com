'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FocusPage() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes en secondes
  const [coinsEarned, setCoinsEarned] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        // Gagner 1 pièce toutes les 60 secondes de concentration
        if ((timeLeft - 1) % 60 === 0) {
          setCoinsEarned(c => c + 1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert('Session focus terminee avec succes ! Tu as gagne tes pieces.');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setCoinsEarned(0);
  };

  // Formatage du temps (MM:SS)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      <div>
        {/* HEADER : Titre */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Mode Focus</h1>
            <p className="text-xs text-slate-400">Reste concentre et gagne des pieces</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>+{coinsEarned} P gagnes</span>
          </div>
        </header>

        {/* CHRONOMETRE CENTRAL */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative mb-6 shadow-inner">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
            {isActive ? 'Session en cours...' : 'Pret a bosser ?'}
          </div>

          <div className="text-6xl font-extrabold tracking-wider text-slate-100 mb-8 font-mono">
            {formattedTime}
          </div>

          <div className="flex gap-3 w-full">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-3 rounded-2xl text-xs font-medium transition-colors shadow-lg ${
                isActive ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isActive ? 'Mettre en pause' : 'Demarrer le focus'}
            </button>
            <button 
              onClick={resetTimer}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-medium transition-colors border border-slate-700"
            >
              Reinitialiser
            </button>
          </div>
        </section>

        {/* CONSEIL */}
        <section className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
          <h2 className="text-xs font-medium text-slate-400 mb-1">Regle du jeu</h2>
          <p className="text-xs text-slate-300">
            Garde cette page ouverte pendant que tu etudes ou effectues tes tâches de la vraie vie. Le chronomètre tourne et récompense ton assiduité.
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
