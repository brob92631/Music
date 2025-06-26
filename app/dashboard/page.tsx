'use client';

import { useAuth } from '../../context/AuthContext';
import AudioPlayerUI from '../../components/AudioPlayerUI';
import { useAudioPlayer, Track } from '../../context/AudioPlayerContext';

const tracksData: Track[] = [
  { id: 'track-1', title: 'Sunset Groove', artist: 'Synthwave Kid', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', artwork: '/img/album-art-placeholder-1.svg' },
  { id: 'track-2', title: 'Midnight Lo-Fi', artist: 'Chillhop Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', artwork: '/img/album-art-placeholder-2.svg' },
  { id: 'track-3', title: 'Retro Rewind', artist: '80s Revival', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', artwork: '/img/album-art-placeholder-3.svg' },
  { id: 'track-4', title: 'Global Top Hits', artist: 'Chart Breakers', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', artwork: '/img/album-art-placeholder-4.svg' },
  { id: 'track-5', title: 'Ambient Dreams', artist: 'Deep Sleep Inc.', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', artwork: '/img/album-art-placeholder-1.svg' },
  { id: 'track-6', title: 'Morning Coffee Jazz', artist: 'Smooth Cafe Trio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', artwork: '/img/album-art-placeholder-2.svg' },
  { id: 'track-7', title: 'Workout Power Mix', artist: 'Adrenaline Junkies', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', artwork: '/img/album-art-placeholder-3.svg' },
  { id: 'track-8', title: 'Study Beats', artist: 'Focus Flow', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', artwork: '/img/album-art-placeholder-4.svg' },
];

const PlayIconSolid = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const MusicNoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-400 transition-colors"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;

export default function DashboardPage() {
  const { user } = useAuth();
  const { playTrack: audioPlayTrack, setQueue: audioSetQueue } = useAudioPlayer();

  const handlePlayItem = (trackToPlay: Track, index: number) => {
    audioSetQueue(tracksData);
    audioPlayTrack(trackToPlay, tracksData, index);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white pb-28 sm:pb-24">
      <div className="p-4 pt-6 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-100">Discover Music</h1>
        <p className="text-zinc-400 mb-8 text-sm sm:text-base">Explore fresh mixes and popular tracks.</p>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {tracksData.map((item, i) => (
            <div 
              key={item.id} 
              className="bg-zinc-800/60 backdrop-blur-md p-3 sm:p-4 rounded-lg group hover:bg-zinc-700/80 transition-all duration-300 ease-in-out flex flex-col cursor-pointer"
              onClick={() => handlePlayItem(item, i)}
            >
              <div className="relative aspect-square bg-zinc-700 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                {item.artwork && item.artwork.startsWith('/img/') ? (
                   <MusicNoteIcon /> // Simple placeholder icon if artwork path is generic
                ) : item.artwork ? (
                  <img src={item.artwork} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                ) : (
                  <MusicNoteIcon />
                )}
                <button
                  aria-label={`Play ${item.title}`}
                  className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2.5 sm:p-3 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out focus:opacity-100"
                >
                  <PlayIconSolid />
                </button>
              </div>
              <div className="mt-auto">
                <div className="text-sm sm:text-base font-semibold text-zinc-100 truncate" title={item.title}>{item.title}</div>
                <div className="text-xs sm:text-sm text-zinc-400 truncate" title={item.artist}>{item.artist}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <AudioPlayerUI />
    </main>
  );
}
