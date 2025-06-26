'use client';

import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">You must be logged in to see the dashboard</h1>
        <Link href="/login" className="text-blue-500 underline">
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hello, {user.email.split('@')[0]}!</h1>
        <button
          onClick={() => signOut()}
          className="text-red-500 underline hover:text-red-600 transition"
        >
          Sign Out
        </button>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Your Playlists & Mixes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Placeholder cards for your playlists */}
          {['Morning Vibes', 'Workout Beats', 'Relax & Focus', 'Party Time'].map((playlist) => (
            <div
              key={playlist}
              className="bg-zinc-900 rounded-2xl p-5 cursor-pointer hover:bg-zinc-800 transition"
            >
              <h3 className="text-lg font-semibold">{playlist}</h3>
              <p className="text-sm text-zinc-400 mt-1">Your custom playlist</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
