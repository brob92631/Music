'use client';

import { useAuth } from '../context/AuthContext'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const PlaylistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-400 transition-colors"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M15 12l-6 4.33V7.67L15 12z"></path></svg>;
const EmptyPlaylistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 mb-3"><path d="M10.5 5.5L8 3H3v18h18V8l-2.5-2.5Z"/><path d="M8 3v10.5a4.5 4.5 0 104.5 4.5V3"/></svg>;

export default function HomePage() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
        <div className="text-xl text-zinc-400">Loading your space...</div>
      </main>
    );
  }

  const userPlaylists = ['Morning Vibes', 'Workout Beats', 'Relax & Focus', 'Party Time', 'Late Night Coding', 'Road Trip Anthems'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-4 pt-6 sm:p-6 pb-28 sm:pb-24">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            Welcome, {user.email?.split('@')[0]}
          </h1>
          <p className="text-sm text-zinc-400">Ready for some vibes?</p>
        </div>
        <button
          onClick={async () => {
            await signOut();
            router.push('/login');
          }}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors shadow-md"
        >
          <SignOutIcon />
          Sign Out
        </button>
      </header>
      
      <nav className="mb-10">
          <Link href="/dashboard" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all text-sm sm:text-base">
            Browse All Music
          </Link>
      </nav>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-zinc-200">Your Playlists</h2>
        {userPlaylists.length === 0 ? (
          <div className="text-center text-zinc-500 py-12 flex flex-col items-center bg-zinc-800/50 rounded-lg">
            <EmptyPlaylistIcon />
            <p className="mt-2 text-base">You haven't created any playlists yet.</p>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-400 transition-colors mt-3 inline-block text-sm">
              Discover new music to build your first playlist
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {userPlaylists.map((playlist) => (
              <div
                key={playlist}
                className="bg-zinc-800/60 backdrop-blur-md rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-zinc-700/80 transition-all duration-300 ease-in-out group"
              >
                <div className="aspect-square bg-zinc-700 rounded-md mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <PlaylistIcon />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-zinc-100 truncate" title={playlist}>{playlist}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Custom Mix</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
