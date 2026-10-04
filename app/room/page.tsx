'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePlayer } from '../context/PlayerContext';

function RoomScene({ purchasedItems }: { purchasedItems: number[] }) {
  const [shirtColor, setShirtColor] = useState('#6366f1');
  const [hairColor, setHairColor] = useState('#1e293b');

  // Charger les préférences du Studio Avatar
  useEffect(() => {
    const savedShirt = localStorage.getItem('questly_shirtColor');
    const savedHair = localStorage.getItem('questly_hairColor');
    if (savedShirt) setShirtColor(savedShirt);
    if (savedHair) setHairColor(savedHair);
  }, []);

  // Vérifier si le Skin Cyberpunk (ID: 4) est acheté
  const isCyberpunk = purchasedItems.includes(4);

  // Couleurs dynamiques selon l'achat du skin
  const activeShirt = isCyberpunk ? '#06b6d4' : shirtColor; // Bleu néon cyberpunk
  const activeHair = isCyberpunk ? '#ec4899' : hairColor;   // Rose néon cyberpunk

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 15]} intensity={1.2} castShadow />

      {/* Sol de la chambre */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Mur du fond (Ambiance sombre si cyberpunk) */}
      <mesh position={[0, 1.5, -3]}>
        <boxGeometry args={[6, 3, 0.1]} />
        <meshStandardMaterial color={isCyberpunk ? '#090d16' : '#1e293b'} roughness={0.9} />
      </mesh>

      {/* Mur de gauche */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 3, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Poster Retro (ID: 3) - Appareil déco */}
      {purchasedItems.includes(3) && (
        <mesh position={[1, 1.8, -2.93]}>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.4} />
        </mesh>
      )}

      {/* L'AVATAR 3D */}
      <group position={[0, 0, 0]}>
        {/* Corps (Vêtement) */}
        <mesh position={[0, 0.75, 0]}>
          <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
          <meshStandardMaterial 
            color={activeShirt} 
            emissive={isCyberpunk ? '#06b6d4' : '#000000'} 
            emissiveIntensity={isCyberpunk ? 0.4 : 0} 
          />
        </mesh>
        
        {/* Tête (Cheveux) */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial 
            color={activeHair}
            emissive={isCyberpunk ? '#ec4899' : '#000000'} 
            emissiveIntensity={isCyberpunk ? 0.4 : 0} 
          />
        </mesh>

        {/* Visière Cyberpunk (Visuelle si skin Cyberpunk acheté) */}
        {isCyberpunk && (
          <mesh position={[0, 1.4, 0.2]}>
            <boxGeometry args={[0.35, 0.08, 0.1]} />
            <meshStandardMaterial color="#a855f7" emissive="#c084fc" emissiveIntensity={0.8} />
          </mesh>
        )}
      </group>

      {/* Bureau Minimaliste (ID: 1) */}
      {purchasedItems.includes(1) && (
        <group position={[1.5, 0, -1.5]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.2, 0.1, 0.8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[-0.5, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.5, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        </group>
      )}

      {/* Plante Verte (ID: 2) */}
      {purchasedItems.includes(2) && (
        <group position={[-1.8, 0, -1.8]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color="#10b981" roughness={0.6} />
          </mesh>
        </group>
      )}

      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.1} minDistance={4} maxDistance={12} />
    </>
  );
}

export default function RoomPage() {
  const { coins, purchasedItems } = usePlayer();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <h1 className="font-bold text-base tracking-tight">Ma Chambre 3D</h1>
            <p className="text-xs text-slate-400">Avatar et décors synchronisés</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-amber-400 font-bold text-sm tracking-wide shadow-inner">
            {coins} P
          </div>
        </header>

        {/* CANVAS 3D */}
        <section className="bg-slate-900/60 backdrop-blur-md p-4 rounded-3xl border border-slate-800/80 mb-6 shadow-2xl">
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800/80 relative shadow-inner bg-slate-950">
            <Canvas camera={{ position: [5, 4, 5], fov: 50 }}>
              <RoomScene purchasedItems={purchasedItems} />
            </Canvas>
          </div>
          <div className="text-center mt-3">
            <span className="text-[11px] text-slate-400 font-medium">Glisse ta souris pour faire pivoter la pièce</span>
          </div>
        </section>

        {/* RACCOURCIS */}
        <section className="mb-6 grid grid-cols-2 gap-3">
          <Link href="/shop" className="text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-600/30">
            Boutique
          </Link>
          <Link href="/avatar" className="text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold py-3 rounded-2xl text-xs transition-all shadow-lg">
            Studio Avatar
          </Link>
        </section>
      </div>

      {/* NAVIGATION DU BAS */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Quêtes
        </Link>
        <Link href="/avatar" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Avatar
        </Link>
        <Link href="/room" className="flex flex-col items-center text-indigo-400 text-xs font-semibold tracking-wide py-1">
          Chambre
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide transition-colors py-1">
          Boutique
        </Link>
      </nav>
    </main>
  );
}
