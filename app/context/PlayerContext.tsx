'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Quest {
  id: number;
  title: string;
  type: string;
  xp: number;
  coins: number;
  completed: boolean;
  category: string;
}

interface PlayerContextType {
  level: number;
  xp: number;
  max_xp: number;
  coins: number;
  quests: Quest[];
  completeQuest: (id: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(350);
  const max_xp = 500;
  const [coins, setCoins] = useState(120);

  const [quests, setQuests] = useState<Quest[]>([
    { id: 1, title: 'Ranger mon bureau', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Focus' },
    { id: 2, title: 'Réviser 45 minutes', type: 'Rare', xp: 50, coins: 25, completed: false, category: 'Focus' },
    { id: 3, title: 'Séance de sport (30 min)', type: 'Épique', xp: 100, coins: 50, completed: false, category: 'Énergie' },
    { id: 4, title: 'Appeler un proche', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Social' },
  ]);

  useEffect(() => {
    const savedCoins = localStorage.getItem('questly_coins');
    const savedLevel = localStorage.getItem('questly_level');
    const savedXp = localStorage.getItem('questly_xp');
    
    if (savedCoins) setCoins(Number(savedCoins));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedXp) setXp(Number(savedXp));
  }, []);

  useEffect(() => {
    localStorage.setItem('questly_coins', coins.toString());
    localStorage.setItem('questly_level', level.toString());
    localStorage.setItem('questly_xp', xp.toString());
  }, [coins, level, xp]);

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  const completeQuest = (id: number) => {
    setQuests(quests.map(quest => {
      if (quest.id === id && !quest.completed) {
        addCoins(quest.coins);
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
    <PlayerContext.Provider value={{ level, xp, max_xp, coins, quests, completeQuest, addCoins, spendCoins }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer doit être utilisé à l'intérieur d'un PlayerProvider");
  }
  return context;
}
