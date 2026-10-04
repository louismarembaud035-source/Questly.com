'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlayer } from '../context/PlayerContext';

export default function CreateQuestPage() {
  const router = useRouter();
  const { addQuest } = usePlayer();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('Habitude');
  const [difficulty, setDifficulty] = useState('Moyenne');
  const [category, setCategory] = useState('Focus');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Définir les XP et pièces selon la difficulté choisie
    let xp = 50;
    let coins = 25;
    if (difficulty === 'Facile') {
      xp = 10;
      coins = 5;
    } else if (difficulty === 'Difficile') {
      xp = 100;
      coins = 50;
    }

    // Ajout réel de la quête dans le contexte global
    addQuest(title, category, type, xp, coins);

    alert(`Quête "${title}" (${type}) créée avec succès !`);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* HEADER : Titre */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg mb-6">
          <div>
            <h1 className="font-bold text-lg">Nouvelle Quête</h1>
            <p className="text-xs text-slate-400">Personnalise ton objectif</p>
          </div>
          <Link href="/" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
            Retour
          </Link>
        </header>

        {/* FORMULAIRE DE CRÉATION */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sélection du Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Type d'élément</label>
            <div className="grid grid-cols-2 gap-2">
              {['Habitude', 'Quotidienne', 'A faire', 'Recompense'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    type === t 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Titre */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Titre *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Lire 20 pages par jour"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Notes (optionnel)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des détails ou des sous-objectifs..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Difficulté */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Difficulté</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Facile">Facile (+10 XP / +5 P)</option>
              <option value="Moyenne">Moyenne (+50 XP / +25 P)</option>
              <option value="Difficile">Difficile (+100 XP / +50 P)</option>
            </select>
          </div>

          {/* Pilier / Catégorie */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Pilier de vie</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Focus">Focus (Travail / Études)</option>
              <option value="Energie">Énergie (Sport / Santé)</option>
              <option value="Social">Social (Proches / Sorties)</option>
            </select>
          </div>

          {/* Bouton de validation */}
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-2xl text-xs transition-colors shadow-lg mt-6"
          >
            Créer la quête
          </button>

        </form>
      </div>

      {/* NAVIGATION DU BAS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-3 max-w-md mx-auto flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Quêtes
        </Link>
        <Link href="/avatar" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors">
          Avatar
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
