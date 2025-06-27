// app/dashboard/page.tsx
'use client';

import { useAuth } from '../../context/AuthContext';
import AudioPlayerUI from '../../components/AudioPlayerUI';
import { useAudioPlayer, Track } from '../../context/AudioPlayerContext';
import { useState, useRef, useEffect } from 'react';

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

// Modern Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
  </svg>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const { playTrack: audioPlayTrack, setQueue: audioSetQueue, track: currentTrack } = useAudioPlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTracks = tracksData.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayItem = (trackToPlay: Track, index: number) => {
    audioSetQueue(filteredTracks);
    audioPlayTrack(trackToPlay, filteredTracks, index);
  };

  const toggleLike = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const quickPlaylists = [
    { name: "Today's Top Hits", icon: "🔥", color: "from-red-500 to-orange-500" },
    { name: "Chill Vibes", icon: "🌊", color: "from-blue-500 to-cyan-500" },
    { name: "Workout Beats", icon: "💪", color: "from-purple-500 to-pink-500" },
    { name: "Focus Flow", icon: "🎯", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
              </h1>
              <p className="text-gray-400 text-sm">Let's find something amazing to play</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-8">
        {/* Quick Access Playlists */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Picks</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickPlaylists.map((playlist, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${playlist.color} p-4 cursor-pointer group active:scale-95 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-1">{playlist.icon}</div>
                    <h3 className="font-semibold text-white text-sm leading-tight">{playlist.name}</h3>
                  </div>
                  <div className="opacity-0 group-active:opacity-100 transition-opacity duration-200">
                    <PlayIcon />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-active:bg-black/10 transition-colors duration-200 rounded-2xl" />
              </div>
            ))}
          </div>
        </section>

        {/* All Tracks */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Tracks'}
          </h2>
          <div className="space-y-2">
            {filteredTracks.map((item, i) => (
              <div 
                key={item.id} 
                className={`group relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/5 active:scale-[0.98] ${
                  currentTrack?.id === item.id ? 'bg-white/10' : ''
                }`}
                onClick={() => handlePlayItem(item, i)}
              >
                {/* Album Art */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0">
                  {item.artwork && !item.artwork.includes("placeholder") ? (
                    <img 
                      src={item.artwork} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MusicIcon />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <PlayIcon />
                      <div className="text-black text-sm">
                        <PlayIcon />
                      </div>
                    </div>
                  </div>

                  {/* Now Playing Indicator */}
                  {currentTrack?.id === item.id && (
                    <div className="absolute bottom-1 right-1">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate transition-colors duration-300 ${
                    currentTrack?.id === item.id ? 'text-green-400' : 'text-white group-hover:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors duration-300">
                    {item.artist}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className={`p-2 rounded-full hover:bg-white/10 transition-all duration-300 ${
                      likedTracks.has(item.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <HeartIcon />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300">
                    <MoreIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTracks.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                <SearchIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No results found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </section>
      </div>

      <AudioPlayerUI />
    </main>
  );
}
