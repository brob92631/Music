// app/page.tsx
'use client';

import { useAuth } from '../context/AuthContext';
import { useAudioPlayer, Track } from '../context/AudioPlayerContext';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// --- ICONS ---
const PlayIcon = ({size=24}:{size?:number}) => <svg height={size} width={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const HeartIcon = ({isLiked}:{isLiked:boolean}) => <svg height="20" width="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isLiked ? 'fill-green-500 stroke-green-500' : 'fill-none'}`}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const MusicIcon = () => <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const TimeIcon = () => <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 100 13a6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path><path d="M7.25 4.5a.75.75 0 00-1.5 0v4.5c0 .28.12.53.3.7l2.5 1.5a.75.75 0 00.75-1.3L8 8.71V4.5z"></path></svg>;
const SoundBarsIcon = () => (
    <div className="flex space-x-0.5 items-end h-4">
        <div className="w-1 bg-green-500 animate-[grow] h-3" style={{ animationDelay: '0ms' }} />
        <div className="w-1 bg-green-500 animate-[grow] h-2" style={{ animationDelay: '150ms' }} />
        <div className="w-1 bg-green-500 animate-[grow] h-4" style={{ animationDelay: '300ms' }} />
    </div>
);

// --- MOCK DATA ---
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
const quickPlaylists = [
    { name: "Today's Top Hits", color: "from-red-500 to-orange-400" },
    { name: "Chill Vibes", color: "from-blue-600 to-cyan-400" },
    { name: "Workout Beats", color: "from-purple-600 to-pink-500" },
    { name: "Focus Flow", color: "from-green-600 to-emerald-400" },
];

export default function AppHomePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { playTrack, setQueue, track: currentTrack, playing } = useAudioPlayer();
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set(['track-3', 'track-5']));
  const headerRef = useRef<HTMLDivElement>(null);

  const handlePlayItem = (trackToPlay: Track, index: number) => {
    setQueue(tracksData);
    playTrack(trackToPlay, tracksData, index);
  };

  const toggleLike = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) newSet.delete(trackId);
      else newSet.add(trackId);
      return newSet;
    });
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative">
      {/* Header */}
      <header ref={headerRef} className="sticky top-0 z-10 p-4 sm:p-6 bg-base/80 backdrop-blur-lg">
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">{getGreeting()}</h1>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-primary">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
         </div>
      </header>

      <div className="p-4 sm:p-6 space-y-10">
        {/* Quick Picks */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickPlaylists.map((playlist) => (
              <div key={playlist.name} className="flex items-center bg-highlight rounded-md cursor-pointer group hover:bg-elevated transition-colors duration-300">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-l-md bg-gradient-to-br ${playlist.color}`} />
                <h3 className="font-bold text-primary text-sm sm:text-base flex-1 px-4">{playlist.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Tracks List */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Featured Tracks</h2>
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[2rem_1fr_1fr_auto] gap-4 px-4 border-b border-default pb-2 mb-2 text-sm">
              <span className="text-center">#</span>
              <span>Title</span>
              <span className="hidden md:block">Artist</span>
              <TimeIcon />
          </div>
          {/* Tracks */}
          <div className="space-y-1">
            {tracksData.map((item, i) => (
              <div 
                key={item.id} 
                className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 px-4 rounded-md group hover:bg-highlight transition-colors cursor-pointer"
                onClick={() => handlePlayItem(item, i)}
              >
                <div className="flex items-center justify-center">
                    {currentTrack?.id === item.id && playing ? <SoundBarsIcon/> : <span className="group-hover:hidden">{i + 1}</span> }
                    <button className="hidden group-hover:block text-primary"><PlayIcon size={16}/></button>
                </div>
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-elevated rounded flex-shrink-0">
                        <img src={item.artwork} alt={item.title} className="w-full h-full object-cover rounded"/>
                    </div>
                    <div className="min-w-0">
                        <h3 className={`font-semibold truncate ${currentTrack?.id === item.id ? 'text-green-400' : 'text-primary'}`}>{item.title}</h3>
                        <p className="text-sm truncate hidden md:block">{item.artist}</p>
                    </div>
                </div>
                <p className="hidden md:block truncate">{item.artist}</p>
                <div className="flex items-center gap-4">
                    <button onClick={(e) => toggleLike(item.id, e)} className="text-secondary hover:text-primary transition-colors">
                        <HeartIcon isLiked={likedTracks.has(item.id)} />
                    </button>
                    <span className="text-sm tabular-nums">3:45</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
