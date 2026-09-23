'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Composant interne pour modéliser la pièce en 3D
function RoomScene() {
  return (
    <>
      {/* Éclairage de la scène */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 15]} intensity={1.2} castShadow />

      {/* Sol de la chambre (Parquet) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Mur du fond */}
      <mesh position={[0, 1.5, -3]}>
        <boxGeometry args={[6, 3, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Mur de gauche (Effet coupe) */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 3, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* L'Avatar au centre */}
      <group position={[0, 0, 0]}>
        {/* Corps */}
        <mesh position={[0, 0.75, 0]}>
          <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
        {/* Tête */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>

      {/* Le Lit */}
      <group position={[-1.5, 0.25, -1.5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.5, 2]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Oreillers */}
        <mesh position={[0.5, 0.35, -0.6]}>
          <boxGeometry args={[0.6, 0.2, 0.5]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Bureau et chaise */}
      <group position={[1.5, 0, -1.5]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[-0.5, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.5, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Contrôles de la caméra (permet de tourner autour de la pièce) */}
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.1} minDistance={4} maxDistance={12} />
    </>
  );
}

export default function RoomPage() {
  const [coins] = useState(120);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-28 max-w-md mx-auto flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* HEADER */}
        <header className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-slate-800/80 shadow-2xl mb-6">
          <div>
            <h1 className="font-bold text-base tracking-tight">Ma Chambre 3D</h1>
            <p className="text-xs text-slate-400">Espace interactif en coupe</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-amber-400 font-bold text-sm tracking-wide shadow-inner">
            {coins} P
          </div>
        </header>

        {/* CONTENEUR DU CANVAS 3D */}
        <section className="bg-slate-900/60 backdrop-blur-md p-4 rounded-3xl border border-slate-800/80 mb-6 shadow-2xl">
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800/80 relative shadow-inner bg-slate-950">
            <Canvas camera={{ position: [5, 4, 5], fov: 50 }}>
              <RoomScene />
            </Canvas>
          </div>
          <div className="text-center mt-3">
            <span className="text-[11px] text-slate-400 font-medium">Glisse ta souris pour faire pivoter la pièce</span>
          </div>
        </section>

        {/* BOUTON PARTAGER */}
        <section className="mb-6">
          <button 
            onClick={() => alert('Lien de partage copié !')}
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] border border-slate-800 text-slate-200 font-semibold py-3 rounded-2xl text-xs transition-all shadow-lg"
          >
            Partager ma chambre
          </button>
        </section>
      </div>

      {/* NAVIGATION DU BOTTOM */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 p-3 max-w-md mx-auto flex justify-around items-center shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide py-1 transition-colors">
          Quêtes
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
