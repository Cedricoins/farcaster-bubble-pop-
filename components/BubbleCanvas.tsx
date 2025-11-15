"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function BubbleCanvas() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [count, setCount] = useState(0);
  const { address, isConnected } = useAccount();
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f3722c", "#8c5aff"];

  const createBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isConnected) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.random() * 40 + 30;

    const bubble: Bubble = {
      id: nextId.current++,
      x,
      y: y + 100,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setBubbles((prev) => [...prev, bubble]);
    setCount((c) => c + 1);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    }, 3000);
  };

  const shareOnFarcaster = () => {
    const text = `J'ai fait éclater ${count} bulles !\n\nViens jouer sur @bubble-pop.farcaster !\nhttps://farcaster-bubble-pop.vercel.app`;
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={canvasRef} onClick={createBubble}>
      {/* Bulles animées */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-float pointer-events-none"
          style={{
            left: `${bubble.x - bubble.size / 2}px`,
            bottom: `-100px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: bubble.color,
            boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
            animation: `float 3s ease-out forwards, pop 0.5s 2.5s forwards`,
          }}
        />
      ))}

      {/* UI */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg pointer-events-auto">
          <ConnectButton />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg flex items-center gap-3">
          <span className="text-3xl">{count}</span>
          <span className="text-lg font-bold text-purple-600">bulles</span>
        </div>
      </div>

      {count > 0 && isConnected && (
        <button
          onClick={shareOnFarcaster}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all pointer-events-auto"
        >
          Partager mon score sur Farcaster
        </button>
      )}

      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="bg-white/90 backdrop-blur-md text-2xl font-bold text-purple-700 px-8 py-6 rounded-3xl shadow-2xl">
            Connecte ton wallet Farcaster pour faire des bulles !
          </p>
        </div>
      )}
    </div>
  );
}
