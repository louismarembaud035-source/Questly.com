'use client';

import React, { useState } from 'react';

export default function QuestlyDashboard() {
  // États de l'application (niveau, XP, pièces, jauges)
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(350);
  const [max_xp, setMaxXp] = useState(500);
  const [coins, setCoins] = useState(120);

  // Liste des quêtes initiales
  const [quests, setQuests] = useState([
    { id: 1, title: 'Ranger mon bureau', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Focus' },
    { id: 2, title: 'Réviser 45 minutes', type: 'Rare', xp: 50, coins: 25, completed: false, category: 'Focus' },
    { id: 3, title: 'Séance de sport (30 min)', type: 'Épique', xp: 100, coins: 50, completed: false, category: 'Énergie' },
    { id: 4, title: 'Appeler un proche', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Social' },
  ]);

  // Fonction pour valider une quête
  const completeQuest = (id: number) => {
    setQuests(quests.map(quest => {
      if (quest.id === id && !quest.completed) {
        // Ajouter des pièces et de l'XP
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
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      
      {/* HEADER : Profil et Statistiques */}
      <div>
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Niveau {level} - Explorateur</div>
            <div className="w-32 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${(xp / max_xp) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-amber-400 font-bold text-sm">
            <span>{coins} P</span>
          </div>
        </header>

        {/* SECTION : Piliers de vie */}
        <section className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80 mb-6">
          <h2 className="text-sm font-medium text-slate-400 mb-3">Piliers de vie du jour</h2>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Focus</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[70%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Énergie</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[40%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Social</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION : Liste des Quêtes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Quêtes du jour</h2>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors">
              + Nouvelle
            </button>
          </div>

          <div className="space-y-3">
            {quests.map(quest => (
              <div 
                key={quest.id}
                onClick={() => completeQuest(quest.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  quest.completed 
                    ? 'bg-slate-900/30 border-slate-800/50 opacity-50 line-through' 
                    : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 shadow-md'
                }`}
              >
                <div>
                  <div className="font-medium text-sm text-slate-200">{quest.title}</div>
                  <div className="flex gap-2 mt-1 text-xs text-indigo-400">
                    <span>+{quest.xp} XP</span>
                    <span>•</span>
                    <span>+{quest.coins} P</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold ${
                  quest.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700'
                }`}>
                  {quest.completed && 'OK'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NAVIGATION DU BAS (App Shell) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-3 max-w-md mx-auto flex justify-around items-center">
        <button className="flex flex-col items-center text-indigo-400 text-xs font-medium">
          Quêtes
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Chambre
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Boutique
        </button>
      </nav>

    </main>
  );
}
