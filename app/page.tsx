'use client';

import { useAuth } from '../context/AuthContext'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const MusicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white transition-colors duration-300"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
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
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-xl text-gray-400 animate-pulse">Loading your space...</div>
      </main>
    );
  }

  const userPlaylists = ['Morning Vibes', 'Workout Beats', 'Relax & Focus', 'Party Time', 'Late Night Coding', 'Road Trip Anthems'];
  const playlistGradients = [
    'from-purple-500 to-indigo-500',
    'from-green-500 to-teal-500',
    'from-blue-500 to-cyan-500',
    'from-red-500 to-orange-500',
    'from-gray-700 to-gray-800',
    'from-yellow-500 to-amber-500',
  ];

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 pb-32">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome, {user.email?.split('@')[0]}
          </h1>
          <p className="text-sm text-gray-400">Ready for some vibes?</p>
        </div>
        <button
          onClick={async () => {
            await signOut();
            router.push('/login');
          }}
          className="flex items-center gap-2 bg-black/30 hover:bg-gray-800/80 text-gray-300 hover:text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm transition-colors border border-gray-800"
        >
          <SignOutIcon />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>
      
      <nav className="mb-12">
          <Link href="/dashboard" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
            Browse All Music
          </Link>
      </nav>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-white">Your Playlists</h2>
        {userPlaylists.length === 0 ? (
          <div className="text-center text-gray-500 py-16 flex flex-col items-center bg-black/20 border border-dashed border-gray-800 rounded-2xl">
            <EmptyPlaylistIcon />
            <p className="mt-2 text-base text-gray-400">You haven't created any playlists yet.</p>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-400 transition-colors mt-3 inline-block text-sm font-semibold">
              Discover music to build your first playlist
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {userPlaylists.map((playlist, index) => (
              <div
                key={playlist}
                className="bg-gray-900/50 rounded-lg p-4 cursor-pointer hover:bg-gray-800/70 transition-all duration-300 ease-in-out group border border-gray-800/50"
              >
                <div className={`aspect-square bg-gradient-to-br ${playlistGradients[index % playlistGradients.length]} rounded-md mb-4 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/30`}>
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    <MusicIcon />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-white truncate" title={playlist}>{playlist}</h3>
                <p className="text-sm text-gray-400 mt-0.5">Custom Mix</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
