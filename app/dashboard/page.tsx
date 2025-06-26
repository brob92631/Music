'use client';

import { useAuth } from '../../context/AuthContext';
import AudioPlayerUI from '../../components/AudioPlayerUI';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.email}</h1>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: 'Daily Mix 1', artist: 'Various Artists' },
            { title: 'Chill Vibes', artist: 'Lo-Fi Collective' },
            { title: 'Throwback Hits', artist: '2000s Legends' },
            { title: 'Top 50 Global', artist: 'Chart Toppers' },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <div className="text-lg font-semibold">{item.title}</div>
              <div className="text-sm text-zinc-400">{item.artist}</div>
              <button
                onClick={() =>
                  // Replace this with real track URLs later
                  window.dispatchEvent(
                    new CustomEvent('play-track', {
                      detail: {
                        title: item.title,
                        artist: item.artist,
                        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                      },
                    })
                  )
                }
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Play
              </button>
            </div>
          ))}
        </section>
      </div>

      <AudioPlayerUI />
    </main>
  );
}
