'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function QuestlyDashboard() {
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(350);
  const [max_xp, setMaxXp] = useState(500);
  const [coins, setCoins] = useState(120);

  const [quests, setQuests] = useState([
    { id: 1, title: 'Ranger mon bureau', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Focus' },
    { id: 2, title: 'Réviser 45 minutes', type: 'Rare', xp: 50, coins: 25, completed: false, category: 'Focus' },
    { id: 3, title: 'Séance de sport (30 min)', type: 'Épique', xp: 100, coins: 50, completed: false, category: 'Énergie' },
    { id: 4, title: 'Appeler un proche', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Social' },
  ]);

  const completeQuest = (id: number) => {
    setQuests(quests.map(quest => {
      if (quest.id === id && !quest.completed) {
        setCoins(prev => prev + quest.coins);
        setXp(prev => {
          const newXp = prev + quest.xp;
          if (newXp >= max_xp) {
            setLevel(l => l + 1);
            return newXp - max_xp;
          }
          return newXp;
        });
        return { ...quest, completed: true };
      }
      return quest;
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER PROFIL */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <div className="text-[11px] font-bold text-indigo-400 tracking-wider uppercase">Niveau {level} - Explorateur</div>
            <div className="w-36 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden p-0.5 border border-slate-700/50">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-indigo-500/50"
                style={{ width: `${(xp / max_xp) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-amber-400 font-bold text-sm tracking-wide shadow-inner">
            {coins} P
          </div>
        </header>

        {/* PILIERS DE VIE */}
        <section className="bg-slate-900/60 backdrop-blur-md p-5 rounded-3xl border border-slate-800/80 mb-6 shadow-xl">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Piliers de vie du jour</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium text-slate-300">
                <span>Focus</span>
                <span className="text-indigo-400 font-bold">70%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
                <div className="bg-blue-500 h-full rounded-full w-[70%] shadow-sm shadow-blue-500/50"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium text-slate-300">
                <span>Énergie</span>
                <span className="text-emerald-400 font-bold">40%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
                <div className="bg-emerald-500 h-full rounded-full w-[40%] shadow-sm shadow-emerald-500/50"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium text-slate-300">
                <span>Social</span>
                <span className="text-purple-400 font-bold">90%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
                <div className="bg-purple-500 h-full rounded-full w-[90%] shadow-sm shadow-purple-500/50"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION QUÊTES */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="font-bold text-base tracking-tight">Quêtes du jour</h2>
            <Link 
              href="/create" 
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-xs px-3.5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 text-white"
            >
              + Nouvelle
            </Link>
          </div>

          <div className="space-y-3">
            {quests.map(quest => (
              <div 
                key={quest.id}
                onClick={() => completeQuest(quest.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  quest.completed 
                    ? 'bg-slate-900/30 border-slate-800/40 opacity-40 line-through' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 shadow-lg shadow-black/20 active:scale-[0.99]'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">{quest.title}</div>
                  <div className="flex gap-2 mt-1.5 text-xs font-medium text-indigo-400">
                    <span>+{quest.xp} XP</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400 font-semibold">+{quest.coins} P</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-[11px] font-bold transition-all ${
                  quest.completed ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/40' : 'border-slate-700 bg-slate-800/50 text-transparent'
                }`}>
                  {quest.completed && 'OK'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NAVIGATION DU BAS (Fonctionnelle) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-indigo-400 text-xs font-semibold tracking-wide py-1">
          Quêtes
        </Link>
        <Link href="/room" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide transition-colors py-1">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide transition-colors py-1">
          Boutique
        </Link>
      </nav>
    </main>
  );
}
