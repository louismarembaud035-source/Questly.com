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
  purchasedItems: number[];
  focus: number;
  energy: number;
  social: number;
  completeQuest: (id: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  buyItem: (id: number, price: number) => boolean;
  addQuest: (title: string, category: string, type: string, xp: number, coins: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const initialQuests: Quest[] = [
  { id: 1, title: 'Ranger mon bureau', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Focus' },
  { id: 2, title: 'Réviser 45 minutes', type: 'Rare', xp: 50, coins: 25, completed: false, category: 'Focus' },
  { id: 3, title: 'Séance de sport (30 min)', type: 'Épique', xp: 100, coins: 50, completed: false, category: 'Énergie' },
  { id: 4, title: 'Appeler un proche', type: 'Commune', xp: 20, coins: 10, completed: false, category: 'Social' },
];

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(350);
  const max_xp = 500;
  const [coins, setCoins] = useState(120);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  
  // Piliers de vie dynamiques (pourcentages de 0 à 100)
  const [focus, setFocus] = useState(70);
  const [energy, setEnergy] = useState(40);
  const [social, setSocial] = useState(90);

  useEffect(() => {
    const savedCoins = localStorage.getItem('questly_coins');
    const savedLevel = localStorage.getItem('questly_level');
    const savedXp = localStorage.getItem('questly_xp');
    const savedQuests = localStorage.getItem('questly_quests');
    const savedPurchased = localStorage.getItem('questly_purchased');
    const savedFocus = localStorage.getItem('questly_focus');
    const savedEnergy = localStorage.getItem('questly_energy');
    const savedSocial = localStorage.getItem('questly_social');
    
    if (savedCoins) setCoins(Number(savedCoins));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedXp) setXp(Number(savedXp));
    if (savedFocus) setFocus(Number(savedFocus));
    if (savedEnergy) setEnergy(Number(savedEnergy));
    if (savedSocial) setSocial(Number(savedSocial));

    if (savedQuests) {
      try { setQuests(JSON.parse(savedQuests)); } catch (e) { console.error(e); }
    }
    if (savedPurchased) {
      try { setPurchasedItems(JSON.parse(savedPurchased)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('questly_coins', coins.toString());
    localStorage.setItem('questly_level', level.toString());
    localStorage.setItem('questly_xp', xp.toString());
    localStorage.setItem('questly_quests', JSON.stringify(quests));
    localStorage.setItem('questly_purchased', JSON.stringify(purchasedItems));
    localStorage.setItem('questly_focus', focus.toString());
    localStorage.setItem('questly_energy', energy.toString());
    localStorage.setItem('questly_social', social.toString());
  }, [coins, level, xp, quests, purchasedItems, focus, energy, social]);

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

  const buyItem = (id: number, price: number): boolean => {
    if (purchasedItems.includes(id)) return false;
    const success = spendCoins(price);
    if (success) {
      setPurchasedItems(prev => [...prev, id]);
      return true;
    }
    return false;
  };

  const addQuest = (title: string, category: string, type: string, xp: number, coins: number) => {
    const newQuest: Quest = {
      id: Date.now(),
      title,
      category,
      type,
      xp,
      coins,
      completed: false,
    };
    setQuests(prev => [newQuest, ...prev]);
  };

  const completeQuest = (id: number) => {
    setQuests(prevQuests => prevQuests.map(quest => {
      if (quest.id === id && !quest.completed) {
        addCoins(quest.coins);
        setXp(prevXp => {
          const newXp = prevXp + quest.xp;
          if (newXp >= max_xp) {
            setLevel(l => l + 1);
            return newXp - max_xp;
          }
          return newXp;
        });

        // Augmentation dynamique des piliers selon la catégorie
        const cat = quest.category.toLowerCase();
        if (cat.includes('focus')) {
          setFocus(f => Math.min(100, f + 15));
        } else if (cat.includes('énergie') || cat.includes('energie')) {
          setEnergy(e => Math.min(100, e + 15));
        } else if (cat.includes('social')) {
          setSocial(s => Math.min(100, s + 15));
        }

        return { ...quest, completed: true };
      }
      return quest;
    }));
  };

  return (
    <PlayerContext.Provider value={{ level, xp, max_xp, coins, quests, purchasedItems, focus, energy, social, completeQuest, addCoins, spendCoins, buyItem, addQuest }}>
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
