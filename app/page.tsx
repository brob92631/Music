'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {!user ? (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h1 className="text-4xl font-bold text-center">Welcome to onlyvibes 🎵</h1>
          <Link href="/login" className="text-blue-500 underline text-lg">
            Log in / Sign up
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome back, {user.email.split('@')[0]}</h1>
            <Link href="/dashboard" className="text-sm text-blue-400 underline">
              Full Dashboard →
            </Link>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Featured Mixes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <MixCard title="Daily Vibes" />
              <MixCard title="Chill Beats" />
              <MixCard title="Throwback Energy" />
              <MixCard title="Late Night Drive" />
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function MixCard({ title }: { title: string }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800 transition">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-sm text-zinc-400">Tap to explore</div>
    </div>
  );
}
